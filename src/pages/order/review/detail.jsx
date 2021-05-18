/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react';
import ReactMoment from 'react-moment';
import { Col, message, Rate, Row, Skeleton, Space, Typography } from 'antd';
import { Link, useParams } from 'react-router-dom';

import AtomCard from '../../../components/atoms/card';
import AtomImage from '../../../components/atoms/image';
import AtomSecondaryButton from '../../../components/atoms/button/secondary-button';
import MoleculeInfoGroup from '../../../components/molecules/info-group';
import MoleculeMarkdownRenderer from '../../../components/molecules/markdown-renderer';
import OrganismLayout from '../../../components/organisms/layout';

import OrderService from '../../../services/order';

const OrderReviewDetailPage = () => {
	// const responses = {
	// 	data: {
	// 		object: 'OrderDetail',
	// 		id: 'nm94z70wvlyox8wl',
	// 		branch_info: {
	// 			code: 'BRC0000000002',
	// 			name: { en: 'Bandung 1', id: 'Bandung 1' },
	// 			address: {
	// 				province_name: 'Jawa Barat',
	// 				city_name: 'bandung',
	// 				district_name: 'baleendah',
	// 				subdistrict_name: 'rancamanyar',
	// 				postal_code: '40375',
	// 				address: 'jl soekarno-hatta',
	// 				additional_information: 'deket rumah pak lurah',
	// 				latitude: '-6.899525060501232',
	// 				longitude: '107.5960177607001',
	// 			},
	// 		},
	// 		code: 'FRZ202105080837083',
	// 		order_frequency: '14',
	// 		status: null,
	// 		admin_status: 'COMPLETED',
	// 		customer_status: 'COMPLETED',
	// 		payment_date: '2021-05-07T17:00:00.000000Z',
	// 		shipping_process_date: null,
	// 		shipping_delivered_date: null,
	// 		finish_date: '2021-05-07T17:00:00.000000Z',
	// 		cancel_date: null,
	// 		refund_date: null,
	// 		return_date: null,
	// 		products: [
	// 			{
	// 				product_order_id: 'wmne8q5pwny3j9kb',
	// 				product_id: '6dpbgq5k8a5axoe8',
	// 				product_detail_id: 'z4pe7dyxap0rvlx8',
	// 				sku_id: 'SKUBAYGON01',
	// 				upc_code: 'baygonUPC',
	// 				name: { en: 'Baygon', id: 'Baygon' },
	// 				total: 21000,
	// 				base_category: {
	// 					id: 25,
	// 					code: 'BAC0000000025',
	// 					name: { en: 'Carbohydrates', id: 'Karbo' },
	// 					color_id: 14,
	// 					is_active: true,
	// 					created_by: 1,
	// 					updated_by: 1,
	// 					inactive_by: null,
	// 					created_at: '2021-05-05T06:17:12.000000Z',
	// 					updated_at: '2021-05-05T06:17:12.000000Z',
	// 				},
	// 				age_limit: '18',
	// 				is_freezy_pick: true,
	// 				zone: {
	// 					id: 7,
	// 					code: 'ZON0000000007',
	// 					name: { en: 'Black tea', id: 'Teh hitam' },
	// 					is_active: true,
	// 					created_by: 13,
	// 					updated_by: 13,
	// 					inactive_by: null,
	// 					created_at: '2021-03-18T09:48:52.000000Z',
	// 					updated_at: '2021-03-25T09:20:43.000000Z',
	// 				},
	// 				brand: {
	// 					id: 9,
	// 					code: 'BRD0000000009',
	// 					name: { en: 'LOCAL BRAND', id: 'BRAND LOKAL' },
	// 					social_media_followers: 565000,
	// 					is_active: true,
	// 					created_by: 1,
	// 					updated_by: 1,
	// 					inactive_by: null,
	// 					created_at: '2021-04-21T08:09:16.000000Z',
	// 					updated_at: '2021-04-21T08:10:37.000000Z',
	// 					image: 'uploads/images/yYpgYFQVOvp07x2PdZGS.jpg',
	// 				},
	// 				product_owner: 'Rezeki',
	// 				price: 10000,
	// 				fixed_price: 10000,
	// 				discount_percentage: 10,
	// 				promotion_name: null,
	// 				note: null,
	// 				added_name: 'Runi Update',
	// 				beauty_image:
	// 					'https://s0.bukalapak.com/img/57048308941/large/data.png',
	// 				white_image:
	// 					'https://s0.bukalapak.com/img/57048308941/large/data.png',
	// 				inspiration_image:
	// 					'https://s0.bukalapak.com/img/57048308941/large/data.png',
	// 				packaging_image:
	// 					'https://s0.bukalapak.com/img/57048308941/large/data.png',
	// 				variant_image:
	// 					'https://api.freezyfresh.abcwork.id/storage/uploads/medias/generals/GGtIcDCFs4lYDbSbHsoQ.jpg',
	// 			},
	// 		],
	// 		customer_info: {
	// 			id: 'n6m4eb5jemyp9vao',
	// 			code: 'O0JT6i9LAO',
	// 			name: 'Runi Update',
	// 			email: 'asep.timberlake@gmail.com',
	// 			phone_number: '+6281320372063',
	// 		},
	// 		delivery_info: {
	// 			receiver_name: 'Bert Cooley Ria',
	// 			receiver_phone_number: '787878781211',
	// 			title: 'Office 5',
	// 			address:
	// 				'Jl. Gempol Asri Raya Kulon No.106, Gempolsari, Kec. Bandung Kulon, Kota Bandung, Jawa Barat 40215, Indonesia',
	// 			province_name: 'Jawa Barat',
	// 			city_name: 'Kota Bandung',
	// 			district_name: 'Kecamatan Bandung Kulon',
	// 			subdistrict_name: 'Gempolsari',
	// 			postal_code: '40215',
	// 			additional_information:
	// 				'rumah dengan cat pink samping lapang voli',
	// 			latitude: '-6.935026219525156',
	// 			longitude: '107.55724715968014',
	// 			additional_information_driver: 'rumah cat pink',
	// 			parking_fee: null,
	// 		},
	// 		shipping_info: {
	// 			tracking_history: null,
	// 			shipping_by: 'Superkul',
	// 			shipping_code: null,
	// 			shipping_type: 'Instant',
	// 			shipping_estimation_fee: 20000,
	// 			shipping_estimation_weight_gr: 21000000,
	// 			product_take_from_store_image: null,
	// 			product_delivered_image: null,
	// 		},
	// 		voucher: {},
	// 		voucher_code: null,
	// 		payment_method: 'FREEZY_CASH',
	// 		bank: 'FREEZY_PAY',
	// 		transaction_code: null,
	// 		total_order: 21000,
	// 		total_discount: 3000,
	// 		total_voucher: 0,
	// 		shipping_fee: 20000,
	// 		shipping_arrangement_fee: 3000,
	// 		parking_fee: 2000,
	// 		sub_total: 43000,
	// 		cashback_point: 0,
	// 		is_using_freezy_point: true,
	// 		created_by: 'Runi Update',
	// 		updated_by: 'Runi Update',
	// 		created_at: '2021-05-08T01:37:08.000000Z',
	// 		updated_at: '2021-05-08T01:39:08.000000Z',
	// 		real_id: 37,
	// 	},
	// 	meta: { include: [], custom: [] },
	// };

	const { id } = useParams();
	const [order, setOrder] = useState(null);
	const [product, setProduct] = useState(null);
	const [isLoading, setIsLoading] = useState(false);

	const images = [
		'https://api.freezyfresh.abcwork.id/storage/uploads/images/order_review/BhujdnMDWliHBJgIVHhy.jpg',
		'https://api.freezyfresh.abcwork.id/storage/uploads/images/order_review/rab3mq9VSXDGRQ61Wjrh.jpg',
	];

	const orderService = new OrderService();

	const getOrderReviewDetail = async () => {
		setIsLoading(true);

		try {
			const response = await orderService.getReviewOrderById(id);
			setOrder(response.data);
			setProduct(response?.data?.products?.[0]);
		} catch (error) {
			message.error(error.message);
			console.error(error);
		} finally {
			setIsLoading(false);
		}
	};

	useEffect(() => {
		(async () => {
			getOrderReviewDetail(id);
		})();
	}, []);

	return (
		<OrganismLayout
			breadcumbs={[
				{ name: 'Pesanan', link: '/order' },
				{ name: 'Ulasan', link: '/order/review' },
				{ name: 'Detail', link: location.pathname },
			]}
			title="Detail Ulasan"
		>
			{isLoading ? (
				<Skeleton active />
			) : (
				<>
					<Row justify="space-between">
						<Col>
							<Typography.Title level={4}>
								<span className="fw7">
									{`Detail Ulasan`.toUpperCase()}
								</span>
							</Typography.Title>
						</Col>

						<Col>
							<AtomSecondaryButton size="large">
								Detail Pesanan
							</AtomSecondaryButton>
						</Col>
					</Row>

					<Row align="top" className="mt4" gutter={24}>
						<Col span={16}>
							<Space
								className="w-100"
								direction="vertical"
								size={24}
							>
								<AtomCard>
									<Row gutter={[12, 24]}>
										<Col span={24}>
											<Typography.Text strong>
												<span className="denim f5">
													INFO TRANSAKSI
												</span>
											</Typography.Text>
										</Col>

										<Col span={12}>
											<MoleculeInfoGroup
												title="ID Pesanan"
												content={
													order?.order_info?.order_id
												}
											/>
										</Col>

										<Col span={12}>
											<MoleculeInfoGroup
												title="Nama Pelanggan"
												content={
													order?.customer_info?.name
												}
											/>
										</Col>

										<Col span={12}>
											<MoleculeInfoGroup
												title="Cabang Freezy (ID)"
												content={
													order?.branch_info?.name?.id
												}
											/>
										</Col>

										<Col span={12}>
											<MoleculeInfoGroup
												title="Status Pesanan Pelanggan"
												content={orderService.translateOrderEnum(
													order?.order_info
														?.customer_status
												)}
											/>
										</Col>

										<Col
											span={24}
											style={{ paddingTop: '2rem' }}
										>
											<Typography.Text strong>
												<span className="denim f5">
													INFO UPDATE
												</span>
											</Typography.Text>
										</Col>

										<Col span={12}>
											<MoleculeInfoGroup
												title="Tanggal Daftar"
												content={
													<ReactMoment format="DD-MM-YY">
														{order?.created_at}
													</ReactMoment>
												}
											/>
										</Col>

										<Col span={12}>
											<MoleculeInfoGroup
												title="Tanggal Diperbaharui"
												content={
													<ReactMoment format="DD-MM-YY">
														{order?.updated_at}
													</ReactMoment>
												}
											/>
										</Col>

										<Col span={12}>
											<MoleculeInfoGroup
												title="Didaftarkan oleh"
												content={
													order?.created_by || '-'
												}
											/>
										</Col>

										<Col span={12}>
											<MoleculeInfoGroup
												title="Diperbarui oleh"
												content={
													order?.updated_by || '-'
												}
											/>
										</Col>
									</Row>
								</AtomCard>

								<AtomCard>
									<Row gutter={[12, 24]}>
										<Col span={24}>
											<Typography.Text strong>
												<span className="denim f5">
													PRODUK
												</span>
											</Typography.Text>
										</Col>
										<Col span={24}>
											<Row align="top" gutter={12}>
												<Col>
													<AtomImage
														src={
															product?.variant_image
														}
														size={50}
													/>
												</Col>

												<Col span={18}>
													<Space
														className="w-100"
														direction="vertical"
														size={0}
													>
														<Typography.Text strong>
															{product?.sku_id ||
																''}{' '}
															{product?.name.id}
														</Typography.Text>

														<Typography.Text type="secondary">
															{`SKU ID ${
																product?.sku_id ||
																''
															}`}
														</Typography.Text>
													</Space>
												</Col>
											</Row>
										</Col>

										<Col span={24}>
											<MoleculeInfoGroup
												title="Rate dari Pelanggan"
												content={
													<Rate
														disabled
														defaultValue={
															order?.stars || 4
														}
													/>
												}
											/>
										</Col>

										<Col span={24}>
											<MoleculeInfoGroup
												title="Foto & Video dari Pelanggan"
												content={
													<Row gutter={12}>
														{images.map(
															(image, key) => {
																return (
																	<Col
																		key={`ordr-rvw-key_${key}`}
																	>
																		<AtomImage
																			src={
																				image
																			}
																			size={
																				50
																			}
																		/>
																	</Col>
																);
															}
														)}
													</Row>
												}
											/>
										</Col>

										<Col span={24}>
											<MoleculeInfoGroup
												title="Konten Artikel (ID)"
												content={
													<MoleculeMarkdownRenderer
														text={
															product?.message ||
															'-'
														}
														withBorder
													/>
												}
											/>
										</Col>
									</Row>
								</AtomCard>
							</Space>
						</Col>
					</Row>
				</>
			)}
			<Row>
				<Col className="mt4" span={24}>
					<Space>
						<Link to="/order/review">
							<AtomSecondaryButton size="large">
								Kembali
							</AtomSecondaryButton>
						</Link>
					</Space>
				</Col>
			</Row>
		</OrganismLayout>
	);
};

export default OrderReviewDetailPage;
