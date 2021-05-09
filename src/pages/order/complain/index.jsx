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

import OrderService from '../../../services/order';
import MoleculeDatatableAdditionalAction from '../../../components/molecules/datatable/additional-actions';

const OrderComplainPage = () => {
	const column = [
		{
			title: 'No',
			dataIndex: 'id',
			render: (id, _, index) => index + 1,
			skipExport: true,
		},
		{
			title: 'ID Pesanan',
			dataIndex: 'order_info',
			sorter: true,
			render: (order) => order?.order_id,
		},
		{
			title: 'ID Tiket',
			dataIndex: 'ticket_code',
			sorter: true,
		},
		{
			title: 'Tipe Masalah',
			dataIndex: 'problem_type',
			sorter: true,
			render: (type) => orderService.translateOrderProblemTypeEnum(type),
		},
		{
			title: 'Nama Pelanggan',
			dataIndex: `customer_info`,
			render: (customer_info) => customer_info?.full_name,
			sorter: true,
		},
		{
			title: 'Foto Produk',
			dataIndex: 'complaint_media_url',
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
			render: (branch_info) => branch_info?.name?.id,
			sorter: true,
		},
		{
			title: 'Tipe Pengembalian',
			dataIndex: 'return_type',
			sorter: true,
			render: (type) => orderService.translateOrderReturnTypeEnum(type),
		},
		{
			title: 'Status Pesanan Pelanggan',
			dataIndex: 'status',
			sorter: status,
			render: (status) => status.id,
		},
		{
			title: 'Tanggal Dikomplain',
			dataIndex: 'created_at',
			sorter: true,
			render: (date) => (
				<ReactMoment format="DD/MM/YY">{date?.created_at}</ReactMoment>
			),
		},
		{
			title: 'Tanggal Dikomplain Selesai',
			dataIndex: 'finish_complain_date',
			sorter: true,
			render: (date) => (
				<ReactMoment format="DD/MM/YY">{date}</ReactMoment>
			),
		},
		{
			title: 'Tanggal Pesanan',
			dataIndex: 'order_info',
			sorter: true,
			render: (date) => (
				<ReactMoment format="DD/MM/YY">{date?.created_at}</ReactMoment>
			),
		},
		{
			align: 'center',
			title: 'Aksi',
			dataIndex: 'status',
			render: (_, record) => (
				<Space size="middle">
					<Link to={`/admin/review/${record.id}/detail`}>
						<EyeFilled className="f4 blue" />
					</Link>

					<MoleculeDeleteConfirm
						id={record.id}
						label="Ulasan"
						tableRef={orderComplainTableRef}
						url="admin/review"
					/>
				</Space>
			),
			skipExport: true,
		},
	];
	const orderService = new OrderService();
	const orderComplainTableRef = useRef();

	const renderAdditionalAction = () => {
		return (
			<MoleculeDatatableAdditionalAction
				label="Tiket Komplain"
				route="complain"
				withoutExportButton
			/>
		);
	};

	const renderDatatableFilters = () => {
		return [
			<AtomBranchDatatableFilter
				name="branch_id"
				key="branch-filter"
				label="Cabang Freezy (ID)"
			/>,
			<MoleculeDatatableDateRange
				name="created_at"
				operator=":"
				identifier="daterangefilter"
				key="daterange"
				label="Tanggal Komplain"
				placeholder="Filter tanggal komplain"
			/>,
			<MoleculeDatatableFilter
				name="problem_type"
				operator=":"
				identifier="payment-type-filter"
				label="Tipe Masalah"
				key="payment-type-filter"
				placeholder="Semua tipe masalah"
				data={{
					// url: 'problem-types',
					options: [
						{
							label: 'Marukana.. Udon?',
							value: 'Marukana.. Udon?',
						},
					],
				}}
			/>,
			<MoleculeDatatableFilter
				name="return_type"
				operator=":"
				identifier="payment-type-filter"
				label="Tipe Pengembalian"
				key="payment-type-filter"
				placeholder="Semua Tipe Pengembalian"
				data={{
					// url: 'return-types',
					options: [
						{
							label: 'Marukana.. Udon?',
							value: 'Marukana.. Udon?',
						},
					],
				}}
			/>,
		];
	};

	return (
		<OrganismLayout
			breadcumbs={[
				{ name: 'Pesanan', link: '/order' },
				{ name: 'Komplain', link: location.pathname },
			]}
			title="Order Complain Page"
		>
			<OrganismDatatable
				additionalAction={renderAdditionalAction()}
				columns={column}
				dataSourceURL={`order-complaints`}
				filters={renderDatatableFilters()}
				filterModalWidth={720}
				limit={15}
				ref={orderComplainTableRef}
				scroll={1920}
				searchInput={true}
				title={`Pesanan Di Komplain`}
			/>
		</OrganismLayout>
	);
};

export default OrderComplainPage;
