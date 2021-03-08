import React, { useEffect, useState } from 'react';
import ReactMoment from 'react-moment';

import { Badge, Col, message, Row, Skeleton, Space, Typography } from 'antd';
import { Link, useParams } from 'react-router-dom';

import AtomCard from '../../../components/atoms/card';
import AtomSecondaryButton from '../../../components/atoms/button/secondary-button';
import MoleculeImageGroup from '../../../components/molecules/molecule-image-group';
import MoleculeInfoGroup from '../../../components/molecules/info-group';
import OrganismLayout from '../../../components/organisms/layout';

import {
	convertFriendshipStatus,
	translateGenderEnum,
} from '../../../utils/helpers';
// import FriendProfileService from '../../../services/friend-list';
// const friendProfileService = new FriendProfileService();

const _friendProfile = {
	data: {
		friend_id: '4zr8mb07lykowjaq',
		status_name: 'Requested',
		user: {
			first_name: 'Musa',
			last_name: 'Example',
			phone_number: '+6281910094095',
			email: 'musa.example2@gmail.com',
			gender: 'MALE',
			birth: '1997-11-07',
			profile_image:
				'http://s3.amazonaws.com/37assets/svn/765-default-avatar.png',
		},
		marital_status: 'Menikah',
		created_at: '2021-03-04T16:18:34.000000Z',
		created_by: 'Ali',
		updated_at: '2021-03-04T16:18:34.000000Z',
		updated_by: 'Umar',
	},
};

const FriendProfileDetailPage = () => {
	const { id, friend_id } = useParams();
	const [friendProfile, setFriendProfile] = useState(null);

	// eslint-disable-next-line no-unused-vars
	const getFriendProfileDetail = async (id, friend_id) => {
		try {
			// const friendProfile = await friendProfileService.getFriendProfileById(id,
			// 	friend_id
			// );
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
															friendProfile.user
																.profile_image,
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
												count={convertFriendshipStatus(
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
										content={friendProfile.friend_id}
									/>
								</Col>

								<Col span={12}>
									<MoleculeInfoGroup
										title="Nama Depan"
										content={friendProfile.user.first_name}
									/>
								</Col>

								<Col span={12}>
									<MoleculeInfoGroup
										title="Nama Belakang"
										content={friendProfile.user.last_name}
									/>
								</Col>

								<Col span={12}>
									<MoleculeInfoGroup
										title="Email"
										content={friendProfile.user.email}
									/>
								</Col>

								<Col span={12}>
									<MoleculeInfoGroup
										title="Nomor Handphone"
										content={
											friendProfile.user.phone_number
										}
									/>
								</Col>

								<Col span={12}>
									<MoleculeInfoGroup
										title="Jenis Kelamin"
										content={translateGenderEnum(
											friendProfile.user.gender
										)}
									/>
								</Col>

								<Col span={12}>
									<MoleculeInfoGroup
										title="Status Pernikahan"
										content={friendProfile.marital_status}
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
										content={friendProfile.created_by}
									/>
								</Col>

								<Col span={12}>
									<MoleculeInfoGroup
										title="Diperbarui oleh"
										content={friendProfile.updated_by}
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
