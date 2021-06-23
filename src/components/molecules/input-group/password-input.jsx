import PropTypes from 'prop-types';
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
						message:
							props.requiredMessage ||
							`${props.label} tidak boleh kosong`,
						required: true,
						type: props.type || 'string',
					},
					({ getFieldValue }) => ({
						validator(_, value) {
							if (!value || getFieldValue('password') === value) {
								return Promise.resolve();
							}
							return Promise.reject('Password tidak sama!');
						},
					}),
					({ getFieldValue }) => ({
						// eslint-disable-next-line no-unused-vars
						validator(_, value) {
							if (getFieldValue('password') && getFieldValue('password').length < 6) {
								return Promise.reject(
									'Password minimal harus 6 karakter'
								);
							}
							return Promise.resolve();
						},
					}),
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

MoleculePasswordInputGroup.propTypes = {
	label: PropTypes.string,
	name: PropTypes.string.isRequired,
	required: PropTypes.bool,
	requiredMessage: PropTypes.string,
};

export default MoleculePasswordInputGroup;
