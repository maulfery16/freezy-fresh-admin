/* eslint-disable react/display-name */
import React, { useEffect, useRef, useState } from 'react';

import { Col, Row, Typography, message, Input, Space } from 'antd';
import { Link } from 'react-router-dom';
import { EditFilled, EyeFilled } from '@ant-design/icons';

import AtomStatusSwitch from '../../../components/atoms/datatable/status-switch';
import AtomImage from '../../../components/atoms/image';
import AtomCard from '../../../components/atoms/card';
import AtomSpinner from '../../../components/atoms/spinner';
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
      render: (_, record) => record.title,
		},
		{
			title: 'Nama Section (EN)',
			dataIndex: 'title',
			sorter: true,
      render: (_, record) => record.title,
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
		},
	];
	const viewTableRef = useRef();
	const [additionalSections, setAdditionalSections] = useState({});
	const [isLoading, setIsLoading] = useState(false);
	const [keyword, setKeyword] = useState('');

	const getAllSections = async () => {
		setIsLoading(true);
		try {
			const {data, meta} = await additionalSectionService.getAllSections();
      if (data && Array.isArray(data) && data.length > 0) {
				const tmp = {};
				tmp.data = data;
				tmp.meta = { pagination: { total: meta.pagination.total } };
        setAdditionalSections(tmp);
			}
		} catch (error) {
			message.error(error.message);
			console.error(error);
		} finally {
			setIsLoading(false);
		}
	};

	const getDatatableData = () => {
		if (keyword !== '') {
			let tmp = {...additionalSections};
			if (keyword !== '')
				tmp.data = tmp.data.filter((column) =>
					column.title.toLowerCase().includes(keyword.toLowerCase())
				);
			return tmp;
		} else {
			return additionalSections;
		}
	};

	useEffect(() => {
		(async () => {
			getAllSections();
		})();
	}, []);

	useEffect(() => {
		viewTableRef.current.refetchData();
	}, [keyword])

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
							getLimit={0}
							isEdit={false}
							label="Section"
							route="/view/additional-sections"
							url="additional-sections"
						/>
					</Row>
				</Col>
			</Row>

			{isLoading ? (
				<AtomSpinner/>
			) : (
        <Row align="top" className="mt4" gutter={24}>
          <Col className="mt4" span={24}>
            <AtomCard title="Daftar Produk">
              <Row gutter={[0, 12]} className="mt4">
                <Col span={24}>
                  <Col span={8}>
                    <Input.Search
                      placeholder="Cari Nama Produk"
                      onSearch={(value) => setKeyword(value)}
                      size="large"
                    />
                  </Col>
                </Col>
              </Row>
              <OrganismDatatable
                columns={column}
                setFilterLocally
                dataSourceURL={`additional-home-sections`}
                dataSource={getDatatableData()}
                ref={viewTableRef}
              />
            </AtomCard>
          </Col>
        </Row>
			)}
		</OrganismLayout>
	);
};

export default AdditionalHomeSectionsPage;
