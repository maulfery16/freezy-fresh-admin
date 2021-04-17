import PropTypes from 'prop-types';
import React from 'react';
import { Col, Row } from 'antd';

import MoleculeOrderInfoGroup from '../../info-group-order';

const MoleculeOrderDetailCustomerInfo = (props) => {
	return (
		<Row gutter={[12, 12]}>
			<Col span={12}>
				<MoleculeOrderInfoGroup
					title="ID Pelanggan"
					content={props.customer?.id}
				/>
			</Col>
			<Col span={12}>
				<MoleculeOrderInfoGroup
					title="Nama Pelanggan"
					content={props.customer?.name}
				/>
			</Col>
			<Col span={12}>
				<MoleculeOrderInfoGroup
					title="Email"
					content={props.customer?.email}
				/>
			</Col>
			<Col span={12}>
				<MoleculeOrderInfoGroup
					title="Nomor Handpone"
					content={props.customer?.phone_number}
				/>
			</Col>
		</Row>
	);
};

MoleculeOrderDetailCustomerInfo.propType = {
	customer: PropTypes.shape({
		code: PropTypes.string,
		email: PropTypes.string,
		id: PropTypes.string,
		name: PropTypes.string,
		phone_number: PropTypes.string,
	}),
};

export default MoleculeOrderDetailCustomerInfo;
