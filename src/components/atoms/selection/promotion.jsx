import React from 'react';
import PropTypes from 'prop-types';

import MoleculeSelectInputGroup from '../../molecules/input-group/select-input';

const AtomPromotionSelect = (props) => {
	const { optionValue, ...restProps } = props;

	const setOnChangeFunction = () => {
		if (props.onChange) {
			return (value, options) => {
				props.onChange(value, options);
			};
		}
	};

	return (
		<MoleculeSelectInputGroup
			{...restProps}
			allowClear
			label="Promo"
			name="promo"
			placeholder="Pilih Promo"
			data={{
				url: 'promotions?filter=id;hexa_code;title',
				generateCustomOption: (item) => ({
					value: optionValue ? item[optionValue] : item.id,
					label: `${item.title.en} / ${item.title.id}`,
				}),
				onChange: setOnChangeFunction(),
			}}
		/>
	);
};

AtomPromotionSelect.propTypes = {
	onChange: PropTypes.func,
	optionValue: PropTypes.string,
	required: PropTypes.bool,
};

export default AtomPromotionSelect;
