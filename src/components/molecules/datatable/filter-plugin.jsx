import React from 'react';
import { Space, Typography } from 'antd';
import AtomCustomSelect from '../../atoms/input/select';

const MoleculeFilterPlugin = (props) => {
	const setFilterQuery = (selectedValue) => {
		if (selectedValue.length > 0) {
			props.addFilter(
				props.name,
				props.operator,
				generateClauseValue(selectedValue)
			);
		} else {
			props.removeFilter(props.name);
		}
	};

	const generateClauseValue = (values) =>
		values instanceof Array ? `["${values.join(`","`)}"]` : values;

	let isValidToRender = props.name && props.operator ? true : false;

	return isValidToRender ? (
		<Space className="w-100" direction="vertical">
			<Typography.Text>
				<span className="moon-gray fw6">{props.label}</span>
			</Typography.Text>

			<AtomCustomSelect
				addblankoption
				className="input-plugin"
				data={props.data}
				onChange={setFilterQuery}
				placeholder={props.placeholder}
				style={{ width: '100%' }}
			/>
		</Space>
	) : (
		<>Filter plugin is invalid</>
	);
};

export default MoleculeFilterPlugin;
