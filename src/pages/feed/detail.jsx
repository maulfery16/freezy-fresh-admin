import React, { useEffect, useState } from 'react';
import ReactMoment from 'react-moment';
import { Col, Divider, message, Row, Skeleton, Space, Typography } from 'antd';
import { Link, useParams } from 'react-router-dom';

import AtomCard from '../../components/atoms/card';
import AtomSecondaryButton from '../../components/atoms/button/secondary-button';
import MoleculeInfoGroup from '../../components/molecules/info-group';
import OrganismLayout from '../../components/organisms/layout';

import FeedService from '../../services/feed';
import AtomImage from '../../components/atoms/image';
import MoleculeMarkdownRenderer from '../../components/molecules/markdown-renderer';

const FeedDetailPage = () => {
	const { id } = useParams();
	const [feed, setFeed] = useState(null);
	const feedService = new FeedService();

	const getFeedDetail = async () => {
		try {
			const response = await feedService.getFeedById(id);
			console.log(response.data);

			setFeed(response.data);
		} catch (error) {
			message.error(error.message);
			console.error(error);
		}
	};

	useEffect(() => {
		(async () => {
			getFeedDetail(id);
		})();
	}, []);

	return (
		<OrganismLayout
			breadcumbs={[
				{ name: 'Feed', link: '/feed' },
				{ name: 'Detail', link: location.pathname },
			]}
			title="Detail Feed"
		>
			<Typography.Title level={4}>
				<span className="fw7">
					{`Detail Cabang Freezy`.toUpperCase()}
				</span>
			</Typography.Title>

			{!feed ? (
				<Skeleton active />
			) : (
				<Row align="top" className="mt4" gutter={24}>
					<Col span={18}>
						<AtomCard title="Info Cabang Freezy">
							<Row gutter={[12, 24]}>
								<Col span={12}>
									<MoleculeInfoGroup
										title="Tipe Update"
										content={feed.update_type}
									/>
								</Col>

								<Col span={12}>
									<MoleculeInfoGroup
										title="Tipe Konten"
										content={feed.content_type}
									/>
								</Col>

								<Col span={12}>
									<MoleculeInfoGroup
										title={`Title ${feed.content_type}`}
										content={
											feed.content_type === 'STORY'
												? feed.title?.id
												: feed.video_title?.id
										}
									/>
								</Col>

								{feed.content_type === 'VIDEO' ? (
									<>
										<Col span={12}>
											<MoleculeInfoGroup
												title="Link Video"
												content={feed.video_link}
											/>
										</Col>
									</>
								) : (
									<>
										<Col span={12}>
											<MoleculeInfoGroup
												title="Jumlah Like"
												content={feed.like_count}
											/>
										</Col>

										<Col span={12}>
											<MoleculeInfoGroup
												title="Gambar"
												content={
													<AtomImage
														src={feed.story_image}
													/>
												}
											/>
										</Col>

										<Col span={12}>
											<MoleculeInfoGroup
												title="Story Singkat"
												content={
													feed.short_description?.id
												}
											/>
										</Col>

										<Col span={12}>
											<MoleculeInfoGroup
												title="Story Lengkap"
												content={
													<MoleculeMarkdownRenderer
														withBorder
														text={
															feed
																.long_description
																?.id
														}
													/>
												}
											/>
										</Col>

										<Col span={12}>
											<MoleculeInfoGroup
												title="Produk Terkait"
												content={feed.products
													?.map(
														(product) =>
															`${product.sku_id} ${product.name?.id}`
													)
													.join(', ')}
											/>
										</Col>
									</>
								)}

								<Divider />

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
												{feed.created_at}
											</ReactMoment>
										}
									/>
								</Col>

								<Col span={12}>
									<MoleculeInfoGroup
										title="Tanggal di Update"
										content={
											<ReactMoment format="DD-MM-YYYY">
												{feed.updated_at}
											</ReactMoment>
										}
									/>
								</Col>

								<Col span={12}>
									<MoleculeInfoGroup
										title="Didaftarkan Oleh"
										content={feed.created_by}
									/>
								</Col>

								<Col span={12}>
									<MoleculeInfoGroup
										title="Diperbarui Oleh"
										content={feed.updated_by}
									/>
								</Col>
							</Row>
						</AtomCard>
					</Col>

					<Col className="mt4" span={24}>
						<Space>
							<Link to="/feed">
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

export default FeedDetailPage;
