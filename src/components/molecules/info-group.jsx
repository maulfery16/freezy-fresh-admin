import PropTypes from 'prop-types';
import React from 'react';
import { Space, Typography } from 'antd';

const MoleculeInfoGroup = (props) => {
	return (
		<Space direction="vertical" size={5}>
			<Typography.Text>
				<span className="gray f5 fw7">{props.title}</span>
			</Typography.Text>

			<Typography.Text>
				<span className="dark-gray fw5 f6">{props.content}</span>
			</Typography.Text>
		</Space>
	);
};

MoleculeInfoGroup.propTypes = {
	content: PropTypes.node.isRequired,
	title: PropTypes.string.isRequired,
};

export default MoleculeInfoGroup;
