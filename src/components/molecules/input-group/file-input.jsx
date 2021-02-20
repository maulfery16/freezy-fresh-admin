import React, { useEffect, useState } from 'react';
import { Col, Form, Image, Input, Row, Typography } from 'antd';

const MoleculeFileInputGroup = (props) => {
	const [image, setImage] = useState(props.defaultValue || null);
	const [imagePlaceholder, setimagePlaceholder] = useState(null);

	const inputProps = {
		id: props.id,
		label: props.label,
		palceholder: props.placeholder,
	};

	const getBase64 = (file) => {
		if (file) {
			return new Promise((resolve, reject) => {
				const reader = new FileReader();
				reader.readAsDataURL(file);
				reader.onload = () => resolve(reader.result);
				reader.onerror = (error) => reject(error);
			});
		}
	};

	const getImageData = async (file) => {
		const image = await getBase64(file || props.defaultValue);
		setimagePlaceholder(image);
	};

	useEffect(() => {
		if (props.defaultValue) getImageData();
	}, []);

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
						getImageData(e.target.files[0]);
					}}
					style={{ display: 'none' }}
					type="file"
				/>
			</Form.Item>

			<Row className="mt3" gutter={24}>
				<Col span={8}>
					<Row justify="center">
						<Image
							src={
								imagePlaceholder ||
								'https://www.generationsforpeace.org/wp-content/uploads/2018/03/empty.jpg'
							}
							width={170}
						/>
					</Row>
				</Col>
				<Col span={16}>
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
				</Col>
			</Row>
		</Form.Item>
	);
};

export default MoleculeFileInputGroup;
