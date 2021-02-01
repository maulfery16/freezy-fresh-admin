/* eslint-disable react/display-name */
import React, { useEffect, useState } from 'react';
import ReactMoment from 'react-moment';
import { useHistory } from 'react-router-dom';
import { Button, Image, message, Popconfirm, Skeleton, Space } from 'antd';
import {
	DeleteFilled,
	EyeFilled,
	QuestionCircleFilled,
} from '@ant-design/icons';

import AtomNumberFormat from '../../components/atoms/number-format';
import MoleculeDatatableAdditionalInformation from '../../components/molecules/datatable/additional-information-card';
import MoleculeDatatableFilter from '../../components/molecules/datatable/filter-plugin';
import OrganismDatatable from '../../components/organisms/datatable';
import OrganismLayout from '../../components/organisms/layout';

// import AdminService from '../../services/admin';
// import MasterService from '../../services/master';

// const adminService = new AdminService();
// const masterService = new MasterService();

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
				'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAARIAAAC4CAMAAAAYGZMtAAAAdVBMVEVpXM2HfdFeUc7/8rbdyr7/7LiFe9H/87ZZTM9mWc1kV87/8LedjsdiVc5xZMzn1L6hlM1/ddKtncTz37qyosTWw7+XjM5+ccr96LmUhciGeMrXxb7/97VrXs1dUM6tn8p6cdPLucDiz72Rhs90bNTv27q6qcNOvLJNAAABwUlEQVR4nO3bXXPSQBiAUUyMdBPSKh9FpB+olf//EwUGCs72YsNY0Ow5V9wwszyThJdhdzAAAAAAAAAAAAAAAAAAAAAAAPjvtEUX7bWXewH1+GMX0xyaTJoyXTW8ufZ6L2DSPH9Odf81jyTl/adUq3ySfEgkiSSS7EkSkSQiyUFoQ9hNopLshUVVNd+3TSTZa6dNNZxJcmKTZDlw45xqp+Ws2L2SZE+SiCQRSSKSRCQ5CnVdB0lOhPloNFrUkhw9VU1TPiyCJK9uhtXd3Y9bV8nRJsmqKDxLTmySzDdPV0mOJIlIEpEk8laSn19SvWSSZPOtnKyPf5NHScKvDhsHyqZ6uvIH+PviJNsJP93uzf0S3zjb34Hp+lfkjSQpQp/3Hp2VJLyMH99xTVd2VpJi9jDu73VyZpKyx9v2JImcJkkeMZ4ySdIsB7eJBssmjyRVk6zKIcl2M0UXix7OaHuHJJuhNXTQx6n14DUJB92SZHGwolOSx+U6gyZdkoRvw8m7Lubf0C1JKcmf8kmyKto0xTyXJOtxoud1k0mS9INrTRZJ2mmn043j+toLvgBnYAEAAAAAAAAAAAAAAAAAAACA3vsNEW1B3Y++7NIAAAAASUVORK5CYII=',
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
				'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAARIAAAC4CAMAAAAYGZMtAAAAdVBMVEVpXM2HfdFeUc7/8rbdyr7/7LiFe9H/87ZZTM9mWc1kV87/8LedjsdiVc5xZMzn1L6hlM1/ddKtncTz37qyosTWw7+XjM5+ccr96LmUhciGeMrXxb7/97VrXs1dUM6tn8p6cdPLucDiz72Rhs90bNTv27q6qcNOvLJNAAABwUlEQVR4nO3bXXPSQBiAUUyMdBPSKh9FpB+olf//EwUGCs72YsNY0Ow5V9wwszyThJdhdzAAAAAAAAAAAAAAAAAAAAAAAPjvtEUX7bWXewH1+GMX0xyaTJoyXTW8ufZ6L2DSPH9Odf81jyTl/adUq3ySfEgkiSSS7EkSkSQiyUFoQ9hNopLshUVVNd+3TSTZa6dNNZxJcmKTZDlw45xqp+Ws2L2SZE+SiCQRSSKSRCQ5CnVdB0lOhPloNFrUkhw9VU1TPiyCJK9uhtXd3Y9bV8nRJsmqKDxLTmySzDdPV0mOJIlIEpEk8laSn19SvWSSZPOtnKyPf5NHScKvDhsHyqZ6uvIH+PviJNsJP93uzf0S3zjb34Hp+lfkjSQpQp/3Hp2VJLyMH99xTVd2VpJi9jDu73VyZpKyx9v2JImcJkkeMZ4ySdIsB7eJBssmjyRVk6zKIcl2M0UXix7OaHuHJJuhNXTQx6n14DUJB92SZHGwolOSx+U6gyZdkoRvw8m7Lubf0C1JKcmf8kmyKto0xTyXJOtxoud1k0mS9INrTRZJ2mmn043j+toLvgBnYAEAAAAAAAAAAAAAAAAAAACA3vsNEW1B3Y++7NIAAAAASUVORK5CYII=',
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
			width: 240,
			render: (date) => (
				<ReactMoment format="DD/MM/YY">{date}</ReactMoment>
			),
		},
		{
			title: 'Foto',
			dataIndex: 'image',
			width: 100,
			render: (image) => <Image preview src={image} width={100} />,
		},
		{
			title: 'Nama Admin',
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
			dataIndex: 'branches',
			sort: true,
			width: 240,
			render: (branches) => branches.join(', '),
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

	const [totalAdmin, setTotalAdmin] = useState(null);
	const [branchesOption, setbranchesOption] = useState([]);
	const history = useHistory();

	const getBranchesFilterOption = async () => {
		try {
			// const branches = await masterService.getBranches();
			// return branches.map(branch => ({label: branch.name, value: branch.id}))

			setbranchesOption([{ value: 'Bandung', label: 'Bandung' }]);
		} catch (error) {
			message.error(error.message);
		}
	};

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
				<Button className="br2 bg-denim white">Tambah Admin</Button>
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
				name="filter"
				operator="eq"
				identifier="branch-filter"
				label="Cabang"
				key="branch-filter"
				options={branchesOption}
				placeholder="Semua cabang"
			/>,
			// <MoleculeDateRangeFilter
			// 	filterName="created_at"
			// 	filterOperator="eq"
			// 	placeholder="Filter tanggal melamar"
			// 	size={4}
			// 	identifier="daterangefilter"
			// />
		];
	};

	useEffect(() => {
		(async () => {
			getBranchesFilterOption();
			getTotalAdmin();
		})();
	}, []);

	return (
		<OrganismLayout title="Admin Page">
			<OrganismDatatable
				additionalAction={renderAdditionalAction()}
				additionalInformation={renderAdditionalInformation()}
				columns={column}
				dataSourceURL={`/v1/admins`}
				filters={renderDatatableFilters()}
				mock={mock}
				searchInput={true}
				title={`Admin Menu`}
			/>
		</OrganismLayout>
	);
};

export default AdminPage;
