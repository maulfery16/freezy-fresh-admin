/* eslint-disable no-mixed-spaces-and-tabs */
import PropTypes from 'prop-types';
import React from 'react';
import { Form, Typography } from 'antd';

import AtomCustomSelect from '../../atoms/input/select';

const MoleculeSelectInputGroup = (props) => {
	return (
		<Form.Item>
			<Typography.Text>
				<span className="gray fw5 mb2">{props.label}</span>
			</Typography.Text>

			<Form.Item
				name={props.name}
				noStyle
				rules={
					props.required
						? [
								{
									message: `${props.label} tidak boleh kosong`,
									required: true,
								},
						  ]
						: []
				}
			>
				<AtomCustomSelect
					{...props}
					name={props.name}
					placeholder={props.placeholder}
					ref={props.ref}
					size="large"
				/>
			</Form.Item>
		</Form.Item>
	);
};

MoleculeSelectInputGroup.propTypes = {
	label: PropTypes.string,
	name: PropTypes.string.isRequired,
	placeholder: PropTypes.string,
	data: PropTypes.shape({
		generateCustomOption: PropTypes.func,
		mock: PropTypes.array,
		url: PropTypes.url,
	}),
};

export default MoleculeSelectInputGroup;
