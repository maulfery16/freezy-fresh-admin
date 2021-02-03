import React from 'react';
import { Form, Input, Typography } from 'antd';

const MoleculePasswordInputGroup = (props) => {
	return (
		<Form.Item>
			<Typography.Text>
				<span className="gray fw5 mb2">{props.label}</span>
			</Typography.Text>

			<Form.Item
				name={props.name}
				noStyle
				rules={[
					{
						message: props.requiredMessage || `${props.label} tidak boleh kosong`,
						required: true,
						type: props.type || 'string',
					},
				]}
			>
				<Input.Password
					{...props}
					className={`br3 ba bw1 b--black-10 pv2 ph3 ${props.className}`}
					size="middle"
				/>
			</Form.Item>
		</Form.Item>
	);
};

export default MoleculePasswordInputGroup;
