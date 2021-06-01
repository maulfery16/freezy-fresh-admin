import moment from 'moment';
import React from 'react';
import PropTypes from 'prop-types';
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

	let inputProps = {
		...props,
		className: `br3 ba bw1 b--black-10 pv2 ph3 w-100 ${
			props.className || ''
		}`,
	};

	function range(start, end) {
		const result = [];
		for (let i = start; i < end; i++) {
			result.push(i);
		}
		return result;
	}

	function disabledRangeTime(_, type) {
		if (type === 'start') {
			return {
				disabledHours: () => range(0, 60).splice(4, 20),
				disabledMinutes: () => range(30, 60),
				disabledSeconds: () => [55, 56],
			};
		}
		return {
			disabledHours: () => range(0, 60).splice(20, 4),
			disabledMinutes: () => range(0, 31),
			disabledSeconds: () => [55, 56],
		};
	}

	function disabledDate(current) {
		// Can not select days before today and today
		return current && current < moment().endOf('day');
	}

	if (props.isDisabledDate) inputProps.disabledDate = disabledDate;
	if (props.isDisabledTime) inputProps.disabledTime = disabledRangeTime;

	return (
		<Form.Item>
			<Space className="w-100" size={0} direction="vertical">
				<Typography.Text>
					<span className="gray fw5 mb2">{props.label}</span>
				</Typography.Text>

				<Form.Item name={props.name} noStyle rules={rules}>
					{props.type === 'time' ? (
						<TimePicker {...inputProps} />
					) : props.type === 'range' ? (
						<DatePicker.RangePicker {...inputProps} />
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
