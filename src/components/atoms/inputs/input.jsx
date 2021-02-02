import React from 'react';
import { Form, Input } from 'antd';

const AtomInput = (props) => {
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
			message: props.requiredMessage || 'Tidak Boleh Kosong',
			required: props.isRequired || false,
		},
	];

	if (renderRegExp) {
		rules.push({
			message: props.formatMessage || 'Format salah',
			pattern: renderRegExp(),
		});
	}

	const conditionalProps = {};

	if (props.defaultValue) {
		conditionalProps.defaultValue = props.defaultValue;
	}

	return (
		<Form.Item name={props.name} noStyle rules={rules}>
			<Input
				{...conditionalProps}
				addonAfter={props.addonAfter || null}
				addonBefore={props.addonBefore || null}
				className={props.className}
				disabled={props.disabled ? true : false}
				id={props.id || ''}
				onChange={
					props.onChange
						? (event) => props.onChange(event.target.value)
						: null
				}
				placeholder={props.placeholder || ''}
				prefix={props.prefix || null}
				style={
					!props.noStyle
						? {
								padding: '5px 10px',
								borderRadius: '8px',
								// eslint-disable-next-line no-mixed-spaces-and-tabs
						  }
						: {}
				}
				type={props.type || 'text'}
			/>
		</Form.Item>
	);
};

export default AtomInput;
