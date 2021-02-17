/* eslint-disable react/display-name */
import moment from 'moment';
import React, { useRef, useState } from 'react';
import ReactMoment from 'react-moment';
import { Link } from 'react-router-dom';
import { Button, Image, message, Space } from 'antd';
import { EditFilled } from '@ant-design/icons';

import AtomNumberFormat from '../../../components/atoms/number-format';
import OrganismDatatable from '../../../components/organisms/datatable';
import OrganismLayout from '../../../components/organisms/layout';

import BrandService from '../../../services/brand';
import MoleculeDeleteConfirm from '../../../components/molecules/delete-confirm';
const brandService = new BrandService();

const BrandPage = () => {
	const column = [
		{
			title: 'No',
			dataIndex: 'id',
			render: (id, _, index) => index + 1,
		},
		{
			title: 'Kode Brand',
			dataIndex: 'code',
		},
		{
			title: 'Nama Brand (ID)',
			dataIndex: `name['id']`,
			render: (_, record) => record.name.id,
		},
		{
			title: 'Nama Brand (EN)',
			dataIndex: `name['en']`,
			render: (_, record) => record.name.en,
		},
		{
			title: 'Foto Brand',
			dataIndex: 'image',
			render: (_, record) => (
				<Image preview src={record.image.original} width={100} />
			),
			csvRender: (item) => item.image.original,
		},
		{
			title: 'Jumlah Sosmed Follower',
			dataIndex: 'social_media_followers',
			render: (followers) => <AtomNumberFormat value={followers || 0} />,
			csvRender: (item) => item.followers,
		},
		{
			title: 'Tanggal Dibuat',
			dataIndex: 'created_at',
			render: (date) => (
				<ReactMoment format="DD/MM/YYYY">{date}</ReactMoment>
			),
			csvRender: (item) => moment(item.created_at).format('DD/MM/YYYY'),
		},
		{
			title: 'Dibuat Oleh',
			dataIndex: 'created_by',
		},
		{
			title: 'Tanggal Diperbaharui',
			dataIndex: 'updated_at',
			render: (date) => (
				<ReactMoment format="DD/MM/YYYY">{date}</ReactMoment>
			),

			csvRender: (item) => moment(item.updated_at).format('DD/MM/YYYY'),
		},
		{
			title: 'Diperbaharui Oleh',
			dataIndex: 'updated_by',
		},
		{
			title: 'Aksi',
			dataIndex: 'id',
			render: (id) => (
				<Space size="middle">
					<Link to={`/products/brand/${id}/edit`}>
						<EditFilled className="f4 orange" />
					</Link>

					<MoleculeDeleteConfirm
						deleteService={() => brandService.deleteBrand(id)}
						label="banner"
						tableRef={brandTableRef}
					/>
				</Space>
			),
			skipExport: true,
		},
	];
	const brandTableRef = useRef();
	const [isExporting, setIsExporting] = useState(false);

	const exportAsCSV = async () => {
		setIsExporting(true);

		try {
			const params = {
				page: 1,
				limit: brandTableRef.current.totalData,
			};

			await brandService.exportAsCSV(params, column);
		} catch (error) {
			message.error(error.message);
			console.error(error);
		} finally {
			setIsExporting(false);
		}
	};

	const renderAdditionalAction = () => {
		return (
			<Space>
				<Button
					className="br2 denim b--denim"
					loading={isExporting}
					onClick={() => exportAsCSV()}
				>
					Export Excel
				</Button>
				<Link to="/products/brand/add">
					<Button className="br2 bg-denim white">Tambah Brand</Button>
				</Link>
			</Space>
		);
	};

	return (
		<OrganismLayout
			breadcumbs={[
				{ name: 'Produk', link: location.pathname },
				{
					name: 'Brand',
					link: location.pathname,
				},
			]}
			title="Product Page Brand"
		>
			<OrganismDatatable
				additionalAction={renderAdditionalAction()}
				columns={column}
				dataSourceURL={`/v1/brands`}
				ref={brandTableRef}
				scroll={1920}
				searchInput={true}
				title={`Brand`}
			/>
		</OrganismLayout>
	);
};

export default BrandPage;
