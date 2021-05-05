/* eslint-disable react/display-name */
import moment from 'moment';
import React, { useRef } from 'react';
import ReactMoment from 'react-moment';
import { EditFilled } from '@ant-design/icons';
import { Link } from 'react-router-dom';
import { Space } from 'antd';

import AtomStatusSwitch from '../../components/atoms/datatable/status-switch';
import MoleculeDatatableAdditionalAction from '../../components/molecules/datatable/additional-actions';
import MoleculeDeleteConfirm from '../../components/molecules/delete-confirm';
import OrganismDatatable from '../../components/organisms/datatable';
import OrganismLayout from '../../components/organisms/layout';

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
			align: 'center',
			title: 'Aktif',
			dataIndex: 'is_active',
			render: (active, record) => (
				<AtomStatusSwitch
					active={active}
					id={record.id}
					tableRef={bankTableRef}
					url="banks"
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
					<Link to={`/bank/${id}/edit`}>
						<EditFilled className="f4 orange" />
					</Link>

					{!record.is_active && (
						<MoleculeDeleteConfirm
							id={id}
							label="Bank"
							tableRef={bankTableRef}
							url="banks"
						/>
					)}
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
				route="/bank"
				url="banks"
			/>
		);
	};

	return (
		<OrganismLayout
			breadcumbs={[
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
				dataSourceURL={`banks`}
				ref={bankTableRef}
				scroll={1920}
				searchInput={true}
				title={`Bank`}
			/>
		</OrganismLayout>
	);
};

export default BankPage;
