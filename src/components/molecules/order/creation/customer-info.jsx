import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
import ReactMoment from 'react-moment';
import { Col, Divider, message, Row, Typography } from 'antd';

import MoleculeOrderInfoGroup from '../../info-group-order';
import CustomerService from '../../../../services/customer';

const MoleculeOrderCreationCustomerInfo = (props) => {
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
			<Typography.Text>
				<span className="gray fw5 mb2">Info Pelanggan</span>
			</Typography.Text>

			<Divider className="mv2" />

			<Row gutter={[12, 12]}>
				<Col span={12}>
					<MoleculeOrderInfoGroup
						title="ID Pelanggan"
						content={customer?.id}
					/>
				</Col>

				<Col span={12}>
					<MoleculeOrderInfoGroup
						title="Name Pelanggan"
						content={
							customer
								? `${customer.first_name} ${customer.last_name}`
								: '-'
						}
					/>
				</Col>

				<Col span={12}>
					<MoleculeOrderInfoGroup
						title="Nomor Handpone"
						content={customer?.phone_number}
					/>
				</Col>

				<Col span={12}>
					<MoleculeOrderInfoGroup
						title="Email"
						content={customer?.email}
					/>
				</Col>

				<Col span={12}>
					<MoleculeOrderInfoGroup
						title="Tanggal Lahir"
						content={
							customer ? (
								<ReactMoment format="DD-MM-YY">
									{customer.birth_date}
								</ReactMoment>
							) : (
								'-'
							)
						}
					/>
				</Col>
			</Row>
		</>
	);
};

MoleculeOrderCreationCustomerInfo.propTypes = {
	customerId: PropTypes.string,
};

export default MoleculeOrderCreationCustomerInfo;
