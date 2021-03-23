/* eslint-disable no-mixed-spaces-and-tabs */
import PropTypes from 'prop-types';
import React from 'react';
import { Col, Collapse, Row } from 'antd';

import AtomImage from '../../atoms/image';
import MoleculeInfoGroup from '../info-group';

const MoleculeProductVariants = (props) => {
	return (
		<Collapse bordered={false} className="bg-white">
			{props.variants
				? props.variants.map((varian, index) => (
						<Collapse.Panel
							header={varian.name.id}
							key={`attrbts_${index}`}
						>
							<Row gutter={[24, 24]}>
								<Col span={12}>
									<MoleculeInfoGroup
										title="SKU ID"
										content={varian.sku_id}
									/>
								</Col>

								<Col span={12}>
									<MoleculeInfoGroup
										title="Kode UPC"
										content={varian.upc_code}
									/>
								</Col>

								<Col span={12}>
									<MoleculeInfoGroup
										title="Foto Produk"
										content={
											<AtomImage
												src={varian.image}
												size={100}
											/>
										}
									/>
								</Col>

								<Col span={12}>
									<MoleculeInfoGroup
										title="Supplier"
										content={varian.supplier}
									/>
								</Col>

								<Col span={12}>
									<MoleculeInfoGroup
										title="Ukuran Produk"
										content={
											<span>
												P: {varian.long_cm || '-'} x L:{' '}
												{varian.wide_cm || '-'} x T:{' '}
												{varian.height_cm || '-'}
											</span>
										}
									/>
								</Col>

								<Col span={12}>
									<MoleculeInfoGroup
										title="Berat Produk"
										content={`${
											varian.weight_gr || '-'
										} gr`}
									/>
								</Col>
							</Row>
						</Collapse.Panel>
				  ))
				: null}
		</Collapse>
	);
};

MoleculeProductVariants.propTypes = {
	variants: PropTypes.arrayOf(
		PropTypes.shape({
			height_cm: PropTypes.string,
			image: PropTypes.string,
			long_cm: PropTypes.string,
			sku_id: PropTypes.string,
			weight_gr: PropTypes.string,
			wide_cm: PropTypes.string,
			supplier: PropTypes.string,
			upc_code: PropTypes.string,
		})
	),
};

export default MoleculeProductVariants;
