/* eslint-disable react/display-name */
import { Image, Space } from 'antd';
import { EditFilled, EyeFilled } from '@ant-design/icons';
import { Link } from 'react-router-dom';

import React, { useRef } from 'react';

import AtomBranchDatatableFilter from '../../components/atoms/selection/branch-datatable';
import AtomStatusSwitch from '../../components/atoms/datatable/status-switch';
import MoleculeDatatableAdditionalAction from '../../components/molecules/datatable/additional-actions';
import MoleculeDatatableDateRange from '../../components/molecules/datatable/date-range-plugin';
import MoleculeDatatableFilter from '../../components/molecules/datatable/filter-plugin';
import MoleculeDeleteConfirm from '../../components/molecules/delete-confirm';
import MoleculeMarkdownRenderer from '../../components/molecules/markdown-renderer';
import OrganismDatatable from '../../components/organisms/datatable';
import OrganismLayout from '../../components/organisms/layout';

const dataSource = {
	data: [
		{
			created_at: new Date(),
			created_by: 'Boramiyu',
			dekstop_image: '',
			id: 1,
			mobile_image: '',
			short_desc: {
				id: 'Ini adalah deskripsi singkat',
				en: 'This is short description',
			},
			section: {
				id: 'Indonesian title',
				en: 'English title',
			},
		},
	],
	meta: {
		pagination: { totalData: 1 },
	},
};

const ViewPage = () => {
	const column = [
		{
			title: 'No',
			dataIndex: 'id',
			render: (id, _, index) => index + 1,
		},
		{
			title: 'Foto Tampilan Mobile',
			dataIndex: 'mobile_image',
			render: (image) => (
				<Image preview src={image} height={60} width={70} />
			),
			csvRender: (item) => item.mobile_image,
		},
		{
			title: 'Foto Tampilan Dekstop',
			dataIndex: 'dekstop_image',
			render: (image) => (
				<Image preview src={image} height={60} width={70} />
			),
			csvRender: (item) => item.dekstop_image,
		},
		{
			title: 'Nama Section (ID)',
			dataIndex: 'section',
			render: (_, record) => record.section.id,
			csvRender: (item) => item.section.id,
		},
		{
			title: 'Nama Section (EN)',
			dataIndex: 'section',
			render: (_, record) => record.section.en,
			csvRender: (item) => item.section.en,
		},
		{
			title: 'Deskripsi Singkat (ID)',
			dataIndex: 'short_desc',
			render: (_, record) => (
				<MoleculeMarkdownRenderer text={record.short_desc.id} />
			),
			csvRender: (item) => item.short_desc.id,
		},
		{
			title: 'Deskripsi Singkat (EN)',
			dataIndex: 'short_desc',
			render: (_, record) => (
				<MoleculeMarkdownRenderer text={record.short_desc.en} />
			),
			csvRender: (item) => item.shord_desc.en,
		},
		{
			title: 'Aktif',
			dataIndex: 'is_active',
			render: (active, record) => (
				<AtomStatusSwitch
					active={active}
					id={record.id}
					tableRef={viewTableRef}
					url="views"
				/>
			),
			csvRender: (item) => (item.is_active ? 'Aktif' : 'Tidak Aktif'),
		},
		{
			title: 'Aksi',
			dataIndex: 'id',
			render: (id, record) => (
				<Space size="middle">
					<Link to={`/view/${id}/detail`}>
						<EyeFilled className="f4 blue" />
					</Link>

					<Link to={`/view/${id}/edit`}>
						<EditFilled className="f4 orange" />
					</Link>

					{!record.is_active && (
						<MoleculeDeleteConfirm
							id={id}
							label="Tampilan"
							tableRef={viewTableRef}
							url="views"
						/>
					)}
				</Space>
			),
			skipExport: true,
		},
	];
	const viewTableRef = useRef();

	const renderAdditionalAction = () => {
		return (
			<MoleculeDatatableAdditionalAction
				column={column}
				label="Tampilan"
				getLimit={() => viewTableRef.current.totalData}
				route="/view/"
				url="views"
			/>
		);
	};

	const renderDatatableFilters = () => {
		return [
			<MoleculeDatatableFilter
				name="status"
				operator=":"
				identifier="status-filter"
				label="Status"
				key="status-filter"
				placeholder="Semua status"
				data={{
					options: [
						{
							label: 'Aktif',
							value: 'active',
						},
						{
							label: 'Tidak aktif',
							value: 'inactive',
						},
					],
				}}
			/>,
			<MoleculeDatatableDateRange
				name="created_at"
				operator=":"
				identifier="daterangefilter"
				key="daterange"
				label="Tanggal"
				placeholder="Filter tanggal"
			/>,
			<AtomBranchDatatableFilter key="branch-filter" />,
		];
	};

	return (
		<OrganismLayout
			breadcumbs={[{ name: 'Tampilan', link: location.pathname }]}
			title="View Page"
		>
			<OrganismDatatable
				additionalAction={renderAdditionalAction()}
				columns={column}
				dataSourceURL={`views`}
				filters={renderDatatableFilters()}
				ref={viewTableRef}
				dataSource={dataSource}
				scroll={1360}
				searchInput={true}
				title={`Tampilan`}
			/>
		</OrganismLayout>
	);
};

export default ViewPage;
