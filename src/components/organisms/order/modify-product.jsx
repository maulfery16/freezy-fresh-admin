/* eslint-disable no-mixed-spaces-and-tabs */
/* eslint-disable react/display-name */
import React, { forwardRef, useImperativeHandle, useState } from 'react';
import PropTypes from 'prop-types';
import {
	Checkbox,
	Col,
	Divider,
	InputNumber,
	Row,
	Space,
	Typography,
} from 'antd';
import { MinusOutlined, PlusOutlined } from '@ant-design/icons';

import AtomImage from '../../atoms/image';
import AtomNumberFormat from '../../atoms/number-format';

const OrganismOrderComplaintModifyProduct = forwardRef((props, ref) => {
	const [products, setProducts] = useState(
		props.products && props.products.length > 0
			? props.products.map((product) => {
					if (!product.quantity) {
						product.quantity = 1;
						return product;
					}

					return product;
			  })
			: []
	);

	const setProductQuantity = (value, index) => {
		let newProducrts = [...products];

		newProducrts[index].quantity = value;
		setProducts(newProducrts);
	};

	useImperativeHandle(ref, () => ({
		products,
	}));

	return (
		<Checkbox.Group className="ph2 w-100">
			{products &&
				products.map((product, index) => {
					return (
						<Row
							align="middle"
							gutter={[0, 12]}
							key={`ordr-cmpltn-key_${index}`}
							justify="space-between"
						>
							<Col span={14}>
								<Row align="middle">
									<Col span={2}>
										<Checkbox />
									</Col>

									<Col span={22}>
										<Space align="center">
											<AtomImage
												src={product.image}
												size={50}
											/>

											<Space
												className="w-100"
												direction="vertical"
												size={0}
											>
												<Typography.Text strong>
													{product.sku_id || ''}{' '}
													{product.name.id}
												</Typography.Text>

												<Typography.Text type="secondary">
													<AtomNumberFormat
														prefix="Rp. "
														value={product.price}
													/>
												</Typography.Text>
											</Space>
										</Space>
									</Col>
								</Row>
							</Col>

							<Col span={10}>
								<Space size="large">
									<Space>
										<MinusOutlined />
										<InputNumber
											min={1}
											onChange={(value) =>
												setProductQuantity(value, index)
											}
											parser={(value) =>
												value.replaceAll('.', '')
											}
											formatter={(value) =>
												value
													.toString()
													.replace(/\D/g, '')
											}
											style={{ width: 55 }}
										/>
										<PlusOutlined />
									</Space>

									<Typography.Text type="secondary">
										<AtomNumberFormat
											prefix="Rp. "
											value={
												product.price * product.quantity
											}
										/>
									</Typography.Text>
								</Space>
							</Col>
						</Row>
					);
				})}

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
									return (
										current +
										product.price * product.quantity
									);
								}, 0)}
							/>
						</span>
					</Typography.Text>
				</Col>
			</Row>
		</Checkbox.Group>
	);
});

OrganismOrderComplaintModifyProduct.propTypes = {
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

export default OrganismOrderComplaintModifyProduct;
