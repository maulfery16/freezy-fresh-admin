/* eslint-disable react/display-name */
import moment from 'moment';
import React, { useRef } from 'react';
import ReactMoment from 'react-moment';
import { Space } from 'antd';

import AtomImage from '../../../components/atoms/image';
import MoleculeDeleteConfirm from '../../../components/molecules/delete-confirm';
import OrganismDatatable from '../../../components/organisms/datatable';
import OrganismLayout from '../../../components/organisms/layout';

const WishlistPage = () => {
	const column = [
		{
			title: 'No',
			dataIndex: 'id',
			render: (id, _, index) => index + 1,
		},
		{
			title: 'Nama Pelanggan',
			dataIndex: `user[full_name]`,
			sorter: true,
			render: (_, record) => `${record.user.full_name}`,
		},
		{
			title: 'ID Pelanggan',
			dataIndex: `user_id`,
			render: (_, record) => record.user_id,
		},
		{
			align: 'center',
			title: 'Foto Produk',
			dataIndex: 'image',
			render: (_, record) => (
				<AtomImage preview src={record.image} width={100} />
			),
			csvRender: (item) => item.image,
		},
		{
			title: 'Tanggal Dibuat',
			dataIndex: 'created_at',
			sorter: true,
			render: (date) => (
				<ReactMoment format="DD/MM/YYYY">{date}</ReactMoment>
			),
			csvRender: (item) => moment(item.created_at).format('DD/MM/YYYY'),
		},
		{
			title: 'Dibuat Oleh',
			dataIndex: 'created_by',
			sorter: true,
		},
		{
			align: 'center',
			title: 'Aksi',
			dataIndex: 'id',
			render: (id) => (
				<Space size="middle">
					{
						<MoleculeDeleteConfirm
							id={id}
							label="Wishlist"
							tableRef={wishlistTableRef}
							url="wishlists"
						/>
					}
				</Space>
			),
			skipExport: true,
		},
	];
	const wishlistTableRef = useRef();

	return (
		<OrganismLayout
			breadcumbs={[
				{ name: 'Produk', link: location.pathname },
				{
					name: 'Wishlist',
					link: location.pathname,
				},
			]}
			title="Product Page Wishlist"
		>
			<OrganismDatatable
				columns={column}
				dataSourceURL={`wishlists`}
				ref={wishlistTableRef}
				scroll={1360}
				searchInput={true}
				title={`Wishlist`}
			/>
		</OrganismLayout>
	);
};

export default WishlistPage;
