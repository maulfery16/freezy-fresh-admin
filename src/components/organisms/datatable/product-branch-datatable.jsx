/* eslint-disable no-unused-vars */
/* eslint-disable react/display-name */
import moment from 'moment';
import PropTypes from 'prop-types';
import React, {
	forwardRef,
	useEffect,
	useImperativeHandle,
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
	Popconfirm,
	Row,
	Select,
	Space,
	Table,
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

const OrganismProductBranchDatatable = forwardRef((props, ref) => {
	const columns = [
		{
			title: 'No',
			dataIndex: 'id',
			render: (_, _record, index) => index + 1,
		},
		{
			title: 'Cabang',
			dataIndex: 'branches',
			render: (_, record) => record.branch.id,
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
			render: (_, record) => record.branch.tows,
			sorter: true,
			hidden: !props.isEditing || !props.isReadOnly ? true : false,
		},
		{
			title: 'Rating',
			dataIndex: 'rating',
			sorter: true,
			hidden: !props.isEditing || !props.isReadOnly ? true : false,
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
			render: (count) => <AtomNumberFormat value={count} />,
			editable: true,
			sorter: true,
		},
		{
			title: 'Stok Gudang',
			dataIndex: `warehouse_stock`,
			render: (count) => <AtomNumberFormat value={count} />,
			sorter: true,
		},
		{
			title: 'Stok Tersedia',
			dataIndex: `available_stock`,
			render: (count) => <AtomNumberFormat value={count} />,
			sorter: true,
		},
		{
			title: 'Date Exp Tercepat',
			dataIndex: 'shortest_expiration',
			editable: true,
			render: (date) => (
				<ReactMoment format="DD/MM/YY">{date}</ReactMoment>
			),
			sorter: true,
			hidden: !props.isEditing || !props.isReadOnly ? true : false,
		},
		{
			title: 'Date Exp Terlama',
			dataIndex: 'longest_expiration',
			editable: true,
			render: (date) => (
				<ReactMoment format="DD/MM/YY">{date}</ReactMoment>
			),
			sorter: true,
			hidden: !props.isEditing || !props.isReadOnly ? true : false,
		},
		{
			title: 'Harga Normal',
			dataIndex: 'price',
			render: (price) => `Rp. ${price}`,
			editable: true,
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
			editable: true,
			sorter: true,
		},
		{
			title: 'Diskon (%)',
			dataIndex: 'discount_percentage',
			editable: true,
			render: (discount) => (discount ? `${discount} %` : null),
			sorter: true,
		},
		{
			title: 'Status Binding',
			dataIndex: 'binding_status',
			render: (synced) => (
				<SyncOutlined
					className={`f4 fw8 ${synced ? 'dark-green' : 'dark-red'}`}
				/>
			),
		},
		{
			align: 'center',
			title: 'Aksi',
			dataIndex: 'action',
			hidden: props.isReadOnly ? true : false,
			render: (_, record) => {
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

						<AtomPrimaryButton
							onClick={() =>
								setBeingSyncedProductId(record.branch_sku_id)
							}
						>
							<SyncOutlined
								className={`f4 fw8 ${
									record.is_synced ? 'dark-green' : 'dark-red'
								}`}
							/>
						</AtomPrimaryButton>
					</Space>
				);
			},
		},
	];

	const [beingSyncedProductId, setBeingSyncedProductId] = useState(null);
	const [branch, setBranch] = useState(null);
	const [data, setData] = useState(props.defaultData);
	const [editingKey, setEditingKey] = useState('');
	const [form] = Form.useForm();
	const [keyword, setKeyword] = useState('');

	const cancel = () => setEditingKey('');

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
			row.discount_percentage = (100 * row.fixed_price) / row.price;
			return row;
		}

		if (discountChanged) {
			row.fixed_price = (row.discount_percentage / 100) * row.price;
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

	const isEditing = (record) => record.branch_sku_id === editingKey;

	const save = async (id) => {
		try {
			let row = await form.validateFields();
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
		setData(props.defaultData);
	}, [props]);

	useImperativeHandle(ref, () => ({
		data,
	}));

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
					rowKey="branch_sku_id"
					scroll={{
						x: !props.isEditing || !props.isReadOnly ? 2160 : 2880,
					}}
					components={{
						body: {
							cell: EditableCell,
						},
					}}
					pagination={{
						onChange: cancel,
					}}
				/>
			</Form>
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
