/* eslint-disable react/display-name */
import React, { useRef } from 'react';
import { Link } from 'react-router-dom';
import { Space } from 'antd';
import { EditFilled } from '@ant-design/icons';

import AtomColorInfoGroup from '../../../components/atoms/color-info-group';
import AtomStatusSwitch from '../../../components/atoms/datatable/status-switch';
import MoleculeDatatableAdditionalAction from '../../../components/molecules/datatable/additional-actions';
import MoleculeDeleteConfirm from '../../../components/molecules/delete-confirm';
import OrganismDatatable from '../../../components/organisms/datatable';
import OrganismLayout from '../../../components/organisms/layout';

const ArticleCategoryPage = () => {
	const column = [
		{
			title: 'No',
			dataIndex: 'id',
			render: (id, _, index) => index + 1,
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
			title: 'Warna',
			dataIndex: 'color',
			render: (color) =>
				color ? (
					<AtomColorInfoGroup
						hexa={color.hexa_code}
						label={color.name.id || color.name}
					/>
				) : (
					'-'
				),
			csvRender: (item) => (item.color ? item.color.name.id : '-'),
		},
		{
			title: 'Aktif',
			dataIndex: 'is_active',
			render: (active, record) => (
				<AtomStatusSwitch
					active={active}
					id={record.id}
					tableRef={articleCategoryTableRef}
					url="article-categories"
				/>
			),
			csvRender: (item) => (item.active ? 'Aktif' : 'Tidak Aktif'),
		},
		{
			title: 'Aksi',
			dataIndex: 'id',
			render: (id, record) => (
				<Space size="middle">
					<Link to={`/view/article-category/${id}/edit`}>
						<EditFilled className="f4 orange" />
					</Link>

					{!record.is_active && (
						<MoleculeDeleteConfirm
							id={id}
							label="Kategori Artikel"
							tableRef={articleCategoryTableRef}
							url="article-categories"
						/>
					)}
				</Space>
			),
			skipExport: true,
		},
	];
	const articleCategoryTableRef = useRef();

	const renderAdditionalAction = () => {
		return (
			<MoleculeDatatableAdditionalAction
				column={column}
				label="Kategori Artikel"
				getLimit={() => articleCategoryTableRef.current.totalData}
				route="/view/article-category"
				url="article-categories"
			/>
		);
	};

	return (
		<OrganismLayout
			breadcumbs={[
				{ name: 'Tampilan', link: location.pathname },
				{
					name: 'Kategori Artikel',
					link: location.pathname,
				},
			]}
			title="View Page Article Category"
		>
			<OrganismDatatable
				additionalAction={renderAdditionalAction()}
				columns={column}
				dataSourceURL={`article-categories`}
				ref={articleCategoryTableRef}
				searchInput={true}
				title={`Kategori Artikel`}
			/>
		</OrganismLayout>
	);
};

export default ArticleCategoryPage;
