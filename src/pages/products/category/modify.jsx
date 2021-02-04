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
import { Link, useLocation, useParams } from 'react-router-dom';

import AtomCard from '../../../components/atoms/card';
import MoleculeFileInputGroup from '../../../components/molecules/input-group/file-input';
import MoleculeSelectInputGroup from '../../../components/molecules/input-group/select-input';
import MoleculeTextInputGroup from '../../../components/molecules/input-group/text-input';
import OrganismLayout from '../../../components/organisms/layout';

import CategoryService from '../../../services/category';
const categoryService = new CategoryService();

const CategoryModifyPage = () => {
	const { id } = useParams();
	const location = useLocation();
	const isCreating = location.pathname.includes('add') ? true : false;

	const [category, setCategory] = useState(null);

	const getCategoryDetail = (id) => {
		try {
			const category = categoryService.getCategoryById(id);
			setCategory(category);
		} catch (error) {
			message.error(error.message);
		}
	};

	const submit = async (values) => {
		try {
			const data = new FormData();
			Object.keys(values).forEach((key) => {
				data.append(key, values[key]);
			});

			if (isCreating) {
				await categoryService.createCategory(data);
				message.success('Berhasil menambah kategori');
			} else {
				await categoryService.editCategory(id, data);
				message.success('Berhasil mengubah kategori');
			}
		} catch (error) {
			message.error(error.message);
		} finally {
			message.info(
				'Akan dikembalikan ke halaman daftar kategori dalam 2 detik'
			);
			setTimeout(() => {
				history.push('/products/category');
			}, 2000);
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
			title={`${isCreating ? 'Tambah' : 'Ubah'} Category`}
		>
			<Typography.Title level={4}>
				<span className="fw7">
					{`${isCreating ? 'Tambah' : 'Ubah'} Category`.toUpperCase()}
				</span>
			</Typography.Title>

			{!isCreating && !category ? (
				<Skeleton active />
			) : (
				<Form
					className="w-100 mt4"
					name="modify_category"
					initialValues={{ ...category }}
					onFinish={submit}
					onFinishFailed={(error) => {
						message.error(`Failed: ${error}`);
						console.error(error);
					}}
				>
					<Row>
						<Col span={15}>
							<AtomCard title="Info Category">
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

									<Col span={12}>
										<MoleculeFileInputGroup
											label="Foto Icon"
											id="icon-photo-upload"
											name="icon"
											placeholder="png"
										/>
									</Col>

									<Col span={12}>
										<MoleculeSelectInputGroup
											label="Pilih Warna"
											name="colour"
											placeholder="Pilih Warna"
											data={{
												url: '/products/colour',
												mock: [
													{
														label: (
															<Space>
																<div
																	className="br2"
																	style={{
																		background:
																			'#FF0000',
																		height: 20,
																		width: 20,
																	}}
																/>
																Merah
															</Space>
														),
														value: 'CC-2',
													},
													{
														label: (
															<Space>
																<div
																	className="br2"
																	style={{
																		background:
																			'#0000FF',
																		height: 20,
																		width: 20,
																	}}
																/>
																Biru
															</Space>
														),
														value: 'CC-2',
													},
												],
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
																		item.colour,
																	height: 20,
																	width: 20,
																}}
															/>

															{item.name}
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
									size="large"
									type="submit"
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
