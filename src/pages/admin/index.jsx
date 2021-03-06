/* eslint-disable react/display-name */
import moment from 'moment';
import React, { useEffect, useRef, useState } from 'react';
import ReactMoment from 'react-moment';
import { Link } from 'react-router-dom';
import { message, Skeleton, Space } from 'antd';
import { EditFilled, EyeFilled } from '@ant-design/icons';

import AtomBranchDatatableFilter from '../../components/atoms/selection/branch-datatable';
import AtomImage from '../../components/atoms/image';
import AtomNumberFormat from '../../components/atoms/number-format';
import AtomStatusSwitch from '../../components/atoms/datatable/status-switch';
import MoleculeDatatableAdditionalAction from '../../components/molecules/datatable/additional-actions';
import MoleculeDatatableAdditionalInformation from '../../components/molecules/datatable/additional-information-card';
import MoleculeDatatableDateRange from '../../components/molecules/datatable/date-range-plugin';
import MoleculeDatatableFilter from '../../components/molecules/datatable/filter-plugin';
import MoleculeDeleteConfirm from '../../components/molecules/delete-confirm';
import OrganismDatatable from '../../components/organisms/datatable';
import OrganismLayout from '../../components/organisms/layout';
import { useSelector } from 'react-redux';

import AdminService from '../../services/admin';
import { translateGenderEnum } from '../../utils/helpers';

const AdminPage = () => {
	const [totalAdmin, setTotalAdmin] = useState(null);
	const { roles } = useSelector((state) => state.auth);

	const adminService = new AdminService();
	const adminTableRef = useRef();
	const column = [
		{
			align: 'center',
			title: 'No',
			dataIndex: 'id',
			render: (id, _, index) => index + 1,
		},
		{
			align: 'center',
			title: 'Foto',
			dataIndex: 'profile_image',
			render: (image) => <AtomImage src={image} />,
			csvRender: (item) => item.profile_image,
		},
		{
			title: 'ID',
			dataIndex: 'code',
		},
		{
			title: 'Tgl. Gabung',
			dataIndex: 'created_at',
			render: (date) => (
				<ReactMoment format="DD/MM/YY">{date}</ReactMoment>
			),
			csvRender: (item) => moment(item.created_at).format('DD/MM/YYYY'),
			sorter: true,
		},
		{
			title: 'Nama Admin',
			dataIndex: 'first_name',
			sorter: true,
			render: (_, record) => `${record.first_name} ${record.last_name}`,
		},
		{
			title: 'Email',
			dataIndex: 'email',
			sorter: true,
		},
		{
			title: 'No. Hp',
			dataIndex: 'phone_number',
			sorter: true,
		},

		{
			title: 'Peranan',
			dataIndex: 'roles',
			render: (roles) => roles.map((role) => role.name).join(', '),
			sorter: true,
		},
		{
			title: 'Cabang',
			dataIndex: 'branches',
			render: (branches) =>
				branches.map((branch) => branch.name.id).join(', '),
			sorter: true,
		},
		{
			title: 'Jenis Kelamin',
			dataIndex: 'gender',
			render: (gender) => translateGenderEnum(gender),
		},
		{
			title: 'Nomor Rek',
			dataIndex: 'bank_info',
			render: (bank) => bank.account_number || '-',
			width: 150,
		},
		{
			title: 'Bank',
			dataIndex: 'bank_info',
			render: (bank) => (bank.bank && bank.bank.name) || '-',
		},
		{
			align: 'center',
			title: 'Aktif',
			dataIndex: 'is_active',
			render: (active, record) => (
				<AtomStatusSwitch
					active={active}
					id={record.id}
					tableRef={adminTableRef}
					afterSuccessUpdate={() => {
						getTotalAdmin();
					}}
					url="admins"
				/>
			),
			csvRender: (item) => (item.is_active ? 'Aktif' : 'Tidak Aktif'),
		},
		{
			align: 'center',
			title: 'Aksi',
			dataIndex: 'id',
			render: (id, record) => (
				<Space size="middle">
					<Link to={`/admin/${id}/detail`}>
						<EyeFilled className="f4 blue" />
					</Link>

					{(roles === 'super-admin' || roles === 'admin') && (
						<Link to={`/admin/${id}/edit`}>
							<EditFilled className="f4 orange" />
						</Link>
					)}

					{!record.is_active && (
						<MoleculeDeleteConfirm
							id={id}
							label="Admin"
							tableRef={adminTableRef}
							afterSuccessDelete={() => {
								getTotalAdmin();
							}}
							url="admins"
						/>
					)}
				</Space>
			),
			skipExport: true,
		},
	];

	const getTotalAdmin = async () => {
		try {
			const total = await adminService.getTotalAdmin();

			setTotalAdmin(total);

			setTimeout(
				setTotalAdmin({ registered: 99999, active: 99999 }),
				2000
			);
		} catch (error) {
			message.error(error.message);
			console.error(error);
		}
	};

	const renderAdditionalAction = () => {
		return (
			<MoleculeDatatableAdditionalAction
				column={column}
				label="Admin"
				getLimit={() => adminTableRef.current.totalData}
				route="/admin"
				url="admins"
				withoutAddButton={roles !== 'super-admin'}
				withoutExportButton={roles !== 'super-admin'}
			/>
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
					value={<AtomNumberFormat value={totalAdmin.total} />}
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
					value={<AtomNumberFormat value={totalAdmin.actives} />}
				/>,
			]
		) : (
			<Skeleton active />
		);
	};

	const renderDatatableFilters = () => {
		return [
			<AtomBranchDatatableFilter key="branch-filter" />,

			<MoleculeDatatableFilter
				name="roles"
				operator=":"
				identifier="roles-filter"
				label="Peran"
				key="roles-filter"
				placeholder="Semua roles"
				data={{
					url: 'roles',
					generateCustomOption: (item) => ({
						value: item.name,
						label: item.name,
					}),
				}}
			/>,
			<MoleculeDatatableDateRange
				name="created_at"
				operator=":"
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
				dataSourceURL={`admins`}
				filters={renderDatatableFilters()}
				ref={adminTableRef}
				scroll={1920}
				searchInput={true}
				title={`Admin Menu`}
			/>
		</OrganismLayout>
	);
};

export default AdminPage;
