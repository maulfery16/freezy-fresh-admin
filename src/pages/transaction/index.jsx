/* eslint-disable react/display-name */
import React, { useRef } from 'react';
import ReactMoment from 'react-moment';
import moment from 'moment';
import { Link } from 'react-router-dom';
import { Space } from 'antd';
import { EyeFilled } from '@ant-design/icons';

import AtomNumberFormat from '../../components/atoms/number-format';
import AtomStatusSelect from '../../components/atoms/datatable/status-select';
import MoleculeDatatableAdditionalAction from '../../components/molecules/datatable/additional-actions';
import MoleculeDatatableDateRange from '../../components/molecules/datatable/date-range-plugin';
import MoleculeDatatableFilter from '../../components/molecules/datatable/filter-plugin';
import OrganismDatatable from '../../components/organisms/datatable';
import OrganismLayout from '../../components/organisms/layout';

import {
	translateTransactionKind,
	translateTransactionStatus,
} from '../../services/transaction';

// eslint-disable-next-line no-unused-vars
const dataSource = {
	data: [
		{
			id: 5,
			transaction_from: 'manual',
			transaction_for: 'cashback',
			transaction_type: 'credit',
			created_at: new Date(),
			finish_at: new Date(),
			customer_info: {
				id: 83510986823,
				name: {
					first_name: 'Kim',
					last_name: '',
				},
			},
			total: 27500,
			merchant: 'Freezy Fresh',
			freezy_branch: 'Bandung',
			rezeki_branch: 'Kalimantan',
			status: 'success',
		},
	],
	meta: {
		pagination: { total: 1 },
	},
};

const TransactionPage = () => {
	const column = [
		{
			align: 'center',
			title: 'No',
			dataIndex: 'id',
			render: (id, _, index) => index + 1,
		},
		{
			title: 'ID Transaksi',
			dataIndex: 'id',
			sorter: true,
		},
		{
			title: 'Asal Transaksi',
			dataIndex: 'transaction_from',
			render: (_, record) => record.transaction_from,
			sorter: true,
		},
		{
			title: 'Jenis Transaksi',
			dataIndex: 'transaction_for',
			render: (_, record) =>
				translateTransactionKind(record.transaction_for),
			csvRender: (item) =>
				item.transaction_for ===
				translateTransactionKind(item.transaction_for),
			sorter: true,
		},
		{
			title: 'Tipe Transaksi',
			dataIndex: 'transaction_type',
			render: (_, record) =>
				record.transaction_type === 'DEBIT' ? 'Debit' : 'Kredit',
			csvRender: (item) =>
				item.transaction_type === 'DEBIT' ? 'Debit' : 'Kredit',
			sorter: true,
		},
		{
			title: 'Tanggal Transaksi',
			dataIndex: 'created_at',
			render: (date) => (
				<ReactMoment format="DD/MM/YY H:mm">{date}</ReactMoment>
			),
			csvRender: (item) =>
				moment(item.created_at).format('DD/MM/YYYY H:mm'),
			sorter: true,
		},
		{
			title: 'Tanggal Transaksi Berhasil',
			dataIndex: 'finish_at',
			render: (date) =>
				date ? (
					<ReactMoment format="DD/MM/YY H:mm:ss">{date}</ReactMoment>
				) : (
					'-'
				),
			csvRender: (item) =>
				item.finish_at
					? moment(item.finish_at).format('DD/MM/YYYY H:mm:ss')
					: '-',
			sorter: true,
		},
		{
			title: 'ID Pelanggan',
			dataIndex: 'customer_info[code]',
			render: (_, record) => record.customer_info.code,
			sorter: true,
		},
		{
			title: 'Nama Pelanggan',
			dataIndex: 'customer_info[name]',
			render: (_, record) => `${record.customer_info.name}`,
			sorter: true,
		},
		{
			title: 'Nominal Transaksi (Rp)',
			dataIndex: 'amount',
			render: (_, record) => <AtomNumberFormat value={record.amount} />,
			sorter: true,
		},
		{
			title: 'Merchant',
			dataIndex: 'product_owner_info',
			render: (_, record) => record.product_owner_info,
			sorter: true,
		},
		{
			title: 'Cabang Freezy',
			dataIndex: 'branch_info[id]',
			render: (_, record) => record.branch_info.id,
			sorter: true,
		},
		{
			title: 'Cabang Rezeki',
			dataIndex: 'branch_info[id]',
			render: (_, record) => record.branch_info.id,
			sorter: true,
		},
		{
			title: 'Status',
			dataIndex: 'status',
			render: (_, record) => translateTransactionStatus(record.status),
			sorter: true,
		},
		{
			align: 'center',
			title: 'Aksi',
			dataIndex: 'status',
			render: (active, record) => (
				<Space size="middle">
					<AtomStatusSelect
						active={active}
						id={record.id}
						tableRef={transactionTableRef}
						url="transactions"
						options={[
							{ value: 'FAILED', label: 'Gagal' },
							{ value: 'SUCCESS', label: 'Berhasil' },
						]}
					/>
					<Link to={`/transaction/${record.id}/detail`}>
						<EyeFilled className="f4 blue" />
					</Link>
				</Space>
			),
			skipExport: true,
		},
	];
	const transactionTableRef = useRef();

	const renderAdditionalAction = () => {
		return (
			<MoleculeDatatableAdditionalAction
				column={column}
				label="Transaksi"
				getLimit={() => transactionTableRef.current.totalData}
				route="/transaction"
				url="transactions"
			/>
		);
	};

	const renderDatatableFilters = () => {
		return [
			<MoleculeDatatableDateRange
				identifier="daterange-filter"
				key="daterange"
				label="Tanggal Transaksi"
				name="created_at"
				operator=":"
				placeholder="Filter tanggal transaksi"
			/>,
			<MoleculeDatatableFilter
				identifier="type-filter"
				key="type"
				label="Tipe Transaksi"
				name="type"
				operator=":"
				placeholder="Semua Transaksi"
				data={{
					options: [
						{
							value: 'CREDIT',
							label: 'Kredit',
						},
						{ value: 'DEBIT', label: 'Debit' },
					],
				}}
			/>,
			<MoleculeDatatableFilter
				identifier="merchant-filter"
				key="merchant"
				label="Merchant"
				name="merchant"
				operator=":"
				placeholder="Semua Merchant"
				data={{
					// url: 'roles',
					// generateCustomOption: (item) => ({
					// 	value: item.name,
					// 	label: item.name,
					// }),
					options: [
						{
							value: 'm1',
							label: 'Merchant 1',
						},
						{ value: 'm2', label: 'Merchant 2' },
					],
				}}
			/>,
			<MoleculeDatatableFilter
				identifier="status-filter"
				key="status"
				label="Status"
				name="is_active"
				operator=":"
				placeholder="Semua status"
				data={{
					options: [
						{ value: 'PENDING', label: 'Pending' },
						{ value: 'FAILED', label: 'Gagal' },
						{ value: 'SUCCESS', label: 'Berhasil' },
					],
				}}
			/>,
			<MoleculeDatatableFilter
				identifier="source-filter"
				key="source"
				label="Asal Transaksi"
				name="source"
				operator=":"
				placeholder="Semua Asal Transaksi"
				data={{
					options: [
						{
							value: 'MANUAL',
							label: 'Manual',
						},
						{ value: 'SYSTEM', label: 'System' },
					],
				}}
			/>,
			<MoleculeDatatableFilter
				identifier="kind-filter"
				key="kind"
				label="Jenis Transaksi"
				name="kind"
				operator=":"
				placeholder="Semua Jenis Transaksi"
				data={{
					options: [
						{
							value: 'ADJUSTMENT_CREDIT',
							label: 'Adjustment Credit',
						},
						{
							value: 'ADJUSTMENT_CREDIT',
							label: 'Adjustment Debit',
						},
						{
							value: 'CASHBACK',
							label: 'cashback',
						},
						{
							value: 'PAYMENTT',
							label: 'Pembayaran',
						},
						{
							value: 'REFUND',
							label: 'Pengembalian Dana',
						},
						{
							value: 'TOP_UP',
							label: 'Top Up',
						},
					],
				}}
			/>,
			<MoleculeDatatableFilter
				identifier="customer_info-filter"
				key="customer_info"
				label="Nama Pelanggan"
				name="customer_info"
				operator=":"
				placeholder="Semua Pelanggan"
				data={{
					url: `admin/customers?filter=code;first_name;last_name`,
					generateCustomOption: (item) => ({
						value: item.code,
						label: `${item.first_name} ${item.last_name}`,
					}),
					// options: [
					// 	{
					// 		value: '12312',
					// 		label: 'Nani',
					// 	},
					// 	{ value: '12312', label: 'Kore' },
					// ],
				}}
			/>,
		];
	};

	return (
		<OrganismLayout
			breadcumbs={[{ name: 'Transaksi', link: '/transaction' }]}
			title="Transaction Page"
		>
			<OrganismDatatable
				additionalAction={renderAdditionalAction()}
				columns={column}
				// dataSource={dataSource}
				dataSourceURL={`transactions`}
				filters={renderDatatableFilters()}
				ref={transactionTableRef}
				scroll={1920}
				searchInput={true}
				title={`Transaksi`}
			/>
		</OrganismLayout>
	);
};

export default TransactionPage;
