/* eslint-disable react/display-name */
import React, { useRef } from 'react';
import ReactMoment from 'react-moment';
import { Link } from 'react-router-dom';
import { Button, Image, message, Popconfirm, Space } from 'antd';
import {
	DeleteFilled,
	EditFilled,
	QuestionCircleFilled,
} from '@ant-design/icons';

import AtomNumberFormat from '../../../components/atoms/number-format';
import OrganismDatatable from '../../../components/organisms/datatable';
import OrganismLayout from '../../../components/organisms/layout';

import BrandService from '../../../services/brand';
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
		},
		{
			title: 'Jumlah Sosmed Follower',
			dataIndex: 'followers',
			render: (followers) => <AtomNumberFormat value={followers} />,
		},
		{
			title: 'Tanggal Dibuat',
			dataIndex: 'created_at',
			render: (date) => (
				<ReactMoment format="DD/MM/YYYY">{date}</ReactMoment>
			),
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

					<Popconfirm
						title="Are you sure"
						icon={<QuestionCircleFilled className="red" />}
						onConfirm={() => deleteBrand(id)}
					>
						<DeleteFilled className="f4 red" />
					</Popconfirm>
				</Space>
			),
		},
	];
	const brandTableRef = useRef();

	const deleteBrand = async (id) => {
		try {
			await brandService.deleteBrand(id);

			message.success('Berhasil menghapus brand');
			brandTableRef.current.refetchData();
		} catch (error) {
			message.error(error.message);
		}
	};

	const renderAdditionalAction = () => {
		return (
			<Space>
				<Button className="br2 denim b--denim">Export Excel</Button>
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
