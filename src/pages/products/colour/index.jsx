/* eslint-disable react/display-name */
import moment from 'moment';
import React, { useRef } from 'react';
import ReactMoment from 'react-moment';
import { Link } from 'react-router-dom';
import { Col, Row, Space } from 'antd';
import { EditFilled } from '@ant-design/icons';

import AtomStatusSwitch from '../../../components/atoms/datatable/status-switch';
import MoleculeDatatableAdditionalAction from '../../../components/molecules/datatable/additional-actions';
import MoleculeDeleteConfirm from '../../../components/molecules/delete-confirm';
import OrganismDatatable from '../../../components/organisms/datatable';
import OrganismLayout from '../../../components/organisms/layout';

const ColourPage = () => {
	const column = [
		{
			title: 'No',
			dataIndex: 'id',
			render: (id, _, index) => index + 1,
		},
		{
			title: 'Nama Warna (ID)',
			dataIndex: 'name',
			render: (_, record) => record.name.id,
			csvRender: (item) => item.name.id,
		},
		{
			title: 'Nama Warna (EN)',
			dataIndex: 'name',
			render: (_, record) => record.name.en,
			csvRender: (item) => item.name.en,
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
							background: `#${colour}`,
							height: '20px',
							width: '20px',
						}}
					/>
					<Col span={16}>{`#${colour}`}</Col>
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
			dataIndex: 'created_by',
		},
		{
			title: 'Diupdate Oleh',
			dataIndex: 'updated_by',
		},
		{
			title: 'Aktif',
			dataIndex: 'is_active',
			render: (active, record) => (
				<AtomStatusSwitch
					active={active}
					id={record.id}
					tableRef={colourTableRef}
					url="colors"
				/>
			),
			csvRender: (item) => (item.is_active ? 'Aktif' : 'Tidak Aktif'),
		},
		{
			title: 'Aksi',
			dataIndex: 'id',
			render: (id, record) => (
				<Space size="middle">
					<Link to={`/products/colour/${id}/edit`}>
						<EditFilled className="f4 orange" />
					</Link>

					{!record.is_active && (
						<MoleculeDeleteConfirm
							id={id}
							label="Warna"
							tableRef={colourTableRef}
							url="colors"
						/>
					)}
				</Space>
			),
			skipExport: true,
		},
	];

	const colourTableRef = useRef();

	const renderAdditionalAction = () => {
		return (
			<MoleculeDatatableAdditionalAction
				column={column}
				label="Warna"
				getLimit={() => colourTableRef.current.totalData}
				route="/products/colour"
				url="colors"
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
				dataSourceURL={`colors`}
				ref={colourTableRef}
				scroll={1360}
				searchInput={true}
				title={`Warna`}
			/>
		</OrganismLayout>
	);
};

export default ColourPage;
