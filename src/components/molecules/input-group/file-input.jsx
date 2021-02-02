import React from 'react';
import { Col, Form, Input, Row, Typography } from 'antd';

const MoleculeFileInputGroup = (props) => {
	return (
		<Form.Item>
			<Typography.Text>
				<span className="gray fw5 mb2">{props.label}</span>
			</Typography.Text>

			<Form.Item name={props.name} noStyle>
				<Input {...props} style={{ display: 'none' }} type="file" />
			</Form.Item>

			<Row
				className="br3 ba b--black-10 bw1 pv2 ph3"
				justify="space-between"
			>
				<Col>
					<Typography.Text strong>
						<span className="moon-gray">{props.placeholder}</span>
					</Typography.Text>
				</Col>
				<Col>
					<Typography.Text>
						<span className="denim">Browse</span>
					</Typography.Text>
				</Col>
			</Row>
		</Form.Item>
	);
};

export default MoleculeFileInputGroup;
