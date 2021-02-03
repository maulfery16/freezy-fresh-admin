import React from 'react';
import { Col, Row, Typography } from 'antd';

const MoleculeDatatableAdditionalInformation = (props) => {
	return (
		<Row
			align="middle"
			className="bg-white pv3 ph3 ba b--black-20"
			justify="space-between"
		>
			<Col style={{ wordBreak: 'break-word' }}>
				<Typography.Text strong>{props.title}</Typography.Text>
			</Col>
			<Col>
				<Typography.Text className="f3 fw8">
					{props.value}
				</Typography.Text>
			</Col>
		</Row>
	);
};

export default MoleculeDatatableAdditionalInformation;
