import React, { useEffect, useState } from 'react';
import ReactMoment from 'react-moment';
import ReactPlayer from 'react-player/youtube';

import { Col, message, Row, Skeleton, Space, Typography } from 'antd';
import { Link, useParams } from 'react-router-dom';

import AtomCard from '../../../components/atoms/card';
// import AtomColorInfoGroup from '../../../components/atoms/color-info-group';
import AtomSecondaryButton from '../../../components/atoms/button/secondary-button';
import MoleculeImageGroup from '../../../components/molecules/molecule-image-group';
import MoleculeInfoGroup from '../../../components/molecules/info-group';
import MoleculeMarkdownRenderer from '../../../components/molecules/markdown-renderer';
import OrganismLayout from '../../../components/organisms/layout';

import ArticleService from '../../../services/article';
const articleService = new ArticleService();

const ArticleModifyPage = () => {
	const { id } = useParams();
	const [article, setArticle] = useState(null);

	const getArticleDetail = async () => {
		try {
			const { data: article } = await articleService.getArticleById(id);
			setArticle(article);
		} catch (error) {
			message.error(error.message);
			console.error(error);
		}
	};

	useEffect(() => {
		(async () => {
			getArticleDetail(id);
		})();
	}, []);

	return (
		<OrganismLayout
			breadcumbs={[
				{ name: 'Tampilan', link: '/view/article' },
				{ name: 'Artikel', link: '/view/article' },
				{ name: 'Detail', link: location.pathname },
			]}
			title="Detail Artikel"
		>
			<Typography.Title level={4}>
				<span className="fw7">{`Detail Artikel`.toUpperCase()}</span>
			</Typography.Title>

			{!article ? (
				<Skeleton active />
			) : (
				<Row align="top" className="mt4" gutter={24}>
					<Col span={24}>
						<AtomCard title="Info Artikel">
							<Row gutter={[12, 24]}>
								<Col span={24}>
									<MoleculeInfoGroup
										title="Foto Banner"
										content={
											<MoleculeImageGroup
												images={[
													{
														source:
															article.image_mobile,
														label:
															' Foto Banner Mobile',
													},
													{
														source:
															article.image_dekstop,
														label:
															' Foto Banner Dekstop',
													},
												]}
											/>
										}
									/>
								</Col>

								<Col span={8}>
									<MoleculeInfoGroup
										title="Judul Artikel (ID)"
										content={article.title.id}
									/>
								</Col>

								<Col span={16}>
									<MoleculeInfoGroup
										title="Judul Artikel (EN)"
										content={article.title.en}
									/>
								</Col>

								{/* <Col span={24}>
									<MoleculeInfoGroup
										title="Kategori Artikel"
										content={
											<AtomColorInfoGroup
												hexa={
													article.category.color
														.hexa_code
												}
												label={article.category.name}
											/>
										}
									/>
								</Col> */}

								<Col span={24}>
									<MoleculeInfoGroup
										title="Nama Promo"
										content={
											<ReactPlayer
												url={article.video_link}
											/>
										}
									/>
								</Col>

								<Col span={8}>
									<MoleculeInfoGroup
										title="Tanggal Dibuat"
										content={
											<ReactMoment format="DD-MM-YYYY">
												{article.created_at}
											</ReactMoment>
										}
									/>
								</Col>

								<Col span={16}>
									<MoleculeInfoGroup
										title="Tanggal di Diperbaharui"
										content={
											<ReactMoment format="DD-MM-YYYY">
												{article.updated_at}
											</ReactMoment>
										}
									/>
								</Col>

								<Col span={8}>
									<MoleculeInfoGroup
										title="Dibuat Oleh"
										content={article.created_by}
									/>
								</Col>

								<Col span={16}>
									<MoleculeInfoGroup
										title="Diperbaharui Oleh"
										content={article.updated_by}
									/>
								</Col>

								<Col span={24}>
									<MoleculeInfoGroup
										title="Konten Artikel (ID)"
										content={
											<MoleculeMarkdownRenderer
												text={article.content.id}
												withBorder
											/>
										}
									/>
								</Col>

								<Col span={24}>
									<MoleculeInfoGroup
										title="Konten Artikel (EN)"
										content={
											<MoleculeMarkdownRenderer
												text={article.content.en}
												withBorder
											/>
										}
									/>
								</Col>
							</Row>
						</AtomCard>
					</Col>

					<Col className="mt4" span={24}>
						<Space>
							<Link to="/view/article">
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

export default ArticleModifyPage;
