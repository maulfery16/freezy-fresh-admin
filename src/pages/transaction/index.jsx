/* eslint-disable react/display-name */
import React, { useRef } from 'react';
import ReactMoment from 'react-moment';
import moment from 'moment';
import { Link } from 'react-router-dom';
import { Space } from 'antd';
import { EditFilled, EyeFilled } from '@ant-design/icons';

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

const dataSource = {
	data: [
		{
			id: 5,
			trans_source: 'manual',
			trans_kind: 'cashback',
			trans_type: 'credit',
			created_at: new Date(),
			success_at: new Date(),
			customer: {
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
			dataIndex: 'trans_source',
			render: (_, record) => record.trans_source,
			sorter: true,
		},
		{
			title: 'Jenis Transaksi',
			dataIndex: 'trans_kind',
			render: (_, record) => translateTransactionKind(record.trans_kind),
			csvRender: (item) => (item.is_active ? 'Aktif' : 'Tidak Aktif'),
			sorter: true,
		},
		{
			title: 'Tipe Transaksi',
			dataIndex: 'trans_type',
			render: (_, record) =>
				record.trans_type === 'debt' ? 'Debit' : 'Kredit',
			csvRender: (item) =>
				item.trans_type === 'debt' ? 'Debit' : 'Kredit',
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
			dataIndex: 'success_at',
			render: (date) => (
				<ReactMoment format="DD/MM/YY H:mm">{date}</ReactMoment>
			),
			csvRender: (item) =>
				moment(item.success_at).format('DD/MM/YYYY H:mm'),
			sorter: true,
		},
		{
			title: 'ID Pelanggan',
			dataIndex: 'customer[id]',
			render: (_, record) => record.customer.id,
			sorter: true,
		},
		{
			title: 'Nama Pelanggan',
			dataIndex: 'customer[name]',
			render: (_, record) =>
				`${record.customer.name.first_name} ${record.customer.name.last_name}`,
			sorter: true,
		},
		{
			title: 'Nominal Transaksi (Rp)',
			dataIndex: 'total',
			render: (_, record) => <AtomNumberFormat value={record.total} />,
			sorter: true,
		},
		{
			title: 'Merchant',
			dataIndex: 'merchant',
			render: (_, record) => record.merchant,
			sorter: true,
		},
		{
			title: 'Cabang Freezy',
			dataIndex: 'freezy_branch',
			render: (_, record) => record.freezy_branch,
			sorter: true,
		},
		{
			title: 'Cabang Rezeki',
			dataIndex: 'rezeki_branch',
			render: (_, record) => record.rezeki_branch,
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
							{ value: 'pending', label: 'Pending' },
							{ value: 'failed', label: 'Gagal' },
							{ value: 'success', label: 'Berhasil' },
						]}
					/>
					<Link to={`/transaction/${record.id}/detail`}>
						<EyeFilled className="f4 blue" />
					</Link>

					<Link to={`/transaction/${record.id}/edit`}>
						<EditFilled className="f4 orange" />
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
							value: 'credit',
							label: 'Kredit',
						},
						{ value: 'debt', label: 'Debit' },
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
						{
							value: 'true',
							label: 'Aktif',
						},
						{ value: 'false', label: 'Tidak Aktif' },
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
							value: 'manual',
							label: 'Manual',
						},
						{ value: 'system', label: 'System' },
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
							value: 'adjustment_credit',
							label: 'Adjustment Credit',
						},
						{
							value: 'adjustment_debt',
							label: 'Adjustment Debit',
						},
						{
							value: 'cashback',
							label: 'Cashback',
						},
						{
							value: 'payment',
							label: 'Pembayaran',
						},
						{
							value: 'refund',
							label: 'Pengembalian Dana',
						},
						{
							value: 'top_up',
							label: 'Top Up',
						},
					],
				}}
			/>,
			<MoleculeDatatableFilter
				identifier="customer-filter"
				key="customer"
				label="Nama Pelanggan"
				name="customer"
				operator=":"
				placeholder="Semua Pelanggan"
				data={{
					// url: 'customers',
					// generateCustomOption: (item) => ({
					// 	value: item.id,
					// 	label: `${item.first_name} ${item.last_name}`,
					// }),
					options: [
						{
							value: '12312',
							label: 'Nani',
						},
						{ value: '12312', label: 'Kore' },
					],
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
				dataSource={dataSource}
				// dataSourceURL={`transactions`}
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
