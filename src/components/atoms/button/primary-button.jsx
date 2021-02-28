import PropTypes from 'prop-types';
import React from 'react';

import { Button } from 'antd';

const AtomPrimaryButton = (props) => {
	return (
		<Button
			className={`br3 bg-denim white ${props.additionalClassName}`}
			{...props}
		>
			{props.children}
		</Button>
	);
};

AtomPrimaryButton.propTypes = {
	children: PropTypes.node,
	additionalClassName: PropTypes.string,
	onChange: PropTypes.string,
};

export default AtomPrimaryButton;
