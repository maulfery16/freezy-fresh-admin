/* eslint-disable react/display-name */
import moment from 'moment';
import React, { useRef } from 'react';
import ReactMoment from 'react-moment';
import { Link } from 'react-router-dom';
import { Space } from 'antd';
import { EditFilled } from '@ant-design/icons';

import AtomStatusSwitch from '../../../components/atoms/datatable/status-switch';
import MoleculeDeleteConfirm from '../../../components/molecules/delete-confirm';
import OrganismDatatable from '../../../components/organisms/datatable';
import OrganismLayout from '../../../components/organisms/layout';

const ZonePage = () => {
	const column = [
		{
			title: 'No',
			dataIndex: 'id',
			render: (id, _, index) => index + 1,
		},
		{
			title: 'Kode Zona',
			dataIndex: 'code',
		},
		{
			title: 'Nama Zona (ID)',
			dataIndex: `name['id']`,
			render: (_, record) => record.name.id,
		},
		{
			title: 'Nama Zona (EN)',
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
					tableRef={zoneTableRef}
					url="zones"
				/>
			),
			csvRender: (item) => (item.active ? 'Aktif' : 'Tidak Aktif'),
		},
		{
			title: 'Aksi',
			dataIndex: 'id',
			render: (id, record) => (
				<Space size="middle">
					<Link to={`/products/zone/${id}/edit`}>
						<EditFilled className="f4 orange" />
					</Link>

					{!record.is_active && (
						<MoleculeDeleteConfirm
							id={id}
							label="Zona"
							tableRef={zoneTableRef}
							url="zones"
						/>
					)}
				</Space>
			),
			skipExport: true,
		},
	];

	const zoneTableRef = useRef();

	return (
		<OrganismLayout
			breadcumbs={[
				{ name: 'Produk', link: location.pathname },
				{
					name: 'Zona',
					link: location.pathname,
				},
			]}
			title="Product Page Additional Category"
		>
			<OrganismDatatable
				columns={column}
				dataSourceURL={`zones`}
				ref={zoneTableRef}
				searchInput={true}
				scroll={1920}
				title={`Zona`}
			/>
		</OrganismLayout>
	);
};

export default ZonePage;
