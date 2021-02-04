import React from 'react';
import { Form, InputNumber, Space, Typography } from 'antd';

const MoleculeNumberInputGroup = (props) => {
	return (
		<Form.Item>
			<Space className="w-100" direction="vertical" size={0}>
				<Typography.Text>
					<span className="gray fw5 mb2">{props.label}</span>
				</Typography.Text>

				<Form.Item name={props.name} noStyle>
					<InputNumber
						{...props}
						className={`br3 ba bw1 b--black-10 pv2 ph3 w-100 ${props.className}`}
						size="small"
					/>
				</Form.Item>
			</Space>
		</Form.Item>
	);
};

export default MoleculeNumberInputGroup;
