import { Col, Row } from 'antd';
import PropTypes from 'prop-types';
import React from 'react';

import MoleculeOrderInfoGroup from '../../info-group-order';

const MoleculeOrderDetailVoucherInfo = (props) => {
	return (
		<Row gutter={[12, 12]}>
			<Col span={12}>
				<MoleculeOrderInfoGroup
					title="Name Voucher"
					content={props.voucher}
				/>
			</Col>
			<Col span={12}>
				<MoleculeOrderInfoGroup
					title="Kode Voucher"
					content={props.code}
				/>
			</Col>
		</Row>
	);
};

MoleculeOrderDetailVoucherInfo.propType = {
	code: PropTypes.string,
	voucher: PropTypes.string,
};

export default MoleculeOrderDetailVoucherInfo;
