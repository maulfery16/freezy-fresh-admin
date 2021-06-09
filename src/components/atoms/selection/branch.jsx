import React from 'react';
import PropTypes from 'prop-types';

import MoleculeSelectInputGroup from '../../molecules/input-group/select-input';

const AtomBranchSelect = (props) => {
	const { optionValue, ...restProps } = props;

	const setOnChangeFunction = () => {
		if (props.onChange) {
			return (value, options) => {
				props.onChange(value, options);
			};
		}
	};

	const setGenerateCustomOption = () => {
		if (props.generateCustomOption) {
			return (item) => props.generateCustomOption(item)
		} else {
			return (item) => ({
				value: optionValue ? item[optionValue] : item.id,
				label: item.name.id,
			})
		}
	}

	return (
		<MoleculeSelectInputGroup
			{...restProps}
			allowClear
			label="Cabang Freezy"
			name="branches"
			placeholder="Pilih Cabang Freezy"
			data={{
				url: props.url ?? 'branches',
				limit: 300,
				generateCustomOption: setGenerateCustomOption(),
				onChange: setOnChangeFunction(),
			}}
		/>
	);
};

AtomBranchSelect.propTypes = {
	onChange: PropTypes.func,
	optionValue: PropTypes.string,
	optionValue2: PropTypes.string,
	required: PropTypes.bool,
	url: PropTypes.string,
};

export default AtomBranchSelect;
