/* eslint-disable no-unused-vars */

import React, { useEffect, useState } from 'react';
import ReactMoment from 'react-moment';
import {
	Col,
	Collapse,
	message,
	Row,
	Skeleton,
	Space,
	Tabs,
	Typography,
} from 'antd';
import { useLocation, useParams } from 'react-router';

import AtomCard from '../../../components/atoms/card';
import AtomImage from '../../../components/atoms/image';
import MoleculeImageGroup from '../../../components/molecules/molecule-image-group';
import MoleculeInfoGroup from '../../../components/molecules/info-group';
import MoleculeMarkdownRenderer from '../../../components/molecules/markdown-renderer';
import OrganismLayout from '../../../components/organisms/layout';
import OrganismProductBranchDatatable from '../../../components/organisms/datatable/product-branch-datatable';

import ProductService from '../../../services/product';

const OrganismProductDetail = () => {
	const [isFetchingDetail, setIsFetchingDetail] = useState(true);
	const [product, setProduct] = useState(null);
	const { id } = useParams();
	const location = useLocation();
	const productService = new ProductService();

	const getProductDetail = async () => {
		setIsFetchingDetail(true);
		try {
			// const response = await productService.getProductById();
			const response = {
				age_limit: 99,
				branch: 'Jakarta Selatan',
				created_at: new Date(),
				created_by: 'Lee Seong Gi',
				height_cm: '10',
				long_cm: '10',
				product_owner: 'Sampingan Mitra Indonesia',
				sku_id: 'SKU-001',
				supplier: 'Tani Hub',
				txt1: 'Txt1',
				txt2: 'Txt2',
				txt3: 'Txt3',
				txt4: 'Txt4',
				updated_by: 'Lee Seong Gi',
				upc_code: 'UPC-001',
				updated_at: new Date(),
				weight_gr: '1000',
				wide_cm: '10',
				additional_category: {
					id: 'Additional Category Indonesia',
					en: 'Additional Category Inggris',
				},
				base_category: {
					id: 'Base Category Indonesia',
					en: 'Base Category Inggris',
				},
				brand: {
					id: 'Brand Indonesia',
					en: 'Brand Inggris',
				},
				cantik_image:
					'https://api.freezyfresh.abcwork.id/storage/uploads/profile_image/product/q967a4yd35m8kl3x/jIWGyM33OIFcvAQ7K4I5.jpg',
				full_description: {
					id: 'long_description indonesia',
					en: 'long_description english',
				},
				inspirasi_image:
					'https://api.freezyfresh.abcwork.id/storage/uploads/profile_image/product/q967a4yd35m8kl3x/jIWGyM33OIFcvAQ7K4I5.jpg',
				name: {
					id: 'Nama Produk Indonesia',
					en: 'Nama Produk Inggris',
				},
				packaging_image:
					'https://api.freezyfresh.abcwork.id/storage/uploads/profile_image/product/q967a4yd35m8kl3x/jIWGyM33OIFcvAQ7K4I5.jpg',
				putih_terbang_image:
					'https://api.freezyfresh.abcwork.id/storage/uploads/profile_image/product/q967a4yd35m8kl3x/jIWGyM33OIFcvAQ7K4I5.jpg',
				related_products: ['Produk 1', 'Produk 2', 'Produk 3'],
				short_description: {
					id: 'short_description indonesia',
					en: 'short_description english',
				},
				similar_products: ['Produk 1', 'Produk 2', 'Produk 3'],

				zone: {
					id: 'zone indonesia',
					en: 'zone english',
				},
			};

			setProduct(response);
		} catch (error) {
			message.error(error.message);
		} finally {
			setIsFetchingDetail(false);
		}
	};

	useEffect(() => {
		(async () => await getProductDetail())();
	}, []);

	return (
		<OrganismLayout
			breadcumbs={[
				{ name: 'Produk', link: '/products/' },
				{ name: 'Produk - Produk', link: '/products/' },
				{ name: 'Detail', link: location.pathname },
			]}
			title={`Detail Produk`}
		>
			<Typography.Title level={4}>
				<span className="fw7">{`Detail Produk`.toUpperCase()}</span>
			</Typography.Title>

			{!product ? (
				<Skeleton active />
			) : (
				<Space
					direction="vertical"
					size="large"
					style={{ maxWidth: '100%' }}
				>
					<AtomCard title="Info Produk">
						<Row gutter={[24, 24]}>
							<Col span={24}>
								<MoleculeInfoGroup
									title="Foto Produk"
									content={
										<MoleculeImageGroup
											images={[
												{
													source:
														product.cantik_image,
													label: `Foto "Cantik"`,
												},
												{
													source:
														product.putih_terbang_image,
													label: `Foto "Putih Terbang"`,
												},
												{
													source:
														product.inspirasi_image,
													label: `Foto "Inspirasi"`,
												},
												{
													source:
														product.packaging_image,
													label: `Foto "Packaging"`,
												},
											]}
										/>
									}
								/>
							</Col>

							<Col span={12}>
								<MoleculeInfoGroup
									title="SKU ID"
									content={product.sku_id}
								/>
							</Col>

							<Col span={12}>
								<MoleculeInfoGroup
									title="Nama Produk (ID)"
									content={product.name.id}
								/>
							</Col>

							<Col span={12}>
								<MoleculeInfoGroup
									title="Nama Produk (EN)"
									content={product.name.en}
								/>
							</Col>

							<Col span={12}>
								<MoleculeInfoGroup
									title="Kode UPC"
									content={product.upc_code}
								/>
							</Col>

							<Col span={12}>
								<MoleculeInfoGroup
									title="Deskripsi Singkat (ID)"
									content={product.short_description.id}
								/>
							</Col>

							<Col span={12}>
								<MoleculeInfoGroup
									title="Deskripsi Singkat (EN)"
									content={product.short_description.en}
								/>
							</Col>

							<Col span={12}>
								<MoleculeInfoGroup
									title="Deskripsi Lengkap (ID)"
									content={
										<MoleculeMarkdownRenderer
											withBorder
											text={product.full_description.id}
										/>
									}
								/>
							</Col>

							<Col span={12}>
								<MoleculeInfoGroup
									title="Deskripsi Lengkap (EN)"
									content={
										<MoleculeMarkdownRenderer
											withBorder
											text={product.full_description.en}
										/>
									}
								/>
							</Col>

							<Col span={12}>
								<MoleculeInfoGroup
									title="Kategori Tambahan"
									content={product.additional_category.id}
								/>
							</Col>

							<Col span={12}>
								<MoleculeInfoGroup
									title="Cabang"
									content={product.branch}
								/>
							</Col>

							<Col span={12}>
								<MoleculeInfoGroup
									title="Kategori Dasar"
									content={product.base_category.id}
								/>
							</Col>

							<Col span={12}>
								<MoleculeInfoGroup
									title="Perusahaan"
									content={product.product_owner}
								/>
							</Col>

							<Col span={12}>
								<MoleculeInfoGroup
									title="Zona"
									content={product.zone.id}
								/>
							</Col>

							<Col span={12}>
								<MoleculeInfoGroup
									title="Brand"
									content={product.brand.id}
								/>
							</Col>

							<Col span={12}>
								<MoleculeInfoGroup
									title="Ukuran Produk"
									content={
										<span>
											P: {product.wide_cm} x L:{' '}
											{product.long_cm} x T:{' '}
											{product.height_cm}
										</span>
									}
								/>
							</Col>

							<Col span={12}>
								<MoleculeInfoGroup
									title="Berat Produk"
									content={`${product.weight_gr} gr`}
								/>
							</Col>

							<Col span={12}>
								<MoleculeInfoGroup
									title="Batas Umur"
									content={product.age_limit}
								/>
							</Col>

							<Col span={12}>
								<MoleculeInfoGroup
									title="Supplier"
									content={product.supplier}
								/>
							</Col>

							<Col span={12}>
								<MoleculeInfoGroup
									title="Produk Serupa"
									content={product.similar_products
										.map((product) => product)
										.join(', ')}
								/>
							</Col>

							<Col span={12}>
								<MoleculeInfoGroup
									title="Produk Terkait"
									content={product.related_products
										.map((product) => product)
										.join(', ')}
								/>
							</Col>

							<Col span={12}>
								<MoleculeInfoGroup
									title="Txt 1"
									content={product.txt1}
								/>
							</Col>

							<Col span={12}>
								<MoleculeInfoGroup
									title="Txt 2"
									content={product.txt2}
								/>
							</Col>

							<Col span={12}>
								<MoleculeInfoGroup
									title="Txt 3"
									content={product.txt3}
								/>
							</Col>

							<Col span={12}>
								<MoleculeInfoGroup
									title="Txt 4"
									content={product.txt4}
								/>
							</Col>
						</Row>
					</AtomCard>

					<AtomCard title="Info Produk">
						<Row gutter={[24, 24]}>
							<Col span={12}>
								<MoleculeInfoGroup
									title="Tanggal Pendaftaran"
									content={
										<ReactMoment format="DD-MM-YY">
											{product.created_at}
										</ReactMoment>
									}
								/>
							</Col>

							<Col span={12}>
								<MoleculeInfoGroup
									title="Tanggal Diperbaharui"
									content={
										<ReactMoment format="DD-MM-YY">
											{product.updated_at}
										</ReactMoment>
									}
								/>
							</Col>

							<Col span={12}>
								<MoleculeInfoGroup
									title="Didaftarkan Oleh"
									content={product.created_by}
								/>
							</Col>

							<Col span={12}>
								<MoleculeInfoGroup
									title="Diperbaharui Oleh"
									content={product.updated_by}
								/>
							</Col>
						</Row>
					</AtomCard>

					<AtomCard title="">
						<Tabs>
							<Tabs.TabPane key="1" tab="Attribut">
								<Collapse ghost defaultActiveKey={['1']}>
									<Collapse.Panel header="Warna" key="1">
										{' '}
										<Row gutter={[24, 24]}>
											<Col span={12}>
												<MoleculeInfoGroup
													title="Nama"
													content="Warna | Color"
												/>
											</Col>

											<Col span={12}>
												<MoleculeInfoGroup
													title="Kode UPC"
													content={
														<Space
															direction="vertical"
															size={0}
														>
															<span>
																Red | Merah
															</span>
															<span>
																Yellow | Kuning
															</span>
															<span>
																Black | Hitam
															</span>
														</Space>
													}
												/>
											</Col>
										</Row>
									</Collapse.Panel>

									<Collapse.Panel header="Ukuran" key="2">
										Ukuran
									</Collapse.Panel>
								</Collapse>
							</Tabs.TabPane>

							<Tabs.TabPane key="2" tab="Varian">
								<Collapse ghost defaultActiveKey={['1']}>
									<Collapse.Panel header="Warna" key="1">
										<Row gutter={[24, 24]}>
											<Col span={12}>
												<MoleculeInfoGroup
													title="SKU ID"
													content={product.sku_id}
												/>
											</Col>

											<Col span={12}>
												<MoleculeInfoGroup
													title="Kode UPC"
													content={product.upc_code}
												/>
											</Col>

											<Col span={12}>
												<MoleculeInfoGroup
													title="Foto Produk"
													content={
														<AtomImage
															src=""
															size={30}
														/>
													}
												/>
											</Col>

											<Col span={12}>
												<MoleculeInfoGroup
													title="Supplier"
													content={product.supplier}
												/>
											</Col>

											<Col span={12}>
												<MoleculeInfoGroup
													title="Ukuran Produk"
													content={
														<span>
															P: {product.wide_cm}{' '}
															x L:{' '}
															{product.long_cm} x
															T:{' '}
															{product.height_cm}
														</span>
													}
												/>
											</Col>

											<Col span={12}>
												<MoleculeInfoGroup
													title="Berat Produk"
													content={`${product.weight_gr} gr`}
												/>
											</Col>
										</Row>
									</Collapse.Panel>
									<Collapse.Panel header="Ukuran" key="2">
										Ukuran
									</Collapse.Panel>
								</Collapse>
							</Tabs.TabPane>
						</Tabs>
					</AtomCard>

					<OrganismProductBranchDatatable
						defaultData={[]}
						isReadOnly
					/>
				</Space>
			)}
		</OrganismLayout>
	);
};

export default OrganismProductDetail;
