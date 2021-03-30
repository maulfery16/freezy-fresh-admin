import React from 'react';
import PropTypes from 'prop-types';
import { Button, Col, Collapse, Input, Row, Space, Typography } from 'antd';
import { DeleteOutlined, MinusOutlined, PlusOutlined } from '@ant-design/icons';
import AtomSecondaryButton from '../../atoms/button/secondary-button';

function MoleculeProductAttributesInput(props) {
	const addAttribute = () => {
		let currentAttributes = [...props.attributes];
		currentAttributes.push({
			name: { id: 'Attribut', en: '' },
			values: [{ id: '', en: '' }],
		});

		props.setAttributes(currentAttributes);
		props.setVariants([]);
	};

	const deleteAttribute = (index) => {
		let currentAttributes = [...props.attributes];
		currentAttributes.splice(index, 1);

		props.setAttributes(currentAttributes);
		props.setVariants([]);
	};

	const modifyAttributeValue = (attrIdx, type, itemIdx) => {
		let currentAttributes = [...props.attributes];

		if (type === 'DELETE') {
			currentAttributes[attrIdx].values.splice(itemIdx, 1);
		} else {
			currentAttributes[attrIdx].values.push({
				id: '',
				en: '',
			});
		}

		props.setAttributes(currentAttributes);
	};

	const setAttributesValue = ({ itemIdx, lang, attrKey, index, value }) => {
		let currentAttributes = [...props.attributes];

		if (typeof itemIdx !== 'undefined') {
			currentAttributes[index][attrKey][itemIdx][lang] = value;
		} else {
			currentAttributes[index][attrKey][lang] = value;
		}

		props.setAttributes(currentAttributes);
	};

	return (
		<>
			<AtomSecondaryButton
				onClick={() => addAttribute()}
				className="br2 mv2"
				size="large"
			>
				Tambah Attribut
			</AtomSecondaryButton>

			<Collapse bordered={false} className="bg-white">
				{props.attributes.map((attribute, index) => (
					<Collapse.Panel header={attribute.name.id} key={index}>
						<Row gutter={[24, 24]}>
							<Col span={12}>
								<Space className="w-100" direction="vertical">
									<Typography.Text>
										<span className="gray fw5 mb2">
											Nama
										</span>
									</Typography.Text>

									<Space>
										<Input
											placeholder="ex: Warna"
											value={attribute.name.id}
											onChange={(e) =>
												setAttributesValue({
													attrKey: 'name',
													index,
													lang: 'id',
													value: e.target.value,
												})
											}
										/>
										<Input
											placeholder="ex: Color"
											value={attribute.name.en}
											onChange={(e) =>
												setAttributesValue({
													attrKey: 'name',
													index,
													lang: 'en',
													value: e.target.value,
												})
											}
										/>
									</Space>
								</Space>
							</Col>

							<Col span={12}>
								<Space className="w-100" direction="vertical">
									<Typography.Text>
										<span className="gray fw5 mb2">
											Nilai
										</span>
									</Typography.Text>

									{attribute.values.map((value, valueIdx) => (
										<Space
											key={`attr_inpt_vl_idx-${valueIdx}`}
											size="small"
										>
											<Input
												placeholder="ex: Merah"
												value={value.id}
												onChange={(e) =>
													setAttributesValue({
														attrKey: 'values',
														index,
														itemIdx: valueIdx,
														lang: 'id',
														value: e.target.value,
													})
												}
											/>
											<Input
												placeholder="ex: Red"
												value={value.en}
												onChange={(e) =>
													setAttributesValue({
														attrKey: 'values',
														index,
														itemIdx: valueIdx,
														lang: 'en',
														value: e.target.value,
													})
												}
											/>

											<PlusOutlined
												className="green pointer"
												onClick={() =>
													modifyAttributeValue(
														index,
														'ADD'
													)
												}
											/>

											{valueIdx !== 0 && (
												<MinusOutlined
													className="red pointer"
													onClick={() =>
														modifyAttributeValue(
															index,
															'DELETE',
															valueIdx
														)
													}
												/>
											)}
										</Space>
									))}
								</Space>
							</Col>

							<Col className="mt3" span={24}>
								<Button
									className="br2 bg-red white"
									icon={<DeleteOutlined />}
									onClick={() => deleteAttribute(index)}
									size="large"
								>
									Hapus Attribut
								</Button>
							</Col>
						</Row>
					</Collapse.Panel>
				))}
			</Collapse>
		</>
	);
}

MoleculeProductAttributesInput.propTypes = {
	setAttributes: PropTypes.func,
	setVariants: PropTypes.func,
	attributes: PropTypes.arrayOf(
		PropTypes.shape({
			name: PropTypes.shape({
				id: PropTypes.string,
				en: PropTypes.string,
			}),
			values: PropTypes.arrayOf(
				PropTypes.shape({ id: PropTypes.string, en: PropTypes.string })
			),
		})
	),
};

export default MoleculeProductAttributesInput;
