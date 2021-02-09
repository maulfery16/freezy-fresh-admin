/* eslint-disable react/display-name */
import React, { useRef } from 'react';
import ReactMoment from 'react-moment';
import { Link } from 'react-router-dom';
import { Button, Image, message, Popconfirm, Space } from 'antd';
import {
	DeleteFilled,
	EditFilled,
	QuestionCircleFilled,
} from '@ant-design/icons';

import AtomNumberFormat from '../../../components/atoms/number-format';
import OrganismDatatable from '../../../components/organisms/datatable';
import OrganismLayout from '../../../components/organisms/layout';

import BrandService from '../../../services/brand';
const brandService = new BrandService();

const mock = {
	data: [
		{
			id: '6dpbgq5ka0axoe8r',
			code: 'CCCCCC',
			name: {
				en: 'Coca Cola Edit',
				id: 'Coca Cola',
			},
			image: {
				original:
					'https://api.ms-freezy-fresh.local/storage/uploads/images/lHOpp0T7BscrKYz72KMR.jpg',
				compressed:
					'https://api.ms-freezy-fresh.local/storage/uploads/images\\compressed\\lHOpp0T7BscrKYz72KMR.jpg',
				thumb:
					'https://api.ms-freezy-fresh.local/storage/uploads/images\\thumb\\lHOpp0T7BscrKYz72KMR.jpg',
			},
			is_active: false,
			created_by: 'Superadmin Administartor',
			updated_by: 'Superadmin Administartor',
			inactive_by: 'Superadmin Administartor',
			created_at: '2021-02-04T12:31:18.000000Z',
			updated_at: '2021-02-05T08:30:10.000000Z',
		},
		{
			id: 'mdjw8454a5xb39pq',
			code: 'CCC',
			name: {
				en: 'Coca Cola',
				id: 'Coca Cola',
			},
			image: {
				original:
					'https://api.ms-freezy-fresh.local/storage/uploads/images/lHOpp0T7BscrKYz72KMR.jpg',
				compressed:
					'https://api.ms-freezy-fresh.local/storage/uploads/images\\compressed\\lHOpp0T7BscrKYz72KMR.jpg',
				thumb:
					'https://api.ms-freezy-fresh.local/storage/uploads/images\\thumb\\lHOpp0T7BscrKYz72KMR.jpg',
			},
			is_active: true,
			created_by: 'Superadmin Administartor',
			updated_by: 'Superadmin Administartor',
			inactive_by: '',
			created_at: '2021-02-04T12:31:23.000000Z',
			updated_at: '2021-02-04T12:31:23.000000Z',
		},
		{
			id: 'pvnxml0njyj6r3eg',
			code: 'CCCC',
			name: {
				en: 'Coca Cola',
				id: 'Coca Cola',
			},
			image: {
				original:
					'https://api.ms-freezy-fresh.local/storage/uploads/images/lHOpp0T7BscrKYz72KMR.jpg',
				compressed:
					'https://api.ms-freezy-fresh.local/storage/uploads/images\\compressed\\lHOpp0T7BscrKYz72KMR.jpg',
				thumb:
					'https://api.ms-freezy-fresh.local/storage/uploads/images\\thumb\\lHOpp0T7BscrKYz72KMR.jpg',
			},
			is_active: true,
			created_by: 'Superadmin Administartor',
			updated_by: 'Superadmin Administartor',
			inactive_by: '',
			created_at: '2021-02-04T12:31:44.000000Z',
			updated_at: '2021-02-04T12:31:44.000000Z',
		},
		{
			id: '4zr8mb07lykowjaq',
			code: 'CCCCC',
			name: {
				en: 'Coca Cola',
				id: 'Coca Cola',
			},
			image: {
				original:
					'https://api.ms-freezy-fresh.local/storage/uploads/images/lHOpp0T7BscrKYz72KMR.jpg',
				compressed:
					'https://api.ms-freezy-fresh.local/storage/uploads/images\\compressed\\lHOpp0T7BscrKYz72KMR.jpg',
				thumb:
					'https://api.ms-freezy-fresh.local/storage/uploads/images\\thumb\\lHOpp0T7BscrKYz72KMR.jpg',
			},
			is_active: true,
			created_by: 'Superadmin Administartor',
			updated_by: 'Superadmin Administartor',
			inactive_by: '',
			created_at: '2021-02-04T12:47:03.000000Z',
			updated_at: '2021-02-04T12:47:03.000000Z',
		},
		{
			id: 'p8e9xqye60o6jbmw',
			code: 'C001',
			name: {
				en: 'Coca Cola',
				id: 'Coca Cola',
			},
			image: {
				original:
					'https://api.ms-freezy-fresh.local/storage/uploads/images/lHOpp0T7BscrKYz72KMR.jpg',
				compressed:
					'https://api.ms-freezy-fresh.local/storage/uploads/images\\compressed\\lHOpp0T7BscrKYz72KMR.jpg',
				thumb:
					'https://api.ms-freezy-fresh.local/storage/uploads/images\\thumb\\lHOpp0T7BscrKYz72KMR.jpg',
			},
			is_active: true,
			created_by: 'Superadmin Administartor',
			updated_by: 'Superadmin Administartor',
			inactive_by: '',
			created_at: '2021-02-05T08:27:48.000000Z',
			updated_at: '2021-02-05T08:27:48.000000Z',
		},
	],
	meta: {
		include: [],
		custom: [],
		pagination: {
			total: 5,
			count: 5,
			per_page: 10,
			current_page: 1,
			total_pages: 1,
			links: {},
		},
	},
};

const BrandPage = () => {
	const column = [
		{
			title: 'No',
			dataIndex: 'id',
			render: (id, _, index) => index + 1,
		},
		{
			title: 'Kode Brand',
			dataIndex: 'code',
		},
		{
			title: 'Nama Brand (ID)',
			dataIndex: `name['id']`,
			render: (_, record) => record.name.id,
		},
		{
			title: 'Nama Brand (EN)',
			dataIndex: `name['en']`,
			render: (_, record) => record.name.en,
		},
		{
			title: 'Foto Brand',
			dataIndex: 'image',
			render: (_, record) => (
				<Image preview src={record.image.original} width={100} />
			),
		},
		{
			title: 'Jumlah Sosmed Follower',
			dataIndex: 'followers',
			render: (followers) => <AtomNumberFormat value={followers} />,
		},
		{
			title: 'Tanggal Dibuat',
			dataIndex: 'created_at',
			render: (date) => (
				<ReactMoment format="DD/MM/YYYY">{date}</ReactMoment>
			),
		},
		{
			title: 'Dibuat Oleh',
			dataIndex: 'created_by',
		},
		{
			title: 'Tanggal Diperbaharui',
			dataIndex: 'updated_at',
			render: (date) => (
				<ReactMoment format="DD/MM/YYYY">{date}</ReactMoment>
			),
		},
		{
			title: 'Diperbaharui Oleh',
			dataIndex: 'updated_by',
		},
		{
			title: 'Aksi',
			dataIndex: 'id',
			render: (id) => (
				<Space size="middle">
					<Link to={`/products/brand/${id}/edit`}>
						<EditFilled className="f4 orange" />
					</Link>

					<Popconfirm
						title="Are you sure"
						icon={<QuestionCircleFilled className="red" />}
					>
						<DeleteFilled
							className="f4 red"
							onClick={() => deleteBrand(id)}
						/>
					</Popconfirm>
				</Space>
			),
		},
	];
	const brandTableRef = useRef();

	const deleteBrand = async (id) => {
		try {
			await brandService.deleteBrand(id);

			message.success('Berhasil menghapus brand');
			brandTableRef.current.refetchData();
		} catch ({ message, errors }) {
			message.error(message);
			message.error(errors.code);
		}
	};

	const renderAdditionalAction = () => {
		return (
			<Space>
				<Button className="br2 denim b--denim">Export Excel</Button>
				<Link to="/products/brand/add">
					<Button className="br2 bg-denim white">Tambah Brand</Button>
				</Link>
			</Space>
		);
	};

	return (
		<OrganismLayout
			breadcumbs={[
				{ name: 'Produk', link: location.pathname },
				{
					name: 'Brand',
					link: location.pathname,
				},
			]}
			title="Product Page Brand"
		>
			<OrganismDatatable
				additionalAction={renderAdditionalAction()}
				columns={column}
				dataSourceURL={`/v1//brands`}
				mock={mock}
				ref={brandTableRef}
				scroll={1920}
				searchInput={true}
				title={`Brand`}
			/>
		</OrganismLayout>
	);
};

export default BrandPage;
