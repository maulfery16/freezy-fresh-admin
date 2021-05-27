import React, { useEffect, useState } from 'react';
import ReactMoment from 'react-moment';

import { Col, message, Row, Skeleton, Typography } from 'antd';
import { Link } from 'react-router-dom';

import AtomCard from '../../../components/atoms/card';
import AtomPrimaryButton from '../../../components/atoms/button/primary-button';
import MoleculeInfoGroup from '../../../components/molecules/info-group';
import MoleculeImageGroup from '../../../components/molecules/molecule-image-group';
import OrganismLayout from '../../../components/organisms/layout';

import AdvertisementService from '../../../services/advertisement';

const AdsPage = () => {
	const adsService = new AdvertisementService();
	const [ads, setAds] = useState(null);
	const [loading, setLoading] = useState(null);

	const getAdsDetail = async () => {
		try {
			setLoading(true);

			const { data: ads } = await adsService.getAdvertisement();
			if (ads.data !== []) setAds(ads.data);
		} catch (error) {
			message.error(error.message);
			console.error(error);
		} finally {
			setLoading(false);
		}
	};

	useEffect(() => {
		(async () => {
			getAdsDetail();
		})();
	}, []);

	return (
		<OrganismLayout
			breadcumbs={[
				{ name: `Tampilan`, link: '/view' },
				{ name: `Iklan`, link: location.pathname },
			]}
			title="Iklan"
		>
			<Row align="middle" justify="space-between">
				<Col>
					<Typography.Title level={4}>
						<span className="fw7">{`Iklan`.toUpperCase()}</span>
					</Typography.Title>
				</Col>

				<Col>
					<Link
						to={{
							pathname: '/view/ads/edit',
							state: {
								ads: ads,
							},
						}}
					>
						<AtomPrimaryButton size="large">{`Edit Detail`}</AtomPrimaryButton>
					</Link>
				</Col>
			</Row>

			{loading ? (
				<Skeleton active />
			) : !ads && !loading ? (
				<Typography.Text strong>
					<span className="denim f5">Belum ada Iklan</span>
				</Typography.Text>
			) : (
				<Row align="top" className="mt4" gutter={24}>
					<Col span={18}>
						<AtomCard title={`Info Iklan`}>
							<Row
								align="top"
								style={{ paddingTop: '1rem' }}
								gutter={[12, 24]}
							>
								<Col span={24}>
									<MoleculeInfoGroup
										title="Status"
										content={
											ads.is_active
												? 'AKTIF'
												: 'TIDAK AKTIF' || '-'
										}
									/>
								</Col>

								<Col span={12}>
									<MoleculeInfoGroup
										title="Title Iklan (ID)"
										content={`${ads.title.id || '-'}
										`}
									/>
								</Col>

								<Col span={12}>
									<MoleculeInfoGroup
										title="Title Iklan (EN)"
										content={`${ads.title.en || '-'}`}
									/>
								</Col>

								<Col span={12}>
									<MoleculeInfoGroup
										title="Nama Promosi (ID)"
										content={
											ads.promotion?.title?.id || '-'
										}
									/>
								</Col>

								<Col span={12}>
									<MoleculeInfoGroup
										title="Nama Promosi (EN)"
										content={
											ads.promotion?.title?.en || '-'
										}
									/>
								</Col>

								<Col span={24}>
									<MoleculeInfoGroup
										title="Gambar Poster"
										content={
											<MoleculeImageGroup
												images={[
													{
														source:
															ads.banner_mobile ||
															null,
														label: 'Mobile',
													},
													{
														source:
															ads.banner_desktop ||
															null,
														label: 'Dekstop',
													},
												]}
											/>
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
												{ads.created_at || '-'}
											</ReactMoment>
										}
									/>
								</Col>

								<Col span={12}>
									<MoleculeInfoGroup
										title="Tanggal di Update"
										content={
											<ReactMoment format="DD-MM-YYYY">
												{ads.updated_at || '-'}
											</ReactMoment>
										}
									/>
								</Col>

								<Col span={12}>
									<MoleculeInfoGroup
										title="Didaftarkan Oleh"
										content={ads.created_by || '-'}
									/>
								</Col>

								<Col span={12}>
									<MoleculeInfoGroup
										title="Diupdate Oleh"
										content={ads.updated_by || '-'}
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

export default AdsPage;
