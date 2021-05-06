import PropTypes from 'prop-types';
import React from 'react';
import { DatePicker, Form, Space, TimePicker, Typography } from 'antd';

const MoleculeDateTimePickerGroup = (props) => {
	let rules = [];

	if (props.required) {
		rules.push({
			message: `${props.label} tidak boleh kosong`,
			required: true,
		});
	}
	if (props.rules) rules = [...rules, ...props.rules];

	const inputProps = {
		...props,
		className: `br3 ba bw1 b--black-10 pv2 ph3 w-100 ${
			props.className || ''
		}`,
	};

	return (
		<Form.Item>
			<Space className="w-100" size={0} direction="vertical">
				<Typography.Text>
					<span className="gray fw5 mb2">{props.label}</span>
				</Typography.Text>

				<Form.Item name={props.name} noStyle rules={rules}>
					{props.type === 'time' ? (
						<TimePicker {...inputProps} />
					) : (
						<DatePicker {...inputProps} />
					)}
				</Form.Item>
			</Space>
		</Form.Item>
	);
};

MoleculeDateTimePickerGroup.propTypes = {
	label: PropTypes.string,
	name: PropTypes.string,
	type: PropTypes.string,
	placeholder: PropTypes.string,
};

export default MoleculeDateTimePickerGroup;
