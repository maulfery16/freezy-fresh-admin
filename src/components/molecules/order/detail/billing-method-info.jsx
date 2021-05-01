import PropTypes from 'prop-types';
import React from 'react';
import { Col, Row } from 'antd';

import MoleculeOrderInfoGroup from '../../info-group-order';
import OrderService from '../../../../services/order';

const MoleculeOrderDetailBillingMethodInfo = (props) => {
	const orderService = new OrderService();

	return (
		<Row gutter={[12, 12]}>
			<Col span={12}>
				<MoleculeOrderInfoGroup
					title="Tipe Pembayaran"
					content={orderService.transaltePaymentEnum(
						props.order?.payment_method
					)}
				/>
			</Col>
			<Col span={12}>
				<MoleculeOrderInfoGroup
					title="Nama Bank"
					content={orderService.translateBankEnum(props.order?.bank)}
				/>
			</Col>
			<Col span={12}>
				<MoleculeOrderInfoGroup
					title="ID Transaksi"
					content={props.order?.transaction_code}
				/>
			</Col>
		</Row>
	);
};

MoleculeOrderDetailBillingMethodInfo.propType = {
	bank: PropTypes.string,
	method: PropTypes.string,
	transactionId: PropTypes.string,
};

export default MoleculeOrderDetailBillingMethodInfo;
