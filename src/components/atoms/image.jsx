import { Image } from 'antd';
import React from 'react';

import config from '../../config';

const AtomImage = (props) => {
	return (
		<Image
			{...props}
			preview
			src={
				typeof props.src === 'string'
					? `${config.API_URL}/storage/${props.src}`
					: `https://www.eurobitume.eu/typo3conf/ext/pits_downloadcenter/Resources/Public/Icons/noimage.jpg`
			}
		/>
	);
};

export default AtomImage;
