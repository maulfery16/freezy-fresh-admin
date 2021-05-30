/* eslint-disable no-unused-vars */
/* eslint-disable react/display-name */
import React, { useEffect, useState, useRef } from 'react';
import ReactMoment from 'react-moment';
import { Link } from 'react-router-dom';
import { Col, message, Row, Skeleton, Typography } from 'antd';

import AtomCard from '../../../components/atoms/card';
import AtomNumberFormat from '../../../components/atoms/number-format';
import AtomPrimaryButton from '../../../components/atoms/button/primary-button';
import AtomSectionTitle from '../../../components/atoms/section-title';
import MoleculeOrderInfoGroup from '../../../components/molecules/info-group-order';
import OrganismLayout from '../../../components/organisms/layout';
import OrganismMgmDatatable from '../../../components/organisms/datatable/mgm-datatable';

import MemberGetMemberService from '../../../services/member-get-member';

const MemberGetMemberListPage = () => {
	const mgmService = new MemberGetMemberService();
	const [mgm, setMgm] = useState(null);
	const [loading, setLoading] = useState(null);

	const getMgmDetail = async () => {
		try {
			setLoading(true);

			const { data: mgm } = await mgmService.getMemberGetMember();
			if (Array.isArray(mgm.data))
				if (mgm.data.length > 0) setMgm(mgm.data);
		} catch (error) {
			message.error(error.message);
			console.error(error);
		} finally {
			setLoading(false);
		}
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
				) : !loading ? (
					<>
						<Col className="mt4" span={18}>
							<AtomCard title="Info Member Get Member">
								<Row gutter={[12]}>
									<Col span={12}>
										<MoleculeOrderInfoGroup
											title="Nominal Point Pelanggan (Pts)"
											content={mgm?.[1]?.value || 0}
										/>
									</Col>

									<Col span={12}>
										<MoleculeOrderInfoGroup
											title="Nominal Point Member (Pts)"
											content={mgm?.[0]?.value || 0}
										/>
									</Col>

									<Col span={12}>
										<MoleculeOrderInfoGroup
											title="Nominal Minimal Belanja (Rp)"
											content={
												<AtomNumberFormat
													value={
														Number(
															mgm?.[2]?.value
														) || 0
													}
												/>
											}
										/>
									</Col>

									<Col
										span={24}
										style={{ paddingTop: '2rem' }}
									>
										<Typography.Text strong>
											<span className="denim f5">
												INFO UPDATE
											</span>
										</Typography.Text>
									</Col>

									<Col span={12}>
										<MoleculeOrderInfoGroup
											title="Tanggal Pendaftaran"
											content={
												mgm ? (
													<ReactMoment
														format="DD MMMM YY HH:ss"
														locale="id"
													>
														{mgm[0].created_at}
													</ReactMoment>
												) : (
													'-'
												)
											}
										/>
									</Col>

									<Col span={12}>
										<MoleculeOrderInfoGroup
											title="Tanggal Diperbaharui"
											content={
												mgm ? (
													<ReactMoment
														format="DD MMMM YY HH:ss"
														locale="id"
													>
														{mgm[0].updated_at}
													</ReactMoment>
												) : (
													'-'
												)
											}
										/>
									</Col>

									<Col span={12}>
										<MoleculeOrderInfoGroup
											title="Didaftarkah Oleh"
											content={
												mgm?.[0]?.created_by || '-'
											}
										/>
									</Col>

									<Col span={12}>
										<MoleculeOrderInfoGroup
											title="Diperbaharui Oleh"
											content={
												mgm?.[0]?.updated_by || '-'
											}
										/>
									</Col>
								</Row>
							</AtomCard>
						</Col>
					</>
				) : null}
			</Row>

			<OrganismMgmDatatable withoutAddButton />
		</OrganismLayout>
	);
};

export default MemberGetMemberListPage;
