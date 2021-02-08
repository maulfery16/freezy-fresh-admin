/* eslint-disable react/display-name */
import React from 'react';
import ReactMoment from 'react-moment';
import { Link } from 'react-router-dom';
import { Button, Popconfirm, Space } from 'antd';
import {
	DeleteFilled,
	EditFilled,
	QuestionCircleFilled,
} from '@ant-design/icons';

import OrganismDatatable from '../../../components/organisms/datatable';
import OrganismLayout from '../../../components/organisms/layout';

const mock = {
	meta: {
		total_data: 2,
	},
	data: [
		{
			code: 'KT1-836732981',
			created_at: new Date(),
			created_by: 'Reiner',
			en_name: 'Food',
			id_name: 'Makanan',
			updated_at: new Date(),
			updated_by: 'Sasha',
		},
		{
			code: 'KT1-836732982',
			created_at: new Date(),
			created_by: 'Reiner',
			en_name: 'Drug',
			id_name: 'Obat',
			updated_at: new Date(),
			updated_by: 'Sasha',
		},
	],
};

const column = [
	{
		title: 'No',
		dataIndex: 'id',
		render: (id, _, index) => index + 1,
	},
	{
		title: 'Kode Kategori',
		dataIndex: 'code',
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
		title: 'Tanggal Dibuat',
		dataIndex: 'created_at',
		render: (date) => (
		<ReactMoment format="DD/MM/YY">{date}</ReactMoment>),
	},
	{
		title: 'Tanggal Diupdate',
		dataIndex: 'updated_at',
			render: (date) => (
			<ReactMoment format="DD/MM/YY">{date}</ReactMoment>),
	},
	{
		title: 'Dibuat Oleh',
		dataIndex: 'created_by',
	},
	{
		title: 'Diupdate Oleh',
		dataIndex: 'updated_by',
	},
	{
		title: 'Aksi',
		dataIndex: 'code',
		render: (id) => (
			<Space size="middle">
				<Link to={`/products/additional-category/${id}/edit`}>
					<EditFilled className="f4 orange" />
				</Link>

				<Popconfirm
					title="Are you sure?"
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

const renderAdditionalAction = () => {
	return (
		<Space>
			<Button className="br2 denim b--denim">Export Excel</Button>
			<Link to="/products/additional-category/add">
				<Button className="br2 bg-denim white">Tambah Kategori</Button>
			</Link>
		</Space>
	);
};

const AdditionalCategoryPage = () => {
	return (
		<OrganismLayout
			breadcumbs={[
				{ name: 'Produk', link: location.pathname },
				{
					name: 'Kategori Tambahan',
					link: location.pathname,
				},
			]}
			title="Admin Page"
		>
			<OrganismDatatable
				additionalAction={renderAdditionalAction()}
				columns={column}
				dataSourceURL={`/v1/products/additional-category`}
				mock={mock}
				searchInput={true}
				title={`Kategori Tambahan`}
			/>
		</OrganismLayout>
	);
};

export default AdditionalCategoryPage;
