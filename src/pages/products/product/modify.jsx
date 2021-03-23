/* eslint-disable no-mixed-spaces-and-tabs */
/* eslint-disable no-unused-vars */

import React, { useEffect, useRef, useState } from 'react';
import {
	Col,
	Form,
	message,
	Row,
	Skeleton,
	Space,
	Tabs,
	Typography,
} from 'antd';
import { useLocation, useParams } from 'react-router';

import AtomBranchSelection from '../../../components/atoms/selection/branch';
import AtomCard from '../../../components/atoms/card';
import AtomProductOwnerSelect from '../../../components/atoms/selection/product-owner';
import MoleculeSelectInputGroup from '../../../components/molecules/input-group/select-input';
import MoleculeTextEditorGroup from '../../../components/molecules/input-group/text-editor';
import MoleculeTextInputGroup from '../../../components/molecules/input-group/text-input';
import OrganismLayout from '../../../components/organisms/layout';
import OrganismProductBranchDatatable from '../../../components/organisms/datatable/product-branch-datatable';

import MoleculeNumberInputGroup from '../../../components/molecules/input-group/number-input';
import MoleculeProductAttributesInput from '../../../components/molecules/product/attributes-input';
import MoleculeFileInputGroup from '../../../components/molecules/input-group/file-input';
import MoleculeProductVariantsInput from '../../../components/molecules/product/variants-input';

import MasterService from '../../../services/master';
import ProductService from '../../../services/product';

const ProductModifyPage = () => {
	const beautyImageRef = useRef();
	const inspirationImageRef = useRef();
	const packagingImageRef = useRef();
	const whiteImageRef = useRef();

	const masterService = new MasterService();
	const productService = new ProductService();

	const location = useLocation();
	const isCreating = location.pathname.includes('add') ? true : false;

	const { id } = useParams();
	const [attributes, setAttributes] = useState([]);
	const [fullDescEn, setFullDescEn] = useState('');
	const [fullDescId, setFullDescId] = useState('');
	const [isSubmitting, setIsSubmitting] = useState(false);
	const [product, setProduct] = useState(null);
	const [variants, setVariants] = useState([]);

	const getProductDetail = async () => {
		try {
			const response = await productService.getProductById(id);
			setProduct(response.data);
		} catch (error) {
			message.error(error.message);
		}
	};

	const submit = async (values) => {
		setIsSubmitting(true);

		try {
			await uploadProductImages();
		} catch (error) {
			message.error(error.message);
		} finally {
			setIsSubmitting(false);
		}
	};

	const uploadProductImages = async () => {
		try {
			const images = {
				beauty_image: await beautyImageRef.current.getImage(),
				white_image: await whiteImageRef.current.getImage(),
				inspiration_image: await inspirationImageRef.current.getImage(),
				packaging_image: await packagingImageRef.current.getImage(),
			};

			for (const key in images) {
				if (images[key]) {
					const data = new FormData();
					data.append('file', images[key]);
					data.append('type', 'image');

					images[key] = await masterService.uploadImage(data);
				} else {
					images[key] = product[key];
				}
			}

			return images;
		} catch (error) {
			message.error(error.message);
		}
	};

	useEffect(() => {
		(async () => {
			if (!isCreating) await getProductDetail();
		})();
	}, []);

	return (
		<OrganismLayout
			breadcumbs={[
				{ name: 'Produk', link: '/products/' },
				{ name: 'Produk - Produk', link: '/products/' },
				{
					name: location.pathname.includes('add') ? 'Tambah' : 'Ubah',
					link: location.pathname,
				},
			]}
			title={`${isCreating ? 'Tambah' : 'Ubah'} Produk`}
		>
			<Typography.Title level={4}>
				<span className="fw7">
					{`${isCreating ? 'Tambah' : 'Ubah'} Produk`.toUpperCase()}
				</span>
			</Typography.Title>

			{!isCreating && !product ? (
				<Skeleton active />
			) : (
				<Space
					direction="vertical"
					size="large"
					style={{ maxWidth: '100%' }}
				>
					<Form
						className="w-100 mt4"
						name="modify_product"
						// initialValues={setproductInitialValues()}
						// onFinish={submit}
						onFinishFailed={(error) => {
							message.error(`Failed: ${error}`);
							console.error(error);
						}}
					>
						{' '}
						<AtomCard title="Info Produk">
							<Row gutter={[24, 24]}>
								<Col span={24}>
									<MoleculeFileInputGroup
										description="Format gambar .jpg .jpeg .png, Untuk foto ukuran minimum 450 x 450px"
										label="Foto Banner"
										fileInputs={[
											{
												label: `Foto Produk "Cantik"`,
												required: true,
												ref: beautyImageRef,
												defaultValue: product
													? product.beauty_image
													: null,
											},
											{
												label: `Foto Produk "Putih Terbang"`,
												ref: whiteImageRef,
												defaultValue: product
													? product.white_image
													: null,
											},
											{
												label: `Foto Produk "Inspirasi"`,
												ref: inspirationImageRef,
												defaultValue: product
													? product.inspiration_image
													: null,
											},
											{
												label: `Foto Produk "Packaging"`,
												ref: packagingImageRef,
												defaultValue: product
													? product.packaging_image
													: null,
											},
										]}
									/>
								</Col>

								<Col span={24}>
									<MoleculeTextInputGroup
										name="sku_id"
										label="SKU ID"
										placeholder="SKU ID"
										required
										type="text"
										rules={[
											{
												message: `Tidak boleh mengandung special character kecuali '-' dan '/'`,
												pattern: new RegExp(
													/[~`!@#$%^&()_={}[\]:;,.<>+?]/
												),
											},
										]}
									/>
								</Col>

								<Col span={12}>
									<MoleculeTextInputGroup
										name="name_id"
										label="Nama Produk (ID)"
										placeholder="Nama Produk (ID)"
										required
										type="text"
									/>
								</Col>

								<Col span={12}>
									<MoleculeTextInputGroup
										name="name_en"
										label="Nama Produk (EN)"
										placeholder="Nama Produk (EN)"
										required
										type="text"
									/>
								</Col>

								<Col span={12}>
									<MoleculeTextInputGroup
										label="Deskripsi Singkat (ID)"
										name="id_short_desc"
										placeholder="Deskripsi Singkat (ID)"
										required
										type="textarea"
										autoSize={{
											minRows: 2,
											maxRows: 6,
										}}
									/>
								</Col>

								<Col span={12}>
									<MoleculeTextInputGroup
										label="Deskripsi Singkat (EN)"
										name="en_short_desc"
										placeholder="Deskripsi Singkat (EN)"
										required
										type="textarea"
										autoSize={{
											minRows: 2,
											maxRows: 6,
										}}
									/>
								</Col>

								<Col span={12}>
									<MoleculeTextEditorGroup
										label="Deskripsi Lengkap (ID)"
										onChange={setFullDescId}
										value={fullDescId}
										required={true}
									/>
								</Col>

								<Col span={12}>
									<MoleculeTextEditorGroup
										label="Deskripsi Lengkap (EN)"
										onChange={setFullDescEn}
										value={fullDescEn}
										required={true}
									/>
								</Col>

								<Col span={12}>
									<MoleculeSelectInputGroup
										label="Kategori Tambahan"
										name="additional-categories"
										placeholder="Kategori Tambahan"
										required
										data={{
											url: 'additional-categories',
											generateCustomOption: (item) => ({
												value: item.id,
												label: item.name.id,
											}),
										}}
									/>
								</Col>

								<Col span={12}>
									<AtomBranchSelection
										mode="multiple"
										required
									/>
								</Col>

								<Col span={12}>
									<MoleculeSelectInputGroup
										label="Kategori Dasar"
										name="base-categories"
										placeholder="Kategori Dasar"
										required
										data={{
											url: 'base-categories',
											generateCustomOption: (item) => ({
												value: item.id,
												label: item.name.id,
											}),
										}}
									/>
								</Col>

								<Col span={12}>
									<AtomProductOwnerSelect required />
								</Col>

								<Col span={12}>
									<MoleculeSelectInputGroup
										label="Zona"
										name="zone"
										placeholder="Zona"
										required
										data={{
											url: 'zones',
											generateCustomOption: (item) => ({
												value: item.id,
												label: item.name.id,
											}),
										}}
									/>
								</Col>

								<Col span={12}>
									<MoleculeSelectInputGroup
										label="Brand"
										name="brand"
										placeholder="Brand"
										required
										data={{
											url: 'brands',
											generateCustomOption: (item) => ({
												value: item.id,
												label: item.name.id,
											}),
										}}
									/>
								</Col>

								<Col span={12}>
									<MoleculeNumberInputGroup
										id="age_limit"
										label="Batas Umur"
										name="age_limit"
										placeholder="Batas Umur"
									/>
								</Col>

								<Col span={12}>
									<MoleculeTextInputGroup
										name="supplier"
										label="Supplier"
										placeholder="Supplier"
										required
										type="text"
									/>
								</Col>

								<Col span={12}>
									<MoleculeSelectInputGroup
										label="Produk Serupa"
										name="similar_product"
										mode="multiple"
										placeholder="Produk Serupa"
										required
										data={{
											url: 'product/variants/lists',
											generateCustomOption: (item) => ({
												value: item.sku_id,
												label: `${item.sku_id} - ${item.name.id}`,
											}),
										}}
									/>
								</Col>

								<Col span={12}>
									<MoleculeSelectInputGroup
										label="Produk Terkait"
										name="related_product"
										mode="multiple"
										placeholder="Produk Terkait"
										required
										data={{
											url: 'product/variants/lists',
											generateCustomOption: (item) => ({
												value: item.sku_id,
												label: `${item.sku_id} - ${item.name.id}`,
											}),
										}}
									/>
								</Col>

								<Col span={12}>
									<MoleculeTextInputGroup
										name="txt1"
										label="Txt1"
										placeholder="Txt1"
										required
										type="text"
									/>
								</Col>

								<Col span={12}>
									<MoleculeTextInputGroup
										name="txt2"
										label="Txt2"
										placeholder="Txt2"
										required
										type="text"
									/>
								</Col>

								<Col span={12}>
									<MoleculeTextInputGroup
										name="txt3"
										label="Txt3"
										placeholder="Txt3"
										required
										type="text"
									/>
								</Col>

								<Col span={12}>
									<MoleculeTextInputGroup
										name="txt4"
										label="Txt4"
										placeholder="Txt4"
										required
										type="text"
									/>
								</Col>
							</Row>
						</AtomCard>
					</Form>

					<AtomCard title="">
						<Tabs>
							<Tabs.TabPane key="1" tab="Attribut">
								<MoleculeProductAttributesInput
									attributes={attributes}
									setAttributes={setAttributes}
								/>
							</Tabs.TabPane>

							<Tabs.TabPane key="2" tab="Varian">
								<MoleculeProductVariantsInput
									setVariants={setVariants}
									variants={variants}
								/>
							</Tabs.TabPane>
						</Tabs>
					</AtomCard>

					{/*	<OrganismProductBranchDatatable
						defaultData={product.details}
						isReadOnly
					/> */}
				</Space>
			)}
		</OrganismLayout>
	);
};

export default ProductModifyPage;
