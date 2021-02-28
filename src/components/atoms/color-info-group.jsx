import { Space, Typography } from 'antd';
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

export default AtomColorInfoGroup;
