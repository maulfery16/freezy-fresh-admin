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
					content={props.order?.billing_type}
				/>
			</Col>
			<Col span={12}>
				<MoleculeOrderInfoGroup
					title="Nama Bank"
					content={props.order?.bank_name}
				/>
			</Col>
			<Col span={12}>
				<MoleculeOrderInfoGroup
					title="ID Transaksi"
					content={props.order?.transaction_id}
				/>
			</Col>
		</Row>
	);
};

MoleculeOrderDetailBillingMethodInfo.propType = {
	order: PropTypes.any,
};

export default MoleculeOrderDetailBillingMethodInfo;
