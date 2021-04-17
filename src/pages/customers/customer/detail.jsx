/* eslint-disable react/display-name */
import React, { useEffect, useRef, useState } from 'react';
import ReactMoment from 'react-moment';
import { Col, message, Row, Skeleton, Space, Typography } from 'antd';
import { EditFilled, EyeFilled, CheckOutlined } from '@ant-design/icons';
import { Link, useParams } from 'react-router-dom';

import AtomCard from '../../../components/atoms/card';
import AtomImage from '../../../components/atoms/image';
import AtomPrimaryButton from '../../../components/atoms/button/primary-button';
import AtomSecondaryButton from '../../../components/atoms/button/secondary-button';
import MoleculeDatatableAdditionalAction from '../../../components/molecules/datatable/additional-actions';
import MoleculeImageGroup from '../../../components/molecules/molecule-image-group';
import MoleculeInfoGroup from '../../../components/molecules/info-group';
import OrganismDatatable from '../../../components/organisms/datatable';
import OrganismLayout from '../../../components/organisms/layout';

import { translateGenderEnum } from '../../../utils/helpers';
import CustomerService from '../../../services/customer';
const customerService = new CustomerService();
const bankDataSource = {
	data: [
		{
			id: 1,
			name: 'BCA',
			account_number: 1241254356,
			is_default: true,
		},
		{
			id: 2,
			name: 'BRI',
			account_number: 2241254356,
			is_default: false,
		},
		{
			id: 3,
			name: 'BNI',
			account_number: 3241254356,
			is_default: false,
		},
	],
	meta: {
		include: [],
		custom: [],
		pagination: {
			total: 3,
			count: 3,
			per_page: 10,
			current_page: 1,
			total_pages: 1,
			links: {},
		},
	},
};

const CustomerDetailPage = () => {
	const { id } = useParams();
	const [customer, setCustomer] = useState(null);

	const getCustomerDetail = async (id) => {
		try {
			const customer = await customerService.getCustomerById(id);
			setCustomer(customer.data);
		} catch (error) {
			message.error(error.message);
			console.error(error);
		}
	};

	const addressColumn = [
		{
			align: 'center',
			title: 'Set as Prirmary',
			dataIndex: `is_default`,
			render: (is_default, record) => {
				const PrimaryButton = is_default
					? AtomPrimaryButton
					: AtomSecondaryButton;

				return (
					<PrimaryButton
						disabled={is_default}
						onClick={() => setAddressAsPrimary(record.id)}
						shape="circle"
					>
						<CheckOutlined />
					</PrimaryButton>
				);
			},
		},
		{
			title: 'Nama ALamat',
			dataIndex: 'title',
		},
		{
			title: 'Nama Jalan',
			dataIndex: 'address',
			render: (_, record) => record.address,
		},
		{
			title: 'Kelurahan',
			dataIndex: 'subdistrict_name',
			render: (_, record) => record.subdistrict_name,
			sorter: true,
		},
		{
			title: 'Kecamatan',
			dataIndex: 'district_name',
			render: (_, record) => record.district_name,
			sorter: true,
		},
		{
			title: 'Kota/Kabupaten',
			dataIndex: 'city_name',
			render: (_, record) => record.city_name,
			sorter: true,
		},
		{
			title: 'Provinsi',
			dataIndex: 'province_name',
			render: (_, record) => record.province_name,
			sorter: true,
		},
		{
			title: 'Kode Pos',
			dataIndex: 'postal_code',
			render: (_, record) => record.postal_code,
			sorter: true,
		},
		{
			title: 'Detail Alamat',
			dataIndex: 'additional_information',
			render: (_, record) => record.additional_information,
			sorter: true,
		},
		{
			title: 'Catatan Untuk Driver',
			dataIndex: 'additional_information_driver',
			render: (_, record) => record.additional_information_driver,
		},
		// {
		// 	title: 'Biaya Parkir (Rp)',
		// 	dataIndex: 'parking_fee',
		// 	render: (_, record) => (
		// 		<AtomNumberFormat prefix="" value={record.parking_fee} />
		// 	),
		// 	sorter: true,
		// },
		{
			title: 'Nama Penerima',
			dataIndex: 'receiver_name',
			render: (_, record) => record.receiver_name,
			sorter: true,
		},
		{
			title: 'No Telp. Penerima',
			dataIndex: 'receiver_phone_number',
			render: (_, record) => record.receiver_phone_number,
		},
		{
			align: 'center',
			title: 'Foto Lokasi',
			dataIndex: 'image_location',
			render: (image) => <AtomImage src={image} />,
		},
		{
			align: 'center',
			title: 'Aksi',
			dataIndex: 'id',
			render: (address_id) => (
				<Space size="middle">
					<Link
						to={`/customer/${id}/detail/${address_id}/address-detail`}
					>
						<EyeFilled className="f4 blue" />
					</Link>

					<Link
						to={`/customer/${id}/detail/${address_id}/address-edit`}
					>
						<EditFilled className="f4 orange" />
					</Link>
				</Space>
			),
		},
	];

	const bankColumn = [
		{
			align: 'center',
			title: 'Set as Prirmary',
			dataIndex: `is_default`,
			render: (is_default, record) => {
				const PrimaryButton = is_default
					? AtomPrimaryButton
					: AtomSecondaryButton;

				return (
					<PrimaryButton
						disabled={is_default}
						onClick={() => setLinkCardAsPrimary(record.id)}
						shape="circle"
					>
						<CheckOutlined />
					</PrimaryButton>
				);
			},
		},
		{
			title: 'Nama Bank',
			dataIndex: `name`,
		},
		{
			title: 'Nomor Kartu',
			dataIndex: `account_number`,
		},
	];

	const setAddressAsPrimary = async (address_id) => {
		try {
			await customerService.setAddressAsPrimary(id, address_id);
			addressTableRef.current.refetchData();
			message.success('Berhasil mengatur alamat menjadi alamat utama');
		} catch (error) {
			console.error(error.message);
			message.error(error.message);
		}
	};

	const setLinkCardAsPrimary = async (id) => {
		try {
			await customerService.setLinkCardAsPrimary(id);
			message.success(
				'Berhasil mengatur link card menjadi link card utama'
			);
		} catch (error) {
			console.error(error.message);
			message.error(error.message);
		}
	};

	const addressTableRef = useRef();
	const bankTableRef = useRef();

	const renderAddressAdditionalAction = () => {
		return (
			<MoleculeDatatableAdditionalAction
				column={addressColumn}
				getLimit={() => addressTableRef.current.totalData}
				label="Alamat"
				route={`/customer/${id}/detail/address-add`}
				url="admin/customers"
				withoutExportButton={true}
			/>
		);
	};

	useEffect(() => {
		(async () => {
			getCustomerDetail(id);
		})();
	}, []);

	return (
		<OrganismLayout
			breadcumbs={[
				{ name: 'Pelanggan', link: '/customer' },
				{
					name: 'Detail Pelanggan',
					link: `/customer/${id}/detail`,
				},
			]}
			title="Detail Pelanggan"
		>
			<Typography.Title level={4}>
				<span className="fw7">{`Detail Pelanggan`.toUpperCase()}</span>
			</Typography.Title>

			{!customer ? (
				<Skeleton active />
			) : (
				<Row align="top" className="mt4" gutter={24}>
					<Col span={18}>
						<AtomCard title="Info Pelanggan">
							<Row gutter={[12, 24]}>
								<Col span={24}>
									<MoleculeInfoGroup
										title=""
										content={
											<MoleculeImageGroup
												images={[
													{
														source:
															customer.social_avatar,
														label: 'Foto Profil',
													},
													{
														source:
															customer.id_card_image,
														label: 'Foto KTP',
													},
												]}
											/>
										}
									/>
								</Col>

								<Col span={12}>
									<MoleculeInfoGroup
										title="Kode Pelanggan"
										content={customer.code || '-'}
									/>
								</Col>

								<Col span={12}>
									<MoleculeInfoGroup
										title="Nama Depan"
										content={customer.first_name || '-'}
									/>
								</Col>

								<Col span={12}>
									<MoleculeInfoGroup
										title="Nama Belakang"
										content={customer.last_name || '-'}
									/>
								</Col>

								<Col span={12}>
									<MoleculeInfoGroup
										title="Tanggal Lahir"
										content={
											customer.birth ? (
												<ReactMoment format="DD-MM-YY">
													{customer.birth}
												</ReactMoment>
											) : (
												'-'
											)
										}
									/>
								</Col>

								<Col span={12}>
									<MoleculeInfoGroup
										title="Jenis Kelamin"
										content={translateGenderEnum(
											customer.gender
										)}
									/>
								</Col>

								<Col span={12}>
									<MoleculeInfoGroup
										title="Status Pernikahan"
										content={customer.marital_status || '-'}
									/>
								</Col>

								<Col span={12}>
									<MoleculeInfoGroup
										title="Frekuensi Belanja (Per Bulan)"
										content={
											customer.frequency_groceries_one_month ||
											0
										}
									/>
								</Col>

								<Col span={12}>
									<MoleculeInfoGroup
										title="Email"
										content={customer.email || '-'}
									/>
								</Col>

								<Col span={12}>
									<MoleculeInfoGroup
										title="Nomor Handphone"
										content={
											customer.receiver_phone_number ||
											'-'
										}
									/>
								</Col>
							</Row>
						</AtomCard>
					</Col>

					<Col className="mt4" span={18}>
						<AtomCard title="Info Update">
							<Row gutter={[12, 24]}>
								<Col span={12}>
									<MoleculeInfoGroup
										title="Tanggal Daftar"
										content={
											<ReactMoment format="DD-MM-YY">
												{customer.created_at}
											</ReactMoment>
										}
									/>
								</Col>

								<Col span={12}>
									<MoleculeInfoGroup
										title="Tanggal Diperbaharui"
										content={
											<ReactMoment format="DD-MM-YY">
												{customer.updated_at}
											</ReactMoment>
										}
									/>
								</Col>

								<Col span={12}>
									<MoleculeInfoGroup
										title="Didaftarkan oleh"
										content={customer.created_by || '-'}
									/>
								</Col>

								<Col span={12}>
									<MoleculeInfoGroup
										title="Diperbarui oleh"
										content={customer.updated_by || '-'}
									/>
								</Col>
							</Row>
						</AtomCard>
					</Col>

					<Col className="mt4" span={24}>
						<AtomCard title="">
							<OrganismDatatable
								additionalAction={renderAddressAdditionalAction()}
								columns={addressColumn}
								dataSourceURL={`customers/${id}/addresses`}
								ref={addressTableRef}
								scroll={1920}
								searchInput={false}
								title={`Daftar Alamat`}
							/>
						</AtomCard>
					</Col>

					<Col className="mt4" span={24}>
						<AtomCard title="">
							<OrganismDatatable
								columns={bankColumn}
								dataSource={bankDataSource}
								dataSourceURL={''}
								ref={bankTableRef}
								scroll={600}
								searchInput={false}
								title={`Daftar Link Card`}
							/>
						</AtomCard>
					</Col>
					<Col className="mt4" span={24}>
						<Space>
							<Link to={`/customer`}>
								<AtomSecondaryButton size="large">
									Kembali
								</AtomSecondaryButton>
							</Link>
						</Space>
					</Col>
				</Row>
			)}
		</OrganismLayout>
	);
};

export default CustomerDetailPage;
