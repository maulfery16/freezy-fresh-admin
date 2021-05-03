import React from 'react';
import PropTypes from 'prop-types';

import MoleculeSelectInputGroup from '../../molecules/input-group/select-input';

const AtomBranchSelect = (props) => {
	const { optionValue, ...restProps } = props;

	return (
		<MoleculeSelectInputGroup
			{...restProps}
			allowClear
			label="Cabang Freezy"
			name="branches"
			placeholder="Pilih Cabang Freezy"
			data={{
				url: 'branches',
				generateCustomOption: (item) => ({
					value: optionValue ? item[optionValue] : item.id,
					label: item.name.id,
				}),
				onChange: props.onChange
					? (value, options) => props.onChange(value, options)
					: () => {},
			}}
		/>
	);
};

AtomBranchSelect.propTypes = {
	onChange: PropTypes.func,
	optionValue: PropTypes.string,
	required: PropTypes.bool,
};

export default AtomBranchSelect;
