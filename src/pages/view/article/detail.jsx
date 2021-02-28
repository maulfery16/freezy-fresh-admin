import React, { useEffect, useState } from 'react';
import ReactMoment from 'react-moment';

import { Col, Image, message, Row, Skeleton, Space, Typography } from 'antd';
import { Link, useParams } from 'react-router-dom';

import AtomCard from '../../../components/atoms/card';
import AtomColorInfoGroup from '../../../components/atoms/color-info-group';
import AtomSecondaryButton from '../../../components/atoms/button/secondary-button';
import MoleculeInfoGroup from '../../../components/molecules/info-group';
import MoleculeMarkdownRenderer from '../../../components/molecules/markdown-renderer';
import OrganismLayout from '../../../components/organisms/layout';

// import ArticleService from '../../../services/article';
// const articleService = new ArticleService();

const ArticleModifyPage = () => {
	const { id } = useParams();
	const [article, setArticle] = useState(null);

	const getArticleDetail = () => {
		try {
			// const article = articleService.getArticleDetail(articleId);
			// setArticle(article);

			setTimeout(() => {
				setArticle({
					category: {
						color: {
							hexa_code: '#000000',
						},
						name: 'Kategori 1',
					},
					created_at: new Date(),
					created_by: 'Jeong Dajeong',
					phone_number: '087739893738467',
					promo: 'Promo Misqueen',
					registered_at: new Date(),
					registered_by: 'Kim Ji Yeon',
					updated_at: new Date(),
					updated_by: 'Dita Karang',
					content: {
						id: 'Hallo mate',
						en: 'Hallo mate',
					},
					title: {
						id: 'Artikel Super',
						en: 'Super Article',
					},
					video_url:
						'https://www.youtube.com/watch?v=syro-BlScbM&ab_channel=PerjalananHijrah',
					id_image:
						'https://cdn.shopify.com/s/files/1/0533/2089/files/placeholder-images-image_large.png?format=jpg&quality=90&v=1530129081',
					en_image:
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
								<Col span={8}>
									<MoleculeInfoGroup
										title="Judul Artikel (ID)"
										content={article.title.id}
									/>
								</Col>

								<Col span={8}>
									<MoleculeInfoGroup
										title="Judul Artikel (EN)"
										content={article.title.en}
									/>
								</Col>

								<Col span={8}>
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
								</Col>

								<Col span={8}>
									<MoleculeInfoGroup
										title="Foto Artikel Mobile"
										content={
											<Image
												preview
												src={article.id_image}
												width={300}
											/>
										}
									/>
								</Col>

								<Col span={8}>
									<MoleculeInfoGroup
										title="Foto Artikel Dekstop"
										content={
											<Image
												preview
												src={article.en_image}
												width={300}
											/>
										}
									/>
								</Col>

								<Col span={8}>
									<MoleculeInfoGroup
										title="Nama Promo"
										content={
											<a
												className="pointer"
												href={article.video_url}
												rel="noreferrer"
												target="_blank"
											>
												Video
											</a>
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

								<Col span={8}>
									<MoleculeInfoGroup
										title="Tanggal di Daftarkan"
										content={
											<ReactMoment format="DD-MM-YYYY">
												{article.registered_at}
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

								<Col span={8}>
									<MoleculeInfoGroup
										title="Didaftarkan Oleh"
										content={article.registered_by}
									/>
								</Col>

								<Col span={24}>
									<MoleculeInfoGroup
										title="Konten Artikel (ID)"
										content={
											<MoleculeMarkdownRenderer
												text={article.content.id}
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
