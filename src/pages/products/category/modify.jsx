/* eslint-disable no-mixed-spaces-and-tabs */
import React, { useEffect, useState } from 'react';
import {
	Button,
	Col,
	Form,
	message,
	Row,
	Skeleton,
	Space,
	Typography,
} from 'antd';
import { Link, useHistory, useLocation, useParams } from 'react-router-dom';

import AtomCard from '../../../components/atoms/card';
import MoleculeFileInputGroup from '../../../components/molecules/input-group/file-input';
import MoleculeSelectInputGroup from '../../../components/molecules/input-group/select-input';
import MoleculeTextInputGroup from '../../../components/molecules/input-group/text-input';
import OrganismLayout from '../../../components/organisms/layout';

import CategoryService from '../../../services/category';
import RequestAdapterService from '../../../services/request-adapter';

const categoryService = new CategoryService();

const CategoryModifyPage = () => {
	const { id } = useParams();
	const history = useHistory();
	const location = useLocation();
	const isCreating = location.pathname.includes('add') ? true : false;

	const [category, setCategory] = useState(null);
	const [categoryImage, setCategoryImage] = useState(null);
	const [isSubmitting, setIsSubmitting] = useState(false);

	const getCategoryDetail = async (id) => {
		try {
			const category = await categoryService.getCategoryById(id);
			setCategory(category);

			const brandImageFile = await RequestAdapterService.convertImageURLtoFile(
				category.image.original
			);
			setCategoryImage(brandImageFile);
		} catch (error) {
			message.error(error.message);
			console.error(error);
		}
	};

	const setCategoryInitialValues = () => {
		return isCreating
			? {}
			: {
					colour: category.color.id,
					en_name: category.name.en,
					id_name: category.name.id,
					image: category.iamge,
			  };
	};

	const submit = async (values) => {
		try {
			setIsSubmitting(true);

			const data = new FormData();
			data.append('color_id', values.colour);
			data.append('image', categoryImage);
			data.append('name[en]', values.en_name);
			data.append('name[id]', values.id_name);

			if (isCreating) {
				await categoryService.createCategory(data);
				message.success('Berhasil menambah kategori');
			} else {
				await categoryService.editCategory(id, data);
				message.success('Berhasil mengubah kategori');
			}

			message.info(
				'Akan dikembalikan ke halaman daftar kategori dalam 2 detik'
			);
			setTimeout(() => {
				history.push('/products/category');
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
				{ name: 'Produk', link: '/products/category' },
				{ name: 'Kategori Dasar', link: '/products/category' },
				{
					name: location.pathname.includes('add') ? 'Tambah' : 'Ubah',
					link: location.pathname,
				},
			]}
			title={`${isCreating ? 'Tambah' : 'Ubah'} Kategori`}
		>
			<Typography.Title level={4}>
				<span className="fw7">
					{`${isCreating ? 'Tambah' : 'Ubah'} Kategori`.toUpperCase()}
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
											label="Nama Kategori (ID)"
											placeholder="Nama Kategori (ID)"
											type="text"
										/>
									</Col>

									<Col span={12}>
										<MoleculeTextInputGroup
											name="en_name"
											label="Nama Kategori (EN)"
											placeholder="Nama Kategori (EN)"
											type="text"
										/>
									</Col>

									<Col span={24}>
										<MoleculeFileInputGroup
											defaultValue={categoryImage}
											label="Foto Icon"
											id="icon-photo-upload"
											name="image"
											placeholder="png"
											setImage={setCategoryImage}
										/>
									</Col>

									<Col span={24}>
										<MoleculeSelectInputGroup
											label="Pilih Warna"
											name="colour"
											placeholder="Pilih Warna"
											data={{
												url: '/v1/colors',
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

						<Col className="mt5" span={24}>
							<Space>
								<Link to="/products/category">
									<Button
										className="br3 denim b--denim"
										size="large"
									>
										Kembali
									</Button>
								</Link>
								<Button
									className="br3 bg-denim white"
									htmlType="submit"
									loading={isSubmitting}
									size="large"
								>
									{`${
										isCreating ? 'Tambah' : 'Ubah'
									} Kategori`}
								</Button>
							</Space>
						</Col>
					</Row>
				</Form>
			)}
		</OrganismLayout>
	);
};

export default CategoryModifyPage;
