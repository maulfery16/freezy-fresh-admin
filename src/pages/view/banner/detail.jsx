import React, { useEffect, useState } from 'react';
import ReactMoment from 'react-moment';

import { Button, Col, message, Row, Skeleton, Space, Typography } from 'antd';
import { Link, useParams } from 'react-router-dom';

import AtomCard from '../../../components/atoms/card';
import AtomImage from '../../../components/atoms/image';
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
											<Row
												className="ba b--black-20 br3 pv5"
												gutter={48}
												justify="center"
												style={{
													marginLeft: '0px',
													maxWidth: '100%',
												}}
											>
												<Col>
													<Space
														align="center"
														direction="vertical"
													>
														<AtomImage
															src={
																banner.image_mobile
															}
														/>

														<p>
															Foto Banner Mobile
														</p>
													</Space>
												</Col>
												<Col>
													<Space
														align="center"
														direction="vertical"
													>
														<AtomImage
															src={
																banner.image_desktop
															}
														/>

														<p>
															Foto Banner Dekstop
														</p>
													</Space>
												</Col>
											</Row>
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
											.map((branch) => branch.name)
											.join(', ')}
									/>
								</Col>

								<Col span={12}>
									<MoleculeInfoGroup
										title="Nama Promo (ID)"
										content={
											banner.promotion &&
											banner.promotion.name
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
