import PropTypes from 'prop-types';
import React from 'react';
import { Form, InputNumber, Space, Typography } from 'antd';

const MoleculeNumberInputGroup = (props) => {
	let rules = [];
	if (props.required) {
		rules.push({
			message:
				props.requiredMessage || `${props.label} tidak boleh kosong`,
			required: true,
		});
	}

	return (
		<Form.Item>
			<Space className="w-100" direction="vertical" size={0}>
				<Typography.Text>
					<span className="gray fw5 mb2">{props.label}</span>
				</Typography.Text>

				<Form.Item name={props.name} noStyle rules={rules}>
					<InputNumber
						{...props}
						className={`br3 ba bw1 b--black-10 pv2 ph3 w-100 ${props.className}`}
						size="small"
						formatter={(value) =>
							value
								.toString()
								.replace(/\B(?=(\d{3})+(?!\d))/g, '.')
						}
						parser={(value) => value.replaceAll('.', '')}
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
