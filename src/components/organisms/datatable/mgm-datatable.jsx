/* eslint-disable react/display-name */
import moment from 'moment';
import PropTypes from 'prop-types';
import React, { useRef } from 'react';
import ReactMoment from 'react-moment';
import { Link } from 'react-router-dom';
import { Space } from 'antd';
import { EyeFilled } from '@ant-design/icons';

import AtomImage from '../../../components/atoms/image';
import AtomNumberFormat from '../../../components/atoms/number-format';
import MoleculeDatatableAdditionalAction from '../../../components/molecules/datatable/additional-actions';
import MoleculeDatatableFilter from '../../../components/molecules/datatable/filter-plugin';
import OrganismDatatable from '../../../components/organisms/datatable';

import { translateGenderEnum } from '../../../utils/helpers';

const OrganismMgmDatatable = (props) => {
	const isMgmMember = props.dataSourceURL || false;

	const mgmColumn = [
		{
			align: 'center',
			title: 'No',
			dataIndex: 'id',
			render: (id, _, index) => index + 1,
		},
		{
			title: 'Kode Pelanggan ',
			dataIndex: 'user',
			sorter: true,
			render: (user) => user?.code,
			csvRender: (item) => item?.user?.code,
		},
		{
			title: 'Nama Depan',
			dataIndex: 'user',
			sorter: true,
			render: (user) => user?.first_name,
			csvRender: (item) => item?.user?.first_name,
		},
		{
			title: 'Nama Belakang',
			dataIndex: 'user',
			sorter: true,
			render: (user) => user?.last_name,
			csvRender: (item) => item?.user?.last_name,
		},
		{
			align: 'center',
			title: 'Foto Profile',
			dataIndex: 'user',
			render: (user) => <AtomImage src={user?.profile_image} />,
			csvRender: (item) => item?.user?.profile_image,
		},
		{
			title: 'Tanggal Lahir',
			dataIndex: 'user',
			sorter: true,
			csvRender: (item) =>
				item?.user?.birth
					? moment(item?.user?.birth).format('DD/MM/YYYY')
					: '-',
			render: (user) =>
				user?.birth ? (
					<ReactMoment format="DD/MM/YYYY">{user?.birth}</ReactMoment>
				) : (
					'-'
				),
		},
		{
			title: 'Jenis Kelamin',
			dataIndex: 'user',
			sorter: true,
			render: (user) => translateGenderEnum(user?.gender),
			csvRender: (item) => item?.user?.gender,
		},
		{
			title: 'Email',
			dataIndex: 'user',
			sorter: true,
			render: (user) => user?.email,
			csvRender: (item) => item?.user?.email,
		},
		{
			title: 'No Handphone',
			dataIndex: 'user',
			sorter: true,
			render: (user) => user?.phone_number,
			csvRender: (item) => item?.user?.phone_number,
		},
		{
			align: 'center',
			title: 'Foto KTP',
			dataIndex: 'user',
			render: (user) => <AtomImage src={user?.idcard_image} />,
			csvRender: (item) => item?.user?.idcard_image,
		},
		{
			title: 'Total Member Join',
			dataIndex: 'total_member_ids',
			render: (total_member_ids) => total_member_ids || 0,
			sorter: true,
		},
		{
			title: 'Total Member Berhasil',
			dataIndex: 'succeed_member_ids',
			render: (succeed_member_ids) => succeed_member_ids || 0,
			sorter: true,
		},
		{
			title: 'Total Member Gagal',
			dataIndex: 'failed_member_ids',
			render: (failed_member_ids) => failed_member_ids || 0,
			sorter: true,
		},
		{
			title: 'Member Cashback',
			dataIndex: 'member_cashback',
			render: (member_cashback) => (
				<AtomNumberFormat value={member_cashback || 0} />
			),
			csvRender: (item) =>
				item?.member_cashback || 0,
			sorter: true,
		},
		{
			title: 'Customer Cashback',
			dataIndex: 'customer_cashback',
			render: (customer_cashback) => (
				<AtomNumberFormat value={customer_cashback || 0} />
			),
			csvRender: (item) =>
				item?.customer_cashback || 0,
			sorter: true,
		},
		{
			align: 'center',
			title: 'Aksi',
			dataIndex: 'id',
			render: (id, record) => (
				<Space size="middle">
					<Link
						to={`/customer/member-get-member/customer/${record?.user_id}/detail`}
					>
						<EyeFilled className="f4 blue" />
					</Link>
				</Space>
			),
			skipExport: true,
		},
	];

	const mgmMemberColumn = [
		{
			align: 'center',
			title: 'No',
			dataIndex: 'id',
			render: (id, _, index) => index + 1,
		},
		{
			title: 'Kode Pelanggan',
			dataIndex: 'member',
			sorter: true,
			render: (member) => member?.code,
			csvRender: (item) => item?.member?.code,
		},
		{
			title: 'Nama Depan',
			dataIndex: 'member',
			sorter: true,
			render: (member) => member?.first_name,
			csvRender: (item) => item?.member?.first_name,
		},
		{
			title: 'Nama Belakang',
			dataIndex: 'member',
			sorter: true,
			render: (member) => member?.last_name,
			csvRender: (item) => item?.member?.last_name,
		},
		{
			align: 'center',
			title: 'Foto Profile',
			dataIndex: 'member',
			render: (member) => <AtomImage src={member?.profile_image} />,
			csvRender: (item) => item?.member?.profile_image,
		},
		{
			title: 'Status Member',
			dataIndex: 'status',
			sorter: true,
			render: (status) =>
				status === 'SUCCEED' ? 'Joined' : 'Not Joined',
			csvRender: (item) =>
				item?.status === 'SUCCEED' ? 'Joined' : 'Not Joined',
		},
		{
			title: 'Member Cashback',
			dataIndex: 'member_cashback',
			render: (member_cashback) => (
				<AtomNumberFormat value={member_cashback || 0} />
			),
			sorter: true,
		},
		{
			title: 'Customer Cashback',
			dataIndex: 'customer_cashback',
			render: (customer_cashback) => (
				<AtomNumberFormat value={customer_cashback || 0} />
			),
			sorter: true,
		},
		{
			title: 'Tanggal Daftar',
			dataIndex: 'member',
			sorter: true,
			csvRender: (item) =>
				item?.member?.created_at
					? moment(item?.member?.created_at).format('DD/MM/YYYY')
					: '-',
			render: (member) =>
				member?.created_at ? (
					<ReactMoment format="DD/MM/YYYY">
						{member?.created_at}
					</ReactMoment>
				) : (
					'-'
				),
		},
		{
			title: 'Didaftarkan Oleh ',
			dataIndex: 'member',
			sorter: true,
			render: (member) => member?.invited_by || '-',
			csvRender: (item) => item?.member?.invited_by || '-',
		},
		{
			title: 'Tanggal Update',
			dataIndex: 'member',
			sorter: true,
			csvRender: (item) =>
				item?.member?.updated_at
					? moment(item?.member?.updated_at).format('DD/MM/YYYY')
					: '-',
			render: (member) =>
				member?.updated_at ? (
					<ReactMoment format="DD/MM/YYYY">
						{member?.updated_at}
					</ReactMoment>
				) : (
					'-'
				),
		},
		{
			title: 'Diupdate Oleh ',
			dataIndex: 'member',
			sorter: true,
			render: (member) => member?.updated_by || '-',
			csvRender: (item) => item?.member?.updated_by || '-',
		},
	];

	const renderDatatableFilters = () => {
		return [
			<MoleculeDatatableFilter
				name="customer.gender"
				operator=":"
				identifier="gender-filter"
				label="Jenis Kelamin"
				key="gender-filter"
				placeholder="Semua jenis kelamin"
				data={{
					options: [
						{
							value: 'MALE',
							label: 'Laki-laki',
						},
						{
							value: 'FEMALE',
							label: 'Perempuan',
						},
					],
				}}
			/>,
		];
	};

	const memberGetMemberRef = useRef();

	const renderAdditionalAction = () => {
		return (
			<MoleculeDatatableAdditionalAction
				column={mgmColumn}
				getLimit={() => memberGetMemberRef.current.totalData}
				label="Member Get Member"
				route="/customer/member-get-member"
				url="mgms"
				withoutAddButton={props.withoutAddButton}
				withoutExportButton={props.withoutExportButton}
			/>
		);
	};

	return (
		<OrganismDatatable
			additionalAction={renderAdditionalAction()}
			columns={isMgmMember ? mgmMemberColumn : mgmColumn}
			dataSourceURL={props.dataSourceURL || `mgms`}
			filters={isMgmMember ? null : renderDatatableFilters()}
			ref={memberGetMemberRef || null}
			scroll={2280}
			searchInput={!isMgmMember}
			title={`Daftar ${isMgmMember ? 'Member' : 'Pelanggan'}`}
		/>
	);
};

OrganismMgmDatatable.propTypes = {
	dataSourceURL: PropTypes.string,
	withoutAddButton: PropTypes.bool,
	withoutExportButton: PropTypes.bool,
};

export default OrganismMgmDatatable;
