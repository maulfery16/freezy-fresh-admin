import PropTypes from 'prop-types';
import React from 'react';
import { Col, Row } from 'antd';

import AtomImage from '../atoms/image';
import MoleculeInfoGroup from './info-group';

const MoleculeProductVariants = (props) => {
	return (
		<Row gutter={[24, 24]}>
			<Col span={12}>
				<MoleculeInfoGroup title="SKU ID" content={props.sku_id} />
			</Col>

			<Col span={12}>
				<MoleculeInfoGroup title="Kode UPC" content={props.upc_code} />
			</Col>

			<Col span={12}>
				<MoleculeInfoGroup
					title="Foto Produk"
					content={<AtomImage src={props.image} size={30} />}
				/>
			</Col>

			<Col span={12}>
				<MoleculeInfoGroup title="Supplier" content={props.supplier} />
			</Col>

			<Col span={12}>
				<MoleculeInfoGroup
					title="Ukuran Produk"
					content={
						<span>
							P: {props.wide_cm || '-'} x L:{' '}
							{props.long_cm || '-'} x T: {props.height_cm || '-'}
						</span>
					}
				/>
			</Col>

			<Col span={12}>
				<MoleculeInfoGroup
					title="Berat Produk"
					content={`${props.weight_gr || '-'} gr`}
				/>
			</Col>
		</Row>
	);
};

MoleculeProductVariants.propTypes = {
	height_cm: PropTypes.string,
	image: PropTypes.string,
	long_cm: PropTypes.string,
	sku_id: PropTypes.string,
	weight_gr: PropTypes.string,
	wide_cm: PropTypes.string,
	supplier: PropTypes.string,
	upc_code: PropTypes.string,
};

export default MoleculeProductVariants;
