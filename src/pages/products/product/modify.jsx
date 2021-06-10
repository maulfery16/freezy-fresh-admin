/* eslint-disable react/display-name */
/* eslint-disable no-mixed-spaces-and-tabs */

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
import { useHistory, useParams } from 'react-router';

import AtomBranchSelection from '../../../components/atoms/selection/branch';
import AtomCard from '../../../components/atoms/card';
import AtomProductOwnerSelect from '../../../components/atoms/selection/product-owner';
import MoleculeFileInputGroup from '../../../components/molecules/input-group/file-input';
import MoleculeModifyActionButtons from '../../../components/molecules/modify-action-buttons';
import MoleculeNumberInputGroup from '../../../components/molecules/input-group/number-input';
import MoleculeProductAttributesInput from '../../../components/molecules/product/attributes-input';
import MoleculeProductVariantsInput from '../../../components/molecules/product/variants-input';
import MoleculeSelectInputGroup from '../../../components/molecules/input-group/select-input';
import MoleculeTextEditorGroup from '../../../components/molecules/input-group/text-editor';
import MoleculeTextInputGroup from '../../../components/molecules/input-group/text-input';
import OrganismLayout from '../../../components/organisms/layout';
import OrganismProductBranchDatatable from '../../../components/organisms/datatable/product-branch-datatable';

import MasterService from '../../../services/master';
import ProductService from '../../../services/product';

const ProductModifyPage = () => {
	const beautyImageRef = useRef();
	const inspirationImageRef = useRef();
	const packagingImageRef = useRef();
	const whiteImageRef = useRef();

	const masterService = new MasterService();
	const productService = new ProductService();

	const history = useHistory();
	const isCreating = location.pathname.includes('add') ? true : false;

	const { id } = useParams();
	const [form] = Form.useForm();
	const [attributes, setAttributes] = useState([]);
	const [branches, setBranches] = useState([]);
	const [fullDescEn, setFullDescEn] = useState('');
	const [fullDescId, setFullDescId] = useState('');
	const [isSubmitting, setIsSubmitting] = useState(false);
	const [product, setProduct] = useState(null);
	const [productVariants, setProductVariants] = useState([]);
	const [variants, setVariants] = useState([]);

	const combineProductVariantWithExisting = (
		newProductVariants,
		withoutVariant
	) => {
		let combinedProductVariants = [];

		newProductVariants.forEach((variant) => {
			const existingProductVariantId = productVariants.findIndex(
				(productVariant) => {
					if (withoutVariant) {
						return productVariant.branch.id === variant.branch.id;
					} else {
						return (
							productVariant.branch.id === variant.branch.id &&
							productVariant.sku_id === variant.sku_id
						);
					}
				}
			);

			if (existingProductVariantId > -1) {
				combinedProductVariants.push(
					productVariants[existingProductVariantId]
				);
			} else {
				combinedProductVariants.push({ ...variant });
			}
		});

		return combinedProductVariants;
	};

	const combineVariantWithExisting = (newVariants) => {
		let combinedVariants = [];

		newVariants.forEach((variant) => {
			const existingVariantIndex = variants.findIndex(
				(extVariant) => extVariant.name.id === variant.id
			);

			if (existingVariantIndex > -1) {
				combinedVariants.push(variants[existingVariantIndex]);
			} else {
				combinedVariants.push({ name: { ...variant } });
			}
		});

		return combinedVariants;
	};

	const generateProductVariants = () => {
		if (branches.length === 0) {
			message.warning(
				'Gagal untuk menghasilkan produk variant: belum ada cabang terpilih'
			);
			return;
		}

		try {
			let newProductVariants = [];
			let generatedProductsVariants = [];

			if (variants.length === 0) {
				const values = form.getFieldsValue(true);

				branches.map((branch) => {
					generatedProductsVariants.push({
						branch_id: branch.branch_id,
						branch_sku_id: branch.branch_id + values.sku_id,
						discount_percentage: '',
						fixed_price: 0,
						is_freezy_pick: true,
						is_manage_stock: true,
						price: '',
						published_stock: 0,
						sku_id: values.sku_id,
						variant: branch.branch,
						branch: {
							id: branch.branch,
						},
					});
				});

				newProductVariants = combineProductVariantWithExisting(
					generatedProductsVariants,
					true
				);
			} else {
				branches.map((branch) => {
					variants.map((variant) => {
						generatedProductsVariants.push({
							branch_id: branch.branch_id,
							branch_sku_id: branch.branch_id + variant.sku_id,
							discount_percentage: '',
							fixed_price: 0,
							is_freezy_pick: true,
							is_manage_stock: true,
							price: '',
							published_stock: 0,
							sku_id: variant.sku_id,
							variant: variant.name.id,
							branch: {
								id: branch.branch,
							},
						});
					});
				});

				newProductVariants = combineProductVariantWithExisting(
					generatedProductsVariants
				);
			}

			setProductVariants(newProductVariants);
		} catch (error) {
			message.error('Terjadi kesalah saat membuat data product variants');
		}
	};

	const generateVariants = () => {
		if (attributes.length === 0) {
			message.warning('Belum ada attrbutes yang ditambahkan');
			return;
		}

		try {
			let newVariants = [];
			let values = attributes.map((attr) => attr.values);

			if (values.length === 1) {
				newVariants = combineVariantWithExisting(values[0]);
			} else {
				let combiningAvailable = true;

				while (combiningAvailable) {
					const [firstValues, secondValues, ...other] = values;
					combiningAvailable = other.length > 0;

					let combinedValues = [];
					firstValues.forEach((firstValue) => {
						secondValues.forEach((secondValue) => {
							combinedValues.push({
								id: [firstValue.id, secondValue.id].join('|'),
								en: [firstValue.en, secondValue.en].join('|'),
							});
						});
					});

					values = [combinedValues, ...other];
				}

				newVariants = combineVariantWithExisting(values[0]);
			}

			setVariants(newVariants);
		} catch (error) {
			message.error('Terjadi kesalah saat membuat data varians');
		}
	};

	const getProductDetail = async () => {
		try {
			const response = await productService.getProductById(id);

			setAttributes(response.data.attributes);
			setFullDescEn(response.data.full_description.en);
			setFullDescId(response.data.full_description.id);
			setProduct(response.data);
			setProductVariants(
				response.data.details.map((variant) => ({
					...variant,
					branch_sku_id: variant.branch.id + variant.sku_id,
				}))
			);
			setVariants(response.data.variants);
		} catch (error) {
			message.error(error.message);
		}
	};

	const setProductInitialValues = () => {
		return isCreating
			? {}
			: {
					additional_category_id: product.additional_category_id,
					age_limit: product.age_limit,
					base_category_id: product.base_category_id,
					brand_id: product.brand_id,
					branches: product.branches.map((x) => x.id),
					company: product.product_owner_id,
					en_short_desc: product.short_description.en,
					height_cm: product.height_cm,
					id_short_desc: product.short_description.id,
					long_cm: product.long_cm,
					name_en: product.name.en,
					name_id: product.name.id,
					related_products: product.related_products,
					similar_products: product.similar_products,
					sku_id: product.sku_id,
					supplier: product.supplier,
					txt1: product.txt1,
					txt2: product.txt2,
					txt3: product.txt3,
					uom: product.uom,
					txt4: product.txt4,
					upc_code: product.upc_code,
					weight_gr: product.weight_gr,
					width_cm: product.wide_cm,
					zone_id: product.zone_id,
			  };
	};

	const submitProduct = async (values) => {
		setIsSubmitting(true);

		try {
			const images = await uploadProductImages();
			if (images) {
				const newProduct = {
					...values,
					...images,
					attributes,
					branches,
					details: productVariants,
					variants,
					product_owner_id: values.company,
					name: {
						id: values.name_id,
						en: values.name_en,
					},
					short_description: {
						id: values.id_short_desc,
						en: values.en_short_desc,
					},
					full_description: {
						id: fullDescId,
						en: fullDescEn,
					},
				};
	
				if (isCreating) {
					await productService.createProduct(newProduct);
					message.success('Berhasil membuat produk baru');
				} else {
					await productService.editProduct(id, newProduct);
					message.success('Berhasil mengubah data produk');
				}
	
				message.info(
					'Akan dikembalikan ke halaman daftar produk dalam 2 detik'
				);
				setTimeout(() => {
					history.push('/products');
				}, 2000);
			}

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
						form={form}
						name="modify_product"
						initialValues={setProductInitialValues()}
						onFinish={submitProduct}
						onFinishFailed={() => {
							message.error(
								'Kesalahan saat mengambil nilai pada form. Silahkan periksa kembali'
							);
						}}
					>
						<AtomCard title="Info Produk">
							<Row gutter={[24, 24]} className="mt4">
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

								<Col span={12}>
									<MoleculeTextInputGroup
										label="SKU ID"
										name="sku_id"
										placeholder="SKU ID"
										type="code"
										required
									/>
								</Col>

								<Col span={12}>
									<MoleculeTextInputGroup
										label="Kode UPC"
										name="upc_code"
										placeholder="Kode UPC"
										type="code"
										required
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
										name="additional_category_id"
										placeholder="Kategori Tambahan"
										data={{
											url: 'additional-categories',
											generateCustomOption: (item) => ({
												value: item.id,
												label: item.name.id,
											}),
											limit: 300
										}}
									/>
								</Col>

								<Col span={12}>
									<AtomBranchSelection
										mode="multiple"
										onChange={(_, options) => {
											if (branches.length !== options) {
												const values = options.map((option) => ({
													branch_id: option.value,
													branch: option.children,
												}))
												const val = options.map((option) => option.value);
												form.setFieldsValue({ branches: val })
												setBranches(values);
											}
										}}
									/>
								</Col>

								<Col span={12}>
									<MoleculeSelectInputGroup
										label="Kategori Dasar"
										name="base_category_id"
										placeholder="Kategori Dasar"
										required
										data={{
											url: 'base-categories',
											generateCustomOption: (item) => ({
												value: item.id,
												label: item.name.id,
											}),
											limit: 300
										}}
									/>
								</Col>

								<Col span={12}>
									<AtomProductOwnerSelect required />
								</Col>

								<Col span={12}>
									<MoleculeSelectInputGroup
										label="Zona"
										name="zone_id"
										placeholder="Zona"
										required
										data={{
											url: 'zones',
											generateCustomOption: (item) => ({
												value: item.id,
												label: item.name.id,
											}),
											limit: 300
										}}
									/>
								</Col>

								<Col span={12}>
									<MoleculeSelectInputGroup
										label="Brand"
										name="brand_id"
										placeholder="Brand"
										required
										data={{
											url: 'brands',
											generateCustomOption: (item) => ({
												value: item.id,
												label: item.name.id,
											}),
											limit: 300
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
										type="text"
									/>
								</Col>

								<Col span={12}>
									<MoleculeSelectInputGroup
										label="Produk Serupa"
										name="similar_products"
										mode="multiple"
										placeholder="Produk Serupa"
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
										name="related_products"
										mode="multiple"
										placeholder="Produk Terkait"
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
									<Row gutter={12}>
										<Col span={6}>
											<MoleculeTextInputGroup
												name="long_cm"
												label="P"
												placeholder="Panjang"
												required
												suffix="cm"
												type="text"
											/>
										</Col>

										<Col span={6}>
											<MoleculeTextInputGroup
												name="width_cm"
												label="L"
												placeholder="Lebar"
												suffix="cm"
												type="text"
											/>
										</Col>

										<Col span={6}>
											<MoleculeTextInputGroup
												name="height_cm"
												label="T"
												placeholder="Tinggi"
												required
												suffix="cm"
												type="text"
											/>
										</Col>
									</Row>
								</Col>

								<Col span={12}>
									<MoleculeTextInputGroup
										name="weight_gr"
										label="Berat"
										placeholder="Berat"
										required
										suffix="gr"
										type="text"
									/>
								</Col>

								<Col span={12}>
									<MoleculeTextInputGroup
										name="uom"
										label="UOM"
										placeholder="UOM"
										type="text"
										required
									/>
								</Col>

								<Col span={12}>
									<MoleculeTextInputGroup
										name="txt1"
										label="Txt1"
										placeholder="Txt1"
										type="text"
									/>
								</Col>

								<Col span={12}>
									<MoleculeTextInputGroup
										name="txt2"
										label="Txt2"
										placeholder="Txt2"
										type="text"
									/>
								</Col>

								<Col span={12}>
									<MoleculeTextInputGroup
										name="txt3"
										label="Txt3"
										placeholder="Txt3"
										type="text"
									/>
								</Col>

								<Col span={12}>
									<MoleculeTextInputGroup
										name="txt4"
										label="Txt4"
										placeholder="Txt4"
										type="text"
									/>
								</Col>
							</Row>
						</AtomCard>
					</Form>
					<AtomCard title="">
						<Tabs
							onTabClick={(key) => {
								if (key === '2') generateVariants();
							}}
						>
							<Tabs.TabPane key="1" tab="Attribut">
								<MoleculeProductAttributesInput
									attributes={attributes}
									setAttributes={setAttributes}
									setVariants={(newVariants) => {
										setVariants(newVariants);
									}}
								/>
							</Tabs.TabPane>

							<Tabs.TabPane
								key="2"
								onClick={() => generateVariants()}
								tab="Varian"
							>
								<MoleculeProductVariantsInput
									setVariants={setVariants}
									variants={variants}
								/>
							</Tabs.TabPane>
						</Tabs>
					</AtomCard>

					<OrganismProductBranchDatatable
						defaultData={productVariants}
						isEditing={!isCreating}
						generateProductVariants={generateProductVariants}
						setProductVariants={setProductVariants}
					/>

					<Col className="mt4" span={24}>
						<MoleculeModifyActionButtons
							backUrl="/products"
							isCreating={isCreating}
							isSubmitting={isSubmitting}
							label="Produk"
							onClick={() => form.submit()}
						/>
					</Col>
				</Space>
			)}
		</OrganismLayout>
	);
};

export default ProductModifyPage;
