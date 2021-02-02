import React from 'react';
import { Form, Input, Typography } from 'antd';

const TYPE_ENUM = {
	email: 'email',
	number: 'angka',
	phone: 'angka',
	text: 'huruf',
};

const MoleculeTextInputGroup = (props) => {
	const renderRegExp = () => {
		if (['phone', 'number'].includes(props.type)) return new RegExp(/\d+/g);
		if (props.type === 'email')
			return new RegExp(
				/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
			);

		return null;
	};

	const rules = [
		{
			message: `${props.label} harus dalam bentuk ${
				TYPE_ENUM[props.type]
			}`,
			pattern: renderRegExp(),
		},
	];

	if (props.required)
		rules.push({
			message: `${props.label} tidak boleh kosong`,
			required: true,
		});

	return (
		<Form.Item>
			<Typography.Text>
				<span className="gray fw5 mb2">{props.label}</span>
			</Typography.Text>

			<Form.Item name={props.name} noStyle rules={rules}>
				<Input
					{...props}
					className={`br3 ba bw1 b--black-10 pv2 ph3 ${props.className}`}
					size="middle"
				/>
			</Form.Item>
		</Form.Item>
	);
};

export default MoleculeTextInputGroup;
