/* eslint-disable react/display-name */
import React from 'react';
import ReactMoment from 'react-moment';
import { Link } from 'react-router-dom';
import { Button, Col, Popconfirm, Row, Space } from 'antd';
import {
	DeleteFilled,
	EditFilled,
	QuestionCircleFilled,
} from '@ant-design/icons';

import OrganismDatatable from '../../../components/organisms/datatable';
import OrganismLayout from '../../../components/organisms/layout';

// import ColourService from '../../../services/colour';
// const colourService = new ColourService();

const mock = {
	meta: {
		total_data: 2,
	},
	data: [
		{
			code: 'RED',
			created_at: new Date(),
			created_by: 'Lisa',
			hexa_code: '#F46A6A',
			id: 'cnwli8r49ufajkdsc',
			name: {
				id: 'Merah',
				en: 'Red',
			},
			updated_at: new Date(),
			updated_by: 'Jung Kook',
		},
		{
			code: 'BLU',
			created_at: new Date(),
			created_by: 'Lisa',
			hexa_code: '#F46A6A',
			id: 'cmi84thfdsckj',
			name: {
				id: 'Biru',
				en: 'Blue',
			},
			updated_at: new Date(),
			updated_by: 'Ji Min',
		},
	],
};

const ColourPage = () => {
	const column = [
		{
			title: 'No',
			dataIndex: 'id',
			render: (id, _, index) => index + 1,
		},
		{
			title: 'Nama Warna (ID)',
			dataIndex: `name['id']`,
			render: (_, record) => record.name.id,
		},
		{
			title: 'Nama Warna (EN)',
			dataIndex: `name['en']`,
			render: (_, record) => record.name.en,
		},
		{
			title: 'Kode Hexa',
			dataIndex: 'hexa_code',
			render: (colour) => (
				<Row
					gutter={[16, 0]}
					style={{
						width: '120px',
					}}
				>
					<Col
						className="br2"
						style={{
							background: colour,
							height: '20px',
							width: '20px',
						}}
					/>
					<Col span={16}>{colour}</Col>
				</Row>
			),
		},
		{
			title: 'Tanggal Dibuat',
			dataIndex: 'created_at',
			render: (date) => (
				<ReactMoment format="DD/MM/YY">{date}</ReactMoment>
			),
		},
		{
			title: 'Tanggal Diupdate',
			dataIndex: 'updated_at',
			render: (date) => (
				<ReactMoment format="DD/MM/YY">{date}</ReactMoment>
			),
		},
		{
			title: 'Dibuat Oleh',
			dataIndex: 'created_by',
		},
		{
			title: 'Diupdate Oleh',
			dataIndex: 'updated_by',
		},
		{
			title: 'Aksi',
			dataIndex: 'id',
			render: (id) => (
				<Space size="middle">
					<Link to={`/products/colour/${id}/edit`}>
						<EditFilled className="f4 orange" />
					</Link>

					<Popconfirm
						title="Are you sure"
						icon={<QuestionCircleFilled className="red" />}
					>
						<DeleteFilled
							className="f4 red"
							onClick={() => console.log(id)}
						/>
					</Popconfirm>
				</Space>
			),
		},
	];

	const renderAdditionalAction = () => {
		return (
			<Space>
				<Link to="/products/colour/add">
					<Button className="br2 bg-denim white">Tambah Warna</Button>
				</Link>
			</Space>
		);
	};

	return (
		<OrganismLayout
			breadcumbs={[
				{ name: 'Produk', link: location.pathname },
				{
					name: 'Warna',
					link: location.pathname,
				},
			]}
			title="Product Page Colour"
		>
			<OrganismDatatable
				additionalAction={renderAdditionalAction()}
				columns={column}
				dataSourceURL={`/colors`}
				mock={mock}
				searchInput={true}
				title={`Warna`}
			/>
		</OrganismLayout>
	);
};

export default ColourPage;
