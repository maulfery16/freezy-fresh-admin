import PropTypes from 'prop-types';
import React from 'react';
import ReactMoment from 'react-moment';
import { Col, Row } from 'antd';

import MoleculeOrderInfoGroup from '../../info-group-order';

const MoleculeOrderDetailInfo = (props) => {
	return (
		<Row gutter={[12, 12]}>
			<Col span={12}>
				<MoleculeOrderInfoGroup
					title="ID Pesanan Freezy"
					content={props.order?.order_id}
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
					content={props.order?.customer_order_status}
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
					title="Tanggal Pesanan"
					content={
						<ReactMoment format="DD MMMM YY HH:ss" locale="id">
							{props?.order?.payment_date}
						</ReactMoment>
					}
				/>
			</Col>
			<Col span={12}>
				<MoleculeOrderInfoGroup
					title="Tanggal Pesanan"
					content={
						<ReactMoment format="DD MMMM YY HH:ss" locale="id">
							{props?.order?.in_delivery_date}
						</ReactMoment>
					}
				/>
			</Col>
			<Col span={12}>
				<MoleculeOrderInfoGroup
					title="Tanggal Pesanan"
					content={
						<ReactMoment format="DD MMMM YY HH:ss" locale="id">
							{props?.order?.arrived_date}
						</ReactMoment>
					}
				/>
			</Col>
			<Col span={12}>
				<MoleculeOrderInfoGroup
					title="Tanggal Pesanan"
					content={
						<ReactMoment format="DD MMMM YY HH:ss" locale="id">
							{props?.order?.done_date}
						</ReactMoment>
					}
				/>
			</Col>
			<Col span={12}>
				<MoleculeOrderInfoGroup
					title="Tanggal Pesanan"
					content={
						<ReactMoment format="DD MMMM YY HH:ss" locale="id">
							{props?.order?.cancel_date}
						</ReactMoment>
					}
				/>
			</Col>
			<Col span={12}>
				<MoleculeOrderInfoGroup
					title="Tanggal Pesanan"
					content={
						<ReactMoment format="DD MMMM YY HH:ss" locale="id">
							{props?.order?.refund_date}
						</ReactMoment>
					}
				/>
			</Col>
			<Col span={12}>
				<MoleculeOrderInfoGroup
					title="Tanggal Pesanan"
					content={
						<ReactMoment format="DD MMMM YY HH:ss" locale="id">
							{props?.order?.return_created_date}
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
