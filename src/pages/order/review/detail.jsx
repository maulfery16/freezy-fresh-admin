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
	const { id } = useParams();
	const [order, setOrder] = useState(null);
	const [product, setProduct] = useState(null);
	const [isLoading, setIsLoading] = useState(false);

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
							<Link
								to={{
									pathname: `/order/${order?.id}/detail`,
									state: {
										backUrl: `${location.pathname}`,
									},
								}}
							>
								<AtomSecondaryButton size="large">
									Detail Pesanan
								</AtomSecondaryButton>
							</Link>
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
															order?.stars || 0
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
														{order?.image?.map(
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
												title="Ulasan Pelanggan"
												content={
													<MoleculeMarkdownRenderer
														text={
															order?.message ||
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
