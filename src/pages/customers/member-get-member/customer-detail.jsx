/* eslint-disable no-unused-vars */
/* eslint-disable react/display-name */
import React, { useEffect, useState, useRef } from 'react';
import ReactMoment from 'react-moment';
import { useParams } from 'react-router-dom';
import { Col, message, Row, Skeleton, Typography } from 'antd';

import AtomCard from '../../../components/atoms/card';
import MoleculeOrderInfoGroup from '../../../components/molecules/info-group-order';
import OrganismLayout from '../../../components/organisms/layout';
import OrganismMgmDatatable from '../../../components/organisms/datatable/mgm-datatable';

import MemberGetMemberService from '../../../services/customer';

const MemberGetMemberListPage = () => {
	const customerService = new MemberGetMemberService();

	const { id } = useParams();
	const [customer, setCustomer] = useState(null);
	const [loading, setLoading] = useState(null);

	const getCustomerDetail = async () => {
		try {
			setLoading(true);

			const { data: customer } = await customerService.getCustomerById(
				id
			);
			if (!Array.isArray(customer)) setCustomer(customer);
		} catch (error) {
			message.error(error.message);
			console.error(error);
		} finally {
			setLoading(false);
		}
	};

	useEffect(() => {
		(async () => {
			await getCustomerDetail();
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
				{
					name: 'Detail Customer',
					link: location.pathname,
				},
			]}
			title="Member Get Member Page"
		>
			<Row className="mb4">
				<Col span={24}>
					<Row justify="space-between">
						<Typography.Text strong>
							<span className="f4">Detail Pelanggan</span>
						</Typography.Text>
					</Row>
				</Col>

				{loading ? (
					<Skeleton active />
				) : customer && !loading ? (
					<>
						<Col className="mt4" span={18}>
							<AtomCard title="Info Member Get Member">
								<Row gutter={[12, 24]}>
									<Col span={12}>
										<MoleculeOrderInfoGroup
											title="Kode Pelanggan"
											content={customer.code || 0}
										/>
									</Col>

									<Col span={12}>
										<MoleculeOrderInfoGroup
											title="Tanggal Lahir"
											content={
												customer ? (
													<ReactMoment
														format="DD/MM/YYYY"
														locale="id"
													>
														{customer.birth}
													</ReactMoment>
												) : (
													'-'
												)
											}
										/>
									</Col>

									<Col span={12}>
										<MoleculeOrderInfoGroup
											title="Nama Depan"
											content={customer.first_name}
										/>
									</Col>

									<Col span={12}>
										<MoleculeOrderInfoGroup
											title="Nama Belakang"
											content={customer.last_name || '-'}
										/>
									</Col>

									<Col span={12}>
										<MoleculeOrderInfoGroup
											title="Email"
											content={customer.email || '-'}
										/>
									</Col>

									<Col span={12}>
										<MoleculeOrderInfoGroup
											title="Nomor Handphone"
											content={
												customer.phone_number || '-'
											}
										/>
									</Col>

									<Col span={12}>
										<MoleculeOrderInfoGroup
											title="Tanggal Pendaftaran"
											content={
												customer ? (
													<ReactMoment
														format="DD/MM/YYYY"
														locale="id"
													>
														{customer.created_at}
													</ReactMoment>
												) : (
													'-'
												)
											}
										/>
									</Col>

									<Col span={12}>
										<MoleculeOrderInfoGroup
											title="Diajak Oleh"
											content={customer.invited_by || '-'}
										/>
									</Col>
								</Row>
							</AtomCard>
						</Col>
					</>
				) : null}
			</Row>

			<OrganismMgmDatatable
				dataSourceURL={`mgms/${id}`}
				withoutAddButton
				withoutExportButton
			/>
		</OrganismLayout>
	);
};

export default MemberGetMemberListPage;
