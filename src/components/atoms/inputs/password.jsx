import React from 'react';
import { Form, Input } from 'antd';

const AtomPassword = (props) => {
	return (
		<Form.Item
			name={props.name}
			noStyle
			rules={[
				{
					message: props.requiredMessage || 'Tidak Boleh Kosong',
					required: props.isRequired || false,
					type: props.type || 'string',
				},
			]}
		>
			<Input.Password
				addonBefore={props.addonBefore || null}
				className={props.className}
				disabled={props.disabled ? true : false}
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
			/>
		</Form.Item>
	);
};

export default AtomPassword;
