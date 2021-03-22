import { Col, Row, Typography } from 'antd';

import PropTypes from 'prop-types';
import React from 'react';

import AtomSecondaryButton from '../atoms/button/secondary-button';
import AtomImage from '../atoms/image';

const MoleculeImportExportWrapper = (props) => {
	return (
		<Row style={{ height: '300px' }}>
			<Col span={24}>
				<Row justify="center">
					<AtomImage src={props.image} />
				</Row>
			</Col>

			<Col className="mt4" span={24}>
				<Row justify="center">
					<AtomSecondaryButton size="large">
						{props.buttonLabel}
					</AtomSecondaryButton>
				</Row>
			</Col>

			<Col className="mt4" span={24}>
				<Row className="tc" justify="center">
					<Col span={22}>
						<Typography.Text strong>{props.info}</Typography.Text>
					</Col>
				</Row>
			</Col>

			<Col className="mt2" span={24}>
				<Row className="tc" justify="center">
					<Col span={22}>
						<Typography.Text type="secondary">
							Template hanya bisa diisi dengan Ms. Excel 2007 ke
							atas atau LibreOffice
						</Typography.Text>
					</Col>
				</Row>
			</Col>
		</Row>
	);
};

MoleculeImportExportWrapper.propTypes = {
	buttonLabel: PropTypes.string,
	image: PropTypes.any,
	info: PropTypes.string,
	onClick: PropTypes.func,
};

export default MoleculeImportExportWrapper;
