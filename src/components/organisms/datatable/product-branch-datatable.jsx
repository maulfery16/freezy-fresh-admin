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
import { CheckOutlined, CloseOutlined } from '@ant-design/icons';

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
			render: (branches) => branches.join(', '),
			sorter: true,
		},
		{
			title: 'Varian',
			dataIndex: 'varian',
			sorter: true,
		},
		{
			title: 'Rating',
			dataIndex: 'rating',
			sorter: true,
		},
		{
			title: 'Junlah Favorite',
			dataIndex: `favorite_count`,
			render: (count) => <AtomNumberFormat value={count} />,
			sorter: true,
		},
		{
			title: 'Jumlah My Catalog',
			dataIndex: 'catalog_count',
			render: (count) => <AtomNumberFormat value={count} />,
			sorter: true,
		},
		{
			title: 'Jumlah Terjual',
			dataIndex: 'unit_sold',
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
			dataIndex: 'is_stock_manageable',
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
			dataIndex: 'early_expire_date',
			render: (date) => (
				<ReactMoment format="DD/MM/YY">{date}</ReactMoment>
			),
			sorter: true,
		},
		{
			title: 'Date Exp Terlama',
			dataIndex: 'later_expire_date',
			render: (date) => (
				<ReactMoment format="DD/MM/YY">{date}</ReactMoment>
			),
			sorter: true,
		},
		{
			title: 'Harga Normal',
			dataIndex: 'price',
			render: (price) => <AtomNumberFormat prefix="Rp. " value={price} />,
			sorter: true,
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
			sorter: true,
		},
		{
			title: 'Diskon',
			dataIndex: 'discount',
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
	}

	const [data, setData] = useState(props.defaultData || []);
	const [editingKey, setEditingKey] = useState('');
	const [form] = Form.useForm();
	const [keyword, setKeyword] = useState('');
	const [filters] = useState({
		branch: '',
	});

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
				column.name.includes(keyword)
			);

		if (filters.branch || filters.branch !== '')
			filteredData = filteredData.filter((column) =>
				column.branches
					.map((branch) => branch.id)
					.includes(filters.branch)
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
		<AtomCard title="Pengaturan Cabang">
			<Row align="middle" gutter={[0, 12]} justify="space-between">
				<Col span={8}>
					<Input.Search
						placeholder="Cari Nama Produk"
						onSearch={(value) => setKeyword(value)}
						size="large"
					/>
				</Col>

				<Col span={9}>
					<Row align="middle" gutter={24} justify="end">
						<Col span={16}>
							<MoleculeSelectInputGroup
								label="Pilih Cabang Freezy"
								name="branches"
								placeholder="Cabang Freezy"
								required
								data={{
									url: 'branches',
								}}
							/>
						</Col>

						<Col span={8}>
							<AtomPrimaryButton htmlType="submit" size="large">
								Terapkan
							</AtomPrimaryButton>
						</Col>
					</Row>
				</Col>
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
					scroll={{ x: 2440 }}
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

export default OrganismProductBranchDatatable;
