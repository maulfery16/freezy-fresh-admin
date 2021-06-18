/* eslint-disable react/display-name */
import React, { useRef } from 'react';

import { Col, Row, Typography, message, Space } from 'antd';
import { Link } from 'react-router-dom';
import { EditFilled, EyeFilled } from '@ant-design/icons';

import AtomStatusSwitch from '../../../components/atoms/datatable/status-switch';
import AtomImage from '../../../components/atoms/image';
import AtomCard from '../../../components/atoms/card';
import MoleculeDatatableAdditionalAction from '../../../components/molecules/datatable/additional-actions';
import MoleculeDeleteConfirm from '../../../components/molecules/delete-confirm';
import OrganismDatatable from '../../../components/organisms/datatable';
import OrganismLayout from '../../../components/organisms/layout';

import AdditionalSectionService from '../../../services/additional-sections';
const additionalSectionService = new AdditionalSectionService();

const AdditionalHomeSectionsPage = () => {
	const column = [
    {
			title: 'No',
			dataIndex: 'id',
			render: (id, _, index) => index + 1,
		},
		{
      align: 'center',
			title: 'Foto Banner Desktop',
			dataIndex: 'banner_desktop_home',
			sorter: true,
			render: (image) => <AtomImage src={image} size={75} />,
			csvRender: (item) => item.banner_desktop_home,
		},
		{
      align: 'center',
			title: 'Foto Banner Mobile',
			dataIndex: 'banner_mobile_home',
			sorter: true,
			render: (image) => <AtomImage src={image} size={75} />,
			csvRender: (item) => item.banner_mobile_home,
		},
		{
			title: 'Nama Section (ID)',
			dataIndex: 'title',
			sorter: true,
      render: (_, record) => typeof record.title === 'string' ? record.title : record.title.id,
		},
		{
			title: 'Nama Section (EN)',
			dataIndex: 'title',
			sorter: true,
      render: (_, record) => typeof record.title === 'string' ? record.title : record.title.en,
		},
		{
			title: 'Deskripsi Singkat (ID)',
			dataIndex: 'short_description',
			sorter: true,
			render: (_, record) => record.short_description.id,
			csvRender: (item) => item.short_description.id,
		},
		{
			title: 'Deskripsi Singkat (EN)',
			dataIndex: 'short_description',
			sorter: true,
			render: (_, record) => record.short_description.en,
			csvRender: (item) => item.short_description.en,
		},
		// {
		// 	title: 'Cabang',
		// 	sorter: true,
		// 	dataIndex: 'max_stock_per_user',
		// },
		{
      align: 'center',
			title: 'Aktif',
			dataIndex: 'is_active',
			render: (active, record) => (
				<AtomStatusSwitch
					active={active}
					id={record.id}
					tableRef={viewTableRef}
					url="additional-home-sections"
					label="Section"
					statusChangeAction={async () => {
						try {
							const formData = new FormData();
							formData.append("is_active", active ? 0 : 1);
							await additionalSectionService.updateStatusSectionByID(record.id, formData);	
						} catch (error) {
							message.error(error.message)
						}
					}}
				/>
			),
			csvRender: (item) => (item.is_active ? 'Aktif' : 'Tidak Aktif'),
		},
    {
			title: 'Aksi',
			dataIndex: 'id',
			render: (id, record) => (
				<Space size="middle">
					<Link to={`/view/additional-sections/${id}/detail`}>
						<EyeFilled className="f4 blue" />
					</Link>

					<Link to={`/view/additional-sections/${id}/edit`}>
						<EditFilled className="f4 orange" />
					</Link>

					{!record.is_active && (
						<MoleculeDeleteConfirm
							id={id}
							label="Section"
							tableRef={viewTableRef}
							url="additional-home-sections"
						/>
					)}
				</Space>
			),
			skipExport: true
		},
	];
	const viewTableRef = useRef();

	return (
		<OrganismLayout
			breadcumbs={[
				{ name: 'Tampilan', link: '/view' },
				{ name: 'Tampilan', link: location.pathname },
			]}
			title="Tampilan"
		>
			<Row>
				<Col span={24}>
					<Row align="middle" justify="space-between">
						<Typography.Title level={4}>
							<span className="fw7">
								{`Tampilan`.toUpperCase()}
							</span>
						</Typography.Title>

						<MoleculeDatatableAdditionalAction
							column={column}
							getLimit={() => viewTableRef.current.totalData}
							isEdit={false}
							label="Section"
							route="/view/additional-sections"
							url="additional-home-sections"
						/>
					</Row>
				</Col>
			</Row>

			
			<Row align="top" className="mt4" gutter={24}>
				<Col className="mt4" span={24}>
					<AtomCard title="Daftar Produk">
						<OrganismDatatable
							columns={column}
							searchInput
							dataSourceURL={`additional-home-sections`}
							ref={viewTableRef}
						/>
					</AtomCard>
				</Col>
			</Row>
		</OrganismLayout>
	);
};

export default AdditionalHomeSectionsPage;
