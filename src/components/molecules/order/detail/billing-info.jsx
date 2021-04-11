import PropTypes from 'prop-types';
import React from 'react';
import { Col, Row } from 'antd';

import MoleculeOrderInfoGroup from '../../info-group-order';

const MoleculeOrderDetailBillingInfo = (props) => {
	return (
		<Row gutter={[12, 12]}>
			<Col span={12}>
				<MoleculeOrderInfoGroup
					title="ID Pelanggan"
					content={props.order?.customer?.id}
				/>
			</Col>
			<Col span={12}>
				<MoleculeOrderInfoGroup
					title="Nama Pelanggan"
					content={props.order?.customer?.name}
				/>
			</Col>
			<Col span={12}>
				<MoleculeOrderInfoGroup
					title="Email"
					content={props.order?.customer?.email}
				/>
			</Col>
			<Col span={12}>
				<MoleculeOrderInfoGroup
					title="Nomor Handpone"
					content={props.order?.customer?.phone_number}
				/>
			</Col>
		</Row>
	);
};

MoleculeOrderDetailBillingInfo.propType = {
	order: PropTypes.any,
};

export default MoleculeOrderDetailBillingInfo;
