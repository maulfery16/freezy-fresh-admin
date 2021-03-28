import React, { useEffect, useState } from 'react';
import ReactMoment from 'react-moment';

import { Badge, Col, message, Row, Skeleton, Space, Typography } from 'antd';
import { Link, useParams } from 'react-router-dom';

import AtomCard from '../../../components/atoms/card';
import AtomSecondaryButton from '../../../components/atoms/button/secondary-button';
import MoleculeImageGroup from '../../../components/molecules/molecule-image-group';
import MoleculeInfoGroup from '../../../components/molecules/info-group';
import OrganismLayout from '../../../components/organisms/layout';

import { translateGenderEnum } from '../../../utils/helpers';
import FriendListService, {
	translateFriendshipStatus,
} from '../../../services/friend-list';
const friendListService = new FriendListService();

const FriendProfileDetailPage = () => {
	const { id, friend_id } = useParams();
	const [friendProfile, setFriendProfile] = useState(null);

	const getFriendProfileDetail = async (id, friend_id) => {
		try {
			const _friendProfile = await friendListService.getFriendProfileById(
				id,
				{
					detail_type: 'friend',
					user_id: friend_id,
				}
			);
			setFriendProfile(_friendProfile.data);
		} catch (error) {
			message.error(error.message);
			console.error(error);
		}
	};

	useEffect(() => {
		(async () => {
			getFriendProfileDetail(id, friend_id);
		})();
	}, []);

	return (
		<OrganismLayout
			breadcumbs={[
				{ name: 'Pelanggan', link: '/customers' },
				{ name: 'Daftar Teman', link: '/customers/friend-list' },
				{
					name: 'Detail Daftar Teman',
					link: `/customers/friend-list/${id}`,
				},
				{ name: 'Profile Teman', link: location.pathname },
			]}
			title="Detail Profile Teman"
		>
			<Typography.Title level={4}>
				<span className="fw7">
					{`Detail Profile Teman`.toUpperCase()}
				</span>
			</Typography.Title>

			{!friendProfile ? (
				<Skeleton active />
			) : (
				<Row align="top" className="mt4" gutter={24}>
					<Col span={15}>
						<AtomCard title="Info Teman">
							<Row gutter={[12, 24]}>
								<Col span={24}>
									<MoleculeInfoGroup
										title="Foto Profil"
										content={
											<MoleculeImageGroup
												images={[
													{
														source:
															friendProfile.social_avatar,
														label: '',
													},
												]}
											/>
										}
									/>
								</Col>

								<Col span={12}>
									<MoleculeInfoGroup
										title="Status Pertemanan"
										content={
											<Badge
												count={translateFriendshipStatus(
													friendProfile.status_name
												)}
												style={{
													backgroundColor: `${
														friendProfile.status_name ===
														'Requested'
															? 'orange'
															: 'green'
													}`,
												}}
											/>
										}
									/>
								</Col>

								<Col span={12}>
									<MoleculeInfoGroup
										title="ID Teman"
										content={friendProfile.id}
									/>
								</Col>

								<Col span={12}>
									<MoleculeInfoGroup
										title="Nama Depan"
										content={
											friendProfile.first_name || '-'
										}
									/>
								</Col>

								<Col span={12}>
									<MoleculeInfoGroup
										title="Nama Belakang"
										content={friendProfile.last_name || '-'}
									/>
								</Col>

								<Col span={12}>
									<MoleculeInfoGroup
										title="Email"
										content={friendProfile.email || '-'}
									/>
								</Col>

								<Col span={12}>
									<MoleculeInfoGroup
										title="Nomor Handphone"
										content={
											friendProfile.phone_number || '-'
										}
									/>
								</Col>

								<Col span={12}>
									<MoleculeInfoGroup
										title="Jenis Kelamin"
										content={translateGenderEnum(
											friendProfile.gender
										)}
									/>
								</Col>

								<Col span={12}>
									<MoleculeInfoGroup
										title="Status Pernikahan"
										content={
											friendProfile.marital_status || '-'
										}
									/>
								</Col>
							</Row>
						</AtomCard>
					</Col>

					<Col className="mt4" span={15}>
						<AtomCard title="Info Update">
							<Row gutter={[12, 24]}>
								<Col span={12}>
									<MoleculeInfoGroup
										title="Tanggal Daftar"
										content={
											<ReactMoment format="DD-MM-YY">
												{friendProfile.created_at}
											</ReactMoment>
										}
									/>
								</Col>

								<Col span={12}>
									<MoleculeInfoGroup
										title="Tanggal Diperbaharui"
										content={
											<ReactMoment format="DD-MM-YY">
												{friendProfile.updated_at}
											</ReactMoment>
										}
									/>
								</Col>

								<Col span={12}>
									<MoleculeInfoGroup
										title="Didaftarkan oleh"
										content={
											friendProfile.created_by || '-'
										}
									/>
								</Col>

								<Col span={12}>
									<MoleculeInfoGroup
										title="Diperbarui oleh"
										content={
											friendProfile.updated_by || '-'
										}
									/>
								</Col>
							</Row>
						</AtomCard>
					</Col>

					<Col className="mt4" span={24}>
						<Space>
							<Link to={`/customers/friend-list/${id}`}>
								<AtomSecondaryButton size="large">
									Kembali
								</AtomSecondaryButton>
							</Link>
						</Space>
					</Col>
				</Row>
			)}
		</OrganismLayout>
	);
};

export default FriendProfileDetailPage;
