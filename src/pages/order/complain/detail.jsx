/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react';
import ReactMoment from 'react-moment';
import { Col, Divider, message, Row, Skeleton, Space, Typography } from 'antd';
import { Link, useParams } from 'react-router-dom';

import AtomCard from '../../../components/atoms/card';
import AtomImage from '../../../components/atoms/image';
import AtomSecondaryButton from '../../../components/atoms/button/secondary-button';
import MoleculeInfoGroup from '../../../components/molecules/info-group';
import OrganismLayout from '../../../components/organisms/layout';

import OrderService from '../../../services/order';

const OrderComplainDetailPage = () => {
	const { id } = useParams();
	const [order, setOrder] = useState(null);
	const orderService = new OrderService();

	const getOrderComplaintDetail = async () => {
		try {
			const response = await orderService.getComplaintOrderById(id);
			setOrder(response.data);
		} catch (error) {
			message.error(error.message);
			console.error(error);
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
			<Typography.Title level={4}>
				<span className="fw7">
					{`Detail Pesanan Dikomplain`.toUpperCase()}
				</span>
			</Typography.Title>

			<Row align="top" className="mt4" gutter={24}>
				<Col span={18}>
					<AtomCard>
						<Row gutter={[12, 24]}>
							<Col span={24}>
								<Typography.Text strong>
									<span className="denim f5">
										INFO KOMPLAIN
									</span>
								</Typography.Text>
							</Col>

							<Col span={12}>
								<MoleculeInfoGroup
									title="ID Pesanan"
									content={order?.order_info?.order_id}
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
									content={order?.customer_info?.full_name}
								/>
							</Col>

							<Col span={12}>
								<MoleculeInfoGroup
									title="Cabang Freezy (ID)"
									content={order?.branch_info?.name?.id}
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
										order?.customer_status
									)}
								/>
							</Col>

							<Divider />

							<Col span={24} style={{ paddingTop: '2rem' }}>
								<Typography.Text strong>
									<span className="denim f5">
										INFO KOMPLAIN
									</span>
								</Typography.Text>
							</Col>
						</Row>
					</AtomCard>
				</Col>
			</Row>

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
