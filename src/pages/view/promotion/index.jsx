/* eslint-disable react/display-name */
import React, { useRef } from 'react';
import { Link } from 'react-router-dom';
import { Space } from 'antd';
import { EditFilled, EyeFilled } from '@ant-design/icons';

import AtomImage from '../../../components/atoms/image';
import AtomStatusSwitch from '../../../components/atoms/datatable/status-switch';
import MoleculeDatatableAdditionalAction from '../../../components/molecules/datatable/additional-actions';
import MoleculeDatatableDateRange from '../../../components/molecules/datatable/date-range-plugin';
import MoleculeDatatableFilter from '../../../components/molecules/datatable/filter-plugin';
import MoleculeDeleteConfirm from '../../../components/molecules/delete-confirm';
import OrganismDatatable from '../../../components/organisms/datatable';
import OrganismLayout from '../../../components/organisms/layout';

const PromotionsPage = () => {
	const column = [
		{
			title: 'No',
			dataIndex: 'id',
			render: (id, _, index) => index + 1,
		},
		{
			align: 'center',
			title: 'Foto Promo Dekstop',
			dataIndex: 'image_desktop',
			render: (image) => <AtomImage src={image} />,
			csvRender: (item) => item.image_desktop,
		},
		{
			align: 'center',
			title: 'Foto Promo Mobile',
			dataIndex: 'image_mobile',
			render: (image) => <AtomImage src={image} />,
			csvRender: (item) => item.image_mobile,
		},
		{
			title: 'Nama Promo (ID)',
			dataIndex: `title['id']`,
			sorter: true,
			render: (_, record) => record.title.id,
		},
		{
			title: 'Nama Promo (EN)',
			dataIndex: `title['en']`,
			sorter: true,
			render: (_, record) => record.title.en,
		},
		{
			title: 'Deskripsi Singkat (ID)',
			dataIndex: `short_description['id']`,
			sorter: true,
			render: (_, record) => record.short_description.id,
		},
		{
			title: 'Deskripsi Singkat (EN)',
			dataIndex: `short_description['en']`,
			sorter: true,
			render: (_, record) => record.short_description.en,
		},
		{
			title: 'Tipe Promo',
			dataIndex: `is_information`,
			sorter: true,
			render: (_, record) => (record.is_information ? 'Info' : 'Promo'),
		},
		{
			align: 'center',
			title: 'Aktif',
			dataIndex: 'is_active',
			render: (active, record) => (
				<AtomStatusSwitch
					active={active}
					id={record.id}
					tableRef={promotionsTableRef}
					url="promotion"
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
					<Link to={`/view/promotion/${id}/detail`}>
						<EyeFilled className="f4 blue" />
					</Link>

					<Link to={`/view/promotion/${id}/edit`}>
						<EditFilled className="f4 orange" />
					</Link>

					{!record.is_active && (
						<MoleculeDeleteConfirm
							id={id}
							label="Promo"
							tableRef={promotionsTableRef}
							url="promotions"
						/>
					)}
				</Space>
			),
			skipExport: true,
		},
	];
	const promotionsTableRef = useRef();

	const renderAdditionalAction = () => {
		return (
			<MoleculeDatatableAdditionalAction
				column={column}
				label="Promo"
				getLimit={() => promotionsTableRef.current.totalData}
				route="/view/promotion"
				url="promotions"
			/>
		);
	};

	const renderDatatableFilters = () => {
		return [
			<MoleculeDatatableFilter
				name="is_active"
				operator=":"
				identifier="status-filter"
				label="Status"
				key="status-filter"
				placeholder="Semua status"
				data={{
					mock: [
						{
							value: 'true',
							label: 'Aktif',
						},
						{ value: 'false', label: 'Tidak Aktif' },
					],
				}}
			/>,
			<MoleculeDatatableDateRange
				name="created_at"
				operator=":"
				identifier="daterangefilter"
				key="daterange"
				label="Tanggal Pendaftaran"
				placeholder="Filter tanggal register"
			/>,
			<MoleculeDatatableFilter
				name="is_information"
				operator=":"
				identifier="type-filter"
				label="Tipe"
				key="type-filter"
				placeholder="Semua tipe"
				data={{
					mock: [
						{
							value: 'true',
							label: 'Info',
						},
						{
							value: 'false',
							label: 'Promo',
						},
					],
				}}
			/>,
		];
	};

	return (
		<OrganismLayout
			breadcumbs={[
				{ name: 'Tampilan', link: location.pathname },
				{ name: 'Promo', link: '/view/promotion' },
			]}
			title="Promo Page"
		>
			<OrganismDatatable
				additionalAction={renderAdditionalAction()}
				columns={column}
				dataSourceURL={`promotions`}
				filters={renderDatatableFilters()}
				ref={promotionsTableRef}
				scroll={1920}
				searchInput={true}
				title={`Promo`}
			/>
		</OrganismLayout>
	);
};

export default PromotionsPage;
