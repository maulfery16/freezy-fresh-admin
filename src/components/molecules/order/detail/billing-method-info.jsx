import { Col, Row } from 'antd';
import PropTypes from 'prop-types';
import React from 'react';

import MoleculeOrderInfoGroup from '../../info-group-order';

const MoleculeOrderDetailBillingMethodInfo = (props) => {
	return (
		<Row gutter={[12, 12]}>
			<Col span={12}>
				<MoleculeOrderInfoGroup
					title="Tipe Pembayaran"
					content={props.method}
				/>
			</Col>
			<Col span={12}>
				<MoleculeOrderInfoGroup
					title="Nama Bank"
					content={props.bank}
				/>
			</Col>
			<Col span={12}>
				<MoleculeOrderInfoGroup
					title="ID Transaksi"
					content={props.transactionId}
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
