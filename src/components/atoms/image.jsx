import { Image } from 'antd';
import React from 'react';

const AtomImage = (props) => {
	return (
		<Image
			{...props}
			preview
			src={props.src}
			height={props.size || 100}
			width={props.size || 100}
		/>
	);
};

export default AtomImage;
