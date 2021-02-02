import { Typography } from 'antd';
import React from 'react';

const AtomCard = (props) => {
	return (
		<div className="pa4 bg-white br3 shadow-3 w-100">
			{props.title && (
				<Typography.Text strong>
					<span className="denim f5">
						{props.title.toUpperCase()}
					</span>
				</Typography.Text>
			)}

			<div className="mt3">{props.children}</div>
		</div>
	);
};

export default AtomCard;
