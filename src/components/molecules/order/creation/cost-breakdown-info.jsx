/* eslint-disable no-unused-vars */
import PropTypes from 'prop-types';
import React from 'react';
import { Col, Row } from 'antd';

import AtomNumberFormat from '../../../atoms/number-format';
import MoleculeOrderInfoGroup from '../../info-group-order';

const MoleculeOrderCostBreakdownInfo = (props) => {
	const totalDiscount = props.products?.reduce((current, product) => {
		return (
			current +
			product.total *
				(parseInt(product.price, 10) -
					parseInt(product.fixed_price, 10))
		);
	}, 0);

	const totalOrder = props.products?.reduce((current, product) => {
		return current + product.total * parseInt(product.price, 10);
	}, 0);

	return (
		<>
			<Row gutter={[12, 12]}>
				<Col span={12}>
					<MoleculeOrderInfoGroup
						title="Total Pesanan"
						content={
							totalOrder && (
								<AtomNumberFormat
									prefix="Rp. "
									value={totalOrder}
								/>
							)
						}
					/>
				</Col>

				<Col span={12}>
					<MoleculeOrderInfoGroup
						title="Total Diskon"
						content={
							totalDiscount && (
								<AtomNumberFormat
									prefix="Rp. "
									value={totalDiscount}
								/>
							)
						}
					/>
				</Col>

				<Col span={12}>
					<MoleculeOrderInfoGroup
						title="Total Potongan Vouvher"
						content={
							props.voucherDiscount && (
								<AtomNumberFormat
									prefix="Rp. "
									value={props.voucherDiscount}
								/>
							)
						}
					/>
				</Col>

				<Col span={12}>
					<MoleculeOrderInfoGroup
						title="Biaya Pengiriman"
						content={
							props.shippingCost && (
								<AtomNumberFormat
									prefix="Rp. "
									value={props.shippingCost}
								/>
							)
						}
					/>
				</Col>

				<Col span={12}>
					<MoleculeOrderInfoGroup
						title="Biaya Pengaturan Pengiriman"
						content={
							props.shippingArrangementCost && (
								<AtomNumberFormat
									prefix="Rp. "
									value={props.shippingArrangementCost}
								/>
							)
						}
					/>
				</Col>

				<Col span={12}>
					<MoleculeOrderInfoGroup
						title="Biaya Parkir"
						content={
							props.parkingFee && (
								<AtomNumberFormat
									prefix="Rp. "
									value={props.parkingFee}
								/>
							)
						}
					/>
				</Col>

				<Col span={12}>
					<MoleculeOrderInfoGroup
						title="Total Bayar"
						content={
							<AtomNumberFormat
								prefix="Rp. "
								value={
									totalOrder -
									totalDiscount -
									props.voucherDiscount +
									props.shippingCost +
									props.shippingArrangementCost
								}
							/>
						}
					/>
				</Col>

				<Col span={12}>
					<MoleculeOrderInfoGroup
						title="Cashback"
						content={
							props.cashback && (
								<AtomNumberFormat
									prefix="Rp. "
									value={props.cashback}
								/>
							)
						}
					/>
				</Col>
			</Row>
		</>
	);
};

MoleculeOrderCostBreakdownInfo.propTypes = {
	cashback: PropTypes.number,
	discount: PropTypes.number,
	orderCost: PropTypes.number,
	parkingFee: PropTypes.number,
	products: PropTypes.any,
	shippingArrangementCost: PropTypes.number,
	shippingCost: PropTypes.number,
	total: PropTypes.number,
	voucherDiscount: PropTypes.number,
};

export default MoleculeOrderCostBreakdownInfo;
