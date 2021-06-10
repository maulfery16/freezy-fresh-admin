/* eslint-disable react/display-name */
import React, { useRef } from 'react';
import ReactMoment from 'react-moment';
import { Link } from 'react-router-dom';
import { Space } from 'antd';
import { useSelector } from 'react-redux';
import { EditFilled, EyeFilled } from '@ant-design/icons';

import AtomNumberFormat from '../../components/atoms/number-format';
import MoleculeDatatableFilter from '../../components/molecules/datatable/filter-plugin';
import MoleculeDeleteConfirm from '../../components/molecules/delete-confirm';
import OrganismDatatable from '../../components/organisms/datatable';
import OrganismLayout from '../../components/organisms/layout';
import AtomPrimaryButton from '../../components/atoms/button/primary-button';

import {
	translateVoucherStatusEnum,
	translateVoucherTargetEnum,
} from '../../services/voucher';

const VoucherPage = () => {
	const voucherTableRef = useRef();
	const { roles } = useSelector((state) => state.auth);
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
			render: (name) => name.id,
			sorter: true,
		},
		{
			title: 'Target Voucher',
			dataIndex: 'target',
			render: (target) => translateVoucherTargetEnum(target),
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
				cashback_type === 'PERCENTAGE' ? 'Persentase' : 'Rupiah',
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
					dataIndex: 'status',
					render: (is_active) =>
						translateVoucherStatusEnum(is_active),
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

					{record.status !== 'ACTIVE' && (
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
		return (roles.includes('super-admin') || roles.includes('admin')) ? (
			<Link to={`voucher/add`}>
				<AtomPrimaryButton size="large">
					{`Tambah Voucher`}
				</AtomPrimaryButton>
			</Link>
		) : null
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
						{ value: 'PERCENTAGE', label: 'Persentase' },
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
