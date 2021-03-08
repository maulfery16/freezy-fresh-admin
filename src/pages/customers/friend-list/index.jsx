/* eslint-disable react/display-name */
import moment from 'moment';
import React, { useRef } from 'react';
import ReactMoment from 'react-moment';
import { Link } from 'react-router-dom';
import { Space } from 'antd';
import { EyeFilled } from '@ant-design/icons';

import AtomImage from '../../../components/atoms/image';
import MoleculeDatatableDateRange from '../../../components/molecules/datatable/date-range-plugin';
import MoleculeDatatableFilter from '../../../components/molecules/datatable/filter-plugin';
import OrganismDatatable from '../../../components/organisms/datatable';
import OrganismLayout from '../../../components/organisms/layout';

import { translateGenderEnum } from '../../../utils/helpers';

const mock = {
	data: [
		{
			id: 'azkvml597yxe8b9j',
			user_id: '4zr8mb07lykowjaq',
			user: {
				first_name: 'Ibrahim',
				last_name: 'Example',
				phone_number: '+6281910094095',
				email: 'baim.example2@gmail.com',
				gender: 'MALE',
				birth: '1997-11-07',
				profile_image:
					'http://s3.amazonaws.com/37assets/svn/765-default-avatar.png',
			},
			marital_status: 'Menikah',
		},
		{
			id: 'azkvml597yxe8b9j',
			user_id: '4zr8mb07lykowjqq',
			user: {
				first_name: 'Maryam',
				last_name: 'Example',
				phone_number: '+6281910094094',
				email: 'maryam.example2@gmail.com',
				gender: 'FEMALE',
				birth: '1997-11-04',
				profile_image:
					'https://afmnoco.com/wp-content/uploads/2019/07/74046195_s.jpg',
			},
			marital_status: 'Belum Menikah',
		},
	],
	meta: {
		pagination: { totalData: 2 },
	},
};

const FriendListPage = () => {
	const column = [
		{
			align: 'center',
			title: 'No',
			dataIndex: 'id',
			render: (id, _, index) => index + 1,
		},
		{
			title: 'Kode Pelanggan',
			dataIndex: 'user_id',
			sorter: true,
		},
		{
			title: 'Nama Lengkap',
			dataIndex: `user[first_name]`,
			render: (_, record) =>
				`${record.user.first_name} ${record.user.last_name}`,
			sorter: true,
		},
		{
			align: 'center',
			title: 'Foto Profile',
			dataIndex: `user[profile_image]`,
			render: (_, record) => (
				<AtomImage src={record.user.profile_image} />
			),
			csvRender: (item) => item.user.profile_image,
		},
		{
			title: 'Tgl. Lahir',
			dataIndex: `user[birth]`,
			render: (date) => (
				<ReactMoment format="DD/MM/YY">{date}</ReactMoment>
			),
			csvRender: (item) => moment(item.user.birth).format('DD/MM/YYYY'),
			sorter: true,
		},
		{
			title: 'Jenis Kelamin',
			dataIndex: `user[gender]`,
			render: (_, record) => translateGenderEnum(record.user.gender),
			sorter: true,
		},
		{
			title: 'Status Perkawinan',
			dataIndex: 'marital_status',
			sorter: true,
		},
		{
			title: 'Email',
			dataIndex: `user[email]`,
			render: (_, record) => record.user.email,
			sorter: true,
		},
		{
			title: 'No. Hp',
			dataIndex: `user[phone_number]`,
			render: (_, record) => record.user.phone_number,
			sorter: true,
		},
		{
			align: 'center',
			title: 'Aksi',
			dataIndex: 'user_id',
			render: (user_id) => (
				<Space size="middle">
					<Link to={`/customers/friend-list/${user_id}`}>
						<EyeFilled className="f4 blue" />
					</Link>
				</Space>
			),
			skipExport: true,
		},
	];
	const friendListTableRef = useRef();

	const renderDatatableFilters = () => {
		return [
			<MoleculeDatatableFilter
				name="gender"
				operator=":"
				identifier="gender-filter"
				label="Jenis Kelamin"
				key="gender-filter"
				placeholder="Semua"
				data={{
					mock: [
						{
							value: 'FEMALE',
							label: 'Perempuan',
						},
						{
							value: 'MALE',
							label: 'Laki-laki',
						},
					],
				}}
			/>,
			<MoleculeDatatableDateRange
				name="birth"
				operator=":"
				identifier="daterangefilter"
				key="daterange"
				label="Tanggal Lahir"
				placeholder="Filter tanggal lahir"
			/>,
			<MoleculeDatatableFilter
				name="marital_status"
				operator=":"
				identifier="marital-status-filter"
				label="Status Perkawinan"
				key="marital-status-filter"
				placeholder="Semua"
				data={{
					mock: [
						{
							value: 'Belum Menikah',
							label: 'Belum Menikah',
						},
						{
							value: 'Menikah',
							label: 'Menikah',
						},
					],
				}}
			/>,
		];
	};

	return (
		<OrganismLayout
			breadcumbs={[
				{ name: 'Pelanggan', link: '/customers' },
				{ name: 'Daftar Teman', link: location.pathname },
			]}
			title="Daftar Teman Page"
		>
			<OrganismDatatable
				additionalAction={null}
				columns={column}
				mock={mock}
				// dataSourceURL={`friendLists`}
				filters={renderDatatableFilters()}
				ref={friendListTableRef}
				scroll={1920}
				searchInput={true}
				title={`Daftar Teman`}
			/>
		</OrganismLayout>
	);
};

export default FriendListPage;
