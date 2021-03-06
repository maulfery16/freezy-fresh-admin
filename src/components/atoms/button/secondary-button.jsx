import PropTypes from 'prop-types';
import React from 'react';

import { Button } from 'antd';

const AtomSecondaryButton = (props) => {
	return (
		<Button
			{...props}
			className={`br3 denim b--denim white ${props.className}`}
		>
			{props.children}
		</Button>
	);
};

AtomSecondaryButton.propTypes = {
	children: PropTypes.node,
	className: PropTypes.string,
	onChange: PropTypes.string,
};

export default AtomSecondaryButton;
