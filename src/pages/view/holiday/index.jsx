/* eslint-disable react/display-name */
import React, { useEffect, useRef, useState } from 'react';
import ReactMoment from 'react-moment';

import { Col, Row, Skeleton, Tabs, Typography, message } from 'antd';
import { useParams } from 'react-router-dom';

import AtomBaseCategoriesDatatableFilter from '../../../components/atoms/selection/base-categories-datatable';
import AtomBranchDatatableFilter from '../../../components/atoms/selection/branch-datatable';
import AtomCard from '../../../components/atoms/card';
import AtomNumberFormat from '../../../components/atoms/number-format';
import MoleculeDatatableAdditionalAction from '../../../components/molecules/datatable/additional-actions';
import MoleculeImageGroup from '../../../components/molecules/molecule-image-group';
import MoleculeInfoGroup from '../../../components/molecules/info-group';
import MoleculeMarkdownRenderer from '../../../components/molecules/markdown-renderer';
import OrganismDatatable from '../../../components/organisms/datatable';
import OrganismLayout from '../../../components/organisms/layout';

const { TabPane } = Tabs;

// import HolidayService from '../../../services/holiday';
// const holidayService = new HolidayService();

const dataSource = {
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

const HolidayPage = () => {
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
	const viewTableRef = useRef();

	const { id } = useParams();
	const [holiday, setHoliday] = useState(null);

	const getHoliday = () => {
		try {
			// const holiday = holidayService.getHolidayDetail(holidayID);
			// setHoliday(holiday);

			setTimeout(() => {
				setHoliday({
					created_at: new Date(),
					created_by: 'Jeong Dajeong',
					registered_at: new Date(),
					registered_by: 'Kim Ji Yeon',
					updated_at: new Date(),
					updated_by: 'Dita Karang',
					short_desc: {
						id:
							'Deskripsi Singkat Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam et turpis tincidunt lacus ornare malesuada. Integer purus nulla, vestibulum',
						en:
							'Short Description Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam et turpis tincidunt lacus ornare malesuada. Integer purus nulla, vestibulum',
					},
					long_desc: {
						id: 'Deskripsi Panjang',
						en: 'Long Description',
					},
					desktop_image:
						'https://cdn.shopify.com/s/files/1/0533/2089/files/placeholder-images-image_large.png?format=jpg&quality=90&v=1530129081',
					mobile_image:
						'https://cdn.shopify.com/s/files/1/0533/2089/files/placeholder-images-image_large.png?format=jpg&quality=90&v=1530129081',
					small_image_1:
						'https://cdn.shopify.com/s/files/1/0533/2089/files/placeholder-images-image_large.png?format=jpg&quality=90&v=1530129081',
					small_image_2:
						'https://cdn.shopify.com/s/files/1/0533/2089/files/placeholder-images-image_large.png?format=jpg&quality=90&v=1530129081',
					small_image_3:
						'https://cdn.shopify.com/s/files/1/0533/2089/files/placeholder-images-image_large.png?format=jpg&quality=90&v=1530129081',
					title: {
						id: 'Artikel Super',
						en: 'Super View',
					},
					term_and_condition: {
						id: ` Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam et turpis tincidunt lacus ornare malesuada. Integer purus nulla, vestibulum non lectus at, mollis semper dui. Etiam mattis velit id vehicula faucibus. Donec bibendum tempus mi, sit amet venenatis erat finibus ut. Suspendisse vitae cursus urna, ac pulvinar magna. Nullam viverra sapien arcu, at congue orci lacinia quis. Quisque sapien eros, facilisis in maximus eu, finibus eu mauris. Morbi bibendum ligula in rhoncus dictum. Aenean fermentum blandit elit vitae vehicula.

Phasellus ac enim ac diam malesuada semper. Fusce sem nisi, luctus ut tellus ut, dictum blandit massa. In id molestie eros, eu varius libero. Curabitur non neque non elit pellentesque ornare. Duis libero arcu, placerat eu lorem nec, consectetur hendrerit mi. Pellentesque nec diam ut eros rhoncus luctus. Ut a ultrices felis.

Ut luctus ex non eleifend ullamcorper. Nullam elementum nisi sem, id egestas nisi pretium nec. Sed pretium interdum tristique. Mauris at porttitor enim. In a mi et massa porttitor molestie. Fusce varius, lorem ut cursus consectetur, sapien diam tincidunt magna, nec ultrices quam quam malesuada ante. Sed auctor mi eu finibus finibus. Quisque iaculis malesuada metus, eget ornare magna laoreet nec. Morbi interdum gravida bibendum. `,
						en: ` Suspendisse at nisl nisi. Praesent at diam mattis, porta arcu blandit, efficitur nisi. Sed suscipit massa diam, et vehicula mauris ornare a. Nunc blandit metus vitae lacus ultrices ornare. Aenean eget justo fringilla, pharetra odio at, cursus augue. Donec lacinia dolor malesuada ipsum vestibulum ornare. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Suspendisse molestie, ipsum et porttitor ultricies, sem arcu pharetra risus, non finibus diam tortor ac odio. Morbi est mauris, lobortis eu mauris a, fringilla pellentesque orci. Morbi mollis rhoncus orci nec convallis. Proin efficitur, eros sit amet pellentesque tincidunt, libero turpis hendrerit sem, quis convallis arcu ante quis ligula. Phasellus porta aliquet dolor, vel mattis libero interdum a. In in dui ex.

Integer rhoncus leo ac diam vestibulum aliquam. Duis in eros sit amet mauris volutpat luctus nec id nulla. Nulla pretium libero a ante cursus, vitae pellentesque mauris efficitur. Mauris ut dolor porta, fermentum leo nec, rutrum mauris. Nam felis nunc, rhoncus quis lorem id, mollis rutrum velit. Nulla facilisi. Vestibulum quis cursus ante. In molestie sapien ullamcorper orci elementum ullamcorper. Proin eget convallis ex, eu iaculis nisl. Vestibulum congue nulla eu tristique faucibus. Etiam mollis in turpis sed posuere. Nunc interdum ac enim a varius. Morbi euismod porta nisi, quis egestas massa sollicitudin eu. Aliquam dapibus condimentum metus porta rutrum. Sed vehicula ac lacus in aliquam. Quisque tempor dolor ac venenatis blandit. `,
					},
				});
			}, 1000);
		} catch (error) {
			message.error(error.message);
			console.error(error);
		}
	};

	const renderDatatableFilters = () => {
		return [
			<AtomBranchDatatableFilter key="branch-filter" />,
			<AtomBaseCategoriesDatatableFilter key="base-categories-filter" />,
		];
	};

	useEffect(() => {
		(async () => {
			getHoliday(id);
		})();
	}, []);

	return (
		<OrganismLayout
			breadcumbs={[
				{ name: 'Tampilan', link: '/view' },
				{ name: 'Holiday', link: location.pathname },
			]}
			title="Holiday"
		>
			<Row>
				<Col span={24}>
					<Row align="middle" justify="space-between">
						<Typography.Title level={4}>
							<span className="fw7">
								{`Holiday`.toUpperCase()}
							</span>
						</Typography.Title>

						<MoleculeDatatableAdditionalAction
							column={column}
							getLimit={0}
							isEdit={true}
							label="Holiday"
							route="/view/holiday"
							url="holiday"
						/>
					</Row>
				</Col>
			</Row>

			{!holiday ? (
				<Skeleton active />
			) : (
				<Tabs defaultActiveKey="1">
					<TabPane tab={`Info Holiday`.toUpperCase()} key="1">
						<Row align="top" className="mt4" gutter={24}>
							<Col span={24}>
								<AtomCard>
									<Row gutter={[24, 24]}>
										<Col span={24}>
											<MoleculeInfoGroup
												title="Foto Banner"
												content={
													<MoleculeImageGroup
														images={[
															{
																source:
																	holiday.image_mobile,
																label:
																	' Foto Banner Mobile',
															},
															{
																source:
																	holiday.image_dekstop,
																label:
																	' Foto Banner Dekstop',
															},
															{
																source:
																	holiday.image_small_1,
																label:
																	' Foto Banner Kecil 1',
															},
															{
																source:
																	holiday.image_small_2,
																label:
																	' Foto Banner Kecil 2',
															},
															{
																source:
																	holiday.image_small_3,
																label:
																	' Foto Banner Kecil 3',
															},
														]}
													/>
												}
											/>
										</Col>

										<Col span={12}>
											<MoleculeInfoGroup
												title="Title (ID)"
												content={holiday.title.id}
											/>
										</Col>

										<Col span={12}>
											<MoleculeInfoGroup
												title="Title (EN)"
												content={holiday.title.en}
											/>
										</Col>

										<Col span={12}>
											<MoleculeInfoGroup
												title="Deskripsi Singkat (ID)"
												content={holiday.short_desc.id}
											/>
										</Col>

										<Col span={12}>
											<MoleculeInfoGroup
												title="Deskripsi Singkat (EN)"
												content={holiday.short_desc.en}
											/>
										</Col>

										<Col span={12}>
											<MoleculeInfoGroup
												title="Deskripsi Lengkap (ID)"
												content={
													<MoleculeMarkdownRenderer
														withBorder
														text={
															holiday.long_desc.id
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
															holiday.long_desc.en
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
														{holiday.created_at}
													</ReactMoment>
												}
											/>
										</Col>

										<Col span={12}>
											<MoleculeInfoGroup
												title="Tanggal di Daftarkan"
												content={
													<ReactMoment format="DD-MM-YYYY">
														{holiday.registered_at}
													</ReactMoment>
												}
											/>
										</Col>

										<Col span={8}>
											<MoleculeInfoGroup
												title="Dibuat Oleh"
												content={holiday.created_by}
											/>
										</Col>

										<Col span={12}>
											<MoleculeInfoGroup
												title="Didaftarkan Oleh"
												content={holiday.registered_by}
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
										dataSource={dataSource}
										ref={viewTableRef}
										searchInput={true}
									/>
								</AtomCard>
							</Col>
						</Row>
					</TabPane>
					<TabPane tab={`Syarat & ketentuan`.toUpperCase()} key="2">
						<Row align="top" gutter={24}>
							<Col span={24}>
								<AtomCard>
									<Row gutter={[12, 24]}>
										<Col span={24}>
											<MoleculeInfoGroup
												title={`Syarat & Ketentuan (ID)`}
												content={
													<MoleculeMarkdownRenderer
														withBorder
														text={
															holiday
																.term_and_condition
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
															holiday
																.term_and_condition
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
			)}
		</OrganismLayout>
	);
};

export default HolidayPage;
