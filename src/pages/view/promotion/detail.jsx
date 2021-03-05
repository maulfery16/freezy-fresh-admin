/* eslint-disable no-mixed-spaces-and-tabs */
/* eslint-disable react/display-name */
import React, { useRef, useEffect, useState } from 'react';
import ReactMoment from 'react-moment';
import { Col, Row, Skeleton, Typography, message, Tabs } from 'antd';
import { useLocation, useParams } from 'react-router-dom';

import AtomCard from '../../../components/atoms/card';
import AtomNumberFormat from '../../../components/atoms/number-format';
import MoleculeDatatableFilter from '../../../components/molecules/datatable/filter-plugin';
import MoleculeImageGroup from '../../../components/molecules/molecule-image-group';
import MoleculeInfoGroup from '../../../components/molecules/info-group';
import MoleculeMarkdownRenderer from '../../../components/molecules/markdown-renderer';
import OrganismDatatable from '../../../components/organisms/datatable';
import OrganismLayout from '../../../components/organisms/layout';

const { TabPane } = Tabs;

import PromotionService from '../../../services/promotion';
const promotionService = new PromotionService();

const mock = {
	data: [
		{
			id: 'FF-8387423',
			discount: 0.5,
			name: 'Apel Fuji',
			price: 20000,
			stock: 99,
		},
		{
			id: 'FF-8387422',
			discount: 0.5,
			name: 'Apel Fuji',
			price: 20000,
			stock: 99,
		},
	],
	meta: {
		pagination: { totalData: 1 },
	},
};

const column = [
	{
		title: 'SKUID',
		dataIndex: 'id',
	},
	{
		title: 'Nama Produk',
		dataIndex: 'name',
	},
	{
		title: 'Stok Tersedia',
		dataIndex: 'stock',
	},
	{
		title: 'Harga Normal',
		dataIndex: 'price',
		render: (price) => <AtomNumberFormat prefix="Rp. " value={price} />,
	},
	{
		title: 'Harga Setelah Discount',
		dataIndex: 'price',
		render: (price, record) => (
			<AtomNumberFormat
				prefix="Rp. "
				value={price - price * record.discount}
			/>
		),
	},
	{
		title: 'Discount (%)',
		dataIndex: 'discount',
		render: (disc) => `${disc * 100}%`,
	},
];

const PromotionModifyPage = () => {
	const viewTableRef = useRef();

	const { id } = useParams();
	const location = useLocation();

	const [promotion, setPromotion] = useState();

	const getPromotionDetail = async (id) => {
		try {
			const { data: promotion } = await promotionService.getPromotionById(
				id
			);

			setPromotion(promotion);
		} catch (error) {
			message.error(error.message);
			console.error(error);
		}
	};

	const renderDatatableFilters = () => {
		return [
			<MoleculeDatatableFilter
				name="branches"
				operator=":"
				identifier="branches-filter"
				label="Cabang"
				key="branches-filter"
				placeholder="Semua Cabang"
				data={{ url: 'branches' }}
			/>,
			<MoleculeDatatableFilter
				name="base_categories"
				operator=":"
				identifier="base_categories-filter"
				label="Kategori Dasar"
				key="base_categories-filter"
				placeholder="Semua Kategori Dasar"
				data={{ url: 'base_categories' }}
			/>,
		];
	};

	useEffect(() => {
		(async () => {
			await getPromotionDetail(id);
		})();
	}, []);

	return (
		<OrganismLayout
			breadcumbs={[
				{ name: 'Tampilan', link: '/view' },
				{ name: 'Promotion', link: '/view/promotion' },
				{ name: 'Detail', link: location.pathname },
			]}
			title={`Detail Promo`}
		>
			<Typography.Title level={4}>
				<span className="fw7">{`Detail Promo`.toUpperCase()}</span>
			</Typography.Title>

			{!promotion ? (
				<Skeleton active />
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
																		promotion.image_mobile,
																	isMobileImage: true,
																	label:
																		'Foto Banner Mobile',
																},
																{
																	source:
																		promotion.image_desktop,
																	label:
																		'Foto Banner Dekstop',
																},
																{
																	source:
																		promotion.addition_image_1,
																	label:
																		'Foto Banner Kecil 1',
																},
																{
																	source:
																		promotion.addition_image_2,
																	label:
																		'Foto Banner Kecil 2',
																},
																{
																	source:
																		promotion.addition_image_3,
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
													content={promotion.title.id}
												/>
											</Col>

											<Col span={12}>
												<MoleculeInfoGroup
													title="Nama Promo (EN)"
													content={promotion.title.en}
												/>
											</Col>

											<Col span={12}>
												<MoleculeInfoGroup
													title="Status"
													content={
														promotion.is_active
															? 'Aktif'
															: 'Tidak Aktif'
													}
												/>
											</Col>

											<Col span={12}>
												<MoleculeInfoGroup
													title="Tipe Promo"
													content={
														promotion.is_information
															? 'Info'
															: 'Promo'
													}
												/>
											</Col>

											<Col span={12}>
												<MoleculeInfoGroup
													title="Deskripsi Singkat (ID)"
													content={
														promotion
															.short_description
															.id
													}
												/>
											</Col>

											<Col span={12}>
												<MoleculeInfoGroup
													title="Deskripsi Singkat (EN)"
													content={
														promotion
															.short_description
															.en
													}
												/>
											</Col>

											<Col span={12}>
												<MoleculeInfoGroup
													title="Deskripsi Lengkap (ID)"
													content={
														<MoleculeMarkdownRenderer
															withBorder
															text={
																promotion
																	.full_description
																	.en
															}
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
															text={
																promotion
																	.full_description
																	.en
															}
														/>
													}
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
																promotion.created_at
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
																promotion.registered_at
															}
														</ReactMoment>
													}
												/>
											</Col>

											<Col span={8}>
												<MoleculeInfoGroup
													title="Dibuat Oleh"
													content={
														promotion.created_by
													}
												/>
											</Col>

											<Col span={12}>
												<MoleculeInfoGroup
													title="Didaftarkan Oleh"
													content={
														promotion.registered_by
													}
												/>
											</Col>
										</Row>
									</AtomCard>
								</Col>

								<Col className="mt4" span={24}>
									<AtomCard title="Daftar Produk">
										<OrganismDatatable
											columns={column}
											dataSourceURL={`products`}
											filters={renderDatatableFilters()}
											mock={mock}
											ref={viewTableRef}
											searchInput={true}
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
													content={
														<MoleculeMarkdownRenderer
															withBorder
															text={
																promotion
																	.terms_and_condition
																	.id
															}
														/>
													}
												/>
											</Col>

											<Col span={24}>
												<MoleculeInfoGroup
													title={`Syarat & Ketentuan (EN)`}
													content={
														<MoleculeMarkdownRenderer
															withBorder
															text={
																promotion
																	.terms_and_condition
																	.en
															}
														/>
													}
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
