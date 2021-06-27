/* eslint-disable no-mixed-spaces-and-tabs */

import React, { useEffect, useState } from 'react';
import ReactMoment from 'react-moment';
import { Col, message, Row, Skeleton, Space, Tabs, Typography } from 'antd';
import { useLocation, useParams } from 'react-router';

import AtomCard from '../../../components/atoms/card';
import MoleculeImageGroup from '../../../components/molecules/molecule-image-group';
import MoleculeInfoGroup from '../../../components/molecules/info-group';
import MoleculeMarkdownRenderer from '../../../components/molecules/markdown-renderer';
import MoleculeProductVariants from '../../../components/molecules/product/variants';
import OrganismLayout from '../../../components/organisms/layout';
import OrganismProductBranchDatatable from '../../../components/organisms/datatable/product-branch-datatable';

import ProductService from '../../../services/product';
import MoleculeProductAttributes from '../../../components/molecules/product/attributes';

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
			response.data.details = response.data.details.length > 0 ? response.data.details.map((detail) => {
				const variantIdx = response.data.variants.findIndex((x) => x.sku_id === detail.sku_id);
				return {
					...detail,
					variant: response.data.variants[variantIdx].name.id
				}
			}) : []
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
						<Row gutter={[24, 24]} className="mt4">
							<Col span={24}>
								<MoleculeInfoGroup
									title="Foto Produk"
									content={
										<MoleculeImageGroup
											images={[
												{
													source:
														product.beauty_image,
													label: `Foto "Cantik"`,
												},
												{
													source:
														product.white_image,
													label: `Foto "Putih Terbang"`,
												},
												{
													source:
														product.inspiration_image,
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
									title="Kode UPC"
									content={product.upc_code}
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
									content={product?.full_description?.id ? (
										<MoleculeMarkdownRenderer
											withBorder
											text={product?.full_description?.id}
										/>
									) : null}
								/>
							</Col>

							<Col span={12}>
								<MoleculeInfoGroup
									title="Deskripsi Lengkap (EN)"
									content={product?.full_description?.en ? (
										<MoleculeMarkdownRenderer
											withBorder
											text={product?.full_description?.en}
										/>
									) : null}
								/>
							</Col>

							<Col span={12}>
								<MoleculeInfoGroup
									title="Kategori Tambahan (ID)"
									content={
										product.additional_category &&
										product.additional_category.id
									}
								/>
							</Col>

							<Col span={12}>
								<MoleculeInfoGroup
									title="Cabang Freezy (ID)"
									content={product.branches.length > 0 ? product.branches.map(x => x.name.id).join(', ') : '-'}
								/>
							</Col>

							<Col span={12}>
								<MoleculeInfoGroup
									title="Kategori Dasar (ID)"
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
									title="Ukuran Produk (cm)"
									content={`P: ${product?.long_cm ?? '-'} X L: ${product?.wide_cm ?? '-'} X T: ${product?.height_cm ?? '-'}`}
								/>
							</Col>

							<Col span={12}>
								<MoleculeInfoGroup
									title="Berat Produk (gr)"
									content={product?.weight_gr ? `${product?.weight_gr} gr` : '-'}
								/>
							</Col>

							<Col span={12}>
								<MoleculeInfoGroup
									title="UOM"
									content={product?.uom}
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

					<AtomCard title="Info Update">
						<Row gutter={[24, 24]} className="mt4">
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
								<MoleculeProductAttributes
									attributes={product.attributes}
								/>
							</Tabs.TabPane>

							<Tabs.TabPane key="2" tab="Varian">
								<MoleculeProductVariants
									variants={product.variants}
								/>
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
