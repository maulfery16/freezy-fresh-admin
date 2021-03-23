import React from 'react';
import PropTypes from 'prop-types';
import { Button, Col, Input, Row, Space, Typography } from 'antd';
import { DeleteOutlined, MinusOutlined, PlusOutlined } from '@ant-design/icons';

function MoleculeProductAttributesInput(props) {
	return (
		<Row gutter={[24, 24]}>
			<Col span={12}>
				<Space className="w-100" direction="vertical">
					<Typography.Text>
						<span className="gray fw5 mb2">Nama</span>
					</Typography.Text>

					<Space>
						<Input
							onChange={(e) =>
								props.setAttributesValue({
									attrKey: 'name',
									index: props.attrIdx,
									lang: 'id',
									value: e.target.value,
								})
							}
							value={props.attribute.name.id}
						/>
						<Input
							onChange={(e) =>
								props.setAttributesValue({
									attrKey: 'name',
									index: props.attrIdx,
									lang: 'en',
									value: e.target.value,
								})
							}
							value={props.attribute.name.en}
						/>
					</Space>
				</Space>
			</Col>

			<Col span={12}>
				<Space className="w-100" direction="vertical">
					<Typography.Text>
						<span className="gray fw5 mb2">Nilai</span>
					</Typography.Text>

					{props.attribute.values.map((value, valueIdx) => (
						<Space
							key={`attr_inpt_vl_idx-${valueIdx}`}
							size="small"
						>
							<Input
								onChange={(e) =>
									props.setAttributesValue({
										attrKey: 'values',
										index: props.attrIdx,
										itemIdx: valueIdx,
										lang: 'id',
										value: e.target.value,
									})
								}
								value={value.id}
							/>
							<Input
								onChange={(e) =>
									props.setAttributesValue({
										attrKey: 'values',
										index: props.attrIdx,
										itemIdx: valueIdx,
										lang: 'en',
										value: e.target.value,
									})
								}
								value={value.en}
							/>

							<PlusOutlined
								className="green pointer"
								onClick={() =>
									props.modifyAttributeValue(
										props.attrIdx,
										'ADD'
									)
								}
							/>

							{valueIdx !== 0 && (
								<MinusOutlined
									className="red pointer"
									onClick={() =>
										props.modifyAttributeValue(
											props.attrIdx,
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
					onClick={() => props.deleteAttribute(props.attrIdx)}
					size="large"
				>
					Hapus Attribut
				</Button>
			</Col>
		</Row>
	);
}

MoleculeProductAttributesInput.propTypes = {
	attrIdx: PropTypes.number,
	deleteAttribute: PropTypes.func,
	modifyAttributeValue: PropTypes.func,
	setAttributeValue: PropTypes.func,
	attribute: PropTypes.shape({
		name: PropTypes.shape({
			id: PropTypes.string,
			en: PropTypes.string,
		}),
		values: PropTypes.arrayOf(
			PropTypes.shape({ id: PropTypes.string, en: PropTypes.string })
		),
	}),
};

export default MoleculeProductAttributesInput;
