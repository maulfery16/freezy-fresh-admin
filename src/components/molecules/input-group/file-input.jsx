import React from 'react';
import { Col, Row, Space, Typography } from 'antd';

import AtomFileInput from '../../atoms/input/file-input';

const MoleculeFileInputGroup = (props) => {
	return (
		<Row className="mb4">
			<Col span={24}>
				<Typography.Text>
					<span className="gray fw5 mb2">{props.label}</span>
				</Typography.Text>
			</Col>

			<Col className="ba b--black-20 br3 pv4" span={24}>
				<Space direction="vertical" size={30} style={{ width: '100%' }}>
					<Row align="middle" gutter={48} justify="center">
						{props.fileInputs.map((fileInput, index) => (
							<Col key={`fl_inpt_${index}`}>
								<Space
									align="center"
									direction="vertical"
									space={10}
								>
									<AtomFileInput
										{...fileInput}
										defaultValue={fileInput.defaultValue}
										ref={fileInput.ref}
									/>

									{fileInput.label && (
										<Typography.Text>
											<span className="f5 ">
												{fileInput.label}
											</span>
										</Typography.Text>
									)}
								</Space>
							</Col>
						))}
					</Row>

					{props.description && (
						<Space align="center" className="ph4">
							<Typography.Text type="secondary">
								<span style={{ textAlign: 'center' }}>
									{props.description}
								</span>
							</Typography.Text>
						</Space>
					)}
				</Space>
			</Col>
		</Row>
	);
};

export default MoleculeFileInputGroup;
