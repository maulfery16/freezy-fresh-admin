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
							{props.createdAt}
						</ReactMoment>
					}
				/>
			</Col>
			<Col span={12}>
				<MoleculeOrderInfoGroup
					title="Tanggal Diperbaharui"
					content={
						<ReactMoment format="DD MMMM YY HH:ss" locale="id">
							{props.updatedAt}
						</ReactMoment>
					}
				/>
			</Col>
			<Col span={12}>
				<MoleculeOrderInfoGroup
					title="Didaftarkah Oleh"
					content={props.createdBy}
				/>
			</Col>
			<Col span={12}>
				<MoleculeOrderInfoGroup
					title="Diperbaharui Oleh"
					content={props.updatedBy}
				/>
			</Col>
		</Row>
	);
};

MoleculeOrderUpdateInfo.propType = {
	createdAt: PropTypes.string,
	createdBy: PropTypes.string,
	updatedAt: PropTypes.string,
	updatedBy: PropTypes.string,
};

export default MoleculeOrderUpdateInfo;
