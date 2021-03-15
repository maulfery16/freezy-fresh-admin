import { Col, Row, Typography } from 'antd';

import PropTypes from 'prop-types';
import React from 'react';

import AtomSecondaryButton from '../atoms/button/secondary-button';

const MoleculeImportExportWrapper = (props) => {
	return (
		<Row>
			<Col span={24}>
				<Row justify="center"></Row>
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
	onClick: PropTypes.func,
	info: PropTypes.string,
};

export default MoleculeImportExportWrapper;
