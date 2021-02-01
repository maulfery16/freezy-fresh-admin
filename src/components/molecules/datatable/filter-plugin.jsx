import React from 'react';
import { Select, Space, Typography } from 'antd';

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

	let isValidToRender =
		props.name && props.operator && props.options ? true : false;

	console.log(props.options);

	return isValidToRender ? (
		<Space className="w-100" direction="vertical">
			<Typography.Text>
				<span>{props.label}</span>
			</Typography.Text>

			<Select
				className="input-plugin"
				mode={isValidToRender ? 'multiple' : 'tags'}
				onChange={setFilterQuery}
				placeholder={props.placeholder}
				style={{ width: '100%' }}
			>
				{props.options.map((option, index) => (
					<Select.Option
						key={props.identifier + '_filteroption_' + index}
						value={option.value}
					>
						{option.label}
					</Select.Option>
				))}
			</Select>
		</Space>
	) : (
		<>Filter plugin is invalid</>
	);
};

export default MoleculeFilterPlugin;
