/* eslint-disable react/display-name */
import React, { useRef } from 'react';
import ReactMoment from 'react-moment';
import { Link } from 'react-router-dom';
import { Space } from 'antd';
import { EyeFilled } from '@ant-design/icons';

import AtomGenderDatatableFilter from '../../../components/atoms/selection/gender-datatable';
import AtomImage from '../../../components/atoms/image';
import MoleculeDatatableDateRange from '../../../components/molecules/datatable/date-range-plugin';
import MoleculeDatatableFilter from '../../../components/molecules/datatable/filter-plugin';
import OrganismDatatable from '../../../components/organisms/datatable';
import OrganismLayout from '../../../components/organisms/layout';

import { translateGenderEnum } from '../../../utils/helpers';

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
			dataIndex: 'code',
			render: (_, record) => record.code || '-',
			sorter: true,
		},
		{
			title: 'Nama Lengkap',
			dataIndex: `first_name`,
			render: (_, record) =>
				`${record.first_name || '-'} ${record.last_name || ''}`,
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
			render: (id) => (
				<Space size="middle">
					<Link to={`/customers/friend-list/${id}`}>
						<EyeFilled className="f4 blue" />
					</Link>
				</Space>
			),
		},
	];
	const friendListTableRef = useRef();

	const renderDatatableFilters = () => {
		return [
			<AtomGenderDatatableFilter key="gender-filter" />,
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
				dataSourceURL={`admin/customers`}
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
