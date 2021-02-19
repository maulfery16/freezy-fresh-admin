/* eslint-disable no-mixed-spaces-and-tabs */
import React, { useEffect, useState } from 'react';
import { Col, Form, message, Row, Skeleton, Space, Typography } from 'antd';
import { useHistory, useLocation, useParams } from 'react-router-dom';

import AtomCard from '../../../components/atoms/card';
import MoleculeModifyActionButtons from '../../../components/molecules/modify-action-buttons';
import MoleculeSelectInputGroup from '../../../components/molecules/input-group/select-input';
import MoleculeTextInputGroup from '../../../components/molecules/input-group/text-input';
import OrganismLayout from '../../../components/organisms/layout';

import ArticleCategoryService from '../../../services/article-category';
const articlelCategoryService = new ArticleCategoryService();

const CategoryModifyPage = () => {
	const { id } = useParams();
	const history = useHistory();
	const location = useLocation();
	const isCreating = location.pathname.includes('add') ? true : false;

	const [category, setCategory] = useState(null);
	const [isSubmitting, setIsSubmitting] = useState(false);

	const getCategoryDetail = async (id) => {
		try {
			const category = await articlelCategoryService.getArticleCategoryById(
				id
			);
			setCategory(category.data);
		} catch (error) {
			message.error(error.message);
			console.error(error);
		}
	};

	const setCategoryInitialValues = () => {
		return isCreating || !category
			? {}
			: {
					colour: category.color.id,
					en_name: category.name.en,
					id_name: category.name.id,
			  };
	};

	const submit = async (values) => {
		try {
			setIsSubmitting(true);

			const data = new FormData();
			data.append('code', new Date()); // required by BE
			data.append('color_id', values.colour);
			data.append('name[en]', values.en_name);
			data.append('name[id]', values.id_name);

			if (isCreating) {
				await articlelCategoryService.createArticleCategory(data);
				message.success('Berhasil menambah artikel kategori');
			} else {
				await articlelCategoryService.editArticleCategory(id, data);
				message.success('Berhasil mengubah artikel kategori');
			}

			message.info(
				'Akan dikembalikan ke halaman daftar artikel kategori dalam 2 detik'
			);
			setTimeout(() => {
				history.push('/view/article-category');
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
				await getCategoryDetail(id);
			}
		})();
	}, []);

	return (
		<OrganismLayout
			breadcumbs={[
				{ name: 'Tampilan', link: '/view/article-category' },
				{ name: 'Kategori Artikel', link: '/view/article-category' },
				{
					name: location.pathname.includes('add') ? 'Tambah' : 'Ubah',
					link: location.pathname,
				},
			]}
			title={`${isCreating ? 'Tambah' : 'Ubah'} Kategori Artikel`}
		>
			<Typography.Title level={4}>
				<span className="fw7">
					{`${
						isCreating ? 'Tambah' : 'Ubah'
					} Kategori Artikel`.toUpperCase()}
				</span>
			</Typography.Title>

			{!isCreating && !category ? (
				<Skeleton active />
			) : (
				<Form
					className="w-100 mt4"
					name="modify_category"
					initialValues={setCategoryInitialValues()}
					onFinish={submit}
					onFinishFailed={(error) => {
						message.error(`Failed: ${error}`);
						console.error(error);
					}}
				>
					<Row>
						<Col span={15}>
							<AtomCard title="Info Kategori">
								<Row gutter={12}>
									<Col span={12}>
										<MoleculeTextInputGroup
											name="id_name"
											label="Nama Kategori Artikel (ID)"
											placeholder="Nama Kategori Artikel (ID)"
											type="text"
										/>
									</Col>

									<Col span={12}>
										<MoleculeTextInputGroup
											name="en_name"
											label="Nama Kategori Artikel (EN)"
											placeholder="Nama Kategori Artikel (EN)"
											type="text"
										/>
									</Col>

									<Col span={24}>
										<MoleculeSelectInputGroup
											label="Pilih Warna"
											name="colour"
											placeholder="Pilih Warna"
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
								</Row>
							</AtomCard>
						</Col>

						<Col className="mt4" span={24}>
							<MoleculeModifyActionButtons
								backUrl="/view/article-category"
								isCreating={isCreating}
								isSubmitting={isSubmitting}
								label="Kategori Artikel"
							/>
						</Col>
					</Row>
				</Form>
			)}
		</OrganismLayout>
	);
};

export default CategoryModifyPage;
