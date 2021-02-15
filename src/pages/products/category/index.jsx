/* eslint-disable react/display-name */
import React, { useRef } from 'react';
import { Link } from 'react-router-dom';
import { Image, message, Popconfirm, Space, Switch } from 'antd';
import {
	DeleteFilled,
	EditFilled,
	QuestionCircleFilled,
} from '@ant-design/icons';

import OrganismDatatable from '../../../components/organisms/datatable';
import OrganismLayout from '../../../components/organisms/layout';

import CategoryService from '../../../services/category';
import MoleculeDatatableAdditionalAction from '../../../components/molecules/datatable/additional-actions';
const categoryService = new CategoryService();

const CategoryPage = () => {
	const column = [
		{
			title: 'No',
			dataIndex: 'id',
			render: (id, _, index) => index + 1,
		},
		{
			title: 'Kategori ID',
			dataIndex: 'id',
		},
		{
			title: 'Nama Kategori (ID)',
			dataIndex: 'name',
			render: (_, record) => record.name.id,
		},
		{
			title: 'Nama Kategori (EN)',
			dataIndex: 'name',
			render: (_, record) => record.name.en,
		},
		{
			title: 'Foto Icon',
			dataIndex: 'image',
			render: (image) => (
				<Image preview src={image ? image.original : null} width={50} />
			),

			csvRender: (item) =>
				item.image ? item.image.original : item.image,
		},
		{
			title: 'Warna',
			dataIndex: 'color',
			render: (color) => (
				<div
					className="br2 ba b--black-20"
					style={{
						background: color.hexa_code,
						height: '50px',
						width: '50px',
					}}
				/>
			),
			csvRender: (item) => item.color.name.id,
		},
		{
			title: 'Aktif',
			dataIndex: 'is_active',
			render: (active, record) => (
				<Switch
					defaultChecked={active}
					onChange={() =>
						changeCategoryActiveStatus(record.id, active)
					}
				/>
			),
			csvRender: (item) => (item.active ? 'Aktif' : 'Tidak Aktif'),
		},
		{
			title: 'Aksi',
			dataIndex: 'id',
			render: (id) => (
				<Space size="middle">
					<Link to={`/products/category/${id}/edit`}>
						<EditFilled className="f4 orange" />
					</Link>

					<Popconfirm
						icon={<QuestionCircleFilled className="red" />}
						onConfirm={() => deleteBaseCategory(id)}
						title="Are you sure"
					>
						<DeleteFilled className="f4 red" />
					</Popconfirm>
				</Space>
			),
			skipExport: true,
		},
	];
	const categoryTableRef = useRef();

	const changeCategoryActiveStatus = async (id, status) => {
		try {
			await categoryService.updateCategoryActiveStatus(id, {
				status: !status,
			});

			message.success('Berhasil memperbaharui status aktif kategori');
		} catch (error) {
			message.error(error.message);
			console.error(error);
		}
	};

	const deleteBaseCategory = async (id) => {
		try {
			await categoryService.deleteCategory(id);
			message.success('Berhasil menghapus kategori dasar');

			categoryTableRef.current.refetchData();
		} catch (error) {
			message.error(error.message);
			console.error(error);
		}
	};

	const renderAdditionalAction = () => {
		return (
			<MoleculeDatatableAdditionalAction
				column={column}
				label="Kategori Dasar"
				limit={categoryTableRef.current.totalData}
				service={categoryService}
				url="products/category"
			/>
		);
	};

	return (
		<OrganismLayout
			breadcumbs={[
				{ name: 'Produk', link: location.pathname },
				{
					name: 'Kategori Dasar',
					link: location.pathname,
				},
			]}
			title="Product Page Category"
		>
			<OrganismDatatable
				additionalAction={renderAdditionalAction()}
				columns={column}
				dataSourceURL={`/v1/base_categories`}
				ref={categoryTableRef}
				searchInput={true}
				title={`Kategori Dasar`}
			/>
		</OrganismLayout>
	);
};

export default CategoryPage;
