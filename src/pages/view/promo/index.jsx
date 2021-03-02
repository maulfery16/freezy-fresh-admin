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
			align: 'center',
			title: 'Foto Promo Dekstop',
			dataIndex: 'image_dekstop',
			render: (image) => <AtomImage src={image} />,
			csvRender: (item) => item.image_dekstop,
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
			dataIndex: `promo_type`,
		},
		{
			title: 'Cabang',
			dataIndex: 'branches',
			sorter: true,
			render: (branches) =>
				branches.map((branch) => branch.name).join(', '),
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
					url="promotions"
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
					<Link to={`/promotions/${id}/detail`}>
						<EyeFilled className="f4 blue" />
					</Link>

					<Link to={`/promotions/${id}/edit`}>
						<EditFilled className="f4 orange" />
					</Link>

					{!record.is_active && (
						<MoleculeDeleteConfirm
							id={id}
							label="Promotions"
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
				label="Promotions"
				getLimit={() => promotionsTableRef.current.totalData}
				route="/promotions"
				url="promotions"
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
					mock: [
						{
							value: 'active',
							label: 'Aktif',
						},
						{ value: 'inactive', label: 'Tidak Aktif' },
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
				name="roles"
				operator=":"
				identifier="roles-filter"
				label="Peran"
				key="roles-filter"
				placeholder="Semua roles"
				data={{
					url: 'promotion_types',
					mock: [
						{
							value: 'Tipe 1',
							label: 'Tipe 1',
						},
					],
				}}
			/>,
		];
	};

	return (
		<OrganismLayout
			breadcumbs={[{ name: 'Promotions', link: '/promotions' }]}
			title="Promotions Page"
		>
			<OrganismDatatable
				additionalAction={renderAdditionalAction()}
				columns={column}
				dataSourceURL={`promotions`}
				filters={renderDatatableFilters()}
				ref={promotionsTableRef}
				scroll={1920}
				searchInput={true}
				title={`Promotions Menu`}
			/>
		</OrganismLayout>
	);
};

export default PromotionsPage;
