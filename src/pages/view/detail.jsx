/* eslint-disable react/display-name */
import React, { useEffect, useRef, useState } from 'react';
import ReactMoment from 'react-moment';

import { Col, Image, message, Row, Skeleton, Space, Typography } from 'antd';
import { Link, useParams } from 'react-router-dom';

import AtomCard from '../../components/atoms/card';
import AtomNumberFormat from '../../components/atoms/number-format';
import AtomSecondaryButton from '../../components/atoms/button/secondary-button';
import MoleculeDatatableFilter from '../../components/molecules/datatable/filter-plugin';
import MoleculeInfoGroup from '../../components/molecules/info-group';
import MoleculeMarkdownRenderer from '../../components/molecules/markdown-renderer';
import OrganismDatatable from '../../components/organisms/datatable';
import OrganismLayout from '../../components/organisms/layout';

// import ViewService from '../../services/view';
// const viewService = new ViewService();

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

const ViewModifyPage = () => {
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
	const [view, setView] = useState(null);

	const getViewDetail = () => {
		try {
			// const view = viewService.getViewDetail(viewID);
			// setView(view);

			setTimeout(() => {
				setView({
					category: {
						color: {
							hexa_code: '#000000',
						},
						name: 'Kategori 1',
					},
					created_at: new Date(),
					created_by: 'Jeong Dajeong',
					phone_number: '087739893738467',
					registered_at: new Date(),
					registered_by: 'Kim Ji Yeon',
					updated_at: new Date(),
					updated_by: 'Dita Karang',
					short_desc: {
						id: 'Deskripsi Singkat',
						en: 'Short Description',
					},
					long_desc: {
						id: 'Deskripsi Panjang',
						en: 'Long Description',
					},
					id_image:
						'https://cdn.shopify.com/s/files/1/0533/2089/files/placeholder-images-image_large.png?format=jpg&quality=90&v=1530129081',
					en_image:
						'https://cdn.shopify.com/s/files/1/0533/2089/files/placeholder-images-image_large.png?format=jpg&quality=90&v=1530129081',
					content: {
						id: 'Hallo mate',
						en: 'Hallo mate',
					},
					section: {
						id: 'Artikel Super',
						en: 'Super View',
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
			getViewDetail(id);
		})();
	}, []);

	return (
		<OrganismLayout
			breadcumbs={[
				{ name: 'Tampilan', link: '/view' },
				{ name: 'Detail', link: location.pathname },
			]}
			title="Detail Tampilan"
		>
			<Typography.Title level={4}>
				<span className="fw7">{`Detail Tampilan`.toUpperCase()}</span>
			</Typography.Title>

			{!view ? (
				<Skeleton active />
			) : (
				<Row align="top" className="mt4" gutter={24}>
					<Col span={24}>
						<AtomCard title="Info Tampilan">
							<Row gutter={[12, 24]}>
								<Col span={8}>
									<MoleculeInfoGroup
										title="Foto Tampilan Mobile"
										content={
											<Image
												preview
												src={view.id_image}
												width={300}
											/>
										}
									/>
								</Col>

								<Col span={8}>
									<MoleculeInfoGroup
										title="Foto Tampilan Dekstop"
										content={
											<Image
												preview
												src={view.en_image}
												width={300}
											/>
										}
									/>
								</Col>

								<Col span={8}>
									<MoleculeInfoGroup
										title="Status"
										content={
											view.is_active
												? 'Aktif'
												: 'Tidak Aktif'
										}
									/>
								</Col>

								<Col span={12}>
									<MoleculeInfoGroup
										title="Nama Section (ID)"
										content={view.section.id}
									/>
								</Col>

								<Col span={12}>
									<MoleculeInfoGroup
										title="Nama Section (EN)"
										content={view.section.en}
									/>
								</Col>

								<Col span={12}>
									<MoleculeInfoGroup
										title="Deskripsi Singkat (ID)"
										content={
											<MoleculeMarkdownRenderer
												text={view.short_desc.id}
											/>
										}
									/>
								</Col>

								<Col span={12}>
									<MoleculeInfoGroup
										title="Deskripsi Singkat (EN)"
										content={
											<MoleculeMarkdownRenderer
												text={view.short_desc.en}
											/>
										}
									/>
								</Col>

								<Col span={12}>
									<MoleculeInfoGroup
										title="Deskripsi Lengkap (ID)"
										content={
											<MoleculeMarkdownRenderer
												text={view.long_desc.id}
											/>
										}
									/>
								</Col>

								<Col span={12}>
									<MoleculeInfoGroup
										title="Deskripsi Lengkap (EN)"
										content={
											<MoleculeMarkdownRenderer
												text={view.long_desc.en}
											/>
										}
									/>
								</Col>

								<Col span={8}>
									<MoleculeInfoGroup
										title="Tanggal Dibuat"
										content={
											<ReactMoment format="DD-MM-YYYY">
												{view.created_at}
											</ReactMoment>
										}
									/>
								</Col>

								<Col span={12}>
									<MoleculeInfoGroup
										title="Tanggal di Daftarkan"
										content={
											<ReactMoment format="DD-MM-YYYY">
												{view.registered_at}
											</ReactMoment>
										}
									/>
								</Col>

								<Col span={8}>
									<MoleculeInfoGroup
										title="Dibuat Oleh"
										content={view.created_by}
									/>
								</Col>

								<Col span={12}>
									<MoleculeInfoGroup
										title="Didaftarkan Oleh"
										content={view.registered_by}
									/>
								</Col>
							</Row>
						</AtomCard>
					</Col>

					<Col className="mt4" span={24}>
						<AtomCard title="Daftar Produk">
							<OrganismDatatable
								columns={column}
								dataSourceURL={`prodcuts`}
								filters={renderDatatableFilters()}
								mock={mock}
								ref={viewTableRef}
								searchInput={true}
								title={`Tampilan`}
							/>
						</AtomCard>
					</Col>

					<Col className="mt4" span={24}>
						<Space>
							<Link to="/view/view">
								<AtomSecondaryButton size="large">
									Kembali
								</AtomSecondaryButton>
							</Link>
						</Space>
					</Col>
				</Row>
			)}
		</OrganismLayout>
	);
};

export default ViewModifyPage;
