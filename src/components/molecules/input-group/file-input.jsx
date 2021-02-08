import React, { useState } from 'react';
import { Col, Form, Input, Row, Typography } from 'antd';

const MoleculeFileInputGroup = (props) => {
	const [image, setImage] = useState(props.defaultValue || null);

	const inputProps = {
		id: props.id,
		label: props.label,
		palceholder: props.placeholder,
	};

	return (
		<Form.Item>
			<Typography.Text>
				<span className="gray fw5 mb2">{props.label}</span>
			</Typography.Text>

			<Form.Item name={props.name} noStyle>
				<Input
					{...inputProps}
					onChange={(e) => {
						setImage(e.target.files[0]);
						props.setImage(e.target.files[0]);
					}}
					style={{ display: 'none' }}
					type="file"
				/>
			</Form.Item>

			<Row
				className="br3 ba b--black-10 bw1 pv2 ph3"
				justify="space-between"
			>
				<Col>
					<Typography.Text strong>
						<span className="moon-gray">
							{image ? image.name : props.placeholder}
						</span>
					</Typography.Text>
				</Col>
				<Col>
					<Typography.Text
						className="pointer"
						onClick={() => {
							document.getElementById(props.id).click();
						}}
					>
						<span className="denim fw6">Browse</span>
					</Typography.Text>
				</Col>
			</Row>
		</Form.Item>
	);
};

export default MoleculeFileInputGroup;
