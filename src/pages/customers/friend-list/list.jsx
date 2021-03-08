/* eslint-disable react/display-name */
import moment from 'moment';
import React, { useRef } from 'react';
import ReactMoment from 'react-moment';
import { Link, useParams } from 'react-router-dom';
import { Space } from 'antd';
import { EyeFilled } from '@ant-design/icons';

import AtomImage from '../../../components/atoms/image';
import MoleculeDatatableFilter from '../../../components/molecules/datatable/filter-plugin';
import OrganismDatatable from '../../../components/organisms/datatable';
import OrganismLayout from '../../../components/organisms/layout';

import {
	convertFriendshipStatus,
	translateGenderEnum,
} from '../../../utils/helpers';

const mock = {
	data: [
		{
			friend_id: '4zr8mb07lykowjaq',
			status_name: 'Requested',
			user: {
				first_name: 'Musa',
				last_name: 'Example',
				phone_number: '+6281910094095',
				email: 'musa.example2@gmail.com',
				gender: 'MALE',
				birth: '1997-11-07',
				profile_image:
					'http://s3.amazonaws.com/37assets/svn/765-default-avatar.png',
			},
			marital_status: 'Menikah',
		},
		{
			friend_id: '4zr8mb07lykowjww',
			status_name: 'Approved',
			user: {
				first_name: 'Hana',
				last_name: 'Example',
				phone_number: '+6281910094094',
				email: 'hana.example2@gmail.com',
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
	const { id } = useParams();

	const column = [
		{
			align: 'center',
			title: 'No',
			dataIndex: 'id',
			render: (id, _, index) => index + 1,
		},
		{
			title: 'Nama Teman',
			dataIndex: `user[first_name]`,
			render: (_, record) =>
				`${record.user.first_name} ${record.user.last_name}`,
			sorter: true,
		},
		{
			title: 'ID Teman',
			dataIndex: 'friend_id',
			sorter: true,
		},
		{
			title: 'Status Pertemanan',
			dataIndex: 'status_name',
			render: (_, record) => convertFriendshipStatus(record.status_name),
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
			dataIndex: 'friend_id',
			render: (friend_id) => (
				<Space size="middle">
					<Link
						to={`/customers/friend-list/${id}/detail/${friend_id}`}
					>
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
			<MoleculeDatatableFilter
				name="status_name"
				operator=":"
				identifier="status-name-filter"
				label="Status Pertemanan"
				key="status-name-filter"
				placeholder="Semua"
				data={{
					mock: [
						{
							value: 'Requested',
							label: 'Menunggu Persetujuan',
						},
						{
							value: 'Approved',
							label: 'Disetujui',
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
				{ name: 'Daftar Teman', link: '/customers/friend-list' },
				{
					name: 'Detail Daftar Teman',
					link: location.pathname,
				},
			]}
			title="Detail Daftar Teman Page"
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
				title={`Detail Daftar Teman`}
			/>
		</OrganismLayout>
	);
};

export default FriendListPage;
