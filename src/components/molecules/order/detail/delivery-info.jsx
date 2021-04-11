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
					content={props.order?.receiver_name}
				/>
			</Col>
			<Col span={12}>
				<MoleculeOrderInfoGroup
					title="Nomor Handpone Penerima"
					content={props.order?.receiver_phone_number}
				/>
			</Col>
			<Col span={12}>
				<MoleculeOrderInfoGroup
					title="Nama Alamat"
					content={props.order?.address_name}
				/>
			</Col>
			<Col span={12}>
				<MoleculeOrderInfoGroup
					title="Nama jalan"
					content={props.order?.street_name}
				/>
			</Col>
			<Col span={12}>
				<MoleculeOrderInfoGroup
					title="Provinsi"
					content={props.order?.province?.name}
				/>
			</Col>
			<Col span={12}>
				<MoleculeOrderInfoGroup
					title="Kota"
					content={props.order?.city?.id}
				/>
			</Col>
			<Col span={12}>
				<MoleculeOrderInfoGroup
					title="Kecamatan"
					content={props.order?.district?.name}
				/>
			</Col>
			<Col span={12}>
				<MoleculeOrderInfoGroup
					title="Kelurahan"
					content={props.order?.sub_district?.id}
				/>
			</Col>
			<Col span={12}>
				<MoleculeOrderInfoGroup
					title="Kode POS"
					content={props.order?.zip_code}
				/>
			</Col>
			<Col span={12}>
				<MoleculeOrderInfoGroup
					title="Nama Jalan"
					content={props.order?.address}
				/>
			</Col>
			<Col span={12}>
				<MoleculeOrderInfoGroup
					title="Latitude"
					content={props.order?.latitude}
				/>
			</Col>
			<Col span={12}>
				<MoleculeOrderInfoGroup
					title="Longitude"
					content={props.order?.longitude}
				/>
			</Col>
			<Col span={12}>
				<MoleculeOrderInfoGroup
					title="Latitude"
					content={props.order?.notes}
				/>
			</Col>
			<Col span={12}>
				<MoleculeOrderInfoGroup
					title="Longitude"
					content={props.order?.park_fee ? 'Ya' : 'Tidak'}
				/>
			</Col>
		</Row>
	);
};

MoleculeOrderDeliveryInfo.propType = {
	order: PropTypes.any,
};

export default MoleculeOrderDeliveryInfo;
