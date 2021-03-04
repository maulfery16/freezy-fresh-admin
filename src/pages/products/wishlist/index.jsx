/* eslint-disable react/display-name */
import moment from 'moment';
import React, { useRef } from 'react';
import ReactMoment from 'react-moment';
import { Space } from 'antd';

import AtomImage from '../../../components/atoms/image';
import MoleculeDatatableAdditionalAction from '../../../components/molecules/datatable/additional-actions';
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
			dataIndex: `customer['name']`,
			render: (_, record) => record.name.id,
		},
		{
			title: 'ID Pelanggan',
			dataIndex: `customer['id']`,
			render: (_, record) => record.customer.id,
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

	const renderAdditionalAction = () => {
		return (
			<MoleculeDatatableAdditionalAction
				column={column}
				label="Wishlist"
				getLimit={() => wishlistTableRef.current.totalData}
				route="/products/wishlist"
				url="wishlists"
			/>
		);
	};

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
				additionalAction={renderAdditionalAction()}
				columns={column}
				dataSourceURL={`wishlists`}
				ref={wishlistTableRef}
				scroll={1920}
				searchInput={true}
				title={`Wishlist`}
			/>
		</OrganismLayout>
	);
};

export default WishlistPage;
