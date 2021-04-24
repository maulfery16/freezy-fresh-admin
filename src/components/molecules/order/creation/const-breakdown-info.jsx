import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
import ReactMoment from 'react-moment';
import { Col, Divider, message, Row, Typography } from 'antd';

import MoleculeOrderInfoGroup from '../../info-group-order';
import CustomerService from '../../../../services/customer';
import AtomNumberFormat from '../../../atoms/number-format';

const MoleculeOrderCostBreakdownInfo = (props) => {
	const customerService = new CustomerService();
	const [customer, setCustomer] = useState(null);

	const getSelectedCustomerDetail = async () => {
		try {
			const response = await customerService.getCustomerById(
				props.customerId,
				{}
			);

			setCustomer(response.data);
		} catch (error) {
			message.error(error.message);
		}
	};

	useEffect(() => {
		(async () => {
			if (props.customerId) getSelectedCustomerDetail();
		})();
	}, [props]);

	return (
		<>
			<Row gutter={[12, 12]}>
				<Col span={12}>
					<MoleculeOrderInfoGroup
						title="Total Pesanan"
						content={
							<AtomNumberFormat
								prefix="Rp. "
								value={this.props.orderCost}
							/>
						}
					/>
				</Col>

				<Col span={12}>
					<MoleculeOrderInfoGroup
						title="Total Diskon"
						content={
							<AtomNumberFormat
								prefix="Rp. "
								value={this.props.discount}
							/>
						}
					/>
				</Col>

				<Col span={12}>
					<MoleculeOrderInfoGroup
						title="Total Potongan Vouvher"
						content={
							<AtomNumberFormat
								prefix="Rp. "
								value={this.props.voucherDiscount}
							/>
						}
					/>
				</Col>

				<Col span={12}>
					<MoleculeOrderInfoGroup
						title="Biaya Pengiriman"
						content={
							<AtomNumberFormat
								prefix="Rp. "
								value={this.props.shippingCost}
							/>
						}
					/>
				</Col>

				<Col span={12}>
					<MoleculeOrderInfoGroup
						title="Biaya Pengaturan Pengiriman"
						content={
							<AtomNumberFormat
								prefix="Rp. "
								value={this.props.shippingArrangementCost}
							/>
						}
					/>
				</Col>

				<Col span={12}>
					<MoleculeOrderInfoGroup
						title="Biaya Parkir"
						content={
							<AtomNumberFormat
								prefix="Rp. "
								value={this.props.parkingFee}
							/>
						}
					/>
				</Col>

				<Col span={12}>
					<MoleculeOrderInfoGroup
						title="Total Bayar"
						content={
							<AtomNumberFormat
								prefix="Rp. "
								value={this.props.total}
							/>
						}
					/>
				</Col>

				<Col span={12}>
					<MoleculeOrderInfoGroup
						title="Cashback"
						content={
							<AtomNumberFormat
								prefix="Rp. "
								value={this.props.cashback}
							/>
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
	shippingArrangementCost: PropTypes.number,
	shippingCost: PropTypes.number,
	total: PropTypes.number,
	voucherDiscount: PropTypes.number,
};

export default MoleculeOrderCostBreakdownInfo;
