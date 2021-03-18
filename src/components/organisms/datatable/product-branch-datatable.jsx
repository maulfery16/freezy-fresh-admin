/* eslint-disable react/display-name */
import PropTypes from 'prop-types';
import React, { forwardRef, useImperativeHandle, useState } from 'react';
import ReactMoment from 'react-moment';
import {
	Col,
	Form,
	Input,
	InputNumber,
	Popconfirm,
	Row,
	Space,
	Table,
} from 'antd';
import { CheckOutlined, CloseOutlined, SyncOutlined } from '@ant-design/icons';

import AtomCard from '../../atoms/card';
import AtomNumberFormat from '../../atoms/number-format';
import AtomPrimaryButton from '../../atoms/button/primary-button';
import MoleculeSelectInputGroup from '../../molecules/input-group/select-input';

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
			render: (_, record) => record.branch || record.branch_id,
			sorter: true,
		},
		{
			title: 'Varian',
			dataIndex: 'variants',
			render: (variant) =>
				variant
					? variant
							.map(
								(varia) =>
									`${varia.attribute.id} ${varia.variant.id}`
							)
							.join('')
					: '-',
			sorter: true,
		},
		{
			title: 'Rating',
			dataIndex: 'rating',
			sorter: true,
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
			render: (pick) => (pick ? 'Ya' : 'Tidak'),
			sorter: true,
		},
		{
			title: 'Kelola Stock',
			dataIndex: 'is_manage_stock',
			render: (manageable) => (manageable ? 'Ya' : 'Tidak'),
			sorter: true,
		},
		{
			title: 'Stok Dikelola',
			dataIndex: `managed_stock`,
			render: (count) => <AtomNumberFormat value={count} />,
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
			render: (date) => (
				<ReactMoment format="DD/MM/YY">{date}</ReactMoment>
			),
			sorter: true,
		},
		{
			title: 'Date Exp Terlama',
			dataIndex: 'longest_expiration',
			render: (date) => (
				<ReactMoment format="DD/MM/YY">{date}</ReactMoment>
			),
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
			render: (price) => <AtomNumberFormat prefix="Rp. " value={price} />,
			sorter: true,
		},
		{
			title: 'Diskon',
			dataIndex: 'discount_percentage',
			editable: true,
			render: (discount) => (discount ? `${discount} %` : null),
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
	} else {
		columns.push({
			align: 'center',
			title: '',
			dataIndex: 'is_synced',
			render: (synced) => (
				<SyncOutlined
					className={`f4 fw8 ${synced ? 'dark-green' : 'dark-red'}`}
				/>
			),
		});
	}

	const [data, setData] = useState(props.defaultData || []);
	const [editingKey, setEditingKey] = useState('');
	const [form] = Form.useForm();
	const [keyword, setKeyword] = useState('');
	const [branch, setBranch] = useState(null);

	const cancel = () => setEditingKey('');

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
		<AtomCard title="Pengaturan Cabang">
			<Form name="table-form" form={form} component={false}>
				<Row align="middle" gutter={[0, 12]} justify="space-between">
					<Col span={8}>
						<Input.Search
							placeholder="Cari Nama Produk"
							onSearch={setKeyword}
							size="large"
						/>
					</Col>

					<Col span={9}>
						<Row align="middle" gutter={24} justify="end">
							<Col span={16}>
								<MoleculeSelectInputGroup
									allowClear
									label="Pilih Cabang Freezy"
									name="branches"
									placeholder="Cabang Freezy"
									onChange={setBranch}
									data={{
										generateCustomOption: (item) => ({
											value: item.real_id,
											label: item.name,
										}),
										url: 'branches',
									}}
								/>
							</Col>
						</Row>
					</Col>
				</Row>

				<Table
					bordered
					dataSource={getDatatableData()}
					columns={mergeColumn}
					rowKey="id"
					scroll={{ x: 2440 }}
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

OrganismProductBranchDatatable.propTypes = {
	defaultData: PropTypes.array,
	isReadOnly: PropTypes.bool,
};

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

export default OrganismProductBranchDatatable;
