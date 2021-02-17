/* eslint-disable react/display-name */
import moment from 'moment';
import React, { useRef } from 'react';
import ReactMoment from 'react-moment';
import { Link } from 'react-router-dom';
import { Space } from 'antd';
import { EditFilled } from '@ant-design/icons';

import OrganismDatatable from '../../../components/organisms/datatable';
import OrganismLayout from '../../../components/organisms/layout';

import AdditionalCategoryService from '../../../services/additional-category';
import MoleculeDatatableAdditionalAction from '../../../components/molecules/datatable/additional-actions';
import MoleculeDeleteConfirm from '../../../components/molecules/delete-confirm';
const additionalCategoryService = new AdditionalCategoryService();

// eslint-disable-next-line no-unused-vars
const mock = {
	data: [
		{
			code: 'KT1-836732981',
			created_at: new Date(),
			created_by: {
				email: 'superadmin',
			},
			id: 'azkvml597yxe8b9j',
			name: {
				id: 'Food',
				en: 'Makanan',
			},
			updated_at: new Date(),
			updated_by: {
				email: 'superadmin',
			},
		},
		{
			code: 'KT1-836732982',
			created_at: new Date(),
			created_by: {
				email: 'superadmin',
			},
			id: '6dpbgq5ka0axoe8r',
			name: {
				id: 'Drug',
				en: 'Obat',
			},
			updated_at: new Date(),
			updated_by: {
				email: 'superadmin',
			},
		},
	],
	meta: {
		include: [],
		custom: [],
		pagination: {
			total: 2,
			count: 2,
			per_page: 10,
			current_page: 1,
			total_pages: 1,
			links: {},
		},
	},
};

const AdditionalCategoryPage = () => {
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
			dataIndex: `name`,
		},
		{
			title: 'Nama Kategori (EN)',
			dataIndex: `name`,
		},
		// {
		// 	title: 'Nama Kategori (ID)',
		// 	dataIndex: `name['id']`,
		// 	render: (_, record) => record.name.id,
		// },
		// {
		// 	title: 'Nama Kategori (EN)',
		// 	dataIndex: `name['en']`,
		// 	render: (_, record) => record.name.en,
		// },
		{
			title: 'Tanggal Dibuat',
			dataIndex: 'created_at',
			render: (date) => (
				<ReactMoment format="DD/MM/YY">{date}</ReactMoment>
			),
			csvRender: (item) => moment(item.created_at).format('DD/MM/YYYY'),
		},
		{
			title: 'Tanggal Diupdate',
			dataIndex: 'updated_at',
			render: (date) => (
				<ReactMoment format="DD/MM/YY">{date}</ReactMoment>
			),
			csvRender: (item) => moment(item.created_at).format('DD/MM/YYYY'),
		},
		{
			title: 'Dibuat Oleh',
			dataIndex: `created_by['email']`,
			render: (_, record) => record.created_by.email,
		},
		{
			title: 'Diupdate Oleh',
			dataIndex: `updated_by['email']`,
			render: (_, record) =>
				`${record.updated_by ? record.updated_by.email : '-'}`,
		},
		{
			title: 'Aksi',
			dataIndex: 'id',
			render: (id) => (
				<Space size="middle">
					<Link to={`/products/additional-category/${id}/edit`}>
						<EditFilled className="f4 orange" />
					</Link>

					<MoleculeDeleteConfirm
						deleteService={() =>
							additionalCategoryService.deleteAdditionalCategory(
								id
							)
						}
						label="banner"
						tableRef={additionalCategoryTableRef}
					/>
				</Space>
			),
			skipExport: true,
		},
	];

	const additionalCategoryTableRef = useRef();

	const renderAdditionalAction = () => {
		return (
			<MoleculeDatatableAdditionalAction
				column={column}
				label="Kategori Tambahan"
				getLimit={() => additionalCategoryTableRef.current.totalData}
				service={additionalCategoryService}
				url="products/additional-category"
			/>
		);
	};

	return (
		<OrganismLayout
			breadcumbs={[
				{ name: 'Produk', link: location.pathname },
				{
					name: 'Kategori Tambahan',
					link: location.pathname,
				},
			]}
			title="Product Page Additional Category"
		>
			<OrganismDatatable
				additionalAction={renderAdditionalAction()}
				columns={column}
				dataSourceURL={`/v1/additional_categories`}
				// mock={mock}
				ref={additionalCategoryTableRef}
				searchInput={true}
				title={`Kategori Tambahan`}
			/>
		</OrganismLayout>
	);
};

export default AdditionalCategoryPage;
