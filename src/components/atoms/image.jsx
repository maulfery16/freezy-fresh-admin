import { Image } from 'antd';
import PropTypes from 'prop-types';
import React from 'react';

const AtomImage = (props) => {
	return (
		<Image
			{...props}
			preview={props.preview || true}
			src={props.src}
			height={props.size || 100}
			width={props.size || 100}
		/>
	);
};

AtomImage.propTypes = {
	size: PropTypes.number,
	src: PropTypes.string,
	preview: PropTypes.bool,
};

export default AtomImage;
