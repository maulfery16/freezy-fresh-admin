/* eslint-disable no-mixed-spaces-and-tabs */
/* eslint-disable react/display-name */
import React, { useRef, useEffect, useState } from 'react';
import ReactMoment from 'react-moment';
import { Col, Row, Typography, message, Tabs, Input, Form } from 'antd';
import { useLocation, useParams, Link } from 'react-router-dom';
import { useSelector } from 'react-redux';

import AtomSpinner from '../../../components/atoms/spinner';
import AtomCard from '../../../components/atoms/card';
import AtomNumberFormat from '../../../components/atoms/number-format';
import MoleculeImageGroup from '../../../components/molecules/molecule-image-group';
import MoleculeInfoGroup from '../../../components/molecules/info-group';
import MoleculeMarkdownRenderer from '../../../components/molecules/markdown-renderer';
import OrganismDatatable from '../../../components/organisms/datatable';
import OrganismLayout from '../../../components/organisms/layout';
import AtomPrimaryButton from '../../../components/atoms/button/primary-button';
import AtomBranchSelect from '../../../components/atoms/selection/branch';
import MoleculeSelectInputGroup from '../../../components/molecules/input-group/select-input';

const { TabPane } = Tabs;

import PromotionService from '../../../services/promotion';

const column = [
	{
		title: 'SKUID',
		dataIndex: 'sku_id',
	},
	{
		title: 'Nama Produk',
		dataIndex: 'name',
		render: (_, record) => record?.name?.id
	},
	{
		title: 'Stok Tersedia',
		dataIndex: 'available_stock',
	},
	{
		title: 'Harga Normal',
		dataIndex: 'price',
		sorter: true,
		render: (_, record) => (
			<AtomNumberFormat
				prefix="Rp. "
				value={record?.price}
			/>
		),
	},
	{
		title: 'Harga Setelah Diskon',
		dataIndex: 'discounted_price',
		sorter: true,
		render: (_, record) => (
			<AtomNumberFormat
				prefix="Rp. "
				value={
					record.price -
					record.price * (record.discount_percentage / 100)
				}
			/>
		),
	},
	{
		title: 'Discount (%)',
		dataIndex: 'discount_percentage',
		sorter: true,
		render: (discount_percentage) =>
		discount_percentage ? `${discount_percentage} %` : null,
	},
];

const PromotionModifyPage = () => {
	const location = useLocation();
	const promotionService = new PromotionService();
	const viewTableRef = useRef();
	const { roles } = useSelector((state) => state.auth);

	const { id } = useParams();
	const [promotion, setPromotion] = useState();
	const [productList, setProductList] = useState({});
	const [isLoading, setIsLoading] = useState(false);
	const [keyword, setKeyword] = useState('');
	const [filters, setFilters] = useState({
		branch: '',
		productCategory: '',
	});

	const getPromotionDetail = async (id) => {
		setIsLoading(true);
		try {
			const { data: promotion } = await promotionService.getPromotionById(
				id
			);
			const { data: products, meta } = await promotionService.getProductsInPromotion(id);
			setPromotion(promotion);
			if (products && Array.isArray(products) && products.length > 0) {
				const tmp = {};
				tmp.data = products;
				tmp.meta = { pagination: { total: meta.pagination.total } };
				setProductList(tmp);
			}
		} catch (error) {
			message.error(error.message);
			console.error(error);
		} finally {
			setIsLoading(false);
		}
	};

	const applyFilter = (values) => {
		const filterTmp = {};

		if (values.branches) filterTmp.branch = values.branches;
		else filterTmp.branch = '';
		if (values.product_category) filterTmp.productCategory = values.product_category;
		else filterTmp.productCategory = '';

		setFilters(filterTmp);
	};

	const getDatatableData = () => {
		if (keyword !== '' || filters.branch || filters.branch !== '' || filters.productCategory || filters.productCategory !== '') {
			let tmp = {...productList};
			if (keyword !== '')
				tmp.data = tmp.data.filter((column) =>
					column.product_detail.name.id.toLowerCase().includes(keyword.toLowerCase())
				);
	
			if (filters.branch || filters.branch !== '')
				tmp.data = tmp.data.filter((column) =>
				column.product_detail.branch.id.includes(filters.branch)
				);
	
			if (filters.productCategory || filters.productCategory !== '')
				tmp.data = tmp.data.filter((column) =>
					column.product_detail.base_category.id.includes(filters.productCategory)
				);
			return tmp;
		} else {
			return productList;
		}
	};

	useEffect(() => {
		(async () => {
			await getPromotionDetail(id);
		})();
	}, []);

	useEffect(() => {
		viewTableRef.current.refetchData();
	}, [keyword, filters]);


	return (
		<OrganismLayout
			breadcumbs={[
				{ name: 'Tampilan', link: '/view' },
				{ name: 'Promotion', link: '/view/promotion' },
				{ name: 'Detail', link: location.pathname },
			]}
			title={`Detail Promo`}
		>
			<Row>
				<Col span={24}>
					<Typography.Title level={4}>
						<span className="fw7">{`Detail Promo`.toUpperCase()}</span>
					</Typography.Title>

					{(roles.includes('super-admin') || roles.includes('admin')) && (
						<Link to={`/promotion/${id}/edit`}>
							<AtomPrimaryButton size="large">
								{`Edit Promo`}
							</AtomPrimaryButton>
						</Link>
					)}
				</Col>
			</Row>

			{isLoading ? (
				<AtomSpinner />
			) : (
				<>
					<Tabs defaultActiveKey="1">
						<TabPane tab={`Info Promotion`.toUpperCase()} key="1">
							<Row align="top" gutter={24}>
								<Col span={24}>
									<AtomCard title="">
										<Row gutter={[24, 24]}>
											<Col span={24}>
												<MoleculeInfoGroup
													title="Foto Banner"
													content={
														<MoleculeImageGroup
															images={[
																{
																	source:
																		promotion?.image_mobile,
																	isMobileImage: true,
																	label:
																		'Foto Banner Mobile',
																},
																{
																	source:
																		promotion?.image_desktop,
																	label:
																		'Foto Banner Dekstop',
																},
																{
																	source:
																		promotion?.addition_image_1,
																	label:
																		'Foto Banner Kecil 1',
																},
																{
																	source:
																		promotion?.addition_image_2,
																	label:
																		'Foto Banner Kecil 2',
																},
																{
																	source:
																		promotion?.addition_image_3,
																	label:
																		'Foto Banner Kecil 3',
																},
															]}
														/>
													}
												/>
											</Col>

											<Col span={12}>
												<MoleculeInfoGroup
													title="Nama Promo (ID)"
													content={promotion?.title.id}
												/>
											</Col>

											<Col span={12}>
												<MoleculeInfoGroup
													title="Nama Promo (EN)"
													content={promotion?.title.en}
												/>
											</Col>

											<Col span={12}>
												<MoleculeInfoGroup
													title="Status"
													content={
														promotion?.is_active
															? 'Aktif'
															: 'Tidak Aktif'
													}
												/>
											</Col>

											<Col span={12}>
												<MoleculeInfoGroup
													title="Tipe Promo"
													content={
														promotion?.is_information
															? 'Info'
															: 'Promo'
													}
												/>
											</Col>

											<Col span={12}>
												<MoleculeInfoGroup
													title="Deskripsi Singkat (ID)"
													content={
														promotion?.short_description?.id
													}
												/>
											</Col>

											<Col span={12}>
												<MoleculeInfoGroup
													title="Deskripsi Singkat (EN)"
													content={
														promotion?.short_description?.en
													}
												/>
											</Col>

											<Col span={12}>
												<MoleculeInfoGroup
													title="Deskripsi Lengkap (ID)"
													content={promotion?.full_description?.en ? (
														<MoleculeMarkdownRenderer
															withBorder
															text={
																promotion?.full_description?.en
															}
														/>
													) : null}
												/>
											</Col>

											<Col span={12}>
												<MoleculeInfoGroup
													title="Deskripsi Lengkap (EN)"
													content={promotion?.full_description?.en ? (
														<MoleculeMarkdownRenderer
															withBorder
															text={
																promotion?.full_description?.en
															}
														/>
													) : null}
												/>
											</Col>

											<Col span={24}>
												<Typography.Text strong>
													<span className="denim f5">
														{'Info Update Produk'.toUpperCase()}
													</span>
												</Typography.Text>
											</Col>

											<Col span={8}>
												<MoleculeInfoGroup
													title="Tanggal Dibuat"
													content={
														<ReactMoment format="DD-MM-YYYY">
															{
																promotion?.created_at
															}
														</ReactMoment>
													}
												/>
											</Col>

											<Col span={12}>
												<MoleculeInfoGroup
													title="Tanggal di Daftarkan"
													content={
														<ReactMoment format="DD-MM-YYYY">
															{
																promotion?.udpated_at
															}
														</ReactMoment>
													}
												/>
											</Col>

											<Col span={8}>
												<MoleculeInfoGroup
													title="Dibuat Oleh"
													content={
														promotion?.created_by
													}
												/>
											</Col>

											<Col span={12}>
												<MoleculeInfoGroup
													title="Didaftarkan Oleh"
													content={
														promotion?.updated_by
													}
												/>
											</Col>
										</Row>
									</AtomCard>
								</Col>

								<Col className="mt4" span={24}>
									<AtomCard title="Daftar Produk">
										<Row gutter={[0, 12]} className="mt4">
											<Col span={24}>
												<Col span={8}>
													<Input.Search
														placeholder="Cari Nama Produk"
														onSearch={(value) => setKeyword(value)}
														size="large"
													/>
												</Col>
											</Col>
											<Col span={24}>
												<Row align="middle" gutter={48} justify="space-between">
													<Col span={14}>
														<Form
															className="w-100 mt2"
															name="product"
															onFinish={applyFilter}
															onFinishFailed={(error) => {
																message.error(`Failed: ${error}`);
																console.error(error);
															}}
														>
															<Row align="middle" gutter={12}>
																<Col span={9}>
																	<AtomBranchSelect
																		generateCustomOption={(item) => ({
																				value: item.name.id,
																				label: item.name.id
																			})
																		}
																	/>
																</Col>

																<Col span={9}>
																	<MoleculeSelectInputGroup
																		label="Kategori Produk"
																		name="product_category"
																		placeholder="Kategori Produk"
																		allowClear
																		data={{
																			url: 'base-categories',
																			generateCustomOption: (
																				item
																			) => ({
																				value: item.name.id,
																				label: item.name.id,
																			}),
																		}}
																	/>
																</Col>

																<Col span={6}>
																	<AtomPrimaryButton
																		htmlType="submit"
																		size="large"
																	>
																		Terapkan
																	</AtomPrimaryButton>
																</Col>
															</Row>
														</Form>
													</Col>
												</Row>
											</Col>
										</Row>
										<OrganismDatatable
											columns={column}
											setFilterLocally
											dataSourceURL={`products`}
											dataSource={getDatatableData()}
											ref={viewTableRef}
										/>
									</AtomCard>
								</Col>
							</Row>
						</TabPane>
						<TabPane
							tab={`Syarat & ketentuan`.toUpperCase()}
							key="2"
						>
							<Row align="top" gutter={24}>
								<Col span={24}>
									<AtomCard title="">
										<Row gutter={[12, 24]}>
											<Col span={24}>
												<MoleculeInfoGroup
													title={`Syarat & Ketentuan (ID)`}
													content={promotion?.terms_and_condition?.id ? (
														<MoleculeMarkdownRenderer
															withBorder
															text={
																promotion?.terms_and_condition?.id
															}
														/>
													) : null}
												/>
											</Col>

											<Col span={24}>
												<MoleculeInfoGroup
													title={`Syarat & Ketentuan (EN)`}
													content={promotion?.terms_and_condition?.en ? (
														<MoleculeMarkdownRenderer
															withBorder
															text={
																promotion?.terms_and_condition?.en
															}
														/>
													) : null}
												/>
											</Col>
										</Row>
									</AtomCard>
								</Col>
							</Row>
						</TabPane>
					</Tabs>
				</>
			)}
		</OrganismLayout>
	);
};

export default PromotionModifyPage;
