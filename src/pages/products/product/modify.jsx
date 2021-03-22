/* eslint-disable no-mixed-spaces-and-tabs */
/* eslint-disable no-unused-vars */

import React, { useEffect, useState } from 'react';
import {
	Col,
	Collapse,
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

import ProductService from '../../../services/product';
import MoleculeNumberInputGroup from '../../../components/molecules/input-group/number-input';
import AtomSecondaryButton from '../../../components/atoms/button/secondary-button';
import MoleculeProductAttributesInput from '../../../components/molecules/product/attributes-input';

const ProductModifyPage = () => {
	const location = useLocation();
	const productService = new ProductService();
	const isCreating = location.pathname.includes('add') ? true : false;

	const [attributes, setAttributes] = useState([]);
	const [fullDescEn, setFullDescEn] = useState('');
	const [fullDescId, setFullDescId] = useState('');
	const [product, setProduct] = useState(null);
	const { id } = useParams();

	const addAttribute = () => {
		let currentAttributes = [...attributes];
		currentAttributes.push({
			name: { id: 'Nama atribut', en: 'Attribute name' },
			values: [{ id: 'Nilai atribut', en: 'attributes value' }],
		});
		setAttributes(currentAttributes);
	};

	const deleteAttribute = (index) => {
		let currentAttributes = [...attributes];
		currentAttributes.splice(index, 1);
		setAttributes(currentAttributes);
	};

	const getProductDetail = async () => {
		try {
			const response = await productService.getProductById(id);
			setProduct(response.data);
		} catch (error) {
			message.error(error.message);
		}
	};

	const modifyAttributeValue = (attrIdx, type, itemIdx) => {
		let currentAttributes = [...attributes];

		if (type === 'DELETE') {
			currentAttributes[attrIdx].values.splice(itemIdx, 1);
		} else {
			currentAttributes[attrIdx].values.push({
				id: 'Nilai atribut',
				en: 'attributes value',
			});
		}

		setAttributes(currentAttributes);
	};

	const setAttributeValue = ({ itemIdx, lang, attrKey, index, value }) => {
		let currentAttributes = [...attributes];

		if (typeof itemIdx !== 'undefined') {
			currentAttributes[index][attrKey][itemIdx][lang] = value;
		} else {
			currentAttributes[index][attrKey][lang] = value;
		}

		setAttributes(currentAttributes);
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
						name="modify_promotion"
						// initialValues={setPromotionInitialValues()}
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
								<AtomSecondaryButton
									onClick={() => addAttribute()}
									className="br2 mv2"
									size="large"
								>
									Tambah Attribut
								</AtomSecondaryButton>

								<Collapse
									bordered={false}
									className="bg-white"
									defaultActiveKey={[0]}
								>
									{attributes.map((attribute, index) => (
										<Collapse.Panel
											header={attribute.name.id}
											key={index}
										>
											<MoleculeProductAttributesInput
												attrIdx={index}
												attribute={attribute}
												deleteAttribute={
													deleteAttribute
												}
												modifyAttributeValue={
													modifyAttributeValue
												}
												setAttributesValue={
													setAttributeValue
												}
											/>
										</Collapse.Panel>
									))}
								</Collapse>
							</Tabs.TabPane>

							{/* <Tabs.TabPane key="2" tab="Varian">
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
							</Tabs.TabPane> */}
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
