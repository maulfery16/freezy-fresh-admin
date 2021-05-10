import { Typography } from 'antd';
import PropTypes from 'prop-types';
import React from 'react';

const AtomCard = (props) => {
	return (
		<div className={`pa4 bg-white br3 shadow-3 w-100`}>
			{props.title && (
				<Typography.Text strong>
					<span className="denim f5">
						{props.title.toUpperCase()}
					</span>
				</Typography.Text>
			)}

			<div className={!props.title ? 'mt3' : ''}>{props.children}</div>
		</div>
	);
};

AtomCard.propTypes = {
	children: PropTypes.node.isRequired,
	title: PropTypes.string,
};

export default AtomCard;
