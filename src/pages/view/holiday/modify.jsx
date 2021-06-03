/* eslint-disable no-unused-vars */
/* eslint-disable react/display-name */
import React, { useEffect, useRef, useState } from 'react';
import { Col, Row, Skeleton, Typography, message, Form, Tabs } from 'antd';
import { useHistory } from 'react-router-dom';

import AtomCard from '../../../components/atoms/card';
import MoleculeFileInputGroup from '../../../components/molecules/input-group/file-input';
import MoleculeModifyActionButtons from '../../../components/molecules/modify-action-buttons';
import MoleculeTextEditorGroup from '../../../components/molecules/input-group/text-editor';
import MoleculeTextInputGroup from '../../../components/molecules/input-group/text-input';
import OrganismProductDatatable from '../../../components/organisms/datatable/product-datatable';
import OrganismLayout from '../../../components/organisms/layout';

const { TabPane } = Tabs;

import HolidayService from '../../../services/holiday';
const holidayService = new HolidayService();

const HolidayModifyPage = () => {
	const viewTableRef = useRef();
	const holidayMobileHomeRef = useRef();
	const holidayMobileDetailRef = useRef();
	const holidayDesktopHomeRef = useRef();
	const holidayDesktopDetailRef = useRef();

	const history = useHistory();
	const [form] = Form.useForm();

	const [holiday, setHoliday] = useState(null);

	// eslint-disable-next-line no-unused-vars
	const [productList, setProductList] = useState([]);
	const [isSubmitting, setIsSubmitting] = useState(false);
	const [isCreating, setIsCreating] = useState(false);
	const [termId, setTermId] = useState('');
	const [termEn, setTermEn] = useState('');
	const [longDescId, setLongDescId] = useState('');
	const [longDescEn, setLongDescEn] = useState('');

	const getHolidays = async () => {
		try {
			const {data} = await holidayService.getHoliday();
			setHoliday(data);
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
			setIsCreating(!data);
		} catch (error) {
			message.error(error.message);
			console.error(error);
		}
	};

	const setHolidayInitialValues = () => {
		return isCreating
			? {}
			: {
					en_title: holiday?.title?.en,
					id_title: holiday?.title?.id,
					id_short_desc: holiday?.short_description?.id,
					en_short_desc: holiday?.short_description?.en,
					// eslint-disable-next-line no-mixed-spaces-and-tabs
			  };
	};

	const submit = async (values) => {
		try {
			setIsSubmitting(true);

			const formData = new FormData();
			const mobileHomeImage = await holidayMobileHomeRef.current.getImage();
			const mobileDetailImage = await holidayMobileDetailRef.current.getImage();
			const desktopHomeImage = await holidayDesktopHomeRef.current.getImage();
			const desktopDetailImage = await holidayDesktopDetailRef.current.getImage();
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
				const {data} = await holidayService.createHoliday(formData);
				if (data) {
					const response = await holidayService.assignProduct(data.id, {products: productsToAssign});
					if (response && response.data) {
						message.success('Berhasil menambah holiday');
					}
				}
			} else {
				const {data} = await holidayService.editHoliday(holiday.id, formData);
				if (data) {
					const response = await holidayService.assignProduct(data.id, {products: productsToAssign});
					if (response && response.data) {
						message.success('Berhasil mengubah holiday');
					}
				}
			}

			message.info(
				'Akan dikembalikan ke halaman daftar holiday dalam 2 detik'
			);
			setTimeout(() => {
				history.push('/view/holiday');
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
			await getHolidays();
		})();
	}, []);

	return (
		<OrganismLayout
			breadcumbs={[
				{ name: 'Tampilan', link: '/view' },
				{ name: 'Holiday', link: location.pathname },
				{
					name: location.pathname.includes('add') ? 'Tambah' : 'Ubah Holiday',
					link: location.pathname,
				},
			]}
			title="Holiday"
		>
			<Typography.Title level={4}>
				<span className="fw7">{`Ubah Holiday`.toUpperCase()}</span>
			</Typography.Title>

			{!holiday ? (
				<Skeleton active />
			) : (
				<>
					<Form
						className="w-100 mt4"
						name="modify_holiday"
						form={form}
						onFinish={submit}
						initialValues={setHolidayInitialValues()}
						onFinishFailed={(error) => {
							message.error(`Failed: ${error}`);
							console.error(error);
						}}
					>
						<Tabs defaultActiveKey="1">
							<TabPane tab={`Info Holiday`.toUpperCase()} key="1">
								<Row align="top" className="mt4" gutter={24}>
									<Col span={24}>
										<AtomCard>
											<Row gutter={[24, 24]}>
												<Col span={24}>
													<Typography.Text strong>
														<span className="denim f5">
															{'Info Holiday'.toUpperCase()}
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
																defaultValue: holiday
																	? holiday.banner_mobile_home
																	: null,
																isMobileImage: true,
																label:
																	'Foto Banner Mobile (Beranda)',
																ref: holidayMobileHomeRef,
															},
															{
																defaultValue: holiday
																	? holiday.banner_mobile_detail
																	: null,
																label:
																	'Foto Banner Mobile (Detail)',
																ref: holidayMobileDetailRef,
															},
															{
																defaultValue: holiday
																	? holiday.banner_desktop_home
																	: null,
																label:
																	'Foto Banner Desktop (Beranda)',
																ref: holidayDesktopHomeRef,
															},
															{
																defaultValue: holiday
																	? holiday.banner_desktop_detail
																	: null,
																label:
																	'Foto Banner Desktop (Detail)',
																ref: holidayDesktopDetailRef,
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
														value={holiday?.title?.id}
													/>
												</Col>

												<Col span={12}>
													<MoleculeTextInputGroup
														name="en_title"
														label="Judul (EN)"
														placeholder="Judul (EN)"
														type="text"
														value={holiday?.title?.en}
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
														value={holiday?.short_description?.id}
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
														value={holiday?.short_description?.en}
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
							</TabPane>
							<TabPane
								tab={`Syarat & ketentuan`.toUpperCase()}
								key="2"
							>
								<Row align="top" gutter={24}>
									<Col span={24}>
										<AtomCard>
											<Row gutter={[12, 24]}>
												<Col span={24}>
													<MoleculeTextEditorGroup
														name="term_id"
														label={`Syarat & Ketentuan (ID)`}
														value={termId}
														onChange={setTermId}
													/>
												</Col>

												<Col span={24}>
													<MoleculeTextEditorGroup
														name="term_en"
														label={`Syarat & Ketentuan (EN)`}
														value={termEn}
														onChange={setTermEn}
													/>
												</Col>
											</Row>
										</AtomCard>
									</Col>
								</Row>
							</TabPane>
						</Tabs>
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
							backUrl="/view/holiday"
							isCreating={isCreating}
							isSubmitting={isSubmitting}
							label="Holiday"
							onClick={() => form.submit()}
						/>
					</Col>
				</>
			)}
		</OrganismLayout>
	);
};

export default HolidayModifyPage;
