/* eslint-disable react/display-name */
import React, { useRef } from 'react';
import { Link } from 'react-router-dom';
import { Space } from 'antd';
import { EditFilled, EyeFilled } from '@ant-design/icons';

import AtomStatusSwitch from '../../components/atoms/datatable/status-switch';
import MoleculeDatatableAdditionalAction from '../../components/molecules/datatable/additional-actions';
import MoleculeDatatableDateRange from '../../components/molecules/datatable/date-range-plugin';
import MoleculeDatatableFilter from '../../components/molecules/datatable/filter-plugin';
import MoleculeDeleteConfirm from '../../components/molecules/delete-confirm';
import OrganismDatatable from '../../components/organisms/datatable';
import OrganismLayout from '../../components/organisms/layout';

const BranchPage = () => {
	const column = [
		{
			align: 'center',
			title: 'No',
			dataIndex: 'id',
			render: (id, _, index) => index + 1,
		},
		{
			title: 'Kode Cabang',
			dataIndex: 'code',
			sorter: true,
		},
		{
			title: 'Nama Cabang (ID)',
			dataIndex: 'name[id]',
			render: (_, record) => record.name.id,
			sorter: true,
		},
		{
			title: 'Nama Cabang (EN)',
			dataIndex: 'name[en]',
			render: (_, record) => record.name.en,
			sorter: true,
		},
		{
			title: 'Provinsi',
			dataIndex: 'address[province_name]',
			render: (_, record) => record.address.province_name,
			sorter: true,
		},
		{
			title: 'Kota/Kabupaten',
			dataIndex: 'address[city_name]',
			render: (_, record) => record.address.city_name,
			sorter: true,
		},
		{
			title: 'Kode Kecamatan',
			dataIndex: 'address[region_code]',
			render: (_, record) => record.address.district_code,
			sorter: true,
		},
		{
			title: 'Kecamatan',
			dataIndex: 'address[district_name]',
			render: (_, record) => record.address.district_name,
			sorter: true,
		},
		{
			title: 'Kelurahan',
			dataIndex: 'address[subdistrict_name]',
			render: (_, record) => record.address.subdistrict_name,
			sorter: true,
		},
		{
			title: 'Alamat',
			dataIndex: 'address[address]',
			render: (_, record) => record.address.address,
			sorter: true,
		},
		{
			title: 'Kode Pos',
			dataIndex: 'address[postal_code]',
			render: (_, record) => record.address.postal_code,
			sorter: true,
		},
		{
			align: 'center',
			title: 'Aktif',
			dataIndex: 'is_active',
			render: (active, record) => (
				<AtomStatusSwitch
					active={active}
					id={record.id}
					tableRef={branchTableRef}
					url="branches"
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
					<Link to={`/branch/${id}/detail`}>
						<EyeFilled className="f4 blue" />
					</Link>

					<Link to={`/branch/${id}/edit`}>
						<EditFilled className="f4 orange" />
					</Link>

					{!record.is_active && (
						<MoleculeDeleteConfirm
							id={id}
							label="Branch"
							tableRef={branchTableRef}
							url="branches"
						/>
					)}
				</Space>
			),
			skipExport: true,
		},
	];
	const branchTableRef = useRef();

	const renderAdditionalAction = () => {
		return (
			<MoleculeDatatableAdditionalAction
				column={column}
				label="Branch"
				getLimit={() => branchTableRef.current.totalData}
				route="/branch"
				url="branches"
			/>
		);
	};

	const renderDatatableFilters = () => {
		return [
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
			<MoleculeDatatableDateRange
				identifier="daterange-filter"
				key="daterange"
				label="Tanggal Pendaftaran"
				name="created_at"
				operator=":"
				placeholder="Filter tanggal pendaftaran"
			/>,
		];
	};

	return (
		<OrganismLayout
			breadcumbs={[{ name: 'Cabang Freezy', link: '/branch' }]}
			title="Branch Page"
		>
			<OrganismDatatable
				additionalAction={renderAdditionalAction()}
				columns={column}
				dataSourceURL={`branches`}
				filters={renderDatatableFilters()}
				ref={branchTableRef}
				scroll={1920}
				searchInput={true}
				title={`Cabang Freezy`}
			/>
		</OrganismLayout>
	);
};

export default BranchPage;
