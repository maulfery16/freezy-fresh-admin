/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react';
import ReactMoment from 'react-moment';
import { Col, Divider, message, Row, Skeleton, Space, Typography } from 'antd';
import { Link, useParams, useHistory } from 'react-router-dom';

import AtomCard from '../../../components/atoms/card';
import AtomImage from '../../../components/atoms/image';
import AtomSecondaryButton from '../../../components/atoms/button/secondary-button';
import MoleculeInfoGroup from '../../../components/molecules/info-group';
import OrganismLayout from '../../../components/organisms/layout';
import OrganismOrderComplaintProduct from '../../../components/organisms/order/order-complain-product';

import OrderService from '../../../services/order';

const OrderComplainDetailPage = () => {
	const { id } = useParams();
	const [order, setOrder] = useState(null);
	const [isLoading, setIsLoading] = useState(false);
	const history = useHistory();

	const orderService = new OrderService();

	const getOrderComplaintDetail = async () => {
		// setIsLoading(true);

		try {
			const response = await orderService.getComplaintOrderById(id);
			setOrder(response.data);
		} catch (error) {
			message.error(error.message);
			console.error(error);
		} finally {
			setIsLoading(false);
		}
	};

	useEffect(() => {
		(async () => {
			getOrderComplaintDetail(id);
		})();
	}, []);

	return (
		<OrganismLayout
			breadcumbs={[
				{ name: 'Order Dikomplain', link: '/order/complain' },
				{ name: 'Detail', link: location.pathname },
			]}
			title="Detail Pesanan Dikomplain"
		>
			{isLoading ? (
				<Skeleton active />
			) : (
				<>
					<Row justify="space-between">
						<Col>
							<Typography.Title level={4}>
								<span className="fw7">
									{`Detail Pesanan Dikomplain`.toUpperCase()}
								</span>
							</Typography.Title>
						</Col>

						<Col>
							<AtomSecondaryButton size="large" onClick={() => history.push(`/order/${order.order_id}/detail`)}>
								Detail Pesanan
							</AtomSecondaryButton>
						</Col>
					</Row>

					<Row align="top" className="mt4" gutter={24}>
						<Col span={16}>
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
											title="ID Tiket"
											content={order?.id}
										/>
									</Col>

									<Col span={12}>
										<MoleculeInfoGroup
											title="Tipe Masalah"
											content={orderService.translateOrderProblemTypeEnum(
												order?.problem_type
											)}
										/>
									</Col>

									<Col span={12}>
										<MoleculeInfoGroup
											title="Nama Pelanggan"
											content={
												order?.customer_info?.full_name
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
											title="Tanggal Komplain"
											content={
												order?.created_at && (
													<ReactMoment format="DD-MM-YYYY">
														{order?.created_at}
													</ReactMoment>
												)
											}
										/>
									</Col>

									<Col span={12}>
										<MoleculeInfoGroup
											title="Tanggal Komplain Selesai oleh Pelanggan"
											content={
												order?.finish_at && (
													<ReactMoment format="DD-MM-YYYY">
														{order?.finish_at}
													</ReactMoment>
												)
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

									<Divider />

									<Col
										span={24}
										style={{ paddingTop: '2rem' }}
									>
										<Typography.Text strong>
											<span className="denim f5">
												INFO KOMPLAIN
											</span>
										</Typography.Text>
									</Col>

									<Col span={12}>
										<MoleculeInfoGroup
											title="Tipe Masalah"
											content={orderService.translateOrderProblemTypeEnum(
												order?.problem_type
											)}
										/>
									</Col>

									<Col span={12}>
										<MoleculeInfoGroup
											title="Detail Komplain"
											content={order?.complaint_detail}
										/>
									</Col>

									<Divider />

									<Col
										span={24}
										style={{ paddingTop: '2rem' }}
									>
										<Typography.Text strong>
											<span className="denim f5">
												INFO SOLUSI
											</span>
										</Typography.Text>
									</Col>

									<Col span={12}>
										<MoleculeInfoGroup
											title="Tipe Pengembalian"
											content={orderService.translateOrderReturnTypeEnum(
												order?.return_type
											)}
										/>
									</Col>

									<Col span={12}>
										<MoleculeInfoGroup
											title="Bukti Pengembalian"
											content={order?.complaint_detail}
										/>
									</Col>

									<Col span={12}>
										<MoleculeInfoGroup
											title="Catatan"
											content={order?.note}
										/>
									</Col>

									<Divider />

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
											content={order?.created_by || '-'}
										/>
									</Col>

									<Col span={12}>
										<MoleculeInfoGroup
											title="Diperbarui oleh"
											content={order?.updated_by || '-'}
										/>
									</Col>
								</Row>
							</AtomCard>
						</Col>

						<Col span={8}>
							<AtomCard title="Produk Yang Dikomplain">
								<Row gutter={[12, 24]}>
									<OrganismOrderComplaintProduct
										isReadOnly
										products={order?.products}
									/>
								</Row>
							</AtomCard>

							<Divider />

							<AtomCard title="Diskusi Komplain">
								<Row gutter={[12, 24]}></Row>
							</AtomCard>
						</Col>
					</Row>
				</>
			)}
			<Row>
				<Col className="mt4" span={24}>
					<Space>
						<Link to="/feed">
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

export default OrderComplainDetailPage;
