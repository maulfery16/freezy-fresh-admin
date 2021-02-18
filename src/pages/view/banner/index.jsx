/* eslint-disable react/display-name */
import React, { useRef } from 'react';
import { Link } from 'react-router-dom';
import { Image, Space } from 'antd';
import { EditFilled, EyeFilled } from '@ant-design/icons';

import OrganismDatatable from '../../../components/organisms/datatable';
import OrganismLayout from '../../../components/organisms/layout';

import BannerService from '../../../services/banner';
import MoleculeDatatableAdditionalAction from '../../../components/molecules/datatable/additional-actions';
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
			title: 'Title Banner',
			dataIndex: 'title',
		},
		{
			title: 'Foto Banner',
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
				url="banner"
			/>
		);
	};

	const renderDatatableFilters = () => {
		return [<></>];
	};

	return (
		<OrganismLayout
			breadcumbs={[{ name: 'Banner', link: '/view/banner' }]}
			title="Banner Page"
		>
			<OrganismDatatable
				additionalAction={renderAdditionalAction()}
				columns={column}
				dataSourceURL={`/v1/banners`}
				filters={renderDatatableFilters()}
				ref={bannerTableRef}
				searchInput={true}
				title={`Banner`}
			/>
		</OrganismLayout>
	);
};

export default BannerPage;
