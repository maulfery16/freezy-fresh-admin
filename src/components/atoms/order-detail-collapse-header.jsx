import React from 'react';
import PropTypes from 'prop-types';

const AtomDetailCollapseHeader = (props) => {
	return <span className="denim f6 fw7">{props.title.toUpperCase()}</span>;
};

AtomDetailCollapseHeader.propType = {
	title: PropTypes.string,
};

export default AtomDetailCollapseHeader;
