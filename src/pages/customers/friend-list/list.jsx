/* eslint-disable react/display-name */
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
			dataIndex: `first_name`,
			render: (_, record) =>
				`${record.first_name || '-'} ${record.last_name || ''}`,
			sorter: true,
		},
		{
			title: 'ID Teman',
			dataIndex: 'code',
			render: (_, record) => record.code || '-',
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
			dataIndex: `social_avatar`,
			render: (_, record) => <AtomImage src={record.social_avatar} />,
		},
		{
			title: 'Tgl. Lahir',
			dataIndex: `birth`,
			render: (date) =>
				date ? (
					<ReactMoment format="DD/MM/YY">{date}</ReactMoment>
				) : (
					'-'
				),
			sorter: true,
		},
		{
			title: 'Jenis Kelamin',
			dataIndex: `gender`,
			render: (_, record) => translateGenderEnum(record.gender || ''),
			sorter: true,
		},
		{
			title: 'Status Perkawinan',
			dataIndex: 'marital_status',
			render: (_, record) => record.marital_status || '-',
			sorter: true,
		},
		{
			title: 'Email',
			dataIndex: `email`,
			render: (_, record) => record.email || '-',
			sorter: true,
		},
		{
			title: 'No. Hp',
			dataIndex: `phone_number`,
			render: (_, record) => record.phone_number || '-',
			sorter: true,
		},
		{
			align: 'center',
			title: 'Aksi',
			dataIndex: 'id',
			render: (friend_id) => (
				<Space size="middle">
					<Link
						to={`/customers/friend-list/${id}/detail/${friend_id}`}
					>
						<EyeFilled className="f4 blue" />
					</Link>
				</Space>
			),
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
				dataSourceURL={`admin/customers/${id}/friends`}
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
