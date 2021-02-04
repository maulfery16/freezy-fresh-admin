/* eslint-disable react/display-name */
import React from 'react';
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
	meta: {
		total_data: 2,
	},
	data: [
		{
			active: true,
			colour: '#FF3412',
			created_at: new Date(),
			id: 'FF-836732982',
			id_name: 'Daging Ikan',
			en_name: 'Fish Meat',
			icon:
				'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRDoXuk_pQv_beIYwtbApyRWeOvS_dWofCdjA&usqp=CAU',
		},
		{
			active: false,
			colour: '#2334FF',
			created_at: new Date(),
			id: 'FF-836732282',
			id_name: 'Sayuran',
			en_name: 'Veggies',
			icon:
				'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRDoXuk_pQv_beIYwtbApyRWeOvS_dWofCdjA&usqp=CAU',
		},
	],
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
			dataIndex: 'id_name',
		},
		{
			title: 'Nama Kategori (EN)',
			dataIndex: 'en_name',
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
			dataIndex: 'active',
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
							onClick={() => console.log(id)}
						/>
					</Popconfirm>
				</Space>
			),
		},
	];

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

	const renderAdditionalAction = () => {
		return (
			<Space>
				<Button className="br2 denim b--denim">Export Excel</Button>
				<Link to="/products/category/add">
					<Button className="br2 bg-denim white">Tambah Admin</Button>
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
			title="Admin Page"
		>
			<OrganismDatatable
				additionalAction={renderAdditionalAction()}
				columns={column}
				dataSourceURL={`/v1/admins`}
				mock={mock}
				searchInput={true}
				title={`Kategori Dasar`}
			/>
		</OrganismLayout>
	);
};

export default CategoryPage;
