/* eslint-disable react/display-name */
import PropTypes from 'prop-types';
import React, {
	forwardRef,
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
import MoleculeNumberInputGroup from '../../molecules/input-group/number-input';

import ProductService from '../../../services/product';

const EditableCell = ({
	editing,
	dataIndex,
	title,
	children,
	isRequired,
	...restProps
}) => {
	let formRules = [];
	if (isRequired) {
		formRules.push({
			required: true,
			message: `Please Input ${title}!`,
		})
	}
	return (
		<td {...restProps}>
			{editing ? (
				<Form.Item
					name={dataIndex}
					style={{
						margin: 0,
					}}
					rules={formRules}
				>
						<InputNumber /> 
				</Form.Item>
			) : (
				children
			)}
		</td>
	);
};

const OrganismProductBundlingDatatable = forwardRef((props, ref) => {
	const productService = new ProductService();

	const columns = [
    {
			title: 'No',
			dataIndex: 'id',
			render: (_, _record, index) => ((pageNumber - 1) * 10 + (index + 1))
		},
		{
			title: 'SKUID',
			dataIndex: 'sku_id',
			sorter: true,
		},
		{
			title: 'Nama Produk (ID)',
			dataIndex: 'name',
			sorter: true,
			render: (_, record) => record.name.id,
			csvRender: (item) => item.name.id,
		},
		{
			title: 'Varian (ID)',
			dataIndex: 'variant_name',
			sorter: true,
      render: (_, record) => record.variant_name.id,
			csvRender: (item) => item.id,
		},
		{
			title: 'Harga Satuan',
			dataIndex: 'price',
			sorter: true,
			render: (price) => (
				<AtomNumberFormat prefix="Rp. " value={parseInt(price)} />
			),
		},
		{
			title: 'Jumlah',
			dataIndex: 'total_product',
			sorter: true,
      editable: true
		},
    {
			align: 'center',
			title: 'Aksi',
			dataIndex: 'action',
			render: (_, record) => {
				const editable = isEditing(record);
				return editable ? (
					<Space>
						<CheckOutlined
							className="green f4 fw8"
							onClick={() => save(record.data_idx)}
						/>

						<Popconfirm title="Sure to cancel?" onConfirm={cancel}>
							<CloseOutlined className="red f4 fw8" />
						</Popconfirm>
					</Space>
				) : (
					<Space className={`${editingKey !== '' ? 'dn' : 'inline-flex'}`}>
						<EditFilled
							className="yellow f4 fw8"
							onClick={() => edit(record)}
						/>

						<Popconfirm title="Are you sure you want to delete this product?" onConfirm={() => deleteProduct(record.data_idx)}>
							<DeleteFilled className="red f4 fw8" />
						</Popconfirm>
					</Space>
				);
			},
		}
	];

	const [data, setData] = useState(props.defaultData || []);
  const [pageNumber, setPageNumber] = useState(1);
	const [editingKey, setEditingKey] = useState('');
	const [form] = Form.useForm();
	const [isGettingData, setIsGettingData] = useState(false);
	const [isPickProductVisible, setIsPickProductVisible] = useState(false);
	const [keyword, setKeyword] = useState('');
	const [productForm] = Form.useForm();
	const [productID, setProductID] = useState(null);
	const [productDetailID, setProductDetailID] = useState(null);
	const [filters, setFilters] = useState({
		branch: '',
		productCategory: '',
	});

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
		filteredData = filteredData.filter((column) => column.data_idx !== id);
		setData(filteredData);
	}

	const edit = (record) => {
		form.setFieldsValue({
			discount_percentage: '',
			max_stock_per_user: '',
			max_stock_per_branch: '',
			...record
		});

		setEditingKey(record.data_idx);
	};

	const getDetailProduct = async () => {
		setIsGettingData(true);

		try {
			const response = await productService.getProductDetailByIdAndBranch(
				productID,
				{
					product_detail_id: productDetailID,
				}
			);
			if (response.data && response.data.length > 0) return response.data;
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

	const isEditing = (record) => record.data_idx === editingKey;

	const countPriceWithDiscount = (row, index, item) => {
		let discountChanged = false;
		let fixedPriceChanged = false;

		if (data[index].price_after_discount !== row.price_after_discount) {
			fixedPriceChanged = true;
		}

		if (data[index].discount_percentage !== row.discount_percentage) {
			discountChanged = true;
		}

		if (row.price === '') {
			message.warning(
				'Tidak dapat mengatur diskon tanpa memasukkan harga terlebih dahulu'
			);
			row.discount_percentage = 0;
			return row;
		}

		if (fixedPriceChanged) {
			if (parseInt(row.price_after_discount) > 0) {
				row.discount_percentage = parseFloat(((parseInt(item.price) - parseInt(row.price_after_discount)) / parseInt(item.price)) * 100).toFixed(2);
			} else {
				row.discount_percentage = 0;
			}
			return row;
		}

		if (discountChanged) {
			// row.fixed_price = (row.discount_percentage / 100) * row.price;
			return row;
		}

		return row;
	};

	const save = async (id) => {
		try {
			let row = await form.validateFields();
			const newData = [...data];
			const index = newData.findIndex((item) => id === item.data_idx);

			if (index > -1) {
				const item = newData[index];
				row = countPriceWithDiscount(row, index, item);
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
			let response = await getDetailProduct();
			response = response.map((x, idx) =>({ ...x, data_idx: `${Math.floor(Math.random() * 1000)}_${idx}`, total_product: values?.total_product ?? 0}));
			productForm.resetFields();
			if (response) {
				setData([...data, ...response]);
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
				isRequired: col.dataIndex === "total_product"
			}),
		};
	});

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
                          <MoleculeNumberInputGroup
                            name="total_product"
                            label="Jumlah"
                            required
                            type="number"
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
            onChange: function(current) {
							setPageNumber(current);
							cancel();
						}
					}}
					rowKey={(record) => `product_id_${record.data_idx}`}
					scroll={{ x: 1360 }}
					style={{ width: '100%' }}
				/>
			</Form>
		</AtomCard>
	);
});

OrganismProductBundlingDatatable.propTypes = {
	defaultData: PropTypes.array,
	isReadOnly: PropTypes.bool,
};

export default OrganismProductBundlingDatatable;
