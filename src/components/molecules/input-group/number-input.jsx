import PropTypes from 'prop-types';
import React from 'react';
import { Form, InputNumber, Space, Typography } from 'antd';

const MoleculeNumberInputGroup = (props) => {
	const { name, help, validateStatus, ...inputProps } = props;

	let rules = [];
	if (props.required) {
		rules.push({
			message:
				props.requiredMessage || `${props.label} tidak boleh kosong`,
			required: true,
		});
	}

	if (props.min) {
		rules.push({
			message: `Harus lebih dari ${props.min}`,
			min: props.min,
		});
	}

	if (props.max) {
		rules.push({
			message: `Harus kurang dari ${props.max}`,
			max: props.max,
		});
	}

	if (props.rules) {
		rules.push(...props.rules);
	}

	const formItemProps = { help, validateStatus };
	if (rules.length > 0) formItemProps.rules = rules;

	return (
		<Form.Item {...formItemProps}>
			<Space className="w-100" direction="vertical" size={0}>
				<Typography.Text>
					<span className="gray fw5 mb2">{props.label}</span>
				</Typography.Text>

				<Form.Item name={name} noStyle>
					<InputNumber
						{...inputProps}
						className={`br3 ba bw1 b--black-10 pv2 ph3 w-100 ${props.className}`}
						size="small"
						min={props.min || 0}
						parser={(value) => value.replaceAll('.', '')}
						formatter={(value) =>
							value
								.toString()
								.replace(/\B(?=(\d{3})+(?!\d))/g, '.')
						}
					/>
				</Form.Item>
			</Space>
		</Form.Item>
	);
};

MoleculeNumberInputGroup.propTypes = {
	className: PropTypes.string,
	formatter: PropTypes.func,
	id: PropTypes.string,
	label: PropTypes.string,
	name: PropTypes.string.isRequired,
	placeholder: PropTypes.string,
	parser: PropTypes.func,
};

export default MoleculeNumberInputGroup;
