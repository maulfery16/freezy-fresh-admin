import PropTypes from 'prop-types';
import React from 'react';
import { Col, Row } from 'antd';

import MoleculeOrderInfoGroup from '../../info-group-order';

const MoleculeOrderDeliveryInfo = (props) => {
	return (
		<Row gutter={[12, 12]}>
			<Col span={12}>
				<MoleculeOrderInfoGroup
					title="Nama Penerima"
					content={props.delivery?.receiver_name}
				/>
			</Col>
			<Col span={12}>
				<MoleculeOrderInfoGroup
					title="Nomor Handpone Penerima"
					content={props.delivery?.receiver_phone_number}
				/>
			</Col>
			<Col span={12}>
				<MoleculeOrderInfoGroup
					title="Nama Alamat"
					content={props.delivery?.address}
				/>
			</Col>
			<Col span={12}>
				<MoleculeOrderInfoGroup
					title="Nama jalan"
					content={props.delivery?.additional_information}
				/>
			</Col>
			<Col span={12}>
				<MoleculeOrderInfoGroup
					title="Provinsi"
					content={props.delivery?.province_name}
				/>
			</Col>
			<Col span={12}>
				<MoleculeOrderInfoGroup
					title="Kota"
					content={props.delivery?.city_name}
				/>
			</Col>
			<Col span={12}>
				<MoleculeOrderInfoGroup
					title="Kecamatan"
					content={props.delivery?.district_name}
				/>
			</Col>
			<Col span={12}>
				<MoleculeOrderInfoGroup
					title="Kelurahan"
					content={props.delivery?.subdistrict_name}
				/>
			</Col>
			<Col span={12}>
				<MoleculeOrderInfoGroup
					title="Kode POS"
					content={props.delivery?.postal_code}
				/>
			</Col>
			<Col span={12}>
				<MoleculeOrderInfoGroup
					title="Latitude"
					content={props.delivery?.latitude}
				/>
			</Col>
			<Col span={12}>
				<MoleculeOrderInfoGroup
					title="Longitude"
					content={props.delivery?.longitude}
				/>
			</Col>
			<Col span={12}>
				<MoleculeOrderInfoGroup
					title="Biaya Parkir"
					content={props.delivery?.park_fee ? 'Ya' : 'Tidak'}
				/>
			</Col>
		</Row>
	);
};

MoleculeOrderDeliveryInfo.propType = {
	delivery: PropTypes.shape({
		additional_information_driver: PropTypes.string,
		additional_information: PropTypes.string,
		address: PropTypes.string,
		city_name: PropTypes.string,
		district_name: PropTypes.string,
		latitude: PropTypes.string,
		longitude: PropTypes.string,
		parking_fee: PropTypes.bool,
		postal_code: PropTypes.string,
		province_name: PropTypes.string,
		receiver_name: PropTypes.string,
		receiver_phone_number: PropTypes.string,
		subdistrict_name: PropTypes.string,
		title: PropTypes.string,
	}),
};

export default MoleculeOrderDeliveryInfo;
