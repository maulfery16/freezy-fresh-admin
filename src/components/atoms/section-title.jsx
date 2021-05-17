import React from 'react';
import PropTypes from 'prop-types';
import { Col, Typography } from 'antd';

const AtomSectionTitle = (props) => {
	return (
		<Col className={props.className ? props.className : ''} span={24}>
			<Typography.Text strong>
				<span className="denim f5">{props.title.toUpperCase()}</span>
			</Typography.Text>
		</Col>
	);
};

AtomSectionTitle.propTypes = {
	title: PropTypes.string,
};

export default AtomSectionTitle;
