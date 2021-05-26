/* eslint-disable no-unused-vars */
/* eslint-disable react/display-name */
import React, { useRef } from 'react';
import ReactMoment from 'react-moment';
import moment from 'moment';
import { Link } from 'react-router-dom';
import { Col, Row, Space, Typography } from 'antd';
import { EyeFilled } from '@ant-design/icons';

import AtomImage from '../../../components/atoms/image';
import MoleculeDatatableAdditionalAction from '../../../components/molecules/datatable/additional-actions';
import MoleculeDatatableFilter from '../../../components/molecules/datatable/filter-plugin';
import OrganismDatatable from '../../../components/organisms/datatable';
import OrganismLayout from '../../../components/organisms/layout';
import AtomPrimaryButton from '../../../components/atoms/button/primary-button';
import AtomCard from '../../../components/atoms/card';
import AtomSectionTitle from '../../../components/atoms/section-title';
import MoleculeOrderInfoGroup from '../../../components/molecules/info-group-order';

const MemberGetMemberListPage = () => {
	const column = [
		{
			align: 'center',
			title: 'No',
			dataIndex: 'id',
			render: (id, _, index) => index + 1,
		},
		{
			title: 'Kode Pelanggan ',
			dataIndex: 'customer',
			sorter: true,
			render: (customer) => customer.code,
			csvRender: (item) => item.customer.code,
		},
		{
			title: 'Nama Depan',
			dataIndex: 'customer',
			sorter: true,
			render: (customer) => customer.first_name,
			csvRender: (item) => item.customer.first_name,
		},
		{
			title: 'Nama Belakang',
			dataIndex: 'customer',
			sorter: true,
			render: (customer) => customer.last_name,
			csvRender: (item) => item.customer.last_name,
		},
		{
			align: 'center',
			title: 'Foto Profile',
			dataIndex: 'customer',
			render: (customer) => <AtomImage src={customer.profile_image} />,
			csvRender: (item) => item.customer.profile_image,
		},
		{
			title: 'Tanggal Lahir',
			dataIndex: 'customer',
			sorter: true,
			csvRender: (item) =>
				moment(item.customer.birth).format('DD/MM/YYYY'),
			render: (customer) => (
				<ReactMoment format="DD/MM/YY">{customer.birth}</ReactMoment>
			),
		},
		{
			title: 'Jenis Kelamin',
			dataIndex: 'customer',
			sorter: true,
			render: (customer) => customer.gender,
			csvRender: (item) => item.customer.gender,
		},
		{
			title: 'Email',
			dataIndex: 'customer',
			sorter: true,
			render: (customer) => customer.email,
			csvRender: (item) => item.customer.email,
		},
		{
			title: 'No Telepon',
			dataIndex: 'customer',
			sorter: true,
			render: (customer) => customer.phone_number,
			csvRender: (item) => item.customer.phone_number,
		},
		{
			align: 'center',
			title: 'Foto KTP',
			dataIndex: 'customer',
			render: (customer) => <AtomImage src={customer.ktp_photo} />,
			csvRender: (item) => item.customer.ktp_photo,
		},
		{
			title: 'Total Member Join',
			dataIndex: 'total_member_ids',
			sorter: true,
		},
		{
			title: 'Total Member Berhasil',
			dataIndex: 'succeed_member_ids',
			sorter: true,
		},
		{
			title: 'Total Member Gagal',
			dataIndex: 'failed_member_ids',
			sorter: true,
		},
		{
			title: 'Total Cashback',
			dataIndex: 'total_cashback',
			sorter: true,
		},
		{
			align: 'center',
			title: 'Aksi',
			dataIndex: 'id',
			render: (id, record) => (
				<Space size="middle">
					<Link to={`/customer/member-get-member/${id}/detail`}>
						<EyeFilled className="f4 blue" />
					</Link>
				</Space>
			),
			skipExport: true,
		},
	];
	const memberGetMemberRef = useRef();

	const renderAdditionalAction = () => {
		return (
			<MoleculeDatatableAdditionalAction
				column={column}
				getLimit={() => memberGetMemberRef.current.totalData}
				label="Member Get Member"
				route="/customer/member-get-meber"
				url="mgms"
				withoutAddButton
			/>
		);
	};

	const renderDatatableFilters = () => {
		return [
			<MoleculeDatatableFilter
				name="gender"
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

	return (
		<OrganismLayout
			breadcumbs={[
				{ name: 'Customer', link: '/customer' },
				{
					name: 'Member Get Member',
					link: '/customer/member-get-member',
				},
			]}
			title="Member Get Member Page"
		>
			<Row className="mb4">
				<Col span={24}>
					<Row justify="space-between">
						<Typography.Text strong>
							<span className="f4">Member Get Member</span>
						</Typography.Text>

						<Link to={`member-get-member/${`xx`}/edit`}>
							<AtomPrimaryButton size="large">
								Edit Detail
							</AtomPrimaryButton>
						</Link>
					</Row>
				</Col>

				<Col className="mt3" span={24}>
					<Row gutter={[12, 12]} className="bg-white pa4">
						<Col span={24}>
							<AtomSectionTitle title="Info Member Get Member" />
						</Col>

						<Col span={10}>
							<MoleculeOrderInfoGroup
								title="Nominal Point Pelanggan (pts)"
								content={null}
							/>
						</Col>

						<Col span={10}>
							<MoleculeOrderInfoGroup
								title="Nominal Point Member (pts)"
								content={null}
							/>
						</Col>

						<Col span={10}>
							<MoleculeOrderInfoGroup
								title="Nominal Minimal Belanja"
								content={null}
							/>
						</Col>
					</Row>
				</Col>

				<Col span={24}>
					<Row gutter={[12, 12]} className="bg-white pa4">
						<Col span={24}>
							<AtomSectionTitle title="Info Update Produk" />
						</Col>

						<Col span={10}>
							<MoleculeOrderInfoGroup
								title="Tanggal Pendaftaran"
								content={
									<ReactMoment
										format="DD MMMM YY HH:ss"
										locale="id"
									>
										{null}
									</ReactMoment>
								}
							/>
						</Col>
						<Col span={10}>
							<MoleculeOrderInfoGroup
								title="Tanggal Diperbaharui"
								content={
									<ReactMoment
										format="DD MMMM YY HH:ss"
										locale="id"
									>
										{null}
									</ReactMoment>
								}
							/>
						</Col>
						<Col span={10}>
							<MoleculeOrderInfoGroup
								title="Didaftarkah Oleh"
								content={null}
							/>
						</Col>
						<Col span={10}>
							<MoleculeOrderInfoGroup
								title="Diperbaharui Oleh"
								content={null}
							/>
						</Col>
					</Row>
				</Col>
			</Row>

			<OrganismDatatable
				additionalAction={renderAdditionalAction()}
				columns={column}
				dataSourceURL={`mgms`}
				filters={renderDatatableFilters()}
				ref={memberGetMemberRef}
				scroll={2280}
				searchInput={true}
				title={`Daftar Pelanggan`}
			/>
		</OrganismLayout>
	);
};

export default MemberGetMemberListPage;
