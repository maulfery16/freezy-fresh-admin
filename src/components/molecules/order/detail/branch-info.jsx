import { Col, Row } from 'antd';
import PropTypes from 'prop-types';
import React from 'react';

import MoleculeOrderInfoGroup from '../../info-group-order';

const MoleculeOrderDetailBranchInfo = (props) => {
	const { code, address, name } = props.branch;

	return (
		<Row gutter={[12, 12]}>
			<Col span={12}>
				<MoleculeOrderInfoGroup title="Name Depan" content={code} />
			</Col>
			<Col span={12}>
				<MoleculeOrderInfoGroup
					title="Cabang Freezy"
					content={name?.id}
				/>
			</Col>
			<Col span={12}>
				<MoleculeOrderInfoGroup
					title="Provinsi"
					content={address?.province_name}
				/>
			</Col>
			<Col span={12}>
				<MoleculeOrderInfoGroup
					title="Kota"
					content={address?.city_name}
				/>
			</Col>
			<Col span={12}>
				<MoleculeOrderInfoGroup
					title="Kecamatan"
					content={address?.district_name}
				/>
			</Col>
			<Col span={12}>
				<MoleculeOrderInfoGroup
					title="Kelurahan"
					content={address?.subdistrict_name}
				/>
			</Col>
			<Col span={12}>
				<MoleculeOrderInfoGroup
					title="Kode POS"
					content={address?.postal_code}
				/>
			</Col>
			<Col span={12}>
				<MoleculeOrderInfoGroup
					title="Nama Jalan"
					content={address?.address}
				/>
			</Col>
			<Col span={12}>
				<MoleculeOrderInfoGroup
					title="Latitude"
					content={address?.latitude}
				/>
			</Col>
			<Col span={12}>
				<MoleculeOrderInfoGroup
					title="Longitude"
					content={address?.longitude}
				/>
			</Col>
		</Row>
	);
};

MoleculeOrderDetailBranchInfo.propType = {
	branch: PropTypes.shape({
		code: PropTypes.string,
		address: PropTypes.shape({
			additional_information: PropTypes.string,
			address: PropTypes.string,
			city_name: PropTypes.string,
			district_name: PropTypes.string,
			latitude: PropTypes.string,
			longitude: PropTypes.string,
			postal_code: PropTypes.string,
			province_name: PropTypes.string,
			subdistrict_name: PropTypes.string,
		}),
		name: PropTypes.shape({
			en: PropTypes.string,
			id: PropTypes.string,
		}),
	}),
};

export default MoleculeOrderDetailBranchInfo;
