import PropTypes from 'prop-types';
import React from 'react';
import { Col, Row } from 'antd';

import MoleculeOrderInfoGroup from '../../info-group-order';

const MoleculeOrderDetailBillingMethodInfo = (props) => {

	return (
		<Row gutter={[12, 12]}>
			<Col span={12}>
				<MoleculeOrderInfoGroup
					title="Tipe Pembayaran"
					content={
						props.order?.payment_method?.id
					}
				/>
			</Col>
			<Col span={12}>
				<MoleculeOrderInfoGroup
					title="Nama Bank"
					content={props.order?.bank?.id}
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
