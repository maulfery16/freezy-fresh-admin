/* eslint-disable react/display-name */
import { Space } from 'antd';
import moment from 'moment';
import React, { useRef } from 'react';
import ReactMoment from 'react-moment';
import { EditFilled } from '@ant-design/icons';

import AtomImage from '../../components/atoms/image';
import AtomStatusSwitch from '../../components/atoms/datatable/status-switch';
import MoleculeDatatableAdditionalAction from '../../components/molecules/datatable/additional-actions';
import MoleculeDeleteConfirm from '../../components/molecules/delete-confirm';
import OrganismDatatable from '../../components/organisms/datatable';
import OrganismLayout from '../../components/organisms/layout';
import { Link } from 'react-router-dom';

const PerusahaanPage = () => {
	const column = [
		{
			title: 'No',
			dataIndex: 'id',
			render: (id, _, index) => index + 1,
		},
		{
			title: 'Nama Perusahaan',
			dataIndex: `name`,
		},
		{
			align: 'center',
			title: 'Logo',
			dataIndex: 'image',
			render: (image) => <AtomImage preview src={image} size={70} />,
			csvRender: (item) => item.iamge,
		},
		{
			title: 'Kode Perusahaan',
			dataIndex: `code`,
		},
		{
			title: 'Tanggal Dibuat',
			dataIndex: 'created_at',
			render: (date) => (
				<ReactMoment format="DD/MM/YYYY">{date}</ReactMoment>
			),
			csvRender: (item) => moment(item.created_at).format('DD/MM/YYYY'),
		},
		{
			title: 'Dibuat Oleh',
			dataIndex: 'created_by',
		},
		{
			title: 'Tanggal Diperbaharui',
			dataIndex: 'updated_at',
			render: (date) => (
				<ReactMoment format="DD/MM/YYYY">{date}</ReactMoment>
			),
			csvRender: (item) => moment(item.updated_at).format('DD/MM/YYYY'),
		},
		{
			title: 'Diperbaharui Oleh',
			dataIndex: 'updated_by',
		},
		{
			align: 'center',
			title: 'Aktif',
			dataIndex: 'is_active',
			render: (active, record) => (
				<AtomStatusSwitch
					active={active}
					id={record.id}
					tableRef={perusahaanTableRef}
					url="product-owners"
				/>
			),
			csvRender: (item) => (item.is_active ? 'Aktif' : 'Tidak Aktif'),
		},
		{
			align: ' center',
			title: 'Aksi',
			dataIndex: 'id',
			render: (id, record) => (
				<Space size="middle">
					<Link to={`/perusahaan/${id}/edit`}>
						<EditFilled className="f4 orange" />
					</Link>

					{!record.is_active && (
						<MoleculeDeleteConfirm
							id={id}
							label="Perusahaan"
							tableRef={perusahaanTableRef}
							url="product-owners"
						/>
					)}
				</Space>
			),
			skipExport: true,
		},
	];
	const perusahaanTableRef = useRef();

	const renderAdditionalAction = () => {
		return (
			<MoleculeDatatableAdditionalAction
				column={column}
				label="Perusahaan"
				getLimit={() => perusahaanTableRef.current.totalData}
				route="/perusahaan"
				url="product-owners"
			/>
		);
	};

	return (
		<OrganismLayout
			breadcumbs={[
				{
					name: 'Perusahaan',
					link: location.pathname,
				},
			]}
			title="Product Page Perusahaan"
		>
			<OrganismDatatable
				additionalAction={renderAdditionalAction()}
				columns={column}
				dataSourceURL={`product-owners`}
				ref={perusahaanTableRef}
				scroll={1920}
				searchInput={true}
				title={`Perusahaan`}
			/>
		</OrganismLayout>
	);
};

export default PerusahaanPage;
