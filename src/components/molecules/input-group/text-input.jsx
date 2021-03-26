import PropTypes from 'prop-types';
import React from 'react';
import { Form, Input, Typography } from 'antd';

const TYPE_ENUM = {
	email: 'email',
	number: 'angka',
	phone: 'angka',
	text: 'huruf',
	hex_color: 'hexa warna',
};

const MoleculeTextInputGroup = (props) => {
	const generateValidationMessage = () => {
		if (props.validationMessage) return props.validationMessage;
		if (props.type === 'code') {
			return `Hanya boleh merupakan character atau special charater '-' atau '/' dan tidak boleh mengandung spasi`;
		}

		return `${props.label} harus dalam bentuk ${TYPE_ENUM[props.type]}`;
	};

	const formatRegExp = () => {
		if (['phone', 'number'].includes(props.type)) return new RegExp(/\d+/g);
		if (props.type === 'code') return new RegExp(/^[a-zA-Z0-9`/`-]*$/);

		if (props.type === 'email') {
			return new RegExp(
				/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
			);
		}
		if (props.type === 'hex_color') {
			return new RegExp(/^#(?:[0-9a-fA-F]{3}){1,2}$/);
		}

		return null;
	};

	let rules = [
		{
			message: generateValidationMessage(),
			pattern: formatRegExp(),
		},
	];

	if (props.required) {
		rules.push({
			message: `${props.label} tidak boleh kosong`,
			required: true,
		});
	}
	if (props.rules) rules = [...rules, ...props.rules];

	const inputProps = {
		...props,
		className: `br3 ba bw1 b--black-10 pv2 ph3 ${props.className || ''}`,
		size: 'middle',
	};

	return (
		<Form.Item>
			<Typography.Text>
				<span className="gray fw5 mb2">{props.label}</span>
			</Typography.Text>

			<Form.Item name={props.name} noStyle rules={rules}>
				{props.type === 'textarea' ? (
					<Input.TextArea {...inputProps} />
				) : (
					<Input {...inputProps} />
				)}
			</Form.Item>
		</Form.Item>
	);
};

MoleculeTextInputGroup.propTypes = {
	label: PropTypes.string,
	name: PropTypes.string,
	placeholder: PropTypes.string,
	type: PropTypes.string,
};

export default MoleculeTextInputGroup;
