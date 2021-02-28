import NumberFormat from 'react-number-format';
import PropTypes from 'prop-types';
import React from 'react';

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

AtomNumberFormat.propTypes = {
	prefix: PropTypes.string,
	value: PropTypes.number,
};

export default AtomNumberFormat;
