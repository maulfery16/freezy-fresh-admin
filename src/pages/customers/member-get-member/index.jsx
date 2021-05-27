/* eslint-disable no-unused-vars */
/* eslint-disable react/display-name */
import React, { useEffect, useState, useRef } from 'react';
import ReactMoment from 'react-moment';
import moment from 'moment';
import { Link } from 'react-router-dom';
import { Col, message, Row, Space, Skeleton, Typography } from 'antd';
import { EyeFilled } from '@ant-design/icons';

import AtomImage from '../../../components/atoms/image';
import AtomPrimaryButton from '../../../components/atoms/button/primary-button';
import AtomSectionTitle from '../../../components/atoms/section-title';
import MoleculeDatatableAdditionalAction from '../../../components/molecules/datatable/additional-actions';
import MoleculeDatatableFilter from '../../../components/molecules/datatable/filter-plugin';
import MoleculeOrderInfoGroup from '../../../components/molecules/info-group-order';
import OrganismDatatable from '../../../components/organisms/datatable';
import OrganismLayout from '../../../components/organisms/layout';

import MemberGetMemberService from '../../../services/member-get-member';

const MemberGetMemberListPage = () => {
	const mgmService = new MemberGetMemberService();
	const [mgm, setMgm] = useState(null);
	const [loading, setLoading] = useState(null);

	const getMgmDetail = async () => {
		try {
			setLoading(true);

			const { data: mgm } = await mgmService.getMemberGetMember();
			setMgm(mgm.data);
		} catch (error) {
			message.error(error.message);
			console.error(error);
		} finally {
			setLoading(false);
		}
	};

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
				route="/customer/member-get-member"
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

	useEffect(() => {
		(async () => {
			await getMgmDetail();
		})();
	}, []);

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

						<Link
							to={{
								pathname: 'member-get-member/edit',
								state: {
									mgm: mgm,
								},
							}}
						>
							<AtomPrimaryButton size="large">
								Edit Detail
							</AtomPrimaryButton>
						</Link>
					</Row>
				</Col>

				{loading ? (
					<Skeleton active />
				) : mgm && !loading ? (
					<>
						<Col className="mt4" span={24}>
							<Row gutter={[12, 12]} className="bg-white pa4">
								<Col span={24}>
									<AtomSectionTitle title="Info Member Get Member" />
								</Col>

								<Col span={10}>
									<MoleculeOrderInfoGroup
										title="Nominal Point Pelanggan (pts)"
										content={mgm[0].value}
									/>
								</Col>

								<Col span={10}>
									<MoleculeOrderInfoGroup
										title="Nominal Point Member (pts)"
										content={mgm[1].value}
									/>
								</Col>

								<Col span={10}>
									<MoleculeOrderInfoGroup
										title="Nominal Minimal Belanja"
										content={mgm[2].value}
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
												{mgm[0].created_at}
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
												{mgm[0].updated_at}
											</ReactMoment>
										}
									/>
								</Col>
								<Col span={10}>
									<MoleculeOrderInfoGroup
										title="Didaftarkah Oleh"
										content={mgm[0].created_by}
									/>
								</Col>
								<Col span={10}>
									<MoleculeOrderInfoGroup
										title="Diperbaharui Oleh"
										content={mgm[0].updated_by}
									/>
								</Col>
							</Row>
						</Col>
					</>
				) : null}
			</Row>

			<OrganismDatatable
				additionalAction={renderAdditionalAction()}
				columns={column}
				dataSourceURL={``}
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
