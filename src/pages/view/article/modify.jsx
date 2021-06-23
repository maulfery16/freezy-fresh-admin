/* eslint-disable no-unused-vars */
/* eslint-disable no-mixed-spaces-and-tabs */
import React, { useEffect, useRef, useState } from 'react';
import { Col, Form, message, Row, Skeleton, Typography } from 'antd';
import { useHistory, useLocation, useParams } from 'react-router-dom';

import AtomCard from '../../../components/atoms/card';
import MoleculeFileInputGroup from '../../../components/molecules/input-group/file-input';
import MoleculeTextInputGroup from '../../../components/molecules/input-group/text-input';
import OrganismLayout from '../../../components/organisms/layout';

import MoleculeModifyActionButtons from '../../../components/molecules/modify-action-buttons';
import MoleculeSelectInputGroup from '../../../components/molecules/input-group/select-input';
import MoleculeTextEditorGroup from '../../../components/molecules/input-group/text-editor';

import ArticleService from '../../../services/article';
const articleService = new ArticleService();

const ArticleModifyPage = () => {
	const dekstopImageRef = useRef();
	const mobileImageRef = useRef();

	const { id } = useParams();
	const history = useHistory();
	const location = useLocation();
	const isCreating = location.pathname.includes('add') ? true : false;

	const [article, setArticle] = useState(null);
	const [isSubmitting, setIsSubmitting] = useState(false);
	const [contentId, setContentId] = useState('');
	const [contentEn, setContentEn] = useState('');

	const getArticleDetail = async (id) => {
		try {
			const { data: article } = await articleService.getArticleById(id);

			setArticle(article);
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
					video_link: article.video_link,
					article_category: article.article_categories.id,
			  };
	};

	const submit = async (values) => {
		try {
			setIsSubmitting(true);
			const dekstopImage = await dekstopImageRef.current.getImage();
			const mobileImage = await mobileImageRef.current.getImage();

			const data = new FormData();
			data.append('article_category_id', values.article_category);
			data.append('content[en]', contentEn);
			data.append('content[id]', contentId);
			data.append('desktop_image', dekstopImage);
			data.append('mobile_image', mobileImage);
			if (values.en_title) data.append('title[en]', values.en_title);
			if (values.id_title) data.append('title[id]', values.id_title);
			if (values.video_link) data.append('video_link', values.video_link);

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
									<Col span={24}>
										<MoleculeFileInputGroup
											label="Foto Artikel"
											description="
												Format gambar .jpg .jpeg .png, Untuk foto banner mobile ukuran minimum 0 x 0px (Untuk
												gambar optimal gunakan ukuran minimum 0 x 0 px) Untuk foto banner desktop ukuran
												minimum 0 x 0px (Untuk gambar optimal gunakan ukuran minimum 0 x 0 px)
											"
											fileInputs={[
												{
													defaultValue: article
														? article.dekstop_image
														: null,
													isMobileImage: true,
													label:
														'Foto Artikel Mobile',
													ref: mobileImageRef,
													required: true
												},
												{
													defaultValue: article
														? article.mobile_image
														: null,
													label:
														'Foto Artikel Dekstop',
													ref: dekstopImageRef,
													required: true
												},
											]}
										/>
									</Col>

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

									<Col span={12}>
										<MoleculeSelectInputGroup
											label="Kategori Artikel"
											name="article_category"
											placeholder="Kategori Artikel"
											mode="article_category"
											required
											data={{
												url: 'article-categories',
												generateCustomOption: (
													item
												) => ({
													value: item.id,
													label: `${item.name.id} / ${item.name.en}`,
												}),
											}}
										/>
									</Col>

									<Col span={12}>
										<MoleculeTextInputGroup
											name="video_link"
											label="Link Video"
											placeholder="Link Video"
											type="text"
										/>
									</Col>

									<Col span={24}>
										<MoleculeTextEditorGroup
											label="Konten Artikel (ID)"
											onChange={setContentId}
											value={contentId}
										/>
									</Col>

									<Col span={24}>
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
