/* eslint-disable react/display-name */
import moment from 'moment';
import React, { useRef } from 'react';
import ReactMoment from 'react-moment';
import { Link } from 'react-router-dom';
import { Space } from 'antd';
import { EditFilled } from '@ant-design/icons';

import AtomImage from '../../../components/atoms/image';
import AtomNumberFormat from '../../../components/atoms/number-format';
import AtomStatusSwitch from '../../../components/atoms/datatable/status-switch';
import MoleculeDatatableAdditionalAction from '../../../components/molecules/datatable/additional-actions';
import MoleculeDeleteConfirm from '../../../components/molecules/delete-confirm';
import OrganismDatatable from '../../../components/organisms/datatable';
import OrganismLayout from '../../../components/organisms/layout';

const BrandPage = () => {
	const column = [
		{
			title: 'No',
			dataIndex: 'id',
			render: (id, _, index) => index + 1,
		},
		{
			title: 'Kode Brand',
			dataIndex: 'code',
		},
		{
			title: 'Nama Brand (ID)',
			dataIndex: 'name',
			render: (_, record) => record.name.id,
		},
		{
			title: 'Nama Brand (EN)',
			dataIndex: `name['en']`,
			render: (_, record) => record.name.en,
		},
		{
			align: 'center',
			title: 'Foto Brand',
			dataIndex: 'image',
			render: (_, record) => (
				<AtomImage preview src={record.image} width={100} />
			),
			csvRender: (item) => item.image,
		},
		{
			title: 'Jumlah Sosmed Follower',
			dataIndex: 'social_media_followers',
			render: (followers) => <AtomNumberFormat value={followers || 0} />,
			csvRender: (item) => item.followers,
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
					tableRef={brandTableRef}
					url="base-categories"
				/>
			),
			csvRender: (item) => (item.is_active ? 'Aktif' : 'Tidak Aktif'),
		},
		{
			align: 'center',
			title: 'Aksi',
			dataIndex: 'id',
			render: (id, record) => (
				<Space size="middle">
					<Link to={`/products/brand/${id}/edit`}>
						<EditFilled className="f4 orange" />
					</Link>

					{!record.is_active && (
						<MoleculeDeleteConfirm
							id={id}
							label="Brand"
							tableRef={brandTableRef}
							url="brands"
						/>
					)}
				</Space>
			),
			skipExport: true,
		},
	];
	const brandTableRef = useRef();

	const renderAdditionalAction = () => {
		return (
			<MoleculeDatatableAdditionalAction
				column={column}
				label="Brand"
				getLimit={() => brandTableRef.current.totalData}
				route="/products/brand"
				url="brands"
			/>
		);
	};

	return (
		<OrganismLayout
			breadcumbs={[
				{ name: 'Produk', link: location.pathname },
				{
					name: 'Brand',
					link: location.pathname,
				},
			]}
			title="Product Page Brand"
		>
			<OrganismDatatable
				additionalAction={renderAdditionalAction()}
				columns={column}
				dataSourceURL={`brands`}
				ref={brandTableRef}
				scroll={1920}
				searchInput={true}
				title={`Brand`}
			/>
		</OrganismLayout>
	);
};

export default BrandPage;
