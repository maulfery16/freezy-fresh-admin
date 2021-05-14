/* eslint-disable no-unused-vars */
import React from 'react';
import PropTypes from 'prop-types';
import { Col, Divider, Row, Space, Typography } from 'antd';

import AtomImage from '../../atoms/image';
import AtomNumberFormat from '../../atoms/number-format';

const OrganismOrderComplaintProduct = (props) => {
	const { products } = props;

	return (
		<div className="ph2">
			<Row gutter={[0, 12]} style={{ marginTop: '20px' }}>
				{products.map((product, key) => {
					return (
						<Col key={`ordr-cmpltn-key_${key}`} span={24}>
							<Row align="top" gutter={24}>
								<Col>
									<AtomImage src={product.image} size={50} />
								</Col>

								<Col span={18}>
									<Space
										className="w-100"
										direction="vertical"
										size={0}
									>
										<Typography.Text strong>
											{product.sku_id || ''}{' '}
											{product.name.id}
										</Typography.Text>

										<Row
											className="fw6"
											justify="space-between"
										>
											<Col>
												<Typography.Text type="secondary">
													{`${product.quantity}x`}{' '}
													<AtomNumberFormat
														prefix="Rp. "
														value={product.price}
													/>
												</Typography.Text>
											</Col>

											<Col>
												<Typography.Text type="secondary">
													<AtomNumberFormat
														prefix="Rp. "
														value={
															product.sub_total_price
														}
													/>
												</Typography.Text>
											</Col>
										</Row>
									</Space>
								</Col>
							</Row>
						</Col>
					);
				})}
			</Row>

			<Divider />

			<Row align="middle" justify="space-between">
				<Col>
					<Typography.Text type="secondary">
						<span className="fw7">Total Dana Bermasalah</span>
					</Typography.Text>
				</Col>

				<Col>
					<Typography.Text type="secondary">
						<span className="red fw6">
							<AtomNumberFormat
								prefix="Rp. "
								value={products?.reduce((current, product) => {
									return current + product.sub_total_price;
								}, 0)}
							/>
						</span>
					</Typography.Text>
				</Col>
			</Row>
		</div>
	);
};

OrganismOrderComplaintProduct.propTypes = {
	isReadOnly: PropTypes.bool,
	products: PropTypes.arrayOf(
		PropTypes.shape({
			order_complaint_product_id: PropTypes.string,
			order_product_id: PropTypes.string,
			price: PropTypes.number,
			quantity: PropTypes.number,
			sub_total_price: PropTypes.number,
			name: {
				en: PropTypes.string,
				id: PropTypes.string,
			},
		})
	),
};

export default OrganismOrderComplaintProduct;
