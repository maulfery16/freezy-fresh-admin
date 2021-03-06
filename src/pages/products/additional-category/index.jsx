/* eslint-disable react/display-name */
import moment from 'moment';
import React, { useRef } from 'react';
import ReactMoment from 'react-moment';
import { Link } from 'react-router-dom';
import { Space } from 'antd';
import { EditFilled } from '@ant-design/icons';

import AtomStatusSwitch from '../../../components/atoms/datatable/status-switch';
import MoleculeDatatableAdditionalAction from '../../../components/molecules/datatable/additional-actions';
import MoleculeDeleteConfirm from '../../../components/molecules/delete-confirm';
import OrganismDatatable from '../../../components/organisms/datatable';
import OrganismLayout from '../../../components/organisms/layout';

const AdditionalCategoryPage = () => {
	const column = [
		{
			title: 'No',
			dataIndex: 'id',
			render: (id, _, index) => index + 1,
		},
		{
			title: 'Kode Kategori',
			dataIndex: 'code',
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
			title: 'Tanggal Dibuat',
			dataIndex: 'created_at',
			render: (date) => (
				<ReactMoment format="DD/MM/YY">{date}</ReactMoment>
			),
			csvRender: (item) => moment(item.created_at).format('DD/MM/YYYY'),
		},
		{
			title: 'Tanggal Diupdate',
			dataIndex: 'updated_at',
			render: (date) => (
				<ReactMoment format="DD/MM/YY">{date}</ReactMoment>
			),
			csvRender: (item) => moment(item.created_at).format('DD/MM/YYYY'),
		},
		{
			title: 'Dibuat Oleh',
			dataIndex: 'created_by',
		},
		{
			title: 'Diupdate Oleh',
			dataIndex: 'updated_by',
		},
		{
			title: 'Aktif',
			dataIndex: 'is_active',
			render: (active, record) => (
				<AtomStatusSwitch
					active={active}
					id={record.id}
					tableRef={additionalCategoryTableRef}
					url="additional_categories"
				/>
			),
			csvRender: (item) => (item.active ? 'Aktif' : 'Tidak Aktif'),
		},
		{
			title: 'Aksi',
			dataIndex: 'id',
			render: (id, record) => (
				<Space size="middle">
					<Link to={`/products/additional-category/${id}/edit`}>
						<EditFilled className="f4 orange" />
					</Link>

					{!record.is_active && (
						<MoleculeDeleteConfirm
							id={id}
							label="Kategori Tambahan"
							tableRef={additionalCategoryTableRef}
							url="additional_categories"
						/>
					)}
				</Space>
			),
			skipExport: true,
		},
	];

	const additionalCategoryTableRef = useRef();

	const renderAdditionalAction = () => {
		return (
			<MoleculeDatatableAdditionalAction
				column={column}
				label="Kategori Tambahan"
				getLimit={() => additionalCategoryTableRef.current.totalData}
				route="/products/additional-category"
				url="additional_categories"
			/>
		);
	};

	return (
		<OrganismLayout
			breadcumbs={[
				{ name: 'Produk', link: location.pathname },
				{
					name: 'Kategori Tambahan',
					link: location.pathname,
				},
			]}
			title="Product Page Additional Category"
		>
			<OrganismDatatable
				additionalAction={renderAdditionalAction()}
				columns={column}
				dataSourceURL={`additional_categories`}
				ref={additionalCategoryTableRef}
				searchInput={true}
				scroll={1920}
				title={`Kategori Tambahan`}
			/>
		</OrganismLayout>
	);
};

export default AdditionalCategoryPage;
