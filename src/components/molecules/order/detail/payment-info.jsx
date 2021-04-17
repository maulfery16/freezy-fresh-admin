import { Col, Row } from 'antd';
import PropTypes from 'prop-types';
import React from 'react';

import MoleculeOrderInfoGroup from '../../info-group-order';

const MoleculeOrderDetailPaymentInfo = (props) => {
	return (
		<Row gutter={[12, 12]}>
			<Col span={12}>
				<MoleculeOrderInfoGroup
					title="Total Pesanan"
					content={props.order?.total_order}
				/>
			</Col>
			<Col span={12}>
				<MoleculeOrderInfoGroup
					title="Total Diskon"
					content={props.order?.total_discount}
				/>
			</Col>
			<Col span={12}>
				<MoleculeOrderInfoGroup
					title="Total Potongan Voucher"
					content={props.order?.total_voucher_discount}
				/>
			</Col>
			<Col span={12}>
				<MoleculeOrderInfoGroup
					title="Biaya Pengiriman"
					content={props.order?.delivery_fee}
				/>
			</Col>
			<Col span={12}>
				<MoleculeOrderInfoGroup
					title="Biaya Pengaturan Pengiriman"
					content={props.order?.develiry_setting_fee}
				/>
			</Col>
			<Col span={12}>
				<MoleculeOrderInfoGroup
					title="Biaya Parkir"
					content={props.order?.park_fee}
				/>
			</Col>
			<Col span={12}>
				<MoleculeOrderInfoGroup
					title="Total Pembayaran"
					content={props.order?.total_fee}
				/>
			</Col>
			<Col span={12}>
				<MoleculeOrderInfoGroup
					title="Cashback"
					content={props.order?.cashback}
				/>
			</Col>
		</Row>
	);
};

MoleculeOrderDetailPaymentInfo.propType = {
	order: PropTypes.any,
};

export default MoleculeOrderDetailPaymentInfo;
