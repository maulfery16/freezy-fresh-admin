/* eslint-disable no-unused-vars */
/* eslint-disable react/display-name */
import PropTypes from 'prop-types';
import React, { forwardRef, useImperativeHandle, useState } from 'react';
import {
	Col,
	Form,
	Input,
	InputNumber,
	message,
	Popconfirm,
	Row,
	Space,
	Table,
} from 'antd';
import { CheckOutlined, CloseOutlined } from '@ant-design/icons';

import AtomCard from '../../atoms/card';
import AtomNumberFormat from '../../atoms/number-format';
import AtomPrimaryButton from '../../atoms/button/primary-button';
import AtomSecondaryButton from '../../atoms/button/secondary-button';
import MoleculeSelectInputGroup from '../../molecules/input-group/select-input';

import ProductService from '../../../services/product';
import AtomImage from '../../atoms/image';

const EditableCell = ({
	children,
	dataIndex,
	editing,
	record,
	...restProps
}) => {
	const renderEditableForm = (dataIndex, defaultValue) => {
		if (['name'].includes(dataIndex))
			return <Input defaultValue={defaultValue} />;

		return <InputNumber defaultValue={defaultValue} />;
	};

	return (
		<td {...restProps}>
			{editing ? (
				<Form.Item
					name={dataIndex}
					style={{
						margin: 0,
					}}
				>
					{renderEditableForm(dataIndex, record[dataIndex])}
				</Form.Item>
			) : (
				children
			)}
		</td>
	);
};

const OrganismProductOrderDatatable = forwardRef((props, ref) => {
	const productService = new ProductService();

	const columns = [
		{
			title: 'SKUID',
			dataIndex: 'sku_id',
			sorter: true,
		},
		{
			title: 'UPC Code',
			dataIndex: 'upc_code',
			sorter: true,
		},
		{
			title: 'Stock Tersedia',
			dataIndex: 'available_stock',
			sorter: true,
		},
		{
			title: `Foto Produk "Cantik"`,
			dataIndex: 'beauty_image',
			render: (image) => <AtomImage src={image} />,
		},
		{
			title: 'Nama Produk',
			dataIndex: 'name',
			editable: true,
			sorter: true,
		},
		{
			title: 'Jumlah Produk',
			dataIndex: 'product_count',
			editable: true,
			sorter: true,
		},
		{
			title: 'Kategori Dasar',
			dataIndex: 'base_category',
			sorter: true,
			render: (data) => data?.name?.id || '-',
		},
		{
			title: 'Batas Umur',
			dataIndex: 'age_limit',
			sorter: true,
		},
		{
			title: 'Batas Umur',
			dataIndex: 'is_freezy_pick',
			sorter: true,
			render: (pick) => (pick ? 'Ya' : 'Tidak'),
		},
		{
			title: 'Zona',
			dataIndex: 'zone',
			sorter: true,
			render: (data) => data?.name?.id || '-',
		},
		{
			title: 'Brand',
			dataIndex: 'brand',
			sorter: true,
			render: (data) => data?.name?.id || '-',
		},
		{
			title: 'Product Owner',
			dataIndex: 'product_owner',
			sorter: true,
		},
		{
			title: 'Harga Normal',
			dataIndex: 'price',
			render: (price) => `Rp. ${price}`,
			sorter: true,
		},
		{
			title: 'Harga Setelah Diskon',
			dataIndex: 'fixed_price',
			render: (price) =>
				typeof price === 'string' ? (
					`Rp. ${price}`
				) : (
					<AtomNumberFormat prefix="Rp. " value={price} />
				),
			sorter: true,
		},
		{
			title: 'Diskon',
			dataIndex: 'discount_percentage',
			render: (discount) => (discount ? `${discount} %` : null),
			sorter: true,
		},
		{
			title: 'Promo',
			dataIndex: 'promotion',
			sorter: true,
		},
		{
			title: 'Catatan',
			dataIndex: 'note',
			sorter: true,
			editable: true,
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
							onClick={() => save(record.product_id)}
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
	const [isGettingData, setIsGettingData] = useState(false);
	const [isPickProductVisible, setIsPickProductVisible] = useState(false);
	const [keyword, setKeyword] = useState('');
	const [productForm] = Form.useForm();
	const [productID, setProductID] = useState(null);

	const cancel = () => setEditingKey('');

	const deleteAllProduct = () => setData([]);

	const edit = (record) => {
		form.setFieldsValue({
			name: '',
			age: '',
			address: '',
			...record,
		});

		setEditingKey(record.product_id);
	};

	const getDetailProduct = async (branch_id) => {
		setIsGettingData(true);

		try {
			const response = await productService.getProductDetailByIdAndBranch(
				productID,
				{
					branch_id,
					priduct_detail_id: productID,
				}
			);

			return response.data[0];
		} catch (error) {
			message.error(error.message);
			console.error(error);
		} finally {
			setIsGettingData(false);
		}
	};

	const isEditing = (record) => record.product_id === editingKey;

	const save = async (id) => {
		try {
			const row = await form.validateFields();
			const newData = [...data];
			const index = newData.findIndex((item) => id === item.product_id);

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

	const setProductToTable = async (values) => {
		try {
			const response = await getDetailProduct(values.branches.join(', '));
			productForm.resetFields();
			setData([...data, response]);
			setIsPickProductVisible(false);
		} catch (error) {
			message.error(error.message);
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
		<AtomCard title="Info Produk">
			<Row align="middle" gutter={[0, 12]} justify="space-between">
				<Col span={12}>
					<Row align="middle" gutter={12}>
						<Col span={12}>
							<Input.Search
								placeholder="Cari Nama Produk"
								onSearch={(value) => setKeyword(value)}
								size="large"
							/>
						</Col>

						<Col span={9}>
							<MoleculeSelectInputGroup
								label="Kategori Dasar"
								name="category"
								placeholder="Kategori Dasar"
								required
								data={{
									url: 'base-categories',
									generateCustomOption: (item) => ({
										value: item.id,
										label: item.name.id,
									}),
									options: [
										{
											value: 1,
											label: 'Marukana... Udon?',
										},
										{
											value: 2,
											label: 'Marukana... Udon?',
										},
										{
											value: 3,
											label: 'Marukana... Udon?',
										},
									],
								}}
							/>
						</Col>
					</Row>
				</Col>

				{!props.isReadOnly && (
					<Col span={12}>
						<Row justify="end">
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
							</Space>
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
					dataSource={data}
					columns={mergeColumn}
					pagination={{
						onChange: cancel,
					}}
					rowKey="product_id"
					scroll={{ x: 2820 }}
					style={{ width: '100%' }}
				/>
			</Form>
		</AtomCard>
	);
});

OrganismProductOrderDatatable.propTypes = {
	defaultData: PropTypes.array,
	isReadOnly: PropTypes.bool,
};

export default OrganismProductOrderDatatable;
