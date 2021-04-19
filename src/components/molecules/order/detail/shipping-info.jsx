import PropTypes from 'prop-types';
import React from 'react';
import { Col, Row, Space, Typography } from 'antd';

import AtomNumberFormat from '../../../atoms/number-format';
import MoleculeOrderInfoGroup from '../../info-group-order';
import AtomImage from '../../../atoms/image';

const MoleculeOrderDetailShippingInfo = (props) => {
	return (
		<Row gutter={[12, 12]}>
			<Col span={12}>
				<MoleculeOrderInfoGroup
					title={
						<Space align="center" size={4}>
							History Tracking{' '}
							<Typography.Text>
								<span className="denim pointer">
									(Lihat Detail)
								</span>
							</Typography.Text>
						</Space>
					}
					content={props.shipping?.tracking_history}
				/>
			</Col>
			<Col span={12}>
				<MoleculeOrderInfoGroup
					title="Jenis Pengiriman"
					content={props.shipping?.shipping_type}
				/>
			</Col>
			<Col span={12}>
				<MoleculeOrderInfoGroup
					title="Perusahaan Logistik"
					content={props.shipping?.shipping_by}
				/>
			</Col>
			<Col span={12}>
				<MoleculeOrderInfoGroup
					title="No. Resi Pengiriman"
					content={props.shipping?.shipping_code}
				/>
			</Col>
			<Col span={12}>
				<MoleculeOrderInfoGroup
					title="Tipe Pengiriman"
					content={props.shipping?.delivery_type}
				/>
			</Col>
			<Col span={12}>
				<MoleculeOrderInfoGroup
					title="Estimasi Biaya Pengiriman"
					content={
						<AtomNumberFormat
							value={props.shipping?.shipping_estimation_fee}
						/>
					}
				/>
			</Col>
			<Col span={24}>
				<MoleculeOrderInfoGroup
					title="Estimasi Berat Paket (gram)"
					content={props.shipping?.shipping_estimation_weight_gr}
				/>
			</Col>
			<Col span={12}>
				<MoleculeOrderInfoGroup
					title="Produk Diambil dari Store"
					content={
						<AtomImage
							src={props.shipping?.product_take_from_store_image}
						/>
					}
				/>
			</Col>
			<Col span={12}>
				<MoleculeOrderInfoGroup
					title="Produk sampai ditujuan"
					content={
						<AtomImage
							src={props.shipping?.product_delivered_image}
						/>
					}
				/>
			</Col>
		</Row>
	);
};

MoleculeOrderDetailShippingInfo.propType = {
	shipping: PropTypes.shape({
		product_delivered_image: PropTypes.string,
		product_take_from_store_image: PropTypes.string,
		shipping_by: PropTypes.string,
		shipping_code: PropTypes.string,
		shipping_estimation_fee: PropTypes.number,
		shipping_estimation_weight_gr: PropTypes.number,
		shipping_type: PropTypes.string,
		tracking_history: PropTypes.any,
	}),
};

export default MoleculeOrderDetailShippingInfo;
