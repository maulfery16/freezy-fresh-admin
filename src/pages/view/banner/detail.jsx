import React, { useEffect, useState } from 'react';
import ReactMoment from 'react-moment';

import { Col, Image, message, Row, Skeleton, Space, Typography } from 'antd';
import { Link, useParams } from 'react-router-dom';

import AtomCard from '../../../components/atoms/card';
import AtomSecondaryButton from '../../../components/atoms/button/secondary-button';
import MoleculeInfoGroup from '../../../components/molecules/info-group';
import OrganismLayout from '../../../components/organisms/layout';

// import BannerService from '../../services/banner';
// const bannerService = new BannerService();

const BannerModifyPage = () => {
	const { id } = useParams();
	const [banner, setBanner] = useState(null);

	const getBannerDetail = () => {
		try {
			// const banner = bannerService.getBannerDetail(bannerId);
			// setBanner(banner);

			setTimeout(() => {
				setBanner({
					active: true,
					phone_number: '087739893738467',
					promo: 'Promo Misqueen',
					registered_at: new Date(),
					registered_by: 'Kim Ji Yeon',
					title_id: 'Banner Hebat',
					title_en: 'Super Banner',
					updated_at: new Date(),
					updated_by: 'Dita Karang',
					banner_photo_mobile:
						'https://cdn.shopify.com/s/files/1/0533/2089/files/placeholder-images-image_large.png?format=jpg&quality=90&v=1530129081',
					banner_photo_website:
						'https://cdn.shopify.com/s/files/1/0533/2089/files/placeholder-images-image_large.png?format=jpg&quality=90&v=1530129081',
				});
			}, 1000);
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
								<Col span={12}>
									<MoleculeInfoGroup
										title="Foto Banner Mobile"
										content={
											<Image
												preview
												src={banner.banner_photo_mobile}
												width="100%"
											/>
										}
									/>
								</Col>

								<Col span={12}>
									<MoleculeInfoGroup
										title="Foto Banner Website"
										content={
											<Image
												preview
												src={
													banner.banner_photo_website
												}
												width="100%"
											/>
										}
									/>
								</Col>

								<Col span={12}>
									<MoleculeInfoGroup
										title="Title Banner (ID)"
										content={banner.title_id}
									/>
								</Col>

								<Col span={12}>
									<MoleculeInfoGroup
										title="Title Banner (EN)"
										content={banner.title_en}
									/>
								</Col>

								<Col span={12}>
									<MoleculeInfoGroup
										title="Nama Promo (ID)"
										content={banner.promo}
									/>
								</Col>

								<Col span={12}>
									<MoleculeInfoGroup
										title="Status Banner"
										content={
											banner.active
												? 'Aktif'
												: 'Tidak Aktif'
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
												{banner.registered_at}
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
										content={banner.registered_by}
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
