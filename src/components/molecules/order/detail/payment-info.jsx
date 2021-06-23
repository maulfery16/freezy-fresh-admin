import { Col, Row } from 'antd';
import PropTypes from 'prop-types';
import React from 'react';

import MoleculeOrderInfoGroup from '../../info-group-order';
import AtomNumberFormat from '../../../atoms/number-format';

const MoleculeOrderDetailPaymentInfo = (props) => {
	return (
		<Row gutter={[12, 12]}>
			<Col span={12}>
				<MoleculeOrderInfoGroup
					title="Total Pesanan"
					content={
						<AtomNumberFormat
							prefix="Rp. "
							value={props?.order?.total_order ?? 0}
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
							value={props?.order?.total_discount ?? 0}
						/>
					}
				/>
			</Col>
			<Col span={12}>
				<MoleculeOrderInfoGroup
					title="Total Potongan Voucher"
					content={
						<AtomNumberFormat
							prefix="Rp. "
							value={props?.order?.total_voucher ?? 0}
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
							value={props?.order?.shipping_fee ?? 0}
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
							value={props?.order?.shipping_arrangement_fee ?? 0}
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
							value={props?.order?.parking_fee ?? 0}
						/>
					}
				/>
			</Col>
			<Col span={12}>
				<MoleculeOrderInfoGroup
					title="Total Pembayaran"
					content={
						<AtomNumberFormat
							prefix="Rp. "
							value={props?.order?.sub_total ?? 0}
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
							value={props?.order?.cashback_point ?? 0}
						/>
					}
				/>
			</Col>
		</Row>
	);
};

MoleculeOrderDetailPaymentInfo.propType = {
	order: PropTypes.any,
};

export default MoleculeOrderDetailPaymentInfo;
