import PropTypes from 'prop-types';
import React from 'react';

import { Button } from 'antd';

const AtomSecondaryButton = (props) => {
	return (
		<Button
			className={`br3 denim b--demin white shadow-3 ${props.className}`}
			{...props}
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
