/* eslint-disable react/display-name */
import React, { useRef } from 'react';
import ReactMoment from 'react-moment';
import { Link } from 'react-router-dom';
import { Space } from 'antd';
import { EditFilled, EyeFilled } from '@ant-design/icons';

import AtomNumberFormat from '../../components/atoms/number-format';
import MoleculeDatatableAdditionalAction from '../../components/molecules/datatable/additional-actions';
import MoleculeDatatableFilter from '../../components/molecules/datatable/filter-plugin';
import MoleculeDeleteConfirm from '../../components/molecules/delete-confirm';
import OrganismDatatable from '../../components/organisms/datatable';
import OrganismLayout from '../../components/organisms/layout';

const VoucherPage = () => {
	const voucherTableRef = useRef();
	const column = [
		{
			align: 'center',
			title: 'No',
			dataIndex: 'id',
			render: (id, _, index) => index + 1,
		},
		{
			title: 'Nama Voucher',
			dataIndex: 'name',
			sorter: true,
		},
		{
			title: 'Target Voucher',
			dataIndex: 'target',
			sorter: true,
		},
		{
			title: 'Kode Voucher',
			dataIndex: 'code',
			sorter: true,
		},
		{
			title: 'Tipe Cashback',
			dataIndex: 'cashback_type',
			render: (cashback_type) =>
				cashback_type === 'PERSENTAGE' ? 'Persentase' : 'Rupiah',
			sorter: true,
		},
		{
			title: 'Nominal Cashback (Rp)',
			dataIndex: 'cashback_rp',
			render: (_, record) =>
				record.cashback_rp ? (
					<AtomNumberFormat value={record.cashback_rp} />
				) : (
					'-'
				),
			sorter: true,
		},
		{
			title: 'Persentase Cashback (%)',
			dataIndex: 'cashback_percentage',
			sorter: true,
		},
		{
			title: 'Kuota',
			dataIndex: 'quota',
			sorter: true,
		},
		{
			title: 'Periode',
			children: [
				{
					title: 'Tgl. Mulai',
					dataIndex: 'start_periode',
					render: (date) => (
						<ReactMoment format="DD/MM/YY">{date}</ReactMoment>
					),
					sorter: true,
				},
				{
					title: 'Jam Mulai',
					dataIndex: 'start_time_periode',
					sorter: true,
				},
				{
					title: 'Tgl. Selesai',
					dataIndex: 'end_periode',
					render: (date) => (
						<ReactMoment format="DD/MM/YY">{date}</ReactMoment>
					),
					sorter: true,
				},
				{
					title: 'Jam Selesai',
					dataIndex: 'end_time_periode',
					sorter: true,
				},
				{
					title: 'Status Voucher',
					dataIndex: 'is_active',
					render: (is_active) =>
						is_active ? 'Aktif' : 'Tidak Aktif',
				},
			],
		},
		{
			align: 'center',
			title: 'Aksi',
			dataIndex: 'id',
			render: (id, record) => (
				<Space size="middle">
					<Link to={`/voucher/${id}/detail`}>
						<EyeFilled className="f4 blue" />
					</Link>

					<Link to={`/voucher/${id}/edit`}>
						<EditFilled className="f4 orange" />
					</Link>

					{!record.is_active && (
						<MoleculeDeleteConfirm
							id={id}
							label="Voucher"
							tableRef={voucherTableRef}
							url="vouchers"
						/>
					)}
				</Space>
			),
			skipExport: true,
		},
	];

	const renderAdditionalAction = () => {
		return (
			<MoleculeDatatableAdditionalAction
				column={column}
				getLimit={() => voucherTableRef.current.totalData}
				label="Voucher"
				route="/voucher"
				url="vouchers"
				withoutExportButton={true}
			/>
		);
	};

	const renderDatatableFilters = () => {
		return [
			<MoleculeDatatableFilter
				identifier="status-filter"
				key="status"
				label="Target Voucher"
				name="target"
				operator=":"
				placeholder="Semua target"
				data={{
					options: [
						{ value: 'PUBLIC', label: 'Publik' },
						{ value: 'LIMITED', label: 'Terbatas' },
					],
				}}
			/>,
			<MoleculeDatatableFilter
				identifier="status-filter"
				key="status"
				label="Tipe Cashback"
				name="cashback_type"
				operator=":"
				placeholder="Semua tipe"
				data={{
					options: [
						{ value: 'RUPIAH', label: 'Rupiah' },
						{ value: 'PERSENTAGE', label: 'Persentase' },
					],
				}}
			/>,
			<MoleculeDatatableFilter
				identifier="status-filter"
				key="status"
				label="Status"
				name="status"
				operator=":"
				placeholder="Semua status"
				data={{
					options: [
						{ value: 'ACTIVE', label: 'Aktif' },
						{ value: 'NOT_ACTIVE', label: 'Tidak Aktif' },
						{ value: 'UPCOMING', label: 'Mendatang' },
					],
				}}
			/>,
		];
	};

	return (
		<OrganismLayout
			breadcumbs={[{ name: 'Voucher', link: '/voucher' }]}
			title="Voucher Page"
		>
			<OrganismDatatable
				additionalAction={renderAdditionalAction()}
				columns={column}
				dataSourceURL={`vouchers`}
				filters={renderDatatableFilters()}
				ref={voucherTableRef}
				scroll={1920}
				searchInput={true}
				title={`Voucher Menu`}
			/>
		</OrganismLayout>
	);
};

export default VoucherPage;
