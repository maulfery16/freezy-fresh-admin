import React from 'react';
import NumberFormat from 'react-number-format';

const AtomNumberFormat = (props) => {
	return (
		<NumberFormat
			decimalSeparator=","
			displayType="text"
			prefix={props.prefix || ''}
			thousandSeparator="."
			value={props.value}
		/>
	);
};

export default AtomNumberFormat;
