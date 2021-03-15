/* eslint-disable react/display-name */
import { EditFilled } from '@ant-design/icons';
import { Link } from 'react-router-dom';
import { Space } from 'antd';

import React, { useRef } from 'react';

import AtomImage from '../../../components/atoms/image';
import AtomStatusSwitch from '../../../components/atoms/datatable/status-switch';
import MoleculeDatatableAdditionalAction from '../../../components/molecules/datatable/additional-actions';
import MoleculeDeleteConfirm from '../../../components/molecules/delete-confirm';
import OrganismDatatable from '../../../components/organisms/datatable';
import OrganismLayout from '../../../components/organisms/layout';
import MoleculeDatatableFilter from '../../../components/molecules/datatable/filter-plugin';
import MoleculeDatatableDateRange from '../../../components/molecules/datatable/date-range-plugin';

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
			title: 'Kategori Dasar',
			dataIndex: `additional_category['id']`,
			render: (_, record) => record.additional_category.id,
			sorter: true,
		},
		{
			title: 'Batas Umur Pelanggan',
			dataIndex: 'customer_age_limit',
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
		// {
		// 	title: 'Cabang',
		// 	dataIndex: 'branches',
		// 	render: (branches) =>
		// 		branches.map((branch) => branch.name).join(', '),
		// 	sorter: true,
		// },
		{
			title: 'Nama Perusahaan',
			dataIndex: `product_owner`,
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
				label="Produk"
				getLimit={() => productTableRef.current.totalData}
				route="/products/"
				url="products"
				withImport
			/>
		);
	};

	const renderDatatableFilters = () => {
		return [
			<MoleculeDatatableFilter
				name="gender"
				operator=":"
				identifier="gender-filter"
				label="Jenis Kelamin"
				key="gender-filter"
				placeholder="Semua jenis kelamin"
				data={{
					mock: [
						{ id: 'MALE', label: 'Laki-laki' },
						{ id: 'FEMALE', label: 'Perempuan' },
					],
				}}
			/>,
			<MoleculeDatatableDateRange
				name="created_at"
				operator=":"
				identifier="daterangefilter"
				key="daterange"
				label="Tanggal Lahir"
				placeholder="Filter tanggal lahir"
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
				ref={productTableRef}
				scroll={1920}
				searchInput={true}
				title={`Produk-Produk`}
			/>
		</OrganismLayout>
	);
};

export default ProductPage;
