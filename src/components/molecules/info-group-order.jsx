import PropTypes from 'prop-types';
import React from 'react';
import { Space, Typography } from 'antd';

const MoleculeOrderInfoGroup = (props) => {
	return (
		<Space direction="vertical" size={5} className="w-100">
			<Typography.Text>
				<span className={`gray f7 fw7`}>{props.title}</span>
			</Typography.Text>

			<div className="dark-gray fw5 f5 w-100">{props.content || '-'}</div>
		</Space>
	);
};

MoleculeOrderInfoGroup.propTypes = {
	content: PropTypes.node,
	title: PropTypes.string.isRequired,
};

export default MoleculeOrderInfoGroup;
