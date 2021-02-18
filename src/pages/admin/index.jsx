/* eslint-disable react/display-name */
import React, { useEffect, useRef, useState } from 'react';
import ReactMoment from 'react-moment';
import { Link } from 'react-router-dom';
import { Image, message, Skeleton, Space } from 'antd';
import { EyeFilled } from '@ant-design/icons';

import AtomNumberFormat from '../../components/atoms/number-format';
import MoleculeDatatableAdditionalAction from '../../components/molecules/datatable/additional-actions';
import MoleculeDatatableAdditionalInformation from '../../components/molecules/datatable/additional-information-card';
import MoleculeDatatableDateRange from '../../components/molecules/datatable/date-range-plugin';
import MoleculeDatatableFilter from '../../components/molecules/datatable/filter-plugin';
import MoleculeDeleteConfirm from '../../components/molecules/delete-confirm';
import OrganismDatatable from '../../components/organisms/datatable';
import OrganismLayout from '../../components/organisms/layout';

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
			dataIndex: 'first_name',
			sort: true,
			render: (_, record) => `${record.first_name} ${record.last_name}`,
		},
		{
			title: 'Foto',
			dataIndex: 'profile_image',
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
			render: (branches) =>
				branches.map((branch) => branch.name).join(', '),
		},
		{
			title: 'Jenis Kelamin',
			dataIndex: 'gender',
		},
		{
			title: 'Nomor Rek',
			dataIndex: 'bank_info',
			render: (bank) => bank.account_number,
		},
		{
			title: 'Bank',
			dataIndex: 'bank_info',
			render: (bank) => bank.bank,
		},
		{
			title: 'Aksi',
			dataIndex: 'id',
			render: (id) => (
				<Space size="middle">
					<Link to={`/admin/${id}/detail`}>
						<EyeFilled className="f4 blue" />
					</Link>

					<MoleculeDeleteConfirm
						id={id}
						label="Admin"
						tableRef={adminTableRef}
						url="admins"
					/>
				</Space>
			),
		},
	];
	const adminTableRef = useRef();

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
				operator=":"
				identifier="branches-filter"
				label="Cabang"
				key="branches-filter"
				placeholder="Semua cabang"
				data={{ url: 'branches' }}
			/>,
			<MoleculeDatatableFilter
				name="roles"
				operator=":"
				identifier="roles-filter"
				label="Peran"
				key="roles-filter"
				placeholder="Semua roles"
				data={{
					url: 'roles',
					mock: [
						{
							label: 'Administrator',
							value: 'asdasd',
						},
						{
							label: 'Kasir',
							value: 'aihkbfiu3',
						},
					],
				}}
			/>,
			<MoleculeDatatableDateRange
				name="joined_at"
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
