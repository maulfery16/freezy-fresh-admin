import PropTypes from 'prop-types';
import React from 'react';
import { Space, Typography } from 'antd';

const MoleculeInfoGroup = (props) => {
	return (
		<Space direction="vertical" size={5} className="w-100">
			<Typography.Text>
				<span className="gray f5 fw7">{props.title}</span>
			</Typography.Text>

			<div className="dark-gray fw5 f6 w-100">{props.content}</div>
		</Space>
	);
};

MoleculeInfoGroup.propTypes = {
	content: PropTypes.node,
	title: PropTypes.string.isRequired,
};

export default MoleculeInfoGroup;
