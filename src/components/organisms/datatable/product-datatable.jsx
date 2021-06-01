/* eslint-disable react/display-name */
import PropTypes from 'prop-types';
import React, {
	forwardRef,
	useRef,
	useImperativeHandle,
	useState,
	useEffect,
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
import { CheckOutlined, CloseOutlined, DeleteFilled, EditFilled } from '@ant-design/icons';

import AtomBranchSelection from '../../atoms/selection/branch';
import AtomCard from '../../atoms/card';
import AtomNumberFormat from '../../atoms/number-format';
import AtomPrimaryButton from '../../atoms/button/primary-button';
import AtomSecondaryButton from '../../atoms/button/secondary-button';
import MoleculeSelectInputGroup from '../../molecules/input-group/select-input';

import ProductService from '../../../services/product';

const EditableCell = ({
	editing,
	dataIndex,
	title,
	children,
	isEditDiscount,
	record,
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
						<InputNumber defaultValue={record ? record[dataIndex] ? record[dataIndex] : '' : ''} /> {isEditDiscount && (<span>%</span>)}
					</Space>
				</Form.Item>
			) : (
				children
			)}
		</td>
	);
};

const OrganismProductDatatable = forwardRef((props, ref) => {
	const productService = new ProductService();

	const columns = [
		{
			title: 'Cabang',
			dataIndex: 'branch',
			sorter: true,
			render: (_, record) => record.branch.id,
		},
		{
			title: 'SKUID',
			dataIndex: 'sku_id',
			sorter: true,
		},
		{
			title: 'Nama Produk',
			dataIndex: 'name',
			sorter: true,
			render: (_, record) => record.name.id,
			csvRender: (item) => item.name.id,
		},
		{
			title: 'Stock Tersedia',
			dataIndex: 'available_stock',
			sorter: true,
		},
		{
			title: 'Harga Normal',
			dataIndex: 'price',
			sorter: true,
			render: (price) => (
				<AtomNumberFormat prefix="Rp. " value={parseInt(price)} />
			),
		},
		{
			title: 'Stock Terjual',
			dataIndex: 'total_sold',
			sorter: true,
		},
		{
			title: 'Harga Setelah Diskon',
			dataIndex: 'discounted_price',
			sorter: true,
			render: (_, record) => (
				<AtomNumberFormat
					prefix="Rp. "
					value={
						record.price -
						record.price * (record.discount_percentage / 100)
					}
				/>
			),
		},
		{
			title: 'Diskon',
			dataIndex: 'discount_percentage',
			editable: true,
			sorter: true,
			render: (discount_percentage) =>
				discount_percentage ? `${discount_percentage} %` : null,
		},
	];

	if (props.maxStockPerUser) {
		columns.push({
			editable: true,
			title: 'Batas Stok per User',
			dataIndex: 'max_stock_per_user',
			sorter: true,	
		})
	}

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
				) : props.canModify ? (
					<Space>
						<EditFilled
							className="yellow f4 fw8"
							onClick={() => edit(record)}
						/>

						<Popconfirm title="Are you sure you want to delete this product?" onConfirm={() => deleteProduct(record.product_id)}>
							<DeleteFilled className="red f4 fw8" />
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
	const [productDetailID, setProductDetailID] = useState(null);
	const [branchesURL, setBranchesURL] = useState('branches');
	const [filters, setFilters] = useState({
		branch: '',
		productCategory: '',
	});
	const branchOptionsRef = useRef();

	// const addProduct = (values) => {
	// 		getDetailProduct(values.product, values.branches.join(';'));
	// setData([
	// 	...data,
	// 	{ branches: values.branches, ...JSON.parse(values.product) },
	// ]);
	// console.log([
	// 	...data,
	// 	{ branches: values.branches, ...JSON.parse(values.product) },
	// ]);
	// };

	const applyFilter = (values) => {
		const filterTmp = {};

		if (values.branches) filterTmp.branch = values.branches;
		else filterTmp.branch = '';
		if (values.product_category) filterTmp.productCategory = values.product_category;
		else filterTmp.productCategory = '';
		setFilters(filterTmp);
	};

	const cancel = () => setEditingKey('');

	const deleteAllProduct = () => setData([]);

	const deleteProduct = (id) => {
		let filteredData = data;
		filteredData = filteredData.filter((column) => column.product_id !== id);
		setData(filteredData);
	}

	const edit = (record) => {
		form.setFieldsValue({
			discount_percentage: '',
			max_stock_per_user: '',
			...record
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
					product_detail_id: productDetailID,
				}
			);
			if (response.data && response.data.length > 0) return response.data[0];
			else return null;

		} catch (error) {
			message.error(error.message);
			console.error(error);
		} finally {
			setIsGettingData(false);
		}
	};

	const getDatatableData = () => {
		let filteredData = data;

		if (keyword !== '')
			filteredData = filteredData.filter((column) =>
				column.name.id.toLowerCase().includes(keyword.toLowerCase())
			);

		if (filters.branch || filters.branch !== '')
			filteredData = filteredData.filter((column) =>
			column.branch.id.includes(filters.branch)
			);

		if (filters.productCategory || filters.productCategory !== '')
			filteredData = filteredData.filter((column) =>
				column.base_category.id.includes(filters.productCategory)
			);

		return filteredData;
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
			if (props.maxStockPerUser) response.max_stock_per_user = 0;
			productForm.resetFields();
			if (response) {
				setData([...data, response]);
				setIsPickProductVisible(false);
			}
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
				isEditDiscount: col.dataIndex === 'discount_percentage',
			}),
		};
	});

	useEffect(() => {
		if (productID && productDetailID) {
			branchOptionsRef.current.refetchData();
		}
	}, [productID, productDetailID, branchesURL]);

	useImperativeHandle(ref, () => ({
		data,
	}));

	useEffect(() => {
		if (props.defaultData.length > 0) {
			setData(props.defaultData)
		}
	}, [props.defaultData])

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
											<AtomBranchSelection
												generateCustomOption={(item) => ({
													value: item.name.id,
													label: item.name.id
												})}
											/>
										</Col>

										<Col span={9}>
											<MoleculeSelectInputGroup
												label="Kategori Produk"
												name="product_category"
												placeholder="Kategori Produk"
												allowClear
												data={{
													url: 'base-categories',
													generateCustomOption: (
														item
													) => ({
														value: item.name.id,
														label: item.name.id,
													}),
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
														data={{
															onChange: (value) => {
																const productID = value.split('|')[0];
																setProductID(
																	productID
																)
																const product_detail_id = value.split('|')[1];
																setProductDetailID(product_detail_id)
																setBranchesURL(`products/${productID}/branches?product_detail_id=${product_detail_id}`)
															},
															url: 'products/not/discounted',
															generateCustomOption:
																(item) => ({
																	value: `${item.product_id}|${item.product_detail_id}`,
																	label: `${
																		item.sku_id
																	} ${
																		item
																			.product_name
																			.id
																	} ${
																		item.variants
																			? item
																					.variants[0]
																					.variant
																					.id
																			: ''
																	}`,
																}),
														}}
													/>
												</Col>

												<Col span={24}>
													<AtomBranchSelection
														mode="multiple"
														required
														optionsRef={
															branchOptionsRef
														}
														url={branchesURL}
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
					rowKey="product_id"
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
