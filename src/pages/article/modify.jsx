/* eslint-disable no-mixed-spaces-and-tabs */
import React, { useEffect, useState } from 'react';
import { Col, Form, message, Row, Skeleton, Space, Typography } from 'antd';
import { useHistory, useLocation, useParams } from 'react-router-dom';

import AtomCard from '../../components/atoms/card';
import MoleculeFileInputGroup from '../../components/molecules/input-group/file-input';
import MoleculeTextInputGroup from '../../components/molecules/input-group/text-input';
import OrganismLayout from '../../components/organisms/layout';

import RequestAdapterService from '../../services/request-adapter';
import ArticleService from '../../services/article';
import MoleculeModifyActionButtons from '../../components/molecules/modify-action-buttons';
import MoleculeSelectInputGroup from '../../components/molecules/input-group/select-input';
import MoleculeTextEditorGroup from '../../components/molecules/input-group/text-editor';
const articleService = new ArticleService();

const ArticleModifyPage = () => {
	const { id } = useParams();
	const history = useHistory();
	const location = useLocation();
	const isCreating = location.pathname.includes('add') ? true : false;

	const [article, setArticle] = useState(null);
	const [articleImage, setArticleImage] = useState(null);
	const [isSubmitting, setIsSubmitting] = useState(false);
	const [contentId, setContentId] = useState('');
	const [contentEn, setContentEn] = useState('');

	const getArticleDetail = async (id) => {
		try {
			const { data: article } = await articleService.getArticleById(id);

			setArticle(article);
			const articleImageFile = await RequestAdapterService.convertImageURLtoFile(
				article.image.original
			);
			setArticleImage(articleImageFile);
			setContentId(article.content.id);
			setContentEn(article.content.en);
		} catch (error) {
			message.error(error.message);
			console.error(error);
		}
	};

	const setArticleInitialValues = () => {
		return isCreating
			? {}
			: {
					category: article.category,
					en_title: article.title.en,
					id_title: article.title.id,
					image: articleImage,
					video_url: article.video_url,
			  };
	};

	const submit = async (values) => {
		try {
			setIsSubmitting(true);

			const data = new FormData();
			data.append('category', values.category);
			data.append('content[en]', contentEn);
			data.append('content[id]', contentId);
			data.append('image', articleImage);
			data.append('title[en]', values.en_title);
			data.append('title[id]', values.id_title);
			data.append('video_url', values.video_url);

			if (isCreating) {
				await articleService.createArticle(data);
				message.success('Berhasil menambah article');
			} else {
				await articleService.editArticle(id, data);
				message.success('Berhasil mengubah article');
			}

			message.info(
				'Akan dikembalikan ke halaman daftar article dalam 2 detik'
			);
			setTimeout(() => {
				history.push('/view/article');
			}, 2000);
		} catch (error) {
			message.error(error.message);
			console.error(error);
		} finally {
			setIsSubmitting(false);
		}
	};

	useEffect(() => {
		(async () => {
			if (!isCreating) {
				await getArticleDetail(id);
			}
		})();
	}, []);

	return (
		<OrganismLayout
			breadcumbs={[
				{ name: 'Artikel', link: '/view/article' },
				{
					name: location.pathname.includes('add') ? 'Tambah' : 'Ubah',
					link: location.pathname,
				},
			]}
			title={`${isCreating ? 'Tambah' : 'Ubah'} Artikel`}
		>
			<Typography.Title level={4}>
				<span className="fw7">
					{`${isCreating ? 'Tambah' : 'Ubah'} Artikel`.toUpperCase()}
				</span>
			</Typography.Title>

			{!isCreating && !article ? (
				<Skeleton active />
			) : (
				<Form
					className="w-100 mt4"
					name="modify_article"
					initialValues={setArticleInitialValues()}
					onFinish={submit}
					onFinishFailed={(error) => {
						message.error(`Failed: ${error}`);
						console.error(error);
					}}
				>
					<Row>
						<Col span={24}>
							<AtomCard title="Info Artikel">
								<Row gutter={12}>
									<Col span={12}>
										<MoleculeTextInputGroup
											name="id_title"
											label="Judul Artikel (ID)"
											placeholder="Judul Artikel (ID)"
											type="text"
										/>
									</Col>

									<Col span={12}>
										<MoleculeTextInputGroup
											name="en_title"
											label="Judul Artikel (EN)"
											placeholder="Judul Artikel (EN)"
											type="text"
										/>
									</Col>

									<Col span={24}>
										<MoleculeFileInputGroup
											defaultValue={articleImage}
											label="Foto Artikel"
											id="article-photo-upload"
											name="image"
											placeholder="png"
											setImage={setArticleImage}
										/>
									</Col>

									<Col span={12}>
										<MoleculeTextInputGroup
											name="video_url"
											label="Link Video"
											placeholder="Link Video"
											type="text"
										/>
									</Col>

									<Col span={12}>
										<MoleculeSelectInputGroup
											label="Pilih Kategori Artikel"
											name="category"
											placeholder="Pilih Kategori"
											data={{
												url: 'colors',
												generateCustomOption: (
													item
												) => ({
													value: item.id,
													label: (
														<Space>
															<div
																className="br2"
																style={{
																	background:
																		item.hexa_code,
																	height: 20,
																	width: 20,
																}}
															/>
															{item.name.en} /
															{item.name.id}
														</Space>
													),
												}),
											}}
										/>
									</Col>

									<Col span={12}>
										<MoleculeTextEditorGroup
											label="Konten Artikel (ID)"
											onChange={setContentId}
											value={contentId}
										/>
									</Col>

									<Col span={12}>
										<MoleculeTextEditorGroup
											label="Konten Artikel (EN)"
											onChange={setContentEn}
											value={contentEn}
										/>
									</Col>
								</Row>
							</AtomCard>
						</Col>

						<Col className="mt4" span={24}>
							<MoleculeModifyActionButtons
								backUrl="/view/article"
								isCreating={isCreating}
								isSubmitting={isSubmitting}
								label="Artikel"
							/>
						</Col>
					</Row>
				</Form>
			)}
		</OrganismLayout>
	);
};

export default ArticleModifyPage;
