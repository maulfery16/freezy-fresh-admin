import { Col, Row } from 'antd';
import PropTypes from 'prop-types';
import React from 'react';

import MoleculeOrderInfoGroup from '../../info-group-order';

const MoleculeOrderDetailBranchInfo = (props) => {
	return (
		<Row gutter={[12, 12]}>
			<Col span={12}>
				<MoleculeOrderInfoGroup
					title="Name Depan"
					content={props.order?.branch_code}
				/>
			</Col>
			<Col span={12}>
				<MoleculeOrderInfoGroup
					title="Cabang Freezy"
					content={props.order?.branch?.id}
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
		</Row>
	);
};

MoleculeOrderDetailBranchInfo.propType = {
	order: PropTypes.any,
};

export default MoleculeOrderDetailBranchInfo;
