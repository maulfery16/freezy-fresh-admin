/* eslint-disable react/display-name */
import moment from 'moment';
import PropTypes from 'prop-types';
import React, {
	forwardRef,
	useEffect,
	useImperativeHandle,
	useRef,
	useState,
} from 'react';
import ReactMoment from 'react-moment';
import {
	Col,
	DatePicker,
	Form,
	Input,
	InputNumber,
	message,
	Modal,
	Popconfirm,
	Row,
	Select,
	Space,
	Table,
	Typography,
} from 'antd';
import {
	CheckOutlined,
	CloseOutlined,
	RedoOutlined,
	SyncOutlined,
} from '@ant-design/icons';

import AtomBranchSelection from '../../atoms/selection/branch';
import AtomCard from '../../atoms/card';
import AtomNumberFormat from '../../atoms/number-format';
import AtomPrimaryButton from '../../atoms/button/primary-button';
import AtomSecondaryButton from '../../atoms/button/secondary-button';

import ProductService from '../../../services/product';
import MoleculeSelectInputGroup from '../../molecules/input-group/select-input';

const OrganismProductBranchDatatable = forwardRef((props, ref) => {
	const columns = [
		{
			title: 'No',
			dataIndex: 'id',
			render: (_, _record, index) => ((pageNumber - 1) * 10 + (index + 1))
		},
		{
			title: 'Cabang',
			dataIndex: 'branches',
			render: (_, record) => record.branch?.id,
			sorter: true,
		},
		{
			title: 'Varian',
			dataIndex: 'variant',
			sorter: true,
			render: (variant) => (variant ? variant.replaceAll('|', ' ') : '-'),
		},
		{
			title: 'Tipe TOWS',
			dataIndex: 'branches',
			render: (_, record) => record.branch.tows ?? '-',
			sorter: true,
			hidden: !props.isEditing && !props.isReadOnly ? true : false,
		},
		{
			title: 'Rating',
			dataIndex: 'rating',
			sorter: true,
			hidden: !props.isEditing && !props.isReadOnly ? true : false,
		},
		{
			title: 'Jumlah Favorite',
			dataIndex: `total_favorite`,
			render: (count) => <AtomNumberFormat value={count} />,
			sorter: true,
		},
		{
			title: 'Jumlah My Catalog',
			dataIndex: 'total_my_catalog',
			render: (count) => <AtomNumberFormat value={count} />,
			sorter: true,
		},
		{
			title: 'Jumlah Terjual',
			dataIndex: 'total_sold',
			render: (count) => <AtomNumberFormat value={count} />,
			sorter: true,
		},
		{
			title: 'Freezy Pick',
			dataIndex: 'is_freezy_pick',
			editable: true,
			render: (pick) => (pick ? 'Ya' : 'Tidak'),
			sorter: true,
		},
		{
			title: 'Kelola Stock',
			dataIndex: 'is_manage_stock',
			editable: true,
			render: (manageable) => (manageable ? 'Ya' : 'Tidak'),
			sorter: true,
		},
		{
			title: 'Stok Dikelola',
			dataIndex: `managed_stock`,
			render: (count) => <AtomNumberFormat value={count ?? 0} />,
			editable: true,
			sorter: true,
		},
		{
			title: 'Stok Gudang',
			dataIndex: `warehouse_stock`,
			render: (count) => <AtomNumberFormat value={count ?? 0} />,
			sorter: true,
		},
		{
			title: 'Stok Tersedia',
			dataIndex: `available_stock`,
			render: (count) => <AtomNumberFormat value={count ?? 0} />,
			sorter: true,
		},
		{
			title: 'Date Exp Tercepat',
			dataIndex: 'shortest_expiration',
			editable: true,
			render: (date) => {
				return date ? (
					<ReactMoment format="DD/MM/YY">{date}</ReactMoment>
				) : '-'
			},
			sorter: true,
			hidden: !props.isEditing && !props.isReadOnly ? true : false,
		},
		{
			title: 'Date Exp Terlama',
			dataIndex: 'longest_expiration',
			editable: true,
			render: (date) => {
				return date ? (
					<ReactMoment format="DD/MM/YY">{date}</ReactMoment>
				) : '-'
			},
			sorter: true,
			hidden: !props.isEditing && !props.isReadOnly ? true : false,
		},
		{
			title: 'Harga Normal',
			dataIndex: 'price',
			render: (price) => <AtomNumberFormat prefix="Rp. " value={price} />,
			editable: true,
			sorter: true,
		},
		{
			title: 'Harga Setelah Diskon',
			dataIndex: 'fixed_price',
			render: (price) => parseInt(price) === 0 ? 'Tidak ada diskon' : (
				<AtomNumberFormat prefix="Rp. " value={parseInt(price)} />
			),
			editable: true,
			sorter: true,
		},
		{
			title: 'Diskon (%)',
			dataIndex: 'discount_percentage',
			editable: false,
			render: (discount) => (discount ? `${discount} %` : null),
			sorter: true,
		},
		{
			title: 'Status Binding',
			dataIndex: 'fresh_factory_product_sku_number',
			align: 'center',
			render: (synced, _, index) => (
				<SyncOutlined
					onClick={() => setBeingSyncedProductIndex(index)}
					className={`f4 fw8 pointer ${
						synced ? 'dark-green' : 'dark-red'
					}`}
				/>
			),
		},
		{
			align: 'center',
			title: 'Aksi',
			dataIndex: 'action',
			hidden: props.isReadOnly ? true : false,
			render: (_, record, index) => {
				const editable = isEditing(record);
				return editable ? (
					<Space>
						<CheckOutlined
							className="green f4 fw8"
							onClick={() => save(record.branch_sku_id)}
						/>

						<Popconfirm title="Sure to cancel?" onConfirm={cancel}>
							<CloseOutlined className="red f4 fw8" />
						</Popconfirm>
					</Space>
				) : (
					<Space>
						<AtomPrimaryButton
							disabled={editingKey !== ''}
							onClick={() => edit(record)}
						>
							Atur
						</AtomPrimaryButton>

						<AtomSecondaryButton
							onClick={() =>
								record.fresh_factory_product_sku_number
									? setBeingRemoveFFProductIndex(index)
									: setBeingSyncedProductIndex(index)
							}
						>
							<SyncOutlined
								className={`f6 fw8 ${
									record.fresh_factory_product_sku_number
										? 'dark-green'
										: 'dark-red'
								}`}
							/>
						</AtomSecondaryButton>
					</Space>
				);
			},
		},
	];

	const productService = new ProductService();
	const tenantSelectRef = useRef();

	const [pageNumber, setPageNumber] = useState(1);
	const [branch, setBranch] = useState(null);
	const [data, setData] = useState(props.defaultData);
	const [editingKey, setEditingKey] = useState('');
	const [form] = Form.useForm();
	const [bindingForm] = Form.useForm();
	const [inventroyProduct, setInventroyProduct] = useState([]);
	const [keyword, setKeyword] = useState('');
	const [selectedTenant, setSelectedTenant] = useState(null);
	const [selectedFFProduct, setSelectedFFProduct] = useState(null);
	const [T2TProduct, setT2TProduct] = useState([]);
	const [TOWSProduct, setTOWSProduct] = useState([]);
	const [beingSyncedProductIndex, setBeingSyncedProductIndex] =
		useState(null);
	const [beingRemoveFFProductIndex, setBeingRemoveFFProductIndex] =
		useState(null);

	const cancel = () => setEditingKey('');

	const connectProduct = () => {
		const newData = [...data];

		newData[beingSyncedProductIndex].fresh_factory_product_sku_number =
			selectedFFProduct;
		newData[beingSyncedProductIndex].fresh_factory_product_type =
			selectedTenant;
		setSelectedTenant(null);
		setSelectedFFProduct(null);
		setBeingSyncedProductIndex(null);
		setData(newData);
	};

	const countPriceWithDiscount = (row, index) => {
		let discountChanged = false;
		let fixedPriceChanged = false;

		if (data[index].fixed_price !== row.fixed_price) {
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
			row.discount_percentage = parseFloat(((parseInt(row.price) - parseInt(row.fixed_price)) / parseInt(row.price)) * 100).toFixed(2);
			return row;
		}

		if (discountChanged) {
			// row.fixed_price = (row.discount_percentage / 100) * row.price;
			return row;
		}

		return row;
	};

	const edit = (record) => {
		form.setFieldsValue({
			...record,
		});

		setEditingKey(record.branch_sku_id);
	};

	const getDatatableData = () => {
		let filteredData = data;

		if (keyword !== '')
			filteredData = filteredData.filter((column) =>
				[...Object.values(column)]
					.map((attr) => {
						switch (typeof attr) {
							case 'object':
								return JSON.stringify(attr);
							case 'number':
								return `${attr}`;
							default:
								return attr;
						}
					})
					.join(' ')
					.toLowerCase()
					.includes(keyword.toLowerCase())
			);

		if (branch) {
			filteredData = filteredData.filter(
				(column) => column.branch_id === branch
			);
		}

		return filteredData;
	};

	const getTenantProduct = async (tenant, setter) => {
		try {
			const response = await productService.getTenantProduct(tenant);

			setter(
				response.data.map((data) => ({
					label: data.name,
					value: data.skuNumber,
				}))
			);
		} catch (error) {
			message.error(error.message);
		}
	};

	const isEditing = (record) => record.branch_sku_id === editingKey;

	const removeSyncedProduct = () => {
		const newData = [...data];

		newData[beingRemoveFFProductIndex].fresh_factory_product_sku_number =
			null;
		setBeingRemoveFFProductIndex(null);
		setData(newData);
	};

	const save = async (id) => {
		try {
			let row = await form.validateFields();
			row.discount_percentage = row.discount_percentage ? parseFloat(row.discount_percentage) : 0
			row.fixed_price = row.fixed_price ? parseInt(row.fixed_price) : 0
			row.price = row.price ? parseInt(row.price) : 0
			row.managed_stock = row.managed_stock ? parseInt(row.managed_stock) : 0
			const newData = [...data];
			const index = newData.findIndex(
				(item) => id === item.branch_sku_id
			);

			if (index > -1) {
				const item = newData[index];
				row = countPriceWithDiscount(row, index);
				newData.splice(index, 1, { ...item, ...row });
				setData(newData);
				setEditingKey('');
			} else {
				newData.push(row);
				setData(newData);
				setEditingKey('');
			}

			props.setProductVariants(newData);
		} catch (errInfo) {
			console.error('Validate Failed:', errInfo);
		}
	};

	const setTenantProduct = () => {
		if (!selectedTenant) return [];

		switch (selectedTenant) {
			case 'TOWS':
				return TOWSProduct;
			case 'INVENTORY':
				return inventroyProduct;
			case 'T2T':
				return T2TProduct;
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

	useEffect(() => {
		(async () => {
			await getTenantProduct('inventory', setInventroyProduct);
			await getTenantProduct('tows', setTOWSProduct);
			await getTenantProduct('t2t', setT2TProduct);
		})();
	}, []);

	useEffect(() => {
		setData(props.defaultData);
	}, [props]);

	useImperativeHandle(ref, () => ({
		data,
	}));

	useEffect(() => {
		if (tenantSelectRef.current && tenantSelectRef.current.refetchData) {
			tenantSelectRef.current.refetchData();
		}
	}, [selectedTenant]);

	return (
		<AtomCard title="Pengaturan Cabang">
			<Form name="table-form" form={form} component={false}>
				<Row align="middle" gutter={[0, 12]} justify="space-between">
					<Col span={15}>
						<Space>
							<Input.Search
								placeholder="Cari Nama Produk"
								onSearch={setKeyword}
								size="large"
							/>

							{!props.isReadOnly && (
								<AtomPrimaryButton
									icon={<RedoOutlined />}
									size="large"
									onClick={() =>
										props.generateProductVariants()
									}
								>
									Refresh table
								</AtomPrimaryButton>
							)}
						</Space>
					</Col>

					<Col span={9}>
						<Row align="middle" gutter={24} justify="end">
							<Col span={16}>
								<AtomBranchSelection onChange={setBranch} />
							</Col>
						</Row>
					</Col>
				</Row>

				<Table
					bordered
					dataSource={getDatatableData()}
					columns={mergeColumn.filter((column) => !column.hidden)}
					rowKey={(record) => `branch_sku_id_${record.product_detail_id}`}
					scroll={{
						x: 2880,
					}}
					components={{
						body: {
							cell: EditableCell,
						},
					}}
					pagination={{
						onChange: function(current) {
							setPageNumber(current);
							cancel();
						}
					}}
				/>
			</Form>

			{beingSyncedProductIndex !== null && (
				<Modal
					onCancel={() => setBeingSyncedProductIndex(null)}
					visible={true}
					footer={
						<AtomPrimaryButton
							size="large"
							onClick={() => bindingForm.submit()}
						>
							Simpan
						</AtomPrimaryButton>
					}
					title={
						<span className="f5">
							Hubungkan produk Fresh Factory ke Freezy Fresh
						</span>
					}
				>
					<Form name="binding-form" form={bindingForm} component={false} onFinish={connectProduct}>
						<Row>
							<Col span={24}>
								<MoleculeSelectInputGroup
									label="Jenis Produk"
									name="product_type"
									placeholder="Jenis Produk"
									required
									data={{
										onChange: (_, options) => {
											setSelectedTenant(options.value);
											bindingForm.setFieldsValue({ product_type: options.value });
										},
										options: [
											{ label: 'TOWS', value: 'TOWS' },
											{
												label: 'Inventory',
												value: 'INVENTORY',
											},
											{ label: 'T2T', value: 'T2T' },
										],
									}}
								/>
							</Col>

							<Col span={24}>
								<MoleculeSelectInputGroup
									label="Nama Produk"
									name="product_name"
									optionsRef={tenantSelectRef}
									placeholder="Nama Produk"
									required
									data={{
										options: setTenantProduct(),
										onChange: (_, options) => {
											setSelectedFFProduct(options.value);
											bindingForm.setFieldsValue({ product_name: options.value });
										},
									}}
								/>
							</Col>
						</Row>
					</Form>
				</Modal>
			)}

			{beingRemoveFFProductIndex !== null && (
				<Modal
					footer={false}
					closable={false}
					title={false}
					visible={true}
					width={420}
				>
					<Row
						gutter={[0, 24]}
						className="ph3 br4 pv2"
						justify="center"
					>
						<Col>
							<Typography.Text strong>
								Apakah anda akan melepas binding produk ini?
							</Typography.Text>
						</Col>

						<Col span={24}>
							<Row justify="space-between">
								<Col span={11}>
									<AtomSecondaryButton
										block
										size="large"
										onClick={() =>
											setBeingRemoveFFProductIndex(null)
										}
									>
										Tidak
									</AtomSecondaryButton>
								</Col>
								<Col span={11}>
									<AtomPrimaryButton
										block
										size="large"
										onClick={removeSyncedProduct}
									>
										Ya
									</AtomPrimaryButton>
								</Col>
							</Row>
						</Col>
					</Row>
				</Modal>
			)}
		</AtomCard>
	);
});

const EditableCell = ({
	editing,
	dataIndex,
	children,
	record,
	...restProps
}) => {
	const renderEditableForm = (dataIndex, defaultValue) => {
		if (['is_freezy_pick', 'is_manage_stock'].includes(dataIndex)) {
			return (
				<Select>
					<Select.Option value={true}>Ya</Select.Option>
					<Select.Option value={false}>Tidak</Select.Option>
				</Select>
			);
		}

		if (['shortest_expiration', 'longest_expiration'].includes(dataIndex)) {
			return (
				<DatePicker
					defaultValue={defaultValue}
					disabledDate={(current) =>
						current && current < moment().endOf('day')
					}
				/>
			);
		}

		return (
			<Space size={5} style={{ width: '100%' }}>
				<InputNumber defaultValue={defaultValue} />{' '}
				{dataIndex === 'discount_percentage' && <span>%</span>}
			</Space>
		);
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

OrganismProductBranchDatatable.propTypes = {
	defaultData: PropTypes.array,
	generateProductVariants: PropTypes.func,
	isEditing: PropTypes.bool,
	isReadOnly: PropTypes.bool,
	setProductVariants: PropTypes.func,
};

export default OrganismProductBranchDatatable;
