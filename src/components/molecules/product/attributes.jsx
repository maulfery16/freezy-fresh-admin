/* eslint-disable no-mixed-spaces-and-tabs */
import React from 'react';
import PropTypes from 'prop-types';
import { Col, Collapse, Row, Space } from 'antd';

import MoleculeInfoGroup from '../info-group';

const MoleculeProductAttributes = (props) => {
	return (
		<Collapse bordered={false} className="bg-white">
			{props.attributes
				? props.attributes.map((attribute, index) => (
						<Collapse.Panel
							header={attribute.name.id}
							key={`vrnts_${index}`}
						>
							<Row gutter={[24, 24]}>
								<Col span={12}>
									<MoleculeInfoGroup
										title=""
										content={`${attribute.name.id} | ${attribute.name.en}`}
									/>
								</Col>

								<Col span={12}>
									<MoleculeInfoGroup
										title=""
										content={
											<Space
												direction="vertical"
												size={0}
											>
												{attribute.values.map(
													(item, itemIdx) => (
														<span
															key={`vrtns_${index}_itms_${itemIdx}`}
														>
															{`${item.id} | ${item.en}`}
														</span>
													)
												)}
											</Space>
										}
									/>
								</Col>
							</Row>
						</Collapse.Panel>
				  ))
				: null}
		</Collapse>
	);
};

MoleculeProductAttributes.propTypes = {
	attributes: PropTypes.arrayOf(
		PropTypes.shape({
			name: PropTypes.shape({
				id: PropTypes.string,
				en: PropTypes.string,
			}),
			values: PropTypes.arrayOf(
				PropTypes.shape({
					id: PropTypes.string,
					en: PropTypes.string,
				})
			),
		})
	),
};

export default MoleculeProductAttributes;
