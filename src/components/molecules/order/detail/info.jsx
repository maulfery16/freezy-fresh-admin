import PropTypes from 'prop-types';
import React from 'react';
import ReactMoment from 'react-moment';
import { Col, Row } from 'antd';

import MoleculeOrderInfoGroup from '../../info-group-order';
import OrderService from '../../../../services/order';

const MoleculeOrderDetailInfo = (props) => {
	const orderService = new OrderService();

	return (
		<Row gutter={[12, 12]}>
			<Col span={12}>
				<MoleculeOrderInfoGroup
					title="ID Pesanan Freezy"
					content={props.order?.id}
				/>
			</Col>
			<Col span={12}>
				<MoleculeOrderInfoGroup
					title="Frekuensi Pesanan"
					content={props.order?.order_frequency}
				/>
			</Col>
			<Col span={12}>
				<MoleculeOrderInfoGroup
					title="Status Pesanan Pelanggan"
					content={orderService.translateOrderEnum(
						props.order?.customer_status
					)}
				/>
			</Col>
			<Col span={12}>
				<MoleculeOrderInfoGroup
					title="Tanggal Pesanan"
					content={
						<ReactMoment format="DD MMMM YY HH:ss" locale="id">
							{props?.order?.order_date}
						</ReactMoment>
					}
				/>
			</Col>
			<Col span={12}>
				<MoleculeOrderInfoGroup
					title="Tanggal Bayar"
					content={
						<ReactMoment format="DD MMMM YY HH:ss" locale="id">
							{props?.order?.payment_date}
						</ReactMoment>
					}
				/>
			</Col>
			<Col span={12}>
				<MoleculeOrderInfoGroup
					title="Tanggal Diproses"
					content={
						<ReactMoment format="DD MMMM YY HH:ss" locale="id">
							{props?.order?.shipping_process_date}
						</ReactMoment>
					}
				/>
			</Col>
			<Col span={12}>
				<MoleculeOrderInfoGroup
					title="Tanggal Sampai"
					content={
						<ReactMoment format="DD MMMM YY HH:ss" locale="id">
							{props?.order?.shipping_delivered_date}
						</ReactMoment>
					}
				/>
			</Col>
			<Col span={12}>
				<MoleculeOrderInfoGroup
					title="Tanggal Selesai"
					content={
						<ReactMoment format="DD MMMM YY HH:ss" locale="id">
							{props?.order?.finish_date}
						</ReactMoment>
					}
				/>
			</Col>
			<Col span={12}>
				<MoleculeOrderInfoGroup
					title="Tanggal Dibatalkan"
					content={
						<ReactMoment format="DD MMMM YY HH:ss" locale="id">
							{props?.order?.cancel_date}
						</ReactMoment>
					}
				/>
			</Col>
			<Col span={12}>
				<MoleculeOrderInfoGroup
					title="Tanggal Pengembalian"
					content={
						<ReactMoment format="DD MMMM YY HH:ss" locale="id">
							{props?.order?.refund_date}
						</ReactMoment>
					}
				/>
			</Col>
			<Col span={12}>
				<MoleculeOrderInfoGroup
					title="Tanggal Dikembalikan"
					content={
						<ReactMoment format="DD MMMM YY HH:ss" locale="id">
							{props?.order?.return_date}
						</ReactMoment>
					}
				/>
			</Col>
		</Row>
	);
};

MoleculeOrderDetailInfo.propType = {
	order: PropTypes.any,
};

export default MoleculeOrderDetailInfo;
