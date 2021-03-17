/* eslint-disable react/display-name */
import PropTypes from 'prop-types';
import React, { forwardRef, useImperativeHandle, useState } from 'react';
import {
	Col,
	Form,
	Input,
	InputNumber,
	message,
	Modal,
	Popconfirm,
	Row,
	Space,
	Table,
} from 'antd';
import { CheckOutlined, CloseOutlined } from '@ant-design/icons';

import AtomCard from '../../atoms/card';
import AtomNumberFormat from '../../atoms/number-format';
import AtomPrimaryButton from '../../atoms/button/primary-button';
import MoleculeSelectInputGroup from '../../molecules/input-group/select-input';
import AtomSecondaryButton from '../../atoms/button/secondary-button';

const EditableCell = ({
	editing,
	dataIndex,
	title,
	children,
	...restProps
}) => {
	return (
		<td {...restProps}>
			{editing ? (
				<Form.Item
					name={dataIndex}
					style={{
						margin: 0,
					}}
					rules={[
						{
							required: true,
							message: `Please Input ${title}!`,
						},
					]}
				>
					<Space size={5}>
						<InputNumber /> <span>%</span>
					</Space>
				</Form.Item>
			) : (
				children
			)}
		</td>
	);
};

const OrganismProductDatatable = forwardRef((props, ref) => {
	const columns = [
		{
			title: 'Cabang',
			dataIndex: 'branches',
			render: (branches) => branches.join(', '),
		},
		{
			title: 'SKUID',
			dataIndex: 'id',
		},
		{
			title: 'Nama Produk',
			dataIndex: `name['id']`,
			render: (_, record) => record.name.id,
		},
		{
			title: 'Stock Tersedia',
			dataIndex: 'stock',
		},
		{
			title: 'Harga Norminal',
			dataIndex: 'price',
			render: (price) => <AtomNumberFormat prefix="Rp. " value={price} />,
		},
		{
			title: 'Stock Terjual',
			dataIndex: 'unit_sold',
		},
		{
			title: 'Harga Setelah Diskon',
			dataIndex: 'discounted_price',
			render: (_, record) => (
				<AtomNumberFormat
					prefix="Rp. "
					value={
						record.price - record.price * (record.discount / 100)
					}
				/>
			),
		},
		{
			title: 'Diskon',
			dataIndex: 'discount',
			editable: true,
			render: (discount) => (discount ? `${discount} %` : null),
		},
	];

	if (!props.isReadOnly) {
		columns.push({
			align: 'center',
			title: 'Aksi',
			dataIndex: 'action',
			render: (_, record) => {
				const editable = isEditing(record);
				return editable ? (
					<Space>
						<CheckOutlined
							className="green f4 fw8"
							onClick={() => save(record.id)}
						/>

						<Popconfirm title="Sure to cancel?" onConfirm={cancel}>
							<CloseOutlined className="red f4 fw8" />
						</Popconfirm>
					</Space>
				) : (
					<AtomPrimaryButton
						disabled={editingKey !== ''}
						onClick={() => edit(record)}
					>
						Atur Diskon
					</AtomPrimaryButton>
				);
			},
		});
	}

	const [data, setData] = useState(props.defaultData || []);
	const [editingKey, setEditingKey] = useState('');
	const [form] = Form.useForm();
	const [isPickProductVisible, setIsPickProductVisible] = useState(false);
	const [keyword, setKeyword] = useState('');
	const [filters, setFilters] = useState({
		branch: '',
		productCategory: '',
	});

	const addProduct = (values) => {
		console.log(values);
		setData([
			...data,
			{ branches: values.branches, ...JSON.parse(values.product) },
		]);
		console.log([
			...data,
			{ branches: values.branches, ...JSON.parse(values.product) },
		]);
	};

	const applyFilter = (values) => {
		const filter = {};

		if (values.branch) filter.branch = values.branch;
		if (values.productCategory) filter.branch = values.product_category;
		setFilters(filter);
	};

	const cancel = () => setEditingKey('');

	const deleteAllProduct = () => setData([]);

	const edit = (record) => {
		form.setFieldsValue({
			name: '',
			age: '',
			address: '',
			...record,
		});
		setEditingKey(record.id);
	};

	const getDatatableData = () => {
		let filteredData = data;

		if (keyword !== '')
			filteredData = filteredData.filter((column) =>
				column.name.includes(keyword)
			);

		if (filters.branch || filters.branch !== '')
			filteredData = filteredData.filter((column) =>
				column.branches
					.map((branch) => branch.id)
					.includes(filters.branch)
			);

		if (filters.productCategory || filters.productCategory !== '')
			filteredData = filteredData.filter((column) =>
				column.productCategory.id.includes(filters.productCategory)
			);

		return filteredData;
	};

	const isEditing = (record) => record.id === editingKey;

	const save = async (id) => {
		try {
			const row = await form.validateFields();
			const newData = [...data];
			const index = newData.findIndex((item) => id === item.id);

			if (index > -1) {
				const item = newData[index];
				newData.splice(index, 1, { ...item, ...row });
				setData(newData);
				setEditingKey('');
			} else {
				newData.push(row);
				setData(newData);
				setEditingKey('');
			}
		} catch (errInfo) {
			console.error('Validate Failed:', errInfo);
		}
	};

	const mergeColumn = columns.map((col) => {
		if (!col.editable) return col;

		return {
			...col,
			onCell: (record) => ({
				record,
				dataIndex: col.dataIndex,
				title: col.title,
				editing: isEditing(record),
			}),
		};
	});

	useImperativeHandle(ref, () => ({
		data,
	}));

	return (
		<AtomCard title="Daftar Produk">
			<Row gutter={[0, 12]}>
				<Col span={24}>
					<Col span={8}>
						<Input.Search
							placeholder="Cari Nama Produk"
							onSearch={(value) => setKeyword(value)}
							size="large"
						/>
					</Col>
				</Col>

				{!props.isReadOnly && (
					<Col span={24}>
						<Row align="middle" gutter={48} justify="space-between">
							<Col span={14}>
								<Form
									className="w-100 mt4"
									name="product"
									onFinish={applyFilter}
									onFinishFailed={(error) => {
										message.error(`Failed: ${error}`);
										console.error(error);
									}}
								>
									<Row align="middle" gutter={12}>
										<Col span={9}>
											<MoleculeSelectInputGroup
												label="Cabang"
												name="branch"
												placeholder="Cabang"
												required
												data={{
													url: 'branches',
												}}
											/>
										</Col>

										<Col span={9}>
											<MoleculeSelectInputGroup
												label="Kategori Produk"
												name="product_category"
												placeholder="Kategori Produk"
												required
												data={{
													url: 'product_categories',
													mock: [
														{
															value: 'Udang',
															label: 'Udang',
														},
													],
												}}
											/>
										</Col>

										<Col span={6}>
											<AtomPrimaryButton
												htmlType="submit"
												size="large"
											>
												Terapkan
											</AtomPrimaryButton>
										</Col>
									</Row>
								</Form>
							</Col>

							<Col className="mt4">
								<Space>
									<AtomSecondaryButton
										onClick={() => deleteAllProduct()}
										size="large"
									>
										Hapus Semua
									</AtomSecondaryButton>

									<AtomPrimaryButton
										onClick={() =>
											setIsPickProductVisible(true)
										}
										size="large"
									>
										Pilih Produk
									</AtomPrimaryButton>

									<Modal
										footer={null}
										title="Pilih Produk"
										visible={isPickProductVisible}
										width={500}
										onCancel={() =>
											setIsPickProductVisible(false)
										}
									>
										<Form
											name="add-product"
											onFinish={addProduct}
											onFinishFailed={(error) => {
												message.error(
													`Failed: ${error}`
												);
												console.error(error);
											}}
										>
											<Row
												align="middle"
												justify="end"
												gutter={12}
											>
												<Col span={24}>
													<MoleculeSelectInputGroup
														label="Nama Produk"
														name="product"
														placeholder="Nama Produk"
														required
														data={{
															url: 'products',
															generateCustomOption: (
																item
															) => ({
																value: `${JSON.stringify(
																	item
																)}`,
																label: `${item.sku_id} ${item.name.id}`,
															}),
														}}
													/>
												</Col>

												<Col span={24}>
													<MoleculeSelectInputGroup
														label="Cabang"
														name="branches"
														placeholder="Cabang"
														mode="multiple"
														required
														data={{
															url: 'branches',
														}}
													/>
												</Col>

												<Col>
													<AtomPrimaryButton
														htmlType="submit"
														size="large"
													>
														Pilih Produk
													</AtomPrimaryButton>
												</Col>
											</Row>
										</Form>
									</Modal>
								</Space>
							</Col>
						</Row>
					</Col>
				)}
			</Row>

			<Form name="table-form" form={form} component={false}>
				<Table
					components={{
						body: {
							cell: EditableCell,
						},
					}}
					bordered
					dataSource={getDatatableData()}
					columns={mergeColumn}
					pagination={{
						onChange: cancel,
					}}
					rowKey="id"
					scroll={{ x: 1360 }}
					style={{ width: '100%' }}
				/>
			</Form>
		</AtomCard>
	);
});

OrganismProductDatatable.propTypes = {
	defaultData: PropTypes.array,
	isReadOnly: PropTypes.bool,
};

export default OrganismProductDatatable;
