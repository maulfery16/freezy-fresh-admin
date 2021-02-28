import PropTypes from 'prop-types';
import React from 'react';

import { Button } from 'antd';

const AtomPrimaryButton = (props) => {
	return (
		<Button
			className={`br3 bg-denim white shadow-3 ${props.className}`}
			{...props}
		>
			{props.children}
		</Button>
	);
};

AtomPrimaryButton.propTypes = {
	children: PropTypes.node,
	className: PropTypes.string,
	onChange: PropTypes.string,
};

export default AtomPrimaryButton;
