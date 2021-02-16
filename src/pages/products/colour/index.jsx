/* eslint-disable react/display-name */
import moment from 'moment';
import React, { useRef } from 'react';
import ReactMoment from 'react-moment';
import { Link } from 'react-router-dom';
import { Col, message, Popconfirm, Row, Space } from 'antd';
import {
	DeleteFilled,
	EditFilled,
	QuestionCircleFilled,
} from '@ant-design/icons';

import OrganismDatatable from '../../../components/organisms/datatable';
import OrganismLayout from '../../../components/organisms/layout';

import ColourService from '../../../services/colour';
import MoleculeDatatableAdditionalAction from '../../../components/molecules/datatable/additional-actions';
const colourService = new ColourService();

// eslint-disable-next-line no-unused-vars
const mock = {
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
	meta: {
		include: [],
		custom: [],
		pagination: {
			total: 5,
			count: 5,
			per_page: 10,
			current_page: 1,
			total_pages: 1,
			links: {},
		},
	},
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
						className="br2 ba bw1 b--black-10"
						style={{
							background: colour,
							height: '20px',
							width: '20px',
						}}
					/>
					<Col span={16}>{colour}</Col>
				</Row>
			),
			csvRender: (item) => item.hexa_code,
		},
		{
			title: 'Tanggal Dibuat',
			dataIndex: 'created_at',
			render: (date) => (
				<ReactMoment format="DD/MM/YY">{date}</ReactMoment>
			),
			csvRender: (item) => moment(item.created_at).format('DD/MM/YYYY'),
		},
		{
			title: 'Tanggal Diupdate',
			dataIndex: 'updated_at',
			render: (date) => (
				<ReactMoment format="DD/MM/YY">{date}</ReactMoment>
			),
			csvRender: (item) => moment(item.created_at).format('DD/MM/YYYY'),
		},
		{
			title: 'Dibuat Oleh',
			dataIndex: `created_by['email']`,
			render: (_, record) => record.created_by.email,
		},
		{
			title: 'Diupdate Oleh',
			dataIndex: `updated_by['email']`,
			render: (_, record) =>
				`${record.updated_by ? record.updated_by.email : '-'}`,
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
						title="Are you sure?"
						icon={<QuestionCircleFilled className="red" />}
						onConfirm={() => deleteColour(id)}
					>
						<DeleteFilled className="f4 red" />
					</Popconfirm>
				</Space>
			),
			skipExport: true,
		},
	];

	const colourTableRef = useRef();

	const deleteColour = async (id) => {
		try {
			await colourService.deleteColour(id);

			message.success('Berhasil menghapus warna');
			colourTableRef.current.refetchData();
		} catch (error) {
			message.error(error.message);
			console.error(error);
		}
	};

	const renderAdditionalAction = () => {
		return (
			<MoleculeDatatableAdditionalAction
				column={column}
				label="Warna"
				limit={colourService.current.totalData}
				service={colourService}
				url="products/colour"
			/>
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
				dataSourceURL={`/v1/colors`}
				// mock={mock}
				ref={colourTableRef}
				// scroll={1920}
				searchInput={true}
				title={`Warna`}
			/>
		</OrganismLayout>
	);
};

export default ColourPage;
