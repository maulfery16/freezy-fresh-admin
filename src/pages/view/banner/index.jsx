/* eslint-disable react/display-name */
import React, { useRef } from 'react';
import { Link } from 'react-router-dom';
import { Space } from 'antd';
import { EditFilled, EyeFilled } from '@ant-design/icons';

import AtomImage from '../../../components/atoms/image';
import MoleculeDatatableAdditionalAction from '../../../components/molecules/datatable/additional-actions';
import MoleculeDatatableFilter from '../../../components/molecules/datatable/filter-plugin';
import MoleculeDeleteConfirm from '../../../components/molecules/delete-confirm';
import OrganismDatatable from '../../../components/organisms/datatable';
import OrganismLayout from '../../../components/organisms/layout';

import BannerService from '../../../services/banner';
import AtomStatusSwitch from '../../../components/atoms/datatable/status-switch';
const bannerService = new BannerService();

const BannerPage = () => {
	const column = [
		{
			title: 'No',
			dataIndex: 'id',
			render: (id, _, index) => index + 1,
		},
		{
			title: 'Title Banner (ID)',
			dataIndex: `title['id']`,
			render: (_, record) => record.title.id,
			sorter: true,
		},
		{
			title: 'Title Banner (EN)',
			dataIndex: `title['en']`,
			render: (_, record) => record.title.en,
			sorter: true,
		},
		{
			align: 'center',
			title: 'Foto Banner Mobile',
			dataIndex: 'image',
			render: (image) => <AtomImage src={image} size={75} />,
			csvRender: (item) => item.image_mobile,
		},
		{
			align: 'center',
			title: 'Foto Banner Desktop',
			dataIndex: 'image',
			render: (image) => <AtomImage src={image} size={75} />,
			csvRender: (item) => item.image_dekstop,
		},
		{
			title: 'Nama Promo',
			dataIndex: 'promotion[`title`][`id`]',
			render: (_, record) =>
				record.promotion
					? `${record.promotion.title.id} / ${record.promotion.title.en}`
					: '-',
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
					tableRef={bannerTableRef}
					url="banners"
				/>
			),
			csvRender: (item) => (item.is_active ? 'Aktif' : 'Tidak Aktif'),
		},
		{
			title: 'Aksi',
			dataIndex: 'id',
			render: (id, record) => (
				<Space size="middle">
					<Link to={`/view/banner/${id}/detail`}>
						<EyeFilled className="f4 blue" />
					</Link>

					<Link to={`/view/banner/${id}/edit`}>
						<EditFilled className="f4 orange" />
					</Link>

					{!record.is_active && (
						<MoleculeDeleteConfirm
							id={id}
							label="Banner"
							tableRef={bannerTableRef}
							url="banners"
						/>
					)}
				</Space>
			),
		},
	];
	const bannerTableRef = useRef();

	const renderAdditionalAction = () => {
		return (
			<MoleculeDatatableAdditionalAction
				column={column}
				label="Banner"
				getLimit={() => bannerTableRef.current.totalData}
				service={bannerService}
				route="/view/banner"
				url="banners"
			/>
		);
	};

	const renderDatatableFilters = () => {
		return [
			<MoleculeDatatableFilter
				name="promotions"
				operator=":"
				identifier="promotions-filter"
				label="Nama Promo"
				key="promotions-filter"
				placeholder="Semua promo"
				data={{
					url: 'promotions',
					generateCustomOption: (item) => ({
						value: item.id,
						label: (
							<Space>
								<div
									className="br2"
									style={{
										background: item.hexa_code,
										height: 20,
										width: 20,
									}}
								/>
								{item.title.en} /{item.title.id}
							</Space>
						),
					}),
				}}
			/>,
		];
	};

	return (
		<OrganismLayout
			breadcumbs={[
				{ name: 'Tampilan', link: location.pathname },
				{ name: 'Banner', link: '/view/banner' },
			]}
			title="Banner Page"
		>
			<OrganismDatatable
				additionalAction={renderAdditionalAction()}
				columns={column}
				dataSourceURL={`banners`}
				filters={renderDatatableFilters()}
				ref={bannerTableRef}
				searchInput={true}
				title={`Banner`}
			/>
		</OrganismLayout>
	);
};

export default BannerPage;
