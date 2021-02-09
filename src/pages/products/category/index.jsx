/* eslint-disable react/display-name */
import React, { useRef } from 'react';
import { Link } from 'react-router-dom';
import { Button, Image, message, Popconfirm, Space, Switch } from 'antd';
import {
	DeleteFilled,
	EditFilled,
	QuestionCircleFilled,
} from '@ant-design/icons';

import OrganismDatatable from '../../../components/organisms/datatable';
import OrganismLayout from '../../../components/organisms/layout';

import CategoryService from '../../../services/category';
const categoryService = new CategoryService();

const mock = {
	data: [
		{
			object: 'BaseCategory',
			id: 'azkvml597yxe8b9j',
			name: 'Makasnan',
			color: {
				id: 'azkvml597yxe8b9j',
				name: '{"en":"White","id":"Putih"}',
			},
			is_active: 1,
			created_at: '2021-02-09T00:28:04.000000Z',
			updated_at: '2021-02-09T00:28:04.000000Z',
			inactive_at: null,
		},
	],
	meta: {
		include: [],
		custom: [],
		pagination: {
			total: 1,
			count: 1,
			per_page: 10,
			current_page: 1,
			total_pages: 1,
			links: {},
		},
	},
};

const CategoryPage = () => {
	const column = [
		{
			title: 'No',
			dataIndex: 'id',
			render: (id, _, index) => index + 1,
		},
		{
			title: 'Kategori ID',
			dataIndex: 'id',
		},
		{
			title: 'Nama Kategori (ID)',
			dataIndex: 'name',
			render: (_, record) => record.name,
		},
		{
			title: 'Nama Kategori (EN)',
			dataIndex: 'name',
			render: (_, record) => record.name,
		},
		{
			title: 'Foto Icon',
			dataIndex: 'icon',
			render: (icon) => <Image preview src={icon} width={50} />,
		},
		{
			title: 'Warna',
			dataIndex: 'colour',
			render: (colour) => (
				<div
					className="br2"
					style={{
						background: colour,
						height: '50px',
						width: '50px',
					}}
				/>
			),
		},
		{
			title: 'Aktif',
			dataIndex: 'is_active',
			render: (active, record) => (
				<Switch
					defaultChecked={active}
					onChange={() =>
						changeCategoryActiveStatus(record.id, active)
					}
				/>
			),
		},
		{
			title: 'Aksi',
			dataIndex: 'id',
			render: (id) => (
				<Space size="middle">
					<Link to={`/products/category/${id}/edit`}>
						<EditFilled className="f4 orange" />
					</Link>

					<Popconfirm
						title="Are you sure"
						icon={<QuestionCircleFilled className="red" />}
					>
						<DeleteFilled
							className="f4 red"
							onClick={() => deleteBaseCategory(id)}
						/>
					</Popconfirm>
				</Space>
			),
		},
	];
	const categoryTableRef = useRef();

	const changeCategoryActiveStatus = async (status, id) => {
		try {
			await categoryService.updateCategoryActiveStatus(id, {
				status: !status,
			});

			message.success('Berhasil memperbaharui status aktif kategori');
		} catch (error) {
			message.error(error.message);
		}
	};

	const deleteBaseCategory = async (id) => {
		try {
			await categoryService.deleteCategory(id);
			message.success('Berhasil menghapus kategori dasar');

			categoryTableRef.current.refetchData();
		} catch ({ message, errors }) {
			message.error(message);
			message.error(errors.code);
		}
	};

	const renderAdditionalAction = () => {
		return (
			<Space>
				<Button className="br2 denim b--denim">Export Excel</Button>
				<Link to="/products/category/add">
					<Button className="br2 bg-denim white">
						Tambah Kategori
					</Button>
				</Link>
			</Space>
		);
	};

	return (
		<OrganismLayout
			breadcumbs={[
				{ name: 'Produk', link: location.pathname },
				{
					name: 'Kategori Dasar',
					link: location.pathname,
				},
			]}
			title="Product Page Category"
		>
			<OrganismDatatable
				additionalAction={renderAdditionalAction()}
				columns={column}
				dataSourceURL={`/v1/base_categories`}
				mock={mock}
				ref={categoryTableRef}
				searchInput={true}
				title={`Kategori Dasar`}
			/>
		</OrganismLayout>
	);
};

export default CategoryPage;
