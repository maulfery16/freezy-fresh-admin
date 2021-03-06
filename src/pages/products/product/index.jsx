/* eslint-disable react/display-name */
import React, { useRef } from 'react';
import { EditFilled, EyeFilled } from '@ant-design/icons';
import { Link } from 'react-router-dom';
import { Space } from 'antd';
import { useSelector } from 'react-redux';

import AtomBaseCategoriesDatatableFilter from '../../../components/atoms/selection/base-categories-datatable';
import AtomBranchDatatableFilter from '../../../components/atoms/selection/branch-datatable';
import AtomImage from '../../../components/atoms/image';
import AtomStatusSwitch from '../../../components/atoms/datatable/status-switch';
import MoleculeDatatableAdditionalAction from '../../../components/molecules/datatable/additional-actions';
import MoleculeDatatableFilter from '../../../components/molecules/datatable/filter-plugin';
import MoleculeDeleteConfirm from '../../../components/molecules/delete-confirm';
import OrganismDatatable from '../../../components/organisms/datatable';
import OrganismLayout from '../../../components/organisms/layout';

const ProductPage = () => {
	const productTableRef = useRef();
	const { roles } = useSelector((state) => state.auth);

	const column = [
		{
			title: 'No',
			dataIndex: 'id',
			render: (id, _, index) => index + 1,
		},
		{
			title: 'Foto Produk',
			dataIndex: 'image',
			render: (image) => <AtomImage src={image} />,
			csvRender: (item) => item.image,
		},
		{
			title: 'SKUID',
			dataIndex: 'sku_id',
			sorter: true,
		},
		{
			title: 'Nama Produk (ID)',
			dataIndex: 'name',
			render: (_, record) => record.name.id,
			csvRender: (item) => item.name.id,
			sorter: true,
		},
		{
			title: 'Kode UPC',
			dataIndex: 'upc_code',
			sorter: true,
		},
		{
			title: 'Kategori Dasar',
			dataIndex: 'base_category',
			render: (_, record) => record.base_category.id,
			csvRender: (item) => item.base_category.id,
			sorter: true,
		},
		{
			title: 'Kategori Tambahan',
			dataIndex: 'additional_category',
			render: (_, record) => record.additional_category?.id,
			csvRender: (item) => item.additional_category.id,
			sorter: true,
		},
		{
			title: 'Batas Umur Pelanggan',
			dataIndex: 'age_limit',
			sorter: false,
		},
		{
			title: 'Nama brand',
			dataIndex: 'brand',
			render: (_, record) => record.brand.id,
			csvRender: (item) => item.brand.id,
			sorter: true,
		},
		{
			title: 'Nama Perusahaan',
			dataIndex: `product_owner`,
			sorter: true,
		},
		{
			title: 'Cabang',
			dataIndex: 'branch',
			render: (_, record) =>
				record.branch.map((branch) => branch.id).join(', '),
			sorter: false,
		},

		{
			title: 'Aktif',
			dataIndex: 'is_active',
			render: (active, record) => (
				<AtomStatusSwitch
					active={active}
					id={record.id}
					tableRef={productTableRef}
					url="products"
				/>
			),
			csvRender: (item) => (item.is_active ? 'Aktif' : 'Tidak Aktif'),
		},
		{
			title: 'Aksi',
			dataIndex: 'id',
			render: (id, record) => (
				<Space size="middle">
					<Link to={`/products/${id}/detail`}>
						<EyeFilled className="f4 blue" />
					</Link>

					{roles && (roles.includes('super-admin') ||
						roles.includes('admin')) && (
							<Link to={`/products/${id}/edit`}>
								<EditFilled className="f4 orange" />
							</Link>
						)}

					{!record.is_active && (
						<MoleculeDeleteConfirm
							id={id}
							label="Produk"
							tableRef={productTableRef}
							url="products"
						/>
					)}
				</Space>
			),
			skipExport: true,
		},
	];

	const renderAdditionalAction = () => {
		return (
			<MoleculeDatatableAdditionalAction
				column={column}
				getLimit={() => productTableRef.current.totalData}
				importRoute="/products/import"
				label="Produk"
				requiredParams="branch"
				requiredParamsLabel="cabang"
				route="/products"
				url="products"
			/>
		);
	};

	const renderDatatableFilters = () => {
		return [
			<AtomBaseCategoriesDatatableFilter name="baseCategory.id" key="base-categories-filter" />,
			<MoleculeDatatableFilter
				name="additionalCategory.id"
				operator=":"
				identifier="additional-categories-filter"
				label="Kategori Tambahan"
				key="additional-categories-filter"
				placeholder="Semua Kategori Tambahan"
				data={{
					url: 'additional-categories',
					generateCustomOption: (item) => ({
						value: item.id,
						label: item.name.id,
					}),
				}}
			/>,
			<MoleculeDatatableFilter
				name="productOwner.id"
				operator=":"
				identifier="product-owner-filter"
				label="Perusahaan"
				key="product-owner-filter"
				placeholder="Semua Perusahaan"
				data={{
					url: 'product-owners',
				}}
			/>,
			<AtomBranchDatatableFilter name="productDetails.branch_id" key="branch-filter" />,
			<MoleculeDatatableFilter
				name="brand.id"
				operator=":"
				identifier="brand-filter"
				label="Brand"
				key="brand-filter"
				placeholder="Semua brand"
				data={{
					url: 'brands',
					generateCustomOption: (item) => ({
						value: item.id,
						label: item.name.id,
					}),
				}}
			/>,
			<MoleculeDatatableFilter
				name="productDetails.is_freezy_pick"
				operator=":"
				identifier="freezy-pick-filter"
				label="Freezy Pick"
				key="freezy-pick-filter"
				placeholder="Semua freezy pick"
				data={{
					options: [
						{ value: 'true', label: 'Ya' },
						{ value: 'false', label: 'Tidak' },
					],
				}}
			/>,
		];
	};

	return (
		<OrganismLayout
			breadcumbs={[
				{ name: 'Produk', link: location.pathname },
				{
					name: 'Produk-Produk',
					link: location.pathname,
				},
			]}
			title="Product Page"
		>
			<OrganismDatatable
				additionalAction={renderAdditionalAction()}
				columns={column}
				dataSourceURL={`products`}
				filters={renderDatatableFilters()}
				limit={15}
				ref={productTableRef}
				scroll={1920}
				searchInput={true}
				searchJoin="and"
				title={`Produk-Produk`}
			/>
		</OrganismLayout>
	);
};

export default ProductPage;
