/* eslint-disable react/display-name */
import React, { useEffect, useState } from 'react';
import ReactMoment from 'react-moment';
import { Link } from 'react-router-dom';
import { Button, Image, message, Popconfirm, Skeleton, Space } from 'antd';
import {
	DeleteFilled,
	EyeFilled,
	QuestionCircleFilled,
} from '@ant-design/icons';

import AtomNumberFormat from '../../components/atoms/number-format';
import MoleculeDatatableAdditionalInformation from '../../components/molecules/datatable/additional-information-card';
import MoleculeDatatableDateRange from '../../components/molecules/datatable/date-range-plugin';
import MoleculeDatatableFilter from '../../components/molecules/datatable/filter-plugin';
import OrganismDatatable from '../../components/organisms/datatable';
import OrganismLayout from '../../components/organisms/layout';

// import AdminService from '../../services/admin';
// const adminService = new AdminService();

const mock = {
	meta: {
		total_data: 2,
	},
	data: [
		{
			account_number: '2829000024',
			bank: 'BCA',
			branches: ['Bandung', 'Garut'],
			created_at: new Date(),
			email: 'johndoe@gmail.com',
			gender: 'Pria',
			id: 'FF-836732982',
			image:
				'https://cdn.shopify.com/s/files/1/0533/2089/files/placeholder-images-image_large.png?format=jpg&quality=90&v=1530129081',
			name: 'John Doe',
			phone_number: '0856752837',
			role: 'Manager Toko',
		},
		{
			account_number: '2829000024',
			bank: 'BRI',
			branches: ['Jakarta'],
			created_at: new Date(),
			email: 'johndoe2@gmail.com',
			gender: 'Pria',
			id: 'FF-836732981',
			image:
				'https://cdn.shopify.com/s/files/1/0533/2089/files/placeholder-images-image_large.png?format=jpg&quality=90&v=1530129081',
			name: 'John Doe 2',
			phone_number: '0856752837',
			role: 'Kasir',
		},
	],
};

const AdminPage = () => {
	const column = [
		{
			title: 'No',
			dataIndex: 'id',
			render: (id, _, index) => index + 1,
		},
		{
			title: 'ID',
			dataIndex: 'id',
		},
		{
			title: 'Nama Admin',
			dataIndex: 'name',
			sort: true,
		},
		{
			title: 'Foto',
			dataIndex: 'image',
			render: (image) => <Image preview src={image} width={100} />,
		},
		{
			title: 'Email',
			dataIndex: 'email',
			sort: true,
		},
		{
			title: 'No. Hp',
			dataIndex: 'phone_number',
			sort: true,
		},
		{
			title: 'Tgl. Gabung',
			dataIndex: 'created_at',
			render: (date) => (
				<ReactMoment format="DD/MM/YY">{date}</ReactMoment>
			),
		},
		{
			title: 'Peranan',
			dataIndex: 'role',
			sort: true,
		},
		{
			title: 'Cabang',
			dataIndex: 'branches',
			sort: true,
			render: (branches) => branches.join(', '),
		},
		{
			title: 'Jenis Kelamin',
			dataIndex: 'gender',
		},
		{
			title: 'Nomor Rek',
			dataIndex: 'account_number',
		},
		{
			title: 'Bank',
			dataIndex: 'bank',
		},
		{
			title: 'Aksi',
			dataIndex: 'id',
			render: (id) => (
				<Space size="middle">
					<Link to={`/admin/${id}`}>
						<EyeFilled className="f4 blue" />
					</Link>

					<Popconfirm
						title="Are you sure？"
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

	const [totalAdmin, setTotalAdmin] = useState(null);

	const getTotalAdmin = async () => {
		try {
			// const total = adminService.getTotalAdmin();
			// setTotalAdmin(total);

			setTimeout(
				setTotalAdmin({ registered: 99999, active: 99999 }),
				2000
			);
		} catch (error) {
			message.error(error.message);
		}
	};

	const renderAdditionalAction = () => {
		return (
			<Space>
				<Button className="br2 denim b--denim">Export Excel</Button>
				<Link to="/admin/add">
					<Button className="br2 bg-denim white">Tambah Admin</Button>
				</Link>
			</Space>
		);
	};

	const renderAdditionalInformation = () => {
		return totalAdmin ? (
			[
				<MoleculeDatatableAdditionalInformation
					key="admin-terdaftar"
					title={
						<>
							Admin
							<br />
							Terdaftar
						</>
					}
					value={<AtomNumberFormat value={totalAdmin.registered} />}
				/>,
				<MoleculeDatatableAdditionalInformation
					key="admin-aktif"
					title={
						<>
							Admin
							<br />
							Aktif
						</>
					}
					value={<AtomNumberFormat value={totalAdmin.active} />}
				/>,
			]
		) : (
			<Skeleton active />
		);
	};

	const renderDatatableFilters = () => {
		return [
			<MoleculeDatatableFilter
				name="branches"
				operator="eq"
				identifier="branches-filter"
				label="Cabang"
				key="branches-filter"
				placeholder="Semua cabang"
				data={{
					url: '/branches',
					mock: [
						{
							label: 'Bandung',
							value: 'Bandung',
						},
						{
							label: 'Garut',
							value: 'Garut',
						},
					],
				}}
			/>,
			<MoleculeDatatableFilter
				name="roles"
				operator="eq"
				identifier="roles-filter"
				label="Peran"
				key="roles-filter"
				placeholder="Semua roles"
				data={{
					url: '/roles',
					mock: [
						{
							label: 'Administrator',
							value: 1,
						},
						{
							label: 'Kasir',
							value: 2,
						},
					],
				}}
			/>,
			<MoleculeDatatableDateRange
				name="joined_at"
				operator="eq"
				identifier="daterangefilter"
				key="daterange"
				label="Tanggal Register"
				placeholder="Filter tanggal register"
			/>,
		];
	};

	useEffect(() => {
		(async () => {
			getTotalAdmin();
		})();
	}, []);

	return (
		<OrganismLayout
			breadcumbs={[{ name: 'Admin', link: '/admin' }]}
			title="Admin Page"
		>
			<OrganismDatatable
				additionalAction={renderAdditionalAction()}
				additionalInformation={renderAdditionalInformation()}
				columns={column}
				dataSourceURL={`/v1/admins`}
				filters={renderDatatableFilters()}
				mock={mock}
				scroll={1920}
				searchInput={true}
				title={`Admin Menu`}
			/>
		</OrganismLayout>
	);
};

export default AdminPage;
