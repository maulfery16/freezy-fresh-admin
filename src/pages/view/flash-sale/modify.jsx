/* eslint-disable no-unused-vars */
/* eslint-disable react/display-name */
import React, { useEffect, useRef, useState } from 'react';
import { Col, Row, Skeleton, Typography, message, Form, Tabs, DatePicker } from 'antd';
import { useHistory } from 'react-router-dom';
import moment from 'moment';

import AtomCard from '../../../components/atoms/card';
import MoleculeFileInputGroup from '../../../components/molecules/input-group/file-input';
import MoleculeModifyActionButtons from '../../../components/molecules/modify-action-buttons';
import MoleculeTextEditorGroup from '../../../components/molecules/input-group/text-editor';
import MoleculeTextInputGroup from '../../../components/molecules/input-group/text-input';
import OrganismProductDatatable from '../../../components/organisms/datatable/product-datatable';
import OrganismLayout from '../../../components/organisms/layout';
import MoleculeDateTimePicker from '../../../components/molecules/input-group/date-time-picker';

const { TabPane } = Tabs;

import FlashSalesService from '../../../services/flash-sales';
const flashSalesService = new FlashSalesService();

const FlashSaleModifyPage = () => {
	const viewTableRef = useRef();
	const flashSaleMobileHomeRef = useRef();
	const flashSaleMobileDetailRef = useRef();
	const flashSaleDesktopHomeRef = useRef();
	const flashSaleDesktopDetailRef = useRef();

	const history = useHistory();
	const [form] = Form.useForm();

	const [flashSale, setFlashSale] = useState(null);

	// eslint-disable-next-line no-unused-vars
	const [productList, setProductList] = useState([]);
	const [isSubmitting, setIsSubmitting] = useState(false);
	const [isCreating, setIsCreating] = useState(false);
	const [termId, setTermId] = useState('');
	const [termEn, setTermEn] = useState('');
	const [longDescId, setLongDescId] = useState('');
	const [longDescEn, setLongDescEn] = useState('');
	const [flashSaleStartAt, setFlashSaleStartAt] = useState('');
	const [flashSaleEndAt, setFlashSaleEndAt] = useState('');

	const getFlashSale = async () => {
		try {
			const {data} = await flashSalesService.getFlashSales();
			setFlashSale(data);
			if (data?.term_and_condition?.id) setTermId(data?.term_and_condition?.id);
			if (data?.term_and_condition?.en) setTermEn(data?.term_and_condition?.en);
			if (data?.long_description?.id) setLongDescId(data?.long_description?.id);
			if (data?.long_description?.en) setLongDescEn(data?.long_description?.en);
			if (data?.start_at) setFlashSaleStartAt(moment(data.start_at).format('YYYY-MM-DD HH:mm:ss'));
			if (data?.finish_at) setFlashSaleEndAt(moment(data.finish_at).format('YYYY-MM-DD HH:mm:ss'));
			if (data.products && Array.isArray(data.products) && data.products.length > 0) {
				const tmp = [];
				data.products.map((x, idx) => {
					const {product_detail, ...rest} = x;
					if (product_detail.discount_percentage !== null && product_detail.discount_percentage !== undefined) delete product_detail.discount_percentage;
					rest.data_idx = `${Math.floor(Math.random() * 1000)}_${idx}`;
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
					en_title: flashSale?.title?.en,
					id_title: flashSale?.title?.id,
					id_short_desc: flashSale?.short_description?.id,
					en_short_desc: flashSale?.short_description?.en,
					flash_sale_start_at: moment(flashSale?.start_at),
					flash_sale_end_at: moment(flashSale?.finish_at)
					// eslint-disable-next-line no-mixed-spaces-and-tabs
			  };
	};

	const submit = async (values) => {
		try {
			setIsSubmitting(true);

			const formData = new FormData();
			const mobileHomeImage = await flashSaleMobileHomeRef.current.getImage();
			const mobileDetailImage = await flashSaleMobileDetailRef.current.getImage();
			const desktopHomeImage = await flashSaleDesktopHomeRef.current.getImage();
			const desktopDetailImage = await flashSaleDesktopDetailRef.current.getImage();
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
			formData.append('start_at', moment(flashSaleStartAt).format('YYYY-MM-DD HH:mm:ss'));
			formData.append('finish_at', moment(flashSaleEndAt).format('YYYY-MM-DD HH:mm:ss'));

			const productsToAssign = [];
			viewTableRef.current.data.map((x) => {
				const { max_stock_per_user, max_stock_per_branch, published_stock, id, product_id, product_detail_id, fixed_price, price, discount_percentage, is_manage_stock, price_after_discount } = x;
				const tmpObj = {
					max_stock_per_user: parseInt(max_stock_per_user),
					max_stock_per_branch: parseInt(max_stock_per_branch),
					published_stock,
					product_id,
					fixed_price,
					price,
					discount_percentage: parseFloat(discount_percentage).toFixed(2),
					is_manage_stock,
					product_detail_id: id ? id : product_detail_id,
					price_after_discount: price_after_discount ? parseInt(price_after_discount) : 0
				};
				productsToAssign.push(tmpObj);
			})
			
			
			if (isCreating) {
				const {data} = await flashSalesService.createFlashSales(formData);
				if (data) {
					const response = await flashSalesService.assignProduct(data.id, {products: productsToAssign});
					if (response && response.data) {
						message.success('Berhasil menambah flash sale');
					}
				}
			} else {
				const {data} = await flashSalesService.editFlashSales(flashSale.id, formData);
				if (data) {
					const response = await flashSalesService.assignProduct(data.id, {products: productsToAssign});
					if (response && response.data) {
						message.success('Berhasil mengubah flash sale');
					}
				}
			}

			message.info(
				'Akan dikembalikan ke halaman daftar flash sale dalam 2 detik'
			);
			setTimeout(() => {
				history.push('/view/flash-sale');
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
			await getFlashSale();
		})();
	}, []);

	return (
		<OrganismLayout
			breadcumbs={[
				{ name: 'Tampilan', link: '/view' },
				{ name: 'Flash Sale', link: '/view/flash-sale' },
				{
					name: location.pathname.includes('add') ? 'Tambah' : 'Ubah Flash Sale',
					link: location.pathname,
				},
			]}
			title="Flash Sale"
		>
			<Typography.Title level={4}>
				<span className="fw7">{`Ubah Flash Sale`.toUpperCase()}</span>
			</Typography.Title>

			{!flashSale ? (
				<Skeleton active />
			) : (
				<>
					<Form
						className="w-100 mt4"
						name="modify_flash_sale"
						form={form}
						onFinish={submit}
						initialValues={setHolidayInitialValues()}
						onFinishFailed={(error) => {
							message.error(`Failed: ${error}`);
							console.error(error);
						}}
					>
						<Tabs defaultActiveKey="1">
							<TabPane tab={`Info Flash Sale`.toUpperCase()} key="1">
								<Row align="top" className="mt4" gutter={24}>
									<Col span={24}>
										<AtomCard>
											<Row gutter={[24, 24]}>
												<Col span={24}>
													<Typography.Text strong>
														<span className="denim f5">
															{'Info Flash Sale'.toUpperCase()}
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
																defaultValue: flashSale
																	? flashSale.banner_mobile_home
																	: null,
																isMobileImage: true,
																label:
																	'Foto Banner Mobile (Beranda)',
																ref: flashSaleMobileHomeRef,
															},
															{
																defaultValue: flashSale
																	? flashSale.banner_mobile_detail
																	: null,
																label:
																	'Foto Banner Mobile (Detail)',
																ref: flashSaleMobileDetailRef,
															},
															{
																defaultValue: flashSale
																	? flashSale.banner_desktop_home
																	: null,
																label:
																	'Foto Banner Desktop (Beranda)',
																ref: flashSaleDesktopHomeRef,
															},
															{
																defaultValue: flashSale
																	? flashSale.banner_desktop_detail
																	: null,
																label:
																	'Foto Banner Desktop (Detail)',
																ref: flashSaleDesktopDetailRef,
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
														value={flashSale?.title?.id}
													/>
												</Col>

												<Col span={12}>
													<MoleculeTextInputGroup
														name="en_title"
														label="Judul (EN)"
														placeholder="Judul (EN)"
														type="text"
														value={flashSale?.title?.en}
													/>
												</Col>

												<Col span={12}>
													<MoleculeDateTimePicker
														label="Tanggal dan Waktu Mulai Masa Berlaku Promo"
														name="flash_sale_start_at"
														showTime
														onChange={(value) => setFlashSaleStartAt(value)}
													/>
												</Col>

												<Col span={12}>
													<MoleculeDateTimePicker
														label="Tanggal dan Waktu Selesai Masa Berlaku Promo"
														name="flash_sale_end_at"
														showTime
														onChange={(value) => setFlashSaleEndAt(value)}
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
														value={flashSale?.short_description?.id}
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
														value={flashSale?.short_description?.en}
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
							maxStockPerBranch
							canModify
							tableType="flash-sale"
						/>
					</Col>
					
					<Col className="mt4" span={24}>
						<MoleculeModifyActionButtons
							backUrl="/view/flash-sale"
							isCreating={isCreating}
							isSubmitting={isSubmitting}
							label="Flash Sale"
							onClick={() => form.submit()}
						/>
					</Col>
				</>
			)}
		</OrganismLayout>
	);
};

export default FlashSaleModifyPage;
