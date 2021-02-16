/* eslint-disable react/display-name */
import React, { useRef } from 'react';
import { Link } from 'react-router-dom';
import { Image, message, Popconfirm, Space } from 'antd';
import {
	DeleteFilled,
	EditFilled,
	EyeFilled,
	QuestionCircleFilled,
} from '@ant-design/icons';

import OrganismDatatable from '../../components/organisms/datatable';
import OrganismLayout from '../../components/organisms/layout';

import BannerService from '../../services/banner';
import MoleculeDatatableAdditionalAction from '../../components/molecules/datatable/additional-actions';
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
					<Link to={`/banner/${id}/detail`}>
						<EyeFilled className="f4 blue" />
					</Link>

					<Link to={`/brand/${id}/edit`}>
						<EditFilled className="f4 orange" />
					</Link>

					<Popconfirm
						title="Are you sure"
						icon={<QuestionCircleFilled className="red" />}
						onConfirm={() => deleteBanner(id)}
					>
						<DeleteFilled className="f4 red" />
					</Popconfirm>
				</Space>
			),
		},
	];
	const bannerTableRef = useRef();

	const deleteBanner = async (id) => {
		try {
			await bannerService.deleteBanner(id);

			message.success('Berhasil menghapus banner');
			bannerTableRef.current.refetchData();
		} catch (error) {
			message.error(error.message);
			console.error(error);
		}
	};

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
			breadcumbs={[{ name: 'Banner', link: '/banner' }]}
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
