/* eslint-disable react/display-name */
import moment from 'moment';
import React, { useRef } from 'react';
import ReactMoment from 'react-moment';
import { Space } from 'antd';

import OrganismDatatable from '../../../components/organisms/datatable';
import OrganismLayout from '../../../components/organisms/layout';

import BankService from '../../../services/bank';
import MoleculeDatatableAdditionalAction from '../../../components/molecules/datatable/additional-actions';
import MoleculeDeleteConfirm from '../../../components/molecules/delete-confirm';
const bankService = new BankService();

const BankPage = () => {
	const column = [
		{
			title: 'No',
			dataIndex: 'id',
			render: (id, _, index) => index + 1,
		},
		{
			title: 'Nama Bank',
			dataIndex: `name`,
		},
		{
			title: 'Kode Bank',
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
			title: 'Aksi',
			dataIndex: 'id',
			render: (id) => (
				<Space size="middle">
					<MoleculeDeleteConfirm
						deleteService={() => bankService.deleteBank(id)}
						label="banner"
						tableRef={bankTableRef}
					/>
				</Space>
			),
			skipExport: true,
		},
	];
	const bankTableRef = useRef();

	const renderAdditionalAction = () => {
		return (
			<MoleculeDatatableAdditionalAction
				column={column}
				label="Bank"
				getLimit={() => bankTableRef.current.totalData}
				service={bankService}
				url="/products/bank"
			/>
		);
	};

	return (
		<OrganismLayout
			breadcumbs={[
				{ name: 'Produk', link: location.pathname },
				{
					name: 'Bank',
					link: location.pathname,
				},
			]}
			title="Product Page Bank"
		>
			<OrganismDatatable
				additionalAction={renderAdditionalAction()}
				columns={column}
				dataSourceURL={`/v1/banks`}
				ref={bankTableRef}
				scroll={1920}
				searchInput={true}
				title={`Bank`}
			/>
		</OrganismLayout>
	);
};

export default BankPage;
