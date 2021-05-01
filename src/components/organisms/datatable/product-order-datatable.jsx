/* eslint-disable no-unused-vars */
/* eslint-disable react/display-name */
import PropTypes from 'prop-types';
import React, {
	forwardRef,
	useEffect,
	useImperativeHandle,
	useState,
} from 'react';
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
import AtomSecondaryButton from '../../atoms/button/secondary-button';
import MoleculeSelectInputGroup from '../../molecules/input-group/select-input';

import ProductService from '../../../services/product';
import AtomImage from '../../atoms/image';
import MoleculeNumberInputGroup from '../../molecules/input-group/number-input';
import MoleculeTextInputGroup from '../../molecules/input-group/text-input';

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
	const [data, setData] = useState(props.defaultData || []);
	const [editingKey, setEditingKey] = useState('');
	const [form] = Form.useForm();
	const [isGettingData, setIsGettingData] = useState(false);
	const [isPickProductVisible, setIsPickProductVisible] = useState(false);
	const [keyword, setKeyword] = useState('');
	const [productForm] = Form.useForm();
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
			render: (name) => name?.id,
		},
		{
			title: 'Jumlah Produk',
			dataIndex: 'total',
			editable: true,
			sorter: true,
		},
		{
			title: 'Kategori Dasar',
			dataIndex: 'base_category',
			sorter: true,
			render: (data) => data?.id || '-',
		},
		{
			title: 'Batas Umur',
			dataIndex: 'age_limit',
			sorter: true,
		},
		{
			title: 'Freezy Pick?',
			dataIndex: 'is_freezy_pick',
			sorter: true,
			render: (pick) => (pick ? 'Ya' : 'Tidak'),
		},
		{
			title: 'Zona',
			dataIndex: 'zone',
			sorter: true,
			render: (data) => data?.id || '-',
		},
		{
			title: 'Brand',
			dataIndex: 'brand',
			sorter: true,
			render: (data) => data?.id || '-',
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
			render: (discount) => (discount ? `${discount} %` : '-'),
			sorter: true,
		},
		{
			title: 'Promo',
			dataIndex: 'promotion_name',
			sorter: true,
		},
		{
			title: 'Catatan',
			dataIndex: 'note',
			sorter: true,
			editable: true,
		},
		{
			title: 'Nama Keluarga',
			dataIndex: 'family_name',
			sorter: true,
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

	const getDetailProduct = async (id) => {
		setIsGettingData(true);

		try {
			const response = await productService.getProductVariantByProductDetaiId(
				id
			);

			return response.data;
		} catch (error) {
			message.error(error.message);
			console.error(error);
		} finally {
			setIsGettingData(false);
		}
	};

	const openProductPicker = () => {
		if (!props.branch) {
			message.warning('Pilih cabang terlebih dahulu');
			return;
		}
		if (!props.customer) {
			message.warning('Pilih customer terlebih dahulu');
			return;
		}
		setIsPickProductVisible(true);
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
			const response = await getDetailProduct(values.product);
			productForm.resetFields();

			setData([...data, { ...response, ...values }]);
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

	useEffect(() => {
		if (props.onDataChange) props.onDataChange(data);
	}, [data]);

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
								}}
							/>
						</Col>
					</Row>
				</Col>

				{!props.isReadOnly && (
					<>
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
										onClick={openProductPicker}
										size="large"
									>
										Pilih Produk
									</AtomPrimaryButton>
								</Space>
							</Row>
						</Col>

						<Modal
							footer={null}
							title="Pilih Produk"
							visible={isPickProductVisible}
							width={500}
							onCancel={() => setIsPickProductVisible(false)}
						>
							<Form
								form={productForm}
								name="add-product"
								onFinish={setProductToTable}
								onFinishFailed={(error) => {
									message.error(
										`Failed: ${error.errorFields.for}`
									);
									console.error(error);
								}}
							>
								<Row align="middle" justify="end" gutter={12}>
									<Col span={17}>
										<MoleculeSelectInputGroup
											label="Nama Produk"
											name="product"
											placeholder="Nama Produk"
											data={{
												url: `client/products?branch_id=${props.branch}`,
												generateCustomOption: (
													item
												) => ({
													value: item?.product_id,
													label: `${item?.sku_id} ${
														item?.name?.id
													} ${
														item?.variant?.id || ''
													}`,
												}),
											}}
										/>
									</Col>

									<Col span={7}>
										<MoleculeNumberInputGroup
											label="Jumlah"
											name="total"
											placeholder="1"
											required
										/>
									</Col>

									<Col span={24}>
										<MoleculeTextInputGroup
											label="Catatan"
											name="note"
											placeholder="Masukan Catatan"
										/>
									</Col>

									<Col span={24}>
										<MoleculeSelectInputGroup
											label="Nama Keluarga"
											name="family_name"
											placeholder="Nama Keluarga"
											data={{
												url: `admin/customers/${props.customer}/friends?search=type:2`,
												generateCustomOption: (
													item
												) => ({
													value: `${item.first_name} ${item.last_name}`,
													label: `${item.first_name} ${item.last_name}`,
												}),
											}}
										/>
									</Col>

									<Col>
										<AtomPrimaryButton
											htmlType="submit"
											size="large"
											loading={isGettingData}
										>
											Pilih Produk
										</AtomPrimaryButton>
									</Col>
								</Row>
							</Form>
						</Modal>
					</>
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
	branch: PropTypes.string,
	defaultData: PropTypes.array,
	isReadOnly: PropTypes.bool,
	onDataChange: PropTypes.func,
};

export default OrganismProductOrderDatatable;
