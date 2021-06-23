import PropTypes from 'prop-types';
import React from 'react';
import ReactMoment from 'react-moment';
import { Col, Row } from 'antd';
import { useSelector } from 'react-redux';

import MoleculeOrderInfoGroup from '../../info-group-order';
import OrderService from '../../../../services/order';

const MoleculeOrderDetailInfo = (props) => {
	const orderService = new OrderService();
	const { roles } = useSelector((state) => state.auth);

	return (
		<Row gutter={[12, 12]}>
			<Col span={12}>
				<MoleculeOrderInfoGroup
					title="ID Pesanan Freezy"
					content={props.order?.id}
				/>
			</Col>
			{(roles === 'super-admin' || roles === 'admin' || roles === 'manager-freezy') && (
				<Col span={12}>
					<MoleculeOrderInfoGroup
						title="Frekuensi Pesanan"
						content={props.order?.order_frequency}
					/>
				</Col>
			)}
			<Col span={12}>
				<MoleculeOrderInfoGroup
					title="Status Pesanan Pelanggan"
					content={orderService.translateOrderEnum(
						props.order?.customer_status?.id
					)}
				/>
			</Col>
			<Col span={12}>
				<MoleculeOrderInfoGroup
					title="Tanggal Pesanan"
					content={props?.order?.created_at ? (
						<ReactMoment format="DD MMMM YY HH:ss" locale="id">
							{props?.order?.created_at}
						</ReactMoment>
					) : null}
				/>
			</Col>
			<Col span={12}>
				<MoleculeOrderInfoGroup
					title="Tanggal Bayar"
					content={props?.order?.payment_date ? (
						<ReactMoment format="DD MMMM YY HH:ss" locale="id">
							{props?.order?.payment_date}
						</ReactMoment>
					) : null}
				/>
			</Col>
			{(roles === 'super-admin' || roles === 'admin' || roles === 'manager-freezy') && (
				<Col span={12}>
					<MoleculeOrderInfoGroup
						title="Tanggal Diproses"
						content={props?.order?.shipping_process_date ? (
							<ReactMoment format="DD MMMM YY HH:ss" locale="id">
								{props?.order?.shipping_process_date}
							</ReactMoment>
						) : null}
					/>
				</Col>
			)}
			<Col span={12}>
				<MoleculeOrderInfoGroup
					title="Tanggal Sampai"
					content={props?.order?.shipping_delivered_date ? (
						<ReactMoment format="DD MMMM YY HH:ss" locale="id">
							{props?.order?.shipping_delivered_date}
						</ReactMoment>
					) : null}
				/>
			</Col>
			<Col span={12}>
				<MoleculeOrderInfoGroup
					title="Tanggal Selesai"
					content={props?.order?.finish_date ? (
						<ReactMoment format="DD MMMM YY HH:ss" locale="id">
							{props?.order?.finish_date}
						</ReactMoment>
					) : null}
				/>
			</Col>
			<Col span={12}>
				<MoleculeOrderInfoGroup
					title="Tanggal Dibatalkan"
					content={props?.order?.cancel_date ? (
						<ReactMoment format="DD MMMM YY HH:ss" locale="id">
							{props?.order?.cancel_date}
						</ReactMoment>
					) : null}
				/>
			</Col>
			<Col span={12}>
				<MoleculeOrderInfoGroup
					title="Tanggal Pengembalian"
					content={props?.order?.refund_date ? (
						<ReactMoment format="DD MMMM YY HH:ss" locale="id">
							{props?.order?.refund_date}
						</ReactMoment>
					) : null}
				/>
			</Col>
			<Col span={12}>
				<MoleculeOrderInfoGroup
					title="Tanggal Dikembalikan"
					content={props?.order?.return_date ? (
						<ReactMoment format="DD MMMM YY HH:ss" locale="id">
							{props?.order?.return_date}
						</ReactMoment>
					) : null}
				/>
			</Col>
		</Row>
	);
};

MoleculeOrderDetailInfo.propType = {
	order: PropTypes.any,
};

export default MoleculeOrderDetailInfo;
