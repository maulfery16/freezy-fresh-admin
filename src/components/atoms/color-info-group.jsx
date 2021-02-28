import { Space, Typography } from 'antd';
import PropTypes from 'prop-types';
import React from 'react';

const AtomColorInfoGroup = (props) => {
	return (
		<Space size="middle">
			<div
				className="br2 ba b--black-20"
				style={{
					background: `#${props.hexa}`,
					height: props.size || '50px',
					width: props.size || '50px',
				}}
			/>

			<Typography.Text>{props.label}</Typography.Text>
		</Space>
	);
};

AtomColorInfoGroup.propTypes = {
	hexa: PropTypes.string,
	label: PropTypes.string,
	size: PropTypes.string,
};

export default AtomColorInfoGroup;
