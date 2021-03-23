/* eslint-disable no-mixed-spaces-and-tabs */

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
import MoleculeImageGroup from '../../../components/molecules/molecule-image-group';
import MoleculeInfoGroup from '../../../components/molecules/info-group';
import MoleculeMarkdownRenderer from '../../../components/molecules/markdown-renderer';
import MoleculeProductVariants from '../../../components/molecules/product/variants';
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
			const response = await productService.getProductById(id);
			setProduct(response.data);
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

			{isFetchingDetail ? (
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
														product.image &&
														product.image[0],
													label: `Foto "Cantik"`,
												},
												{
													source:
														product.image &&
														product.image[1],
													label: `Foto "Putih Terbang"`,
												},
												{
													source:
														product.image &&
														product.image[2],
													label: `Foto "Inspirasi"`,
												},
												{
													source:
														product.imag &&
														product.image[3],
													label: `Foto "Packaging"`,
												},
											]}
										/>
									}
								/>
							</Col>

							<Col span={24}>
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
									content={
										product.additional_category &&
										product.additional_category.id
									}
								/>
							</Col>

							<Col span={12}>
								<MoleculeInfoGroup
									title="Cabang"
									content={product.branch || '-'}
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
									title="Batas Umur"
									content={product.age_limit || '-'}
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
									content={
										product.similar_products &&
										product.similar_products.length > 0
											? product.similar_products
													.map((product) => product)
													.join(', ')
											: '-'
									}
								/>
							</Col>

							<Col span={12}>
								<MoleculeInfoGroup
									title="Produk Terkait"
									content={
										product.related_products &&
										product.related_products.length > 0
											? product.related_products
													.map((product) => product)
													.join(', ')
											: '-'
									}
								/>
							</Col>

							<Col span={12}>
								<MoleculeInfoGroup
									title="Txt 1"
									content={product.txt1 || '-'}
								/>
							</Col>

							<Col span={12}>
								<MoleculeInfoGroup
									title="Txt 2"
									content={product.txt2 || '-'}
								/>
							</Col>

							<Col span={12}>
								<MoleculeInfoGroup
									title="Txt 3"
									content={product.txt3 || '-'}
								/>
							</Col>

							<Col span={12}>
								<MoleculeInfoGroup
									title="Txt 4"
									content={product.txt4 || '-'}
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
										<ReactMoment format="DD-MM-YYYY">
											{product.created_at}
										</ReactMoment>
									}
								/>
							</Col>

							<Col span={12}>
								<MoleculeInfoGroup
									title="Tanggal Diperbaharui"
									content={
										<ReactMoment format="DD-MM-YYYY">
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
								<Collapse bordered={false} className="bg-white">
									{product.attributes
										? product.attributes.map(
												(attribute, index) => (
													<Collapse.Panel
														header={
															attribute.name.id
														}
														key={`vrnts_${index}`}
													>
														<Row gutter={[24, 24]}>
															<Col span={12}>
																<MoleculeInfoGroup
																	title=""
																	content={`${attribute.name.id} | ${attribute.name.en}`}
																/>
															</Col>

															<Col span={12}>
																<MoleculeInfoGroup
																	title=""
																	content={
																		<Space
																			direction="vertical"
																			size={
																				0
																			}
																		>
																			{attribute.values.map(
																				(
																					item,
																					itemIdx
																				) => (
																					<span
																						key={`vrtns_${index}_itms_${itemIdx}`}
																					>
																						{`${item.id} | ${item.en}`}
																					</span>
																				)
																			)}
																		</Space>
																	}
																/>
															</Col>
														</Row>
													</Collapse.Panel>
												)
										  )
										: null}
								</Collapse>
							</Tabs.TabPane>

							<Tabs.TabPane key="2" tab="Varian">
								<Collapse bordered={false} className="bg-white">
									{product.variants
										? product.variants.map(
												(varian, index) => (
													<Collapse.Panel
														header={varian.name.id}
														key={`attrbts_${index}`}
													>
														<MoleculeProductVariants
															{...varian}
														/>
													</Collapse.Panel>
												)
										  )
										: null}
								</Collapse>
							</Tabs.TabPane>
						</Tabs>
					</AtomCard>

					<OrganismProductBranchDatatable
						defaultData={product.details}
						isReadOnly
					/>
				</Space>
			)}
		</OrganismLayout>
	);
};

export default OrganismProductDetail;
