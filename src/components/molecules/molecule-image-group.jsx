import { Col, Row, Space } from 'antd';
import PropTypes from 'prop-types';
import React from 'react';
import AtomImage from '../atoms/image';

const MoleculeImageGroup = (props) => {
	return (
		<Row
			className="ba b--black-20 br3 pv5"
			gutter={48}
			justify="center"
			style={{
				marginLeft: '0px',
				maxWidth: '100%',
			}}
		>
			{props.images.map((image, index) => (
				<Col key={`image_group_${index}`}>
					<Space align="center" direction="vertical">
						<AtomImage src={image.source} />

						<p style={{ maxWidth: 110, textAlign: 'center' }}>
							{image.label}
						</p>
					</Space>
				</Col>
			))}
		</Row>
	);
};

MoleculeImageGroup.propTypes = {
	images: PropTypes.arrayOf(
		PropTypes.shape({
			label: PropTypes.string,
			source: PropTypes.string,
		})
	),
};

export default MoleculeImageGroup;
