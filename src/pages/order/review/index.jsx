/* eslint-disable react/display-name */
import React, { useRef } from 'react';
import ReactMoment from 'react-moment';
import { Space } from 'antd';
import { EyeFilled } from '@ant-design/icons';
import { Link } from 'react-router-dom';

import AtomBranchDatatableFilter from '../../../components/atoms/selection/branch-datatable';
import AtomImage from '../../../components/atoms/image';
import MoleculeDatatableDateRange from '../../../components/molecules/datatable/date-range-plugin';
import MoleculeDatatableFilter from '../../../components/molecules/datatable/filter-plugin';
import MoleculeDeleteConfirm from '../../../components/molecules/delete-confirm';
import OrganismDatatable from '../../../components/organisms/datatable';
import OrganismLayout from '../../../components/organisms/layout';

const ReviewPage = () => {
	const reviewTableRef = useRef();
	const column = [
		{
			title: 'No',
			dataIndex: 'id',
			render: (id, _, index) => index + 1,
			skipExport: true,
		},
		{
			title: 'ID Pesanan',
			dataIndex: 'id',
			sorter: true,
		},
		{
			title: 'Nama Pelanggan',
			dataIndex: `customer_info`,
			render: (customer_info) => customer_info.full_name,
			sorter: true,
		},
		{
			title: 'Foto Produk',
			dataIndex: 'image',
			render: (image) =>
				image && (
					<Space size={8}>
						{image.map((imgSrc, idx) => (
							<AtomImage
								preview
								key={idx}
								src={imgSrc}
								size={70}
							/>
						))}
					</Space>
				),
		},
		{
			title: 'Cabang Freezy (ID)',
			dataIndex: 'branch_info',
			render: (branch_info) => branch_info.name.id,
			sorter: true,
		},
		{
			title: 'Status Pesanan Pelanggan',
			dataIndex: 'customer_status_order',
			sorter: status,
			render: (status) => status.id,
		},
		{
			title: 'Tanggal Pesanan Selesai',
			dataIndex: 'finish_order',
			sorter: true,
			render: (date) => (
				<ReactMoment format="DD/MM/YY">{date}</ReactMoment>
			),
		},
		{
			align: 'center',
			title: 'Aksi',
			dataIndex: 'status',
			render: (_, record) => (
				<Space size="middle">
					<Link to={`/order/review/${record.id}/detail`}>
						<EyeFilled className="f4 blue" />
					</Link>

					<MoleculeDeleteConfirm
						id={record.id}
						label="Ulasan"
						tableRef={reviewTableRef}
						url="admin/review"
					/>
				</Space>
			),
			skipExport: true,
		},
	];

	const renderDatatableFilters = () => {
		return [
			<AtomBranchDatatableFilter
				name="order.branch_id"
				key="branch-filter"
				label="Cabang Freezy (ID)"
			/>,
			<MoleculeDatatableDateRange
				name="order.created_at"
				operator=":"
				identifier="daterangefilter"
				key="daterange"
				label="Tanggal Pesanan"
				placeholder="Filter tanggal pesanan"
			/>,
			<MoleculeDatatableFilter
				name="order.user_id"
				operator=":"
				identifier="customer-filter"
				label="Nama Pelanggan"
				key="customer"
				placeholder="Semua nama pelanggan"
				data={{
					url: 'admin/customers?filter=id;first_name;last_name',
					generateCustomOption: (item) => ({
						value: item.id,
						label: `${item.first_name || ''} ${
							item.last_name || ''
						}`,
					}),
				}}
			/>,
		];
	};

	return (
		<OrganismLayout
			breadcumbs={[
				{ name: 'Pesanan', link: '/order' },
				{ name: 'Ulasan', link: location.pathname },
			]}
			title="Order Review Page"
		>
			<OrganismDatatable
				additionalAction={null}
				columns={column}
				dataSourceURL={`admin/review`}
				filters={renderDatatableFilters()}
				limit={15}
				ref={reviewTableRef}
				scroll={1360}
				searchInput={true}
				title={`Ulasan`}
			/>
		</OrganismLayout>
	);
};

export default ReviewPage;
