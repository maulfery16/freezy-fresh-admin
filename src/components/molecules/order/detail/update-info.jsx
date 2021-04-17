import { Col, Row } from 'antd';
import PropTypes from 'prop-types';
import React from 'react';
import ReactMoment from 'react-moment';

import MoleculeOrderInfoGroup from '../../info-group-order';

const MoleculeOrderUpdateInfo = (props) => {
	return (
		<Row gutter={[12, 12]}>
			<Col span={12}>
				<MoleculeOrderInfoGroup
					title="Tanggal Pendaftaran"
					content={
						<ReactMoment format="DD MMMM YY HH:ss" locale="id">
							{props?.order?.registration_date}
						</ReactMoment>
					}
				/>
			</Col>
			<Col span={12}>
				<MoleculeOrderInfoGroup
					title="Tanggal Diperbaharui"
					content={
						<ReactMoment format="DD MMMM YY HH:ss" locale="id">
							{props?.order?.updated_date}
						</ReactMoment>
					}
				/>
			</Col>
			<Col span={12}>
				<MoleculeOrderInfoGroup
					title="Provinsi"
					content={props.order?.registed_by}
				/>
			</Col>
			<Col span={12}>
				<MoleculeOrderInfoGroup
					title="Provinsi"
					content={props.order?.updated_by}
				/>
			</Col>
		</Row>
	);
};

MoleculeOrderUpdateInfo.propType = {
	order: PropTypes.any,
};

export default MoleculeOrderUpdateInfo;
