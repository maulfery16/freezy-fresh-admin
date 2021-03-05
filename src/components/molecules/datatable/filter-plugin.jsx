import { Space, Typography } from 'antd';
import PropTypes from 'prop-types';
import React from 'react';

import AtomCustomSelect from '../../atoms/input/select';

const MoleculeDatatableFilter = (props) => {
	const setFilterQuery = (selectedValue) => {
		if (selectedValue) {
			if (selectedValue.length > 0)
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
				className="input-plugin"
				data={props.data}
				onChange={setFilterQuery}
				placeholder={props.placeholder}
				style={{ width: '100%' }}
				allowClear
			/>
		</Space>
	) : (
		<>Filter plugin is invalid</>
	);
};

MoleculeDatatableFilter.propTypes = {
	addFilter: PropTypes.func,
	name: PropTypes.string,
	operator: PropTypes.string,
	placeholder: PropTypes.string,
	removeFilter: PropTypes.func,
};

export default MoleculeDatatableFilter;
