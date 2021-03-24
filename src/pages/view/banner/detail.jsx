import React, { useEffect, useState } from 'react';
import ReactMoment from 'react-moment';

import { Col, message, Row, Skeleton, Space, Typography } from 'antd';
import { Link, useParams } from 'react-router-dom';

import AtomCard from '../../../components/atoms/card';
import AtomSecondaryButton from '../../../components/atoms/button/secondary-button';
import MoleculeImageGroup from '../../../components/molecules/molecule-image-group';
import MoleculeInfoGroup from '../../../components/molecules/info-group';
import OrganismLayout from '../../../components/organisms/layout';

import BannerService from '../../../services/banner';
const bannerService = new BannerService();

const BannerModifyPage = () => {
	const { id } = useParams();
	const [banner, setBanner] = useState(null);

	const getBannerDetail = async () => {
		try {
			const { data: banner } = await bannerService.getBannerById(id);
			setBanner(banner);
		} catch (error) {
			message.error(error.message);
			console.error(error);
		}
	};

	useEffect(() => {
		(async () => {
			getBannerDetail(id);
		})();
	}, []);

	return (
		<OrganismLayout
			breadcumbs={[
				{ name: 'Tampilan', link: '/view/banner' },
				{ name: 'Banner', link: '/view/banner' },
				{ name: 'Detail', link: location.pathname },
			]}
			title="Detail Banner"
		>
			<Typography.Title level={4}>
				<span className="fw7">{`Detail Banner`.toUpperCase()}</span>
			</Typography.Title>

			{!banner ? (
				<Skeleton active />
			) : (
				<Row align="top" className="mt4" gutter={24}>
					<Col span={15}>
						<AtomCard title="Info Banner">
							<Row gutter={[12, 24]}>
								<Col span={24}>
									<MoleculeInfoGroup
										title="Foto Banner"
										content={
											<MoleculeImageGroup
												images={[
													{
														source:
															banner.image_mobile,
														label:
															' Foto Banner Mobile',
													},
													{
														source:
															banner.image_dekstop,
														label:
															' Foto Banner Dekstop',
													},
												]}
											/>
										}
									/>
								</Col>

								<Col span={12}>
									<MoleculeInfoGroup
										title="Title Banner (ID)"
										content={banner.title.id}
									/>
								</Col>

								<Col span={12}>
									<MoleculeInfoGroup
										title="Title Banner (EN)"
										content={banner.title.en}
									/>
								</Col>

								<Col span={12}>
									<MoleculeInfoGroup
										title="Cabang"
										content={banner.branches
											.map((branch) => branch.name.id)
											.join(', ')}
									/>
								</Col>

								<Col span={12}>
									<MoleculeInfoGroup
										title="Nama Promo (ID)"
										content={
											banner.promotion &&
											banner.promotion.title.id
										}
									/>
								</Col>

								<Col span={24} style={{ paddingTop: '2rem' }}>
									<Typography.Text strong>
										<span className="denim f5">
											INFO UPDATE PRODUK
										</span>
									</Typography.Text>
								</Col>

								<Col span={12}>
									<MoleculeInfoGroup
										title="Tanggal di Daftarkan"
										content={
											<ReactMoment format="DD-MM-YYYY">
												{banner.created_at}
											</ReactMoment>
										}
									/>
								</Col>

								<Col span={12}>
									<MoleculeInfoGroup
										title="Tanggal di Update"
										content={
											<ReactMoment format="DD-MM-YYYY">
												{banner.updated_at}
											</ReactMoment>
										}
									/>
								</Col>

								<Col span={12}>
									<MoleculeInfoGroup
										title="Didaftarkan Oleh"
										content={banner.created_by}
									/>
								</Col>

								<Col span={12}>
									<MoleculeInfoGroup
										title="Diupdate Oleh"
										content={banner.updated_by}
									/>
								</Col>
							</Row>
						</AtomCard>
					</Col>

					<Col className="mt4" span={24}>
						<Space>
							<Link to="/view/banner">
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

export default BannerModifyPage;
