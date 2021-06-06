/* eslint-disable no-mixed-spaces-and-tabs */
/* eslint-disable react/display-name */
import React, { useEffect, useRef, useState } from 'react';
import { Col, Row, Skeleton, Typography, message, Form, Tabs } from 'antd';
import { useHistory, useLocation, useParams } from 'react-router-dom';

import AtomCard from '../../../components/atoms/card';
import MoleculeFileInputGroup from '../../../components/molecules/input-group/file-input';
import MoleculeSelectInputGroup from '../../../components/molecules/input-group/select-input';
import MoleculeModifyActionButtons from '../../../components/molecules/modify-action-buttons';
import MoleculeTextEditorGroup from '../../../components/molecules/input-group/text-editor';
import MoleculeTextInputGroup from '../../../components/molecules/input-group/text-input';
import OrganismProductDatatable from '../../../components/organisms/datatable/product-datatable';
import OrganismLayout from '../../../components/organisms/layout';

const { TabPane } = Tabs;

import PromotionService from '../../../services/promotion';
const promotionService = new PromotionService();

const PromotionModifyPage = () => {
	const viewTableRef = useRef();
	const promotionImageMobileRef = useRef();
	const promotionImageDekstopRef = useRef();
	const promotionImageSmall1Ref = useRef();
	const promotionImageSmall2Ref = useRef();
	const promotionImageSmall3Ref = useRef();

	const { id } = useParams();
	const history = useHistory();
	const location = useLocation();
	const isCreating = location.pathname.includes('add') ? true : false;

	const [form] = Form.useForm();
	const [fullDescEn, setFullDescEn] = useState('');
	const [fullDescId, setFullDescId] = useState('');
	const [promotion, setPromotion] = useState();
	const [termEn, setTermEn] = useState('');
	const [termId, setTermId] = useState('');

	const [isSubmitting, setIsSubmitting] = useState(false);

	const getPromotionDetail = async (id) => {
		try {
			const { data: promotion } = await promotionService.getPromotionById(
				id
			);

			setPromotion(promotion);
			setFullDescId(promotion.full_description.id);
			setFullDescEn(promotion.full_description.en);
			setTermId(promotion.terms_and_condition.id);
			setTermEn(promotion.terms_and_condition.en);
		} catch (error) {
			message.error(error.message);
			console.error(error);
		}
	};

	const setPromotionInitialValues = () => {
		return isCreating
			? {}
			: {
					en_title: promotion.title.en,
					id_title: promotion.title.id,
					en_short_desc: promotion.short_description.en,
					id_short_desc: promotion.short_description.id,
					promotion_type: promotion.is_information,
			  };
	};

	const submit = async (values) => {
		try {
			setIsSubmitting(true);
			const promotionImageMobile =
				await promotionImageMobileRef.current.getImage();
			const promotionImageDekstop =
				await promotionImageDekstopRef.current.getImage();
			const promotionImageSmall1 =
				await promotionImageSmall1Ref.current.getImage();
			const promotionImageSmall2 =
				await promotionImageSmall2Ref.current.getImage();
			const promotionImageSmall3 =
				await promotionImageSmall3Ref.current.getImage();

			const productsToAssign = [];
			viewTableRef.current.data.map((x) => {
				const { published_stock, id, product_id, product_detail_id, fixed_price, price, discount_percentage, is_manage_stock } = x;
				const tmpObj = {
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
			});

			const formData = new FormData();
			if (promotionImageMobile) formData.append('image_mobile', promotionImageMobile);
			if (promotionImageDekstop) formData.append('image_desktop', promotionImageDekstop);
			if (promotionImageSmall1) formData.append('addition_image_1', promotionImageSmall1);
			if (promotionImageSmall2) formData.append('addition_image_2', promotionImageSmall2);
			if (promotionImageSmall3) formData.append('addition_image_3', promotionImageSmall3);
			formData.append('is_information', values.promotion_type);
			formData.append('title[id]', values.id_title);
			formData.append('title[en]', values.en_title);
			formData.append('short_description[id]', values.id_short_desc);
			formData.append('short_description[en]', values.en_short_desc);
			formData.append('full_description[id]', fullDescId);
			formData.append('full_description[en]', fullDescEn);
			formData.append('terms_and_condition[id]', termId);
			formData.append('terms_and_condition[en]', termEn);

			if (isCreating) {
				const {data} = await promotionService.createPromotion(formData);
				if (data) {
					const response = await promotionService.addProductsToPromotion(id, {data: productsToAssign});
					if (response && response.data) {
						message.success('Berhasil menambah promotion');
					}
				}
			} else {
				const {data} = await promotionService.editPromotion(id, formData);
				if (data) {
					const response = await promotionService.addProductsToPromotion(id, {data: productsToAssign});
					if (response && response.data) {
						message.success('Berhasil mengubah promotion');
					}
				}
			}

			message.info(
				'Akan dikembalikan ke halaman daftar promotion dalam 2 detik'
			);
			setTimeout(() => {
				history.push('/view/promotion');
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
			if (!isCreating) {
				await getPromotionDetail(id);
			}
		})();
	}, []);

	return (
		<OrganismLayout
			breadcumbs={[
				{ name: 'Tampilan', link: '/view' },
				{ name: 'Promotion', link: '/view/promotion' },
				{
					name: location.pathname.includes('add') ? 'Tambah' : 'Ubah',
					link: location.pathname,
				},
			]}
			title={`${isCreating ? 'Tambah' : 'Ubah'} Promo`}
		>
			<Typography.Title level={4}>
				<span className="fw7">
					{`${isCreating ? 'Tambah' : 'Ubah'} Promo`.toUpperCase()}
				</span>
			</Typography.Title>

			{!isCreating && !promotion ? (
				<Skeleton active />
			) : (
				<>
					<Form
						className="w-100 mt4"
						form={form}
						name="modify_promotion"
						initialValues={setPromotionInitialValues()}
						onFinish={submit}
						onFinishFailed={(error) => {
							message.error(`Failed: ${error}`);
							console.error(error);
						}}
					>
						<Tabs defaultActiveKey="1">
							<TabPane
								tab={`Info Promotion`.toUpperCase()}
								key="1"
							>
								<Row align="top" gutter={24}>
									<Col span={24}>
										<AtomCard title="">
											<Row gutter={[24, 24]}>
												<Col span={24}>
													<MoleculeFileInputGroup
														label="Foto Banner"
														description="Format gambar .jpg .jpeg .png, Untuk foto banner mobile ukuran minimum 0 x 0px (Untuk
														gambar optimal gunakan ukuran minimum 0 x 0 px) Untuk foto banner desktop ukuran
														minimum 0 x 0px (Untuk gambar optimal gunakan ukuran minimum 0 x 0 px)"
														fileInputs={[
															{
																defaultValue:
																	promotion
																		? promotion.image_mobile
																		: null,
																isMobileImage: true,
																label: 'Foto Banner Mobile',
																ref: promotionImageMobileRef,
																required: true,
															},
															{
																defaultValue:
																	promotion
																		? promotion.image_desktop
																		: null,
																label: 'Foto Banner Dekstop',
																ref: promotionImageDekstopRef,
																required: true,
															},
															{
																defaultValue:
																	promotion
																		? promotion.addition_image_1
																		: null,
																label: 'Foto Banner Kecil 1',
																ref: promotionImageSmall1Ref,
															},
															{
																defaultValue:
																	promotion
																		? promotion.addition_image_2
																		: null,
																label: 'Foto Banner Kecil 2',
																ref: promotionImageSmall2Ref,
															},
															{
																defaultValue:
																	promotion
																		? promotion.addition_image_3
																		: null,
																label: 'Foto Banner Kecil 3',
																ref: promotionImageSmall3Ref,
															},
														]}
													/>
												</Col>

												<Col span={12}>
													<MoleculeTextInputGroup
														name="id_title"
														label="Nama Promo (ID)"
														placeholder="Nama Promo (ID)"
														type="text"
														required={true}
													/>
												</Col>

												<Col span={12}>
													<MoleculeTextInputGroup
														name="en_title"
														label="Nama Promo (EN)"
														placeholder="Nama Promo (EN)"
														type="text"
														required={true}
													/>
												</Col>

												<Col span={12}>
													<MoleculeSelectInputGroup
														label="Tipe Promo"
														name="promotion_type"
														placeholder="Tipe Promo"
														required={true}
														data={{
															options: [
																{
																	value: true,
																	label: 'Info',
																},
																{
																	value: false,
																	label: 'Promo',
																},
															],
														}}
													/>
												</Col>

												<Col span={12}></Col>

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
														required
													/>
												</Col>

												<Col span={12}>
													<MoleculeTextInputGroup
														autoSize={{
															minRows: 2,
															maxRows: 6,
														}}
														label="Deskripsi Singkat (EN)"
														name="en_short_desc"
														placeholder="Deskripsi Singkat (EN)"
														type="textarea"
														required
													/>
												</Col>

												<Col span={12}>
													<MoleculeTextEditorGroup
														label="Deskripsi Lengkap (ID)"
														onChange={setFullDescId}
														value={fullDescId}
														required={true}
													/>
												</Col>

												<Col span={12}>
													<MoleculeTextEditorGroup
														label="Deskripsi Lengkap (EN)"
														onChange={setFullDescEn}
														value={fullDescEn}
														required={true}
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
										<AtomCard title="">
											<Row gutter={[12, 24]}>
												<Col span={24}>
													<MoleculeTextEditorGroup
														label={`Syarat & Ketentuan (ID)`}
														onChange={setTermId}
														value={termId}
														required
													/>
												</Col>

												<Col span={24}>
													<MoleculeTextEditorGroup
														label={`Syarat & Ketentuan (EN)`}
														onChange={setTermEn}
														value={termEn}
														required
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
							defaultData={[]}
						/>
					</Col>

					<Col className="mt4" span={24}>
						<MoleculeModifyActionButtons
							backUrl="/view/promotion"
							isCreating={isCreating}
							isSubmitting={isSubmitting}
							label="Promo"
							onClick={() => form.submit()}
						/>
					</Col>
				</>
			)}
		</OrganismLayout>
	);
};

export default PromotionModifyPage;
