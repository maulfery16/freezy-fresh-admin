/* eslint-disable react/display-name */
import React, { useRef } from 'react';
import { EditFilled, EyeFilled } from '@ant-design/icons';
import { Link } from 'react-router-dom';
import { Space } from 'antd';

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
			dataIndex: `name['id']`,
			render: (_, record) => record.name.id,
			sorter: true,
		},
		{
			title: 'Kode UPC',
			dataIndex: 'upc_code',
			sorter: true,
		},
		{
			title: 'Kategori Dasar',
			dataIndex: `base_category['id']`,
			render: (_, record) => record.base_category.id,
			sorter: true,
		},
		{
			title: 'Kategori Tambahan',
			dataIndex: `additional_category['id']`,
			render: (_, record) =>
				record.additional_category && record.additional_category.id,
			sorter: true,
		},
		{
			title: 'Batas Umur Pelanggan',
			dataIndex: 'age_limit',
			sorter: true,
		},
		{
			title: 'Nama brand',
			dataIndex: `brand['id']`,
			render: (_, record) => record.brand.id,
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
			sorter: true,
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

					<Link to={`/products/${id}/edit`}>
						<EditFilled className="f4 orange" />
					</Link>

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

	const productTableRef = useRef();

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
			<AtomBaseCategoriesDatatableFilter key="base-categories-filter" />,
			<MoleculeDatatableFilter
				name="additional-categories"
				operator=":"
				identifier="additional-categories-filter"
				label="Kategori Dasar"
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
				name="product-owner"
				operator=":"
				identifier="product-owner-filter"
				label="Perusahaan"
				key="product-owner-filter"
				placeholder="Semua Perusahaan"
				data={{
					url: 'product-owners',
				}}
			/>,
			<AtomBranchDatatableFilter key="branch-filter" />,
			<MoleculeDatatableFilter
				name="brand"
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
				name="freezy-pick"
				operator=":"
				identifier="freezy-pick-filter"
				label="Freezy Pick"
				key="freezy-pick-filter"
				placeholder="Semua freezy pick"
				data={{
					options: [
						{ id: true, label: 'Ya' },
						{ id: false, label: 'Tidak' },
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
				title={`Produk-Produk`}
			/>
		</OrganismLayout>
	);
};

export default ProductPage;
