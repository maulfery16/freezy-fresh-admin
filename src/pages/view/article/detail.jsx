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

import AtomCard from '../../../components/atoms/card';
import MoleculeInfoGroup from '../../../components/molecules/info-group';
import OrganismLayout from '../../../components/organisms/layout';
import MoleculeMarkdownRenderer from '../../../components/molecules/markdown-renderer';

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
					image:
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
								<Col span={12}>
									<MoleculeInfoGroup
										title="Judul Artikel (ID)"
										content={article.title.id}
									/>
								</Col>

								<Col span={12}>
									<MoleculeInfoGroup
										title="Judul Artikel (EN)"
										content={article.title.en}
									/>
								</Col>

								<Col span={12}>
									<MoleculeInfoGroup
										title="Foto Artikel"
										content={
											<Image
												preview
												src={article.image}
												width={300}
											/>
										}
									/>
								</Col>

								<Col span={12}>
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

								<Col span={12}>
									<MoleculeInfoGroup
										title="Konten Artikel (ID)"
										content={
											<MoleculeMarkdownRenderer
												text={article.content.id}
											/>
										}
									/>
								</Col>

								<Col span={12}>
									<MoleculeInfoGroup
										title="Konten Artikel (EN)"
										content={
											<MoleculeMarkdownRenderer
												text={article.content.en}
											/>
										}
									/>
								</Col>

								<Col span={12}>
									<MoleculeInfoGroup
										title="Tanggal Dibuat"
										content={
											<ReactMoment format="DD-MM-YYYY">
												{article.created_at}
											</ReactMoment>
										}
									/>
								</Col>

								<Col span={12}>
									<MoleculeInfoGroup
										title="Tanggal di Daftarkan"
										content={
											<ReactMoment format="DD-MM-YYYY">
												{article.registered_at}
											</ReactMoment>
										}
									/>
								</Col>

								<Col span={12}>
									<MoleculeInfoGroup
										title="Dibuat Oleh"
										content={article.created_by}
									/>
								</Col>

								<Col span={12}>
									<MoleculeInfoGroup
										title="Didaftarkan Oleh"
										content={article.registered_by}
									/>
								</Col>
							</Row>
						</AtomCard>
					</Col>

					<Col className="mt4" span={24}>
						<Space>
							<Link to="/view/article">
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

export default ArticleModifyPage;
