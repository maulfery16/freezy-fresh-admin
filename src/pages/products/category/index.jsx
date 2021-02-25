/* eslint-disable react/display-name */
import React, { useRef } from 'react';
import { Link } from 'react-router-dom';
import { Space } from 'antd';
import { EditFilled } from '@ant-design/icons';

import AtomColorInfoGroup from '../../../components/atoms/color-info-group';
import AtomImage from '../../../components/atoms/image';
import AtomStatusSwitch from '../../../components/atoms/datatable/status-switch';
import MoleculeDatatableAdditionalAction from '../../../components/molecules/datatable/additional-actions';
import MoleculeDeleteConfirm from '../../../components/molecules/delete-confirm';
import OrganismDatatable from '../../../components/organisms/datatable';
import OrganismLayout from '../../../components/organisms/layout';

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
			dataIndex: `name['id']`,
			render: (_, record) => record.name.id,
		},
		{
			title: 'Nama Kategori (EN)',
			dataIndex: `name['en']`,
			render: (_, record) => record.name.en,
		},
		{
			align: 'center',
			title: 'Foto Icon',
			dataIndex: 'image',
			render: (image) => <AtomImage preview src={image} width={70} />,
			csvRender: (item) => item.iamge,
		},
		{
			align: 'center',
			title: 'Warna',
			dataIndex: 'color',
			render: (color) =>
				color ? (
					<AtomColorInfoGroup
						hexa={color.hexa_code}
						label={
							typeof color.name === 'string'
								? color.name
								: `${color.name.id} / ${color.name.en}`
						}
					/>
				) : (
					'-'
				),
			csvRender: (item) => (item.color ? item.color.name : '-'),
		},
		{
			align: 'center',
			title: 'Aktif',
			dataIndex: 'is_active',
			render: (active, record) => (
				<AtomStatusSwitch
					active={active}
					id={record.id}
					tableRef={categoryTableRef}
					url="base_categories"
				/>
			),
			csvRender: (item) => (item.active ? 'Aktif' : 'Tidak Aktif'),
		},
		{
			align: 'center',
			title: 'Aksi',
			dataIndex: 'id',
			render: (id, record) => (
				<Space size="middle">
					<Link to={`/products/category/${id}/edit`}>
						<EditFilled className="f4 orange" />
					</Link>

					{!record.is_active && (
						<MoleculeDeleteConfirm
							id={id}
							label="Kategori Dasar"
							tableRef={categoryTableRef}
							url="base_categories"
						/>
					)}
				</Space>
			),
			skipExport: true,
		},
	];
	const categoryTableRef = useRef();

	const renderAdditionalAction = () => {
		return (
			<MoleculeDatatableAdditionalAction
				column={column}
				label="Kategori Dasar"
				getLimit={() => categoryTableRef.current.totalData}
				route="/products/category"
				url="base_categories"
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
				dataSourceURL={`base_categories`}
				ref={categoryTableRef}
				searchInput={true}
				title={`Kategori Dasar`}
			/>
		</OrganismLayout>
	);
};

export default CategoryPage;
