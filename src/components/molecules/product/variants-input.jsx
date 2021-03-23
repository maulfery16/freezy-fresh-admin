import PropTypes from 'prop-types';
import React from 'react';
import { Col, Collapse, message, Row, Space, Typography } from 'antd';

import AtomFileInput from '../../atoms/input/file-input';
import MoleculeTextInputGroup from '../input-group/text-input';

import MasterService from '../../../services/master';

const MoleculeProductVariantsInput = (props) => {
	const masterService = new MasterService();

	const setVariantImage = async (file, index) => {
		try {
			if (file && file.uid !== '-1') {
				const data = new FormData();
				data.append('file', file);
				data.append('type', 'image');
				const url = await masterService.uploadImage(data);

				setVariantValue(url, index, 'image');
			}
		} catch (error) {
			message.error(error.message);
		}
	};

	const setVariantValue = (value, index, key) => {
		try {
			const currentVariants = [...props.variants];
			currentVariants[index][key] = value;

			props.setVariants(currentVariants);
		} catch (error) {
			console.error(error);
		}
	};

	return (
		<Collapse bordered={false} className="bg-white">
			{props.variants.map((varian, index) => (
				<Collapse.Panel
					header={varian.name.id.replace('|', ' ')}
					key={index}
				>
					<Row gutter={[24, 24]}>
						<Col span={12}>
							<MoleculeTextInputGroup
								label="SKU ID"
								placeholder="SKU ID"
								value={varian.sku_id}
								onChange={(e) =>
									setVariantValue(
										e.target.value,
										index,
										'sku_id'
									)
								}
							/>
						</Col>

						<Col span={12}>
							<MoleculeTextInputGroup
								label="Kode UPC"
								placeholder="Kode UPC"
								value={varian.upc_code}
								onChange={(e) =>
									setVariantValue(
										e.target.value,
										index,
										'upc_code'
									)
								}
							/>
						</Col>

						<Col span={12}>
							<Space direction="vertical">
								<Typography.Text>
									<span className="gray fw5 mb2">
										Foto Produk
									</span>
								</Typography.Text>

								<AtomFileInput
									defaultValue={varian.image}
									onChange={(file) =>
										setVariantImage(file, index)
									}
								/>
							</Space>
						</Col>

						<Col span={12}>
							<MoleculeTextInputGroup
								label="Supplier"
								placeholder="Supplier"
								value={varian.supplier}
								onChange={(e) =>
									setVariantValue(
										e.target.value,
										index,
										'supplier'
									)
								}
							/>
						</Col>

						<Col span={12}>
							<Row gutter={12}>
								<Col span={5}>
									<MoleculeTextInputGroup
										label="P"
										placeholder="P"
										suffix="cm"
										value={varian.long_cm}
										onChange={(e) =>
											setVariantValue(
												e.target.value,
												index,
												'long_cm'
											)
										}
									/>
								</Col>

								<Col span={5}>
									<MoleculeTextInputGroup
										label="L"
										placeholder="L"
										suffix="cm"
										value={varian.wide_cm}
										onChange={(e) =>
											setVariantValue(
												e.target.value,
												index,
												'wide_cm'
											)
										}
									/>
								</Col>

								<Col span={5}>
									<MoleculeTextInputGroup
										label="T"
										placeholder="T"
										suffix="cm"
										value={varian.height_cm}
										onChange={(e) =>
											setVariantValue(
												e.target.value,
												index,
												'height_cm'
											)
										}
									/>
								</Col>
							</Row>
						</Col>

						<Col span={12}>
							<MoleculeTextInputGroup
								label="Berat"
								placeholder="Berat"
								suffix="gr"
								value={varian.weight_gr}
								onChange={(e) =>
									setVariantValue(
										e.target.value,
										index,
										'weight_gr'
									)
								}
							/>
						</Col>
					</Row>
				</Collapse.Panel>
			))}
		</Collapse>
	);
};

MoleculeProductVariantsInput.propTypes = {
	setVariants: PropTypes.func,
	variants: PropTypes.arrayOf(
		PropTypes.shape({
			height_cm: PropTypes.string,
			image: PropTypes.string,
			long_cm: PropTypes.string,
			sku_id: PropTypes.string,
			supplier: PropTypes.string,
			upc_code: PropTypes.string,
			weight_gr: PropTypes.string,
			wide_cm: PropTypes.string,
		})
	),
};

export default MoleculeProductVariantsInput;
