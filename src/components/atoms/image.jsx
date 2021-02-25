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
					? `${config.STORAGE_URL}/${props.src}`
					: `https://www.eurobitume.eu/typo3conf/ext/pits_downloadcenter/Resources/Public/Icons/noimage.jpg`
			}
			height={props.size || 100}
			width={props.size || 100}
		/>
	);
};

export default AtomImage;
