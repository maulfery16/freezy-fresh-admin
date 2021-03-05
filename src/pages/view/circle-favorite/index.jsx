import React, { useEffect, useState } from 'react';
import ReactMoment from 'react-moment';

import { Col, message, Row, Skeleton, Typography } from 'antd';
import { Link } from 'react-router-dom';

import AtomCard from '../../../components/atoms/card';
import AtomPrimaryButton from '../../../components/atoms/button/primary-button';
import MoleculeInfoGroup from '../../../components/molecules/info-group';
import OrganismLayout from '../../../components/organisms/layout';

import CircleFavoriteService from '../../../services/circle-favorite';
const circleFavoriteService = new CircleFavoriteService();

const CircleFavoritePage = () => {
	const [circleFavorite, setCircleFavorite] = useState(null);

	const getCircleFavoriteDetail = async () => {
		try {
			const {
				data: circleFavorite,
			} = await circleFavoriteService.getCircleFavorites();

			setCircleFavorite(circleFavorite.data && circleFavorite.data[0]);
		} catch (error) {
			message.error(error.message);
			console.error(error);
		}
	};

	useEffect(() => {
		(async () => {
			getCircleFavoriteDetail();
		})();
	}, []);

	return (
		<OrganismLayout
			breadcumbs={[
				{ name: 'Tampilan', link: '/view' },
				{ name: `Circle's Favorite`, link: '/view/circle-favorite' },
				{ name: 'Detail', link: location.pathname },
			]}
			title="Detail Circle's Favorite"
		>
			<Row align="middle" justify="space-between">
				<Col>
					<Typography.Title level={4}>
						<span className="fw7">
							{`Detail Circle's Favorite`.toUpperCase()}
						</span>
					</Typography.Title>
				</Col>

				<Col>
					{circleFavorite && (
						<Link
							to={{
								pathname: '/view/circle-favorite/edit',
								state: {
									circleFavorite: circleFavorite,
								},
							}}
						>
							<AtomPrimaryButton size="large">{`Edit Detail`}</AtomPrimaryButton>
						</Link>
					)}
				</Col>
			</Row>

			{!circleFavorite ? (
				<Skeleton active />
			) : (
				<Row align="top" className="mt4" gutter={24}>
					<Col span={15}>
						<AtomCard title={`Info Circle's Favorite`}>
							<Row gutter={[12, 24]}>
								<Col span={12}>
									<MoleculeInfoGroup
										title="Title Konten (ID)"
										content={circleFavorite.title.id}
									/>
								</Col>

								<Col span={12}>
									<MoleculeInfoGroup
										title="Title Konten (EN)"
										content={circleFavorite.title.en}
									/>
								</Col>

								<Col span={12}>
									<MoleculeInfoGroup
										title="Deskripsi Singkat (ID)"
										content={
											circleFavorite.short_description.id
										}
									/>
								</Col>

								<Col span={12}>
									<MoleculeInfoGroup
										title="Deskripsi Singkat (EN)"
										content={
											circleFavorite.short_description.en
										}
									/>
								</Col>

								<Col span={24} style={{ paddingTop: '2rem' }}>
									<Typography.Text strong>
										<span className="denim f5">
											INFO UPDATE
										</span>
									</Typography.Text>
								</Col>

								<Col span={12}>
									<MoleculeInfoGroup
										title="Tanggal di Daftarkan"
										content={
											<ReactMoment format="DD-MM-YYYY">
												{circleFavorite.created_at}
											</ReactMoment>
										}
									/>
								</Col>

								<Col span={12}>
									<MoleculeInfoGroup
										title="Tanggal di Update"
										content={
											<ReactMoment format="DD-MM-YYYY">
												{circleFavorite.updated_at}
											</ReactMoment>
										}
									/>
								</Col>

								<Col span={12}>
									<MoleculeInfoGroup
										title="Didaftarkan Oleh"
										content={circleFavorite.created_by}
									/>
								</Col>

								<Col span={12}>
									<MoleculeInfoGroup
										title="Diupdate Oleh"
										content={circleFavorite.updated_by}
									/>
								</Col>
							</Row>
						</AtomCard>
					</Col>
				</Row>
			)}
		</OrganismLayout>
	);
};

export default CircleFavoritePage;
