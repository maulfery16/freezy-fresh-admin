import React, { useEffect, useState } from 'react';
import ReactMoment from 'react-moment';

import {
	Button,
	Col,
	Image,
	message,
	Row,
	Skeleton,
	Space,
	Typography,
} from 'antd';
import { Link, useParams } from 'react-router-dom';

import AtomCard from '../../components/atoms/card';
import MoleculeInfoGroup from '../../components/molecules/info-group';
import OrganismLayout from '../../components/organisms/layout';

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
					phone_number: '087739893738467',
					promo: 'Promo Misqueen',
					registered_at: new Date(),
					registered_by: 'Kim Ji Yeon',
					title: 'Super Banner',
					updated_at: new Date(),
					updated_by: 'Dita Karang',
					banner_photo:
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
				{ name: 'Banner', link: '/banner' },
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
										title="Title Banner"
										content={banner.title}
									/>
								</Col>

								<Col span={12}>
									<MoleculeInfoGroup
										title="Nama Promo"
										content={banner.promo}
									/>
								</Col>

								<Col span={12}>
									<MoleculeInfoGroup
										title="Foto Banner"
										content={
											<Image
												preview
												src={banner.banner}
												width="100%"
											/>
										}
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
										title="Tanggal di Perbaharui"
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
										title="Didaftarkan Oleh"
										content={banner.updated_by}
									/>
								</Col>
							</Row>
						</AtomCard>
					</Col>

					<Col className="mt4" span={24}>
						<Space>
							<Link to="/banner">
								<Button
									className="br3 denim b--denim"
									size="large"
								>
									Kembali
								</Button>
							</Link>
						</Space>
					</Col>
				</Row>
			)}
		</OrganismLayout>
	);
};

export default BannerModifyPage;
