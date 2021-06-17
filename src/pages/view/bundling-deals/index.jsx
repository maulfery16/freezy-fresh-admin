/* eslint-disable react/display-name */
import React, { useEffect, useRef, useState } from 'react';
import ReactMoment from 'react-moment';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { EditFilled, EyeFilled } from '@ant-design/icons';
import { Col, Row, Typography, message, Input, Form, Space } from 'antd';

import AtomCard from '../../../components/atoms/card';
import AtomSpinner from '../../../components/atoms/spinner';
import AtomNumberFormat from '../../../components/atoms/number-format';
import MoleculeDatatableAdditionalAction from '../../../components/molecules/datatable/additional-actions';
import MoleculeImageGroup from '../../../components/molecules/molecule-image-group';
import MoleculeInfoGroup from '../../../components/molecules/info-group';
import OrganismDatatable from '../../../components/organisms/datatable';
import OrganismLayout from '../../../components/organisms/layout';
import AtomBranchSelect from '../../../components/atoms/selection/branch';
import MoleculeSelectInputGroup from '../../../components/molecules/input-group/select-input';
import AtomPrimaryButton from '../../../components/atoms/button/primary-button';
import AtomImage from '../../../components/atoms/image';
import AtomStatusSwitch from '../../../components/atoms/datatable/status-switch';
import MoleculeDeleteConfirm from '../../../components/molecules/delete-confirm';

import BundlingDealsService from '../../../services/bundling-deals';
const bundlingDealsService = new BundlingDealsService();


const BundlingDealsPage = () => {
	const { roles } = useSelector((state) => state.auth);
	
	const column = [
		{
			align: 'center',
			title: 'Foto Produk',
			dataIndex: 'main_image',
			render: (image) => <AtomImage src={image} />
		},
		{
			title: 'SKUID',
			dataIndex: 'sku_id',
			sorter: true,
		},
		{
			title: 'Nama Produk',
			dataIndex: 'name',
			sorter: true,
			render: (_, record) => record?.name?.id
		},
		{
			title: 'Kode UPC',
			dataIndex: 'upc_code',
			sorter: true,
			render: (_, record) => record?.upc_code
		},
		{
			title: 'Stok Tersedia',
			dataIndex: 'stock',
			sorter: true,
			render: (_, record) => record?.products[0]?.product_detail?.available_stock
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
			title: 'Stok Terjual',
			dataIndex: 'total_sold',
			sorter: true,
			render: (_, record) => record?.products[0]?.product_detail?.total_sold
		},
		{
			title: 'Harga Setelah Discount',
			dataIndex: 'discounted_price',
			sorter: true,
			render: (discounted_price) => (
				<AtomNumberFormat
					prefix="Rp. "
					value={discounted_price}
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
		{
			title: 'Batas Umur Pelanggan',
			dataIndex: 'age_limit',
			sorter: true,
			render: (_, record) => record?.products[0]?.product_detail?.age_limit
		},
		{
			title: 'Perusahaan',
			dataIndex: 'brand',
			sorter: true,
			render: (_, record) => record?.brand?.id
		},
		{
			title: 'Cabang Freezy (ID)',
			dataIndex: 'branch_ids',
			sorter: true,
			render: (_, record) =>
				record.branch_ids.map((branch) => branch).join(', '),
		},
		{
			title: 'Aktif',
			dataIndex: 'is_active',
			render: (active, record) => (
				<AtomStatusSwitch
					active={active}
					id={record.id}
					tableRef={viewTableRef}
					url="bundling-deals"
				/>
			),
			csvRender: (item) => (item.is_active ? 'Aktif' : 'Tidak Aktif'),
		},
		{
			title: 'Aksi',
			dataIndex: 'id',
			render: (id, record) => (
				<Space size="middle">
					<Link to={`/view/bundling-deals/${id}/detail`}>
						<EyeFilled className="f4 blue" />
					</Link>

					<Link to={`/view/bundling-deals/${id}/edit`}>
						<EditFilled className="f4 orange" />
					</Link>

					{!record.is_active && (
						<MoleculeDeleteConfirm
							id={id}
							label="Bundling"
							tableRef={viewTableRef}
							url="bundling-deals"
							afterSuccessDelete={() => getBundlingDeals()}
						/>
					)}
				</Space>
			),
		},
	];
	const viewTableRef = useRef();
	const [bundlingDeals, setBundlingDeals] = useState(null);
	const [products, setProducts] = useState({});
	const [isLoading, setIsLoading] = useState(false);
	const [keyword, setKeyword] = useState('');
	const [filters, setFilters] = useState({
		branch: '',
		productCategory: '',
	});

	const getBundlingDeals = async () => {
		setIsLoading(true);
		try {
			const {data} = await bundlingDealsService.getBundlingDeals();
			setBundlingDeals(data);
			if (data.packages && Array.isArray(data.packages) && data.packages.length > 0) {
				const tmp = {};
				tmp.data = data.packages;
				tmp.meta = { pagination: { total: data.packages.length } }
				setProducts(tmp)
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
			let tmp = {...products};
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
			return products;
		}
	};

	useEffect(() => {
		(async () => {
			getBundlingDeals();
		})();
	}, []);

	useEffect(() => {
		viewTableRef.current.refetchData();
	}, [keyword, filters])

	return (
		<OrganismLayout
			breadcumbs={[
				{ name: 'Tampilan', link: '/view' },
				{ name: 'Bundling Deals', link: location.pathname },
			]}
			title="Bundling Deals"
		>
			<Row>
				<Col span={24}>
					<Row align="middle" justify="space-between">
						<Typography.Title level={4}>
							<span className="fw7">
								{`Bundling Deals`.toUpperCase()}
							</span>
						</Typography.Title>
						<Space>
							<MoleculeDatatableAdditionalAction
								importRoute="/view/bundling-deals/import"
								column={column}
								getLimit={0}
								isEdit={true}
								label="Detail"
								route="/view/bundling-deals"
								url="bundling-deals"
							/>

							{(roles.includes('super-admin') || roles.includes('admin')) && (
								<Link to={'/view/bundling-deals/add'}>
									<AtomPrimaryButton size="large">
										Tambah Bundling
									</AtomPrimaryButton>
								</Link>
							)}
						</Space>

					</Row>
				</Col>
			</Row>

			{isLoading ? (
				<AtomSpinner/>
			) : (
				<Row align="top" className="mt4" gutter={24}>
					<Col span={24}>
						<AtomCard>
							<Row gutter={[24, 24]}>
								<Col span={24}>
									<Typography.Text strong>
										<span className="denim f5">
											{'Info Bundling Deals'.toUpperCase()}
										</span>
									</Typography.Text>
								</Col>

								<Col span={24}>
									<MoleculeInfoGroup
										title="Foto Banner"
										content={
											<MoleculeImageGroup
												images={[
													{
														source:
															bundlingDeals?.banner_mobile,
														label:
															' Foto Banner Mobile',
													},
													{
														source:
															bundlingDeals?.banner_desktop,
														label:
															' Foto Banner Desktop',
													},
												]}
											/>
										}
									/>
								</Col>

								<Col span={12}>
									<MoleculeInfoGroup
										title="Title (ID)"
										content={bundlingDeals?.title?.id}
									/>
								</Col>

								<Col span={12}>
									<MoleculeInfoGroup
										title="Title (EN)"
										content={bundlingDeals?.title?.en}
									/>
								</Col>

								<Col span={12}>
									<MoleculeInfoGroup
										title="Deskripsi Singkat (ID)"
										content={bundlingDeals?.short_description?.id}
									/>
								</Col>

								<Col span={12}>
									<MoleculeInfoGroup
										title="Deskripsi Singkat (EN)"
										content={bundlingDeals?.short_description?.en}
									/>
								</Col>

								<Col span={24}>
									<Typography.Text strong>
										<span className="denim f5">
											{'Info Update'.toUpperCase()}
										</span>
									</Typography.Text>
								</Col>

								<Col span={8}>
									<MoleculeInfoGroup
										title="Tanggal Dibuat"
										content={
											<ReactMoment format="DD-MM-YYYY">
												{bundlingDeals?.created_at}
											</ReactMoment>
										}
									/>
								</Col>

								<Col span={12}>
									<MoleculeInfoGroup
										title="Tanggal Diperbarui"
										content={
											<ReactMoment format="DD-MM-YYYY">
												{bundlingDeals?.updated_at}
											</ReactMoment>
										}
									/>
								</Col>

								<Col span={8}>
									<MoleculeInfoGroup
										title="Dibuat Oleh"
										content={bundlingDeals?.created_by}
									/>
								</Col>

								<Col span={12}>
									<MoleculeInfoGroup
										title="Diperbarui Oleh"
										content={bundlingDeals?.updated_by}
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
			)}
		</OrganismLayout>
	);
};

export default BundlingDealsPage;
