import React from 'react';
import { Col, Row, Typography } from 'antd';

import AtomFileInput from '../../atoms/input/file-input';

const MoleculeFileInputGroup = (props) => {
	return (
		<>
			<Typography.Text>
				<span className="gray fw5 mb2">{props.label}</span>
			</Typography.Text>

			<div
				className="mb4 w-90"
				style={{ marginLeft: '20px', width: '93%' }}
			>
				<Row
					align="middle"
					className="ba b--black-20 br3 pv4"
					gutter={48}
					justify="center"
				>
					{props.fileInputs.map((fileInput, index) => (
						<Col key={`fl_inpt_${index}`}>
							<AtomFileInput
								{...fileInput}
								defaultValue={fileInput.defaultValue}
								ref={fileInput.ref}
							/>
						</Col>
					))}
				</Row>
			</div>
		</>
	);
};

export default MoleculeFileInputGroup;
