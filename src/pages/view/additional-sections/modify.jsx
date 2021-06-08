/* eslint-disable no-unused-vars */
/* eslint-disable react/display-name */
import React, { useEffect, useRef, useState } from 'react';
import { Col, Row, Skeleton, Typography, message, Form, Tabs } from 'antd';
import { useHistory, useParams } from 'react-router-dom';

import AtomCard from '../../../components/atoms/card';
import MoleculeFileInputGroup from '../../../components/molecules/input-group/file-input';
import MoleculeModifyActionButtons from '../../../components/molecules/modify-action-buttons';
import MoleculeTextEditorGroup from '../../../components/molecules/input-group/text-editor';
import MoleculeTextInputGroup from '../../../components/molecules/input-group/text-input';
import OrganismProductDatatable from '../../../components/organisms/datatable/product-datatable';
import OrganismLayout from '../../../components/organisms/layout';

const { TabPane } = Tabs;

import AdditionalSectionService from '../../../services/additional-sections';
const additionalSectionService = new AdditionalSectionService();

const AdditionalSectionModifyPage = () => {
	const viewTableRef = useRef();
	const sectionMobileHomeRef = useRef();
	const sectionMobileDetailRef = useRef();
	const sectionDesktopHomeRef = useRef();
	const sectionDesktopDetailRef = useRef();

	const history = useHistory();
  const {id} = useParams();
	const [form] = Form.useForm();

	const [sectionDetail, setSectionDetail] = useState(null);

	// eslint-disable-next-line no-unused-vars
	const [productList, setProductList] = useState([]);
	const [isSubmitting, setIsSubmitting] = useState(false);
  const [isFetching, setIsFetching] = useState(false);
	const [isCreating, setIsCreating] = useState(false);
	const [termId, setTermId] = useState('');
	const [termEn, setTermEn] = useState('');
	const [longDescId, setLongDescId] = useState('');
	const [longDescEn, setLongDescEn] = useState('');

	const getSectionByID = async () => {
    setIsFetching(true);
		try {
			const {data} = await additionalSectionService.findSectionById(id);
			setSectionDetail(data);
			if (data?.term_and_condition?.id) setTermId(data?.term_and_condition?.id);
			if (data?.term_and_condition?.en) setTermEn(data?.term_and_condition?.en);
			if (data?.long_description?.id) setLongDescId(data?.long_description?.id);
			if (data?.long_description?.en) setLongDescEn(data?.long_description?.en);
			if (data.products && Array.isArray(data.products) && data.products.length > 0) {
				const tmp = [];
				data.products.map((x) => {
					const {product_detail, ...rest} = x;
					if (product_detail.discount_percentage !== null && product_detail.discount_percentage !== undefined) delete product_detail.discount_percentage;
					const newObj = Object.assign({}, rest, product_detail);
					tmp.push(newObj)
				})
				setProductList(tmp);
			}
		} catch (error) {
			message.error(error.message);
			console.error(error);
		} finally {
			setIsFetching(false);
		}
	};

	const setHolidayInitialValues = () => {
		return isCreating
			? {}
			: {
					en_title: sectionDetail?.title?.en,
					id_title: sectionDetail?.title?.id,
					id_short_desc: sectionDetail?.short_description?.id,
					en_short_desc: sectionDetail?.short_description?.en,
					// eslint-disable-next-line no-mixed-spaces-and-tabs
			  };
	};

	const submit = async (values) => {
		try {
			setIsSubmitting(true);

			const formData = new FormData();
			const mobileHomeImage = await sectionMobileHomeRef.current.getImage();
			const mobileDetailImage = await sectionMobileDetailRef.current.getImage();
			const desktopHomeImage = await sectionDesktopHomeRef.current.getImage();
			const desktopDetailImage = await sectionDesktopDetailRef.current.getImage();
			if (mobileHomeImage)
				formData.append('banner_mobile_home', mobileHomeImage);
			if (mobileDetailImage)
				formData.append('banner_mobile_detail', mobileDetailImage);
			if (desktopHomeImage)
				formData.append('banner_desktop_home', desktopHomeImage);
			if (desktopDetailImage)
				formData.append('banner_desktop_detail', desktopDetailImage);
			formData.append('title[id]', values.id_title);
			formData.append('title[en]', values.en_title);
			formData.append('short_description[id]', values.id_short_desc);
			formData.append('short_description[en]', values.en_short_desc);
			formData.append('long_description[id]', longDescId);
			formData.append('long_description[en]', longDescEn);
			formData.append('term_and_condition[id]', termId);
			formData.append('term_and_condition[en]', termEn);

			const productsToAssign = [];
			viewTableRef.current.data.map((x) => {
				const { max_stock_per_user, published_stock, id, product_id, product_detail_id, fixed_price, price, discount_percentage, is_manage_stock } = x;
				const tmpObj = {
					max_stock_per_user: parseInt(max_stock_per_user),
					published_stock,
					product_id,
					fixed_price,
					price,
					discount_percentage: parseInt(discount_percentage),
					is_manage_stock,
					product_detail_id: id ? id : product_detail_id,
					price_after_discount: price - price * (discount_percentage / 100)
				};
				productsToAssign.push(tmpObj);
			})
			
			
			if (isCreating) {
				const {data} = await additionalSectionService.createAdditionalSection(formData);
				if (data) {
					const response = await additionalSectionService.assignProduct(data.id, {products: productsToAssign});
					if (response && response.data) {
						message.success('Berhasil menambah section');
					}
				}
			} else {
				const {data} = await additionalSectionService.editAdditionalSection(sectionDetail.id, formData);
				if (data) {
					const response = await additionalSectionService.assignProduct(data.id, {products: productsToAssign});
					if (response && response.data) {
						message.success('Berhasil mengubah section');
					}
				}
			}

			message.info(
				'Akan dikembalikan ke halaman daftar additional section dalam 2 detik'
			);
			setTimeout(() => {
				history.push('/view/additional-sections');
			}, 2000);
		} catch (error) {
			message.error(error.message);
			console.error(error);
		} finally {
			setIsSubmitting(false);
		}
	};

	useEffect(() => {
		(async () => {
      if (id) await getSectionByID();
			setIsCreating(!history.location.pathname.includes('/edit'));
		})();
	}, []);

	return (
		<OrganismLayout
			breadcumbs={[
				{ name: 'Tampilan', link: '/view' },
				{ name: 'Additional Section', link: '/view/additional-sections' },
				{
					name: isCreating ? 'Tambah Section' : 'Ubah Section',
					link: location.pathname,
				},
			]}
			title="Section"
		>
			<Typography.Title level={4}>
				<span className="fw7">{`${isCreating ? 'Tambah' : 'Ubah'} Section`.toUpperCase()}</span>
			</Typography.Title>

			{isFetching ? (
				<Skeleton active />
			) : !isFetching && ((sectionDetail && !isCreating) || (isCreating && !sectionDetail)) ? (
				<>
					<Form
						className="w-100 mt4"
						name={`modify_section_${id}`}
						form={form}
						onFinish={submit}
						initialValues={setHolidayInitialValues()}
						onFinishFailed={(error) => {
							message.error(`Failed: ${error}`);
							console.error(error);
						}}
					>
						<Row align="top" className="mt4" gutter={24}>
							<Col span={24}>
								<AtomCard>
									<Row gutter={[24, 24]}>
										<Col span={24}>
											<Typography.Text strong>
												<span className="denim f5">
													{'Info Section'.toUpperCase()}
												</span>
											</Typography.Text>
										</Col>

										<Col span={24}>
											<MoleculeFileInputGroup
												label="Foto Banner"
												description="
											Format gambar .jpg .jpeg .png, Untuk foto banner mobile ukuran minimum 0 x 0px (Untuk
											gambar optimal gunakan ukuran minimum 0 x 0 px) Untuk foto banner desktop ukuran
											minimum 0 x 0px (Untuk gambar optimal gunakan ukuran minimum 0 x 0 px)
										"
												fileInputs={[
													{
														defaultValue: sectionDetail
															? sectionDetail.banner_mobile_home
															: null,
														isMobileImage: true,
														label:
															'Foto Banner Mobile (Beranda)',
														ref: sectionMobileHomeRef,
													},
													{
														defaultValue: sectionDetail
															? sectionDetail.banner_mobile_detail
															: null,
														label:
															'Foto Banner Mobile (Detail)',
														ref: sectionMobileDetailRef,
													},
													{
														defaultValue: sectionDetail
															? sectionDetail.banner_desktop_home
															: null,
														label:
															'Foto Banner Desktop (Beranda)',
														ref: sectionDesktopHomeRef,
													},
													{
														defaultValue: sectionDetail
															? sectionDetail.banner_desktop_detail
															: null,
														label:
															'Foto Banner Desktop (Detail)',
														ref: sectionDesktopDetailRef,
													},
												]}
											/>
										</Col>

										<Col span={12}>
											<MoleculeTextInputGroup
												name="id_title"
												label="Title (ID)"
												placeholder="Judul Title (ID)"
												type="text"
												value={sectionDetail?.title?.id}
											/>
										</Col>

										<Col span={12}>
											<MoleculeTextInputGroup
												name="en_title"
												label="Judul (EN)"
												placeholder="Judul (EN)"
												type="text"
												value={sectionDetail?.title?.en}
											/>
										</Col>

										<Col span={12}>
											<MoleculeTextInputGroup
												autoSize={{
													minRows: 2,
													maxRows: 6,
												}}
												label="Deskripsi Singkat (ID)"
												name="id_short_desc"
												placeholder="Deskripsi Singkat (ID)"
												type="textarea"
												value={sectionDetail?.short_description?.id}
											/>
										</Col>

										<Col span={12}>
											<MoleculeTextInputGroup
												autoSize={{
													minRows: 2,
													maxRows: 6,
												}}
												name="en_short_desc"
												label="Deskripsi Singkat (EN)"
												placeholder="Deskripsi Singkat (EN)"
												type="textarea"
												value={sectionDetail?.short_description?.en}
											/>
										</Col>

										<Col span={12}>
											<MoleculeTextEditorGroup
												name="id_long_desc"
												label="Deskripsi Lengkap (ID)"
												value={longDescId}
												onChange={setLongDescId}
											/>
										</Col>

										<Col span={12}>
											<MoleculeTextEditorGroup
												name="en_long_desc"
												label="Deskripsi Lengkap (EN)"
												value={longDescEn}
												onChange={setLongDescEn}
											/>
										</Col>
									</Row>
								</AtomCard>
							</Col>
						</Row>
					</Form>
					<Col className="mt4" span={24}>
						<OrganismProductDatatable
							ref={viewTableRef}
							defaultData={productList}
							maxStockPerUser
							canModify
						/>
					</Col>
					
					<Col className="mt4" span={24}>
						<MoleculeModifyActionButtons
							backUrl="/view/additonal-sections"
							isCreating={isCreating}
							isSubmitting={isSubmitting}
							label="Section"
							onClick={() => form.submit()}
						/>
					</Col>
				</>
			) : null}
		</OrganismLayout>
	);
};

export default AdditionalSectionModifyPage;
