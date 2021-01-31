/* eslint-disable react/display-name */
import React from 'react';
import ReactMoment from 'react-moment';
import { useHistory } from 'react-router-dom';
import { Button, Popconfirm, Space } from 'antd';
import {
	DeleteFilled,
	EyeFilled,
	QuestionCircleFilled,
} from '@ant-design/icons';

import OrganismDatatable from '../../components/organisms/datatable';
import OrganismLayout from '../../components/organisms/layout';

const mock = {
	meta: {
		total_data: 2,
	},
	data: [
		{
			account_number: '2829000024',
			bank: 'BCA',
			branch: 'Bandung',
			created_at: new Date(),
			email: 'johndoe@gmail.com',
			gender: 'Pria',
			id: 'FF-836732982',
			name: 'John Doe',
			phone_number: '0856752837',
			role: 'Manager Toko',
		},
		{
			account_number: '2829000024',
			bank: 'BRI',
			branch: 'Jakarta',
			created_at: new Date(),
			email: 'johndoe2@gmail.com',
			gender: 'Pria',
			id: 'FF-836732981',
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
			width: 240,
		},
		{
			title: 'Tgl. Gabung',
			dataIndex: 'created_at',
			render: (date) => (
				<ReactMoment format="DD/MM/YY">{date}</ReactMoment>
			),
			width: 240,
		},
		{
			title: 'Name Member',
			dataIndex: 'name',
			sort: true,
			width: 360,
		},
		{
			title: 'Email',
			dataIndex: 'email',
			sort: true,
			width: 300,
		},
		{
			title: 'No. Hp',
			dataIndex: 'phone_number',
			sort: true,
			width: 240,
		},
		{
			title: 'Peranan',
			dataIndex: 'role',
			sort: true,
			width: 240,
		},
		{
			title: 'Cabang',
			dataIndex: 'branch',
			sort: true,
			width: 240,
		},
		{
			title: 'Jenis Kelamin',
			dataIndex: 'gender',
			width: 240,
		},
		{
			title: 'Nomor Rek',
			dataIndex: 'account_number',
			width: 240,
		},
		{
			title: 'Bank',
			dataIndex: 'bank',
			width: 240,
		},
		{
			title: 'Aksi',
			dataIndex: 'id',
			width: 200,
			render: (id) => (
				<Space size="middle">
					<EyeFilled
						className="f4 blue"
						onClick={() => history.push(`admin/detail/${id}`)}
					/>

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

	const history = useHistory();

	const renderAdditionalAction = () => {
		return (
			<Space>
				<Button className="br2 denim b--denim">Export Excel</Button>
				<Button className="br2 bg-denim white">Tambah Admin</Button>
			</Space>
		);
	};

	return (
		<OrganismLayout title="Admin Page">
			<OrganismDatatable
				additionalAction={renderAdditionalAction()}
				columns={column}
				dataSourceURL={`/url/to/api`}
				mock={mock}
				title={`Admin Menu`}
			/>
		</OrganismLayout>
	);
};

export default AdminPage;
