/* eslint-disable react/display-name */
import React, { useRef } from 'react';
import { Link } from 'react-router-dom';
import { Image, Space } from 'antd';
import { EditFilled, EyeFilled } from '@ant-design/icons';

import OrganismDatatable from '../../../components/organisms/datatable';
import OrganismLayout from '../../../components/organisms/layout';

import BannerService from '../../../services/banner';
import MoleculeDatatableAdditionalAction from '../../../components/molecules/datatable/additional-actions';
import MoleculeDatatableFilter from '../../../components/molecules/datatable/filter-plugin';
import MoleculeDeleteConfirm from '../../../components/molecules/delete-confirm';
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
		},
		{
			title: 'Title Banner (EN)',
			dataIndex: `title['en']`,
			render: (_, record) => record.title.en,
		},
		{
			title: 'Foto Banner Mobile',
			dataIndex: 'image',
			render: (image) => (
				<Image preview src={image} height={60} width={70} />
			),
		},
		{
			title: 'Foto Banner Desktop',
			dataIndex: 'image',
			render: (image) => (
				<Image preview src={image} height={60} width={70} />
			),
		},
		{
			title: 'Nama Promo',
			dataIndex: 'promo',
		},
		{
			title: 'Aksi',
			dataIndex: 'id',
			render: (id) => (
				<Space size="middle">
					<Link to={`/view/banner/${id}/detail`}>
						<EyeFilled className="f4 blue" />
					</Link>

					<Link to={`/view/brand/${id}/edit`}>
						<EditFilled className="f4 orange" />
					</Link>

					<MoleculeDeleteConfirm
						deleteService={() => bannerService.deleteBanner(id)}
						label="banner"
						tableRef={bannerTableRef}
					/>
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
				url="banner"
			/>
		);
	};

	const renderDatatableFilters = () => {
		return [
			<MoleculeDatatableFilter
				name="title"
				operator="eq"
				identifier="title-filter"
				label="Title Banner (ID)"
				key="title-filter"
				placeholder="Semua"
				data={{
					url: '/banner',
					mock: [
						{
							label: 'Banner1',
							value: '1',
						},
						{
							label: 'Banner2',
							value: '2',
						},
					],
				}}
			/>,
			<MoleculeDatatableFilter
				name="promo"
				operator="eq"
				identifier="promo-filter"
				label="Nama Promo (ID)"
				key="promo-filter"
				placeholder="Semua"
				data={{
					url: '/banner',
					mock: [
						{
							label: 'Promo1',
							value: '1',
						},
						{
							label: 'Promo2',
							value: '2',
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
