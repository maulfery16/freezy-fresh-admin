import React, { useEffect, useState } from 'react';
import ReactMoment from 'react-moment';

import { Col, message, Row, Skeleton, Space, Typography } from 'antd';
import { Link, useParams } from 'react-router-dom';

import AtomCard from '../../../../components/atoms/card';
import AtomNumberFormat from '../../../../components/atoms/number-format';
import AtomSecondaryButton from '../../../../components/atoms/button/secondary-button';
import MoleculeInfoGroup from '../../../../components/molecules/info-group';
import MoleculeImageGroup from '../../../../components/molecules/molecule-image-group';
import OrganismLayout from '../../../../components/organisms/layout';

import CustomerService from '../../../../services/customer';
const customerService = new CustomerService();

const CustomerAddressDetailPage = () => {
	const { id, address_id } = useParams();
	const [address, setAddress] = useState(null);

	const getCustomerAddressDetail = async () => {
		try {
			const { data: address } =
				await customerService.getCustomerAddressById(id, address_id);
			setAddress(address);
		} catch (error) {
			message.error(error.message);
			console.error(error);
		}
	};

	useEffect(() => {
		(async () => {
			getCustomerAddressDetail();
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
				{
					name: 'Detail Alamat',
					link: `/customer/address/${id}/detail/address/${address_id}`,
				},
			]}
			title="Detail Alamat Pelanggan"
		>
			<Typography.Title level={4}>
				<span className="fw7">
					{`Detail Alamat Pelanggan`.toUpperCase()}
				</span>
			</Typography.Title>

			{!address ? (
				<Skeleton active />
			) : (
				<Row align="top" className="mt4" gutter={24}>
					<Col span={18}>
						<AtomCard title="Info Alamat">
							<Row gutter={[12, 24]}>
								<Col span={12}>
									<MoleculeInfoGroup
										title="Nama Alamat"
										content={address.title}
									/>
								</Col>

								<Col span={12}>
									<MoleculeInfoGroup
										title="Nama Jalan"
										content={address.address}
									/>
								</Col>

								<Col span={12}>
									<MoleculeInfoGroup
										title="Provinsi"
										content={address.province_name}
									/>
								</Col>

								<Col span={12}>
									<MoleculeInfoGroup
										title="Kota/Kabupaten"
										content={address.city_name}
									/>
								</Col>

								<Col span={12}>
									<MoleculeInfoGroup
										title="Kecamatan"
										content={address.district_name}
									/>
								</Col>

								<Col span={12}>
									<MoleculeInfoGroup
										title="Kelurahan"
										content={address.subdistrict_name}
									/>
								</Col>

								<Col span={12}>
									<MoleculeInfoGroup
										title="Kode Pos"
										content={address.postal_code}
									/>
								</Col>

								<Col span={12}>
									<MoleculeInfoGroup
										title="Detail Alamat"
										content={address.additional_information}
									/>
								</Col>

								<Col span={12}>
									<MoleculeInfoGroup
										title="Catatan Untuk Driver"
										content={
											address.additional_information_driver
										}
									/>
								</Col>

								<Col span={12}>
									<MoleculeInfoGroup
										title="Biaya Parkir"
										content={
											<AtomNumberFormat
												prefix=""
												value={address.parking_fee || 0}
											/>
										}
									/>
								</Col>

								<Col span={12}>
									<MoleculeInfoGroup
										title="Nama Penerima"
										content={address.receiver_name}
									/>
								</Col>

								<Col span={12}>
									<MoleculeInfoGroup
										title="Nomor Handphone Penerima"
										content={address.receiver_phone_number}
									/>
								</Col>

								<Col span={24}>
									<MoleculeInfoGroup
										title=""
										content={
											<MoleculeImageGroup
												images={[
													{
														source: address.image_location,
														label: 'Foto Lokasi',
													},
												]}
											/>
										}
									/>
								</Col>

								<Col span={24} style={{ paddingTop: '2rem' }}>
									<Typography.Text strong>
										<span className="denim f5">
											INFO UPDATE ALAMAT
										</span>
									</Typography.Text>
								</Col>

								<Col span={12}>
									<MoleculeInfoGroup
										title="Tanggal di Daftarkan"
										content={
											<ReactMoment format="DD-MM-YYYY">
												{address.created_at}
											</ReactMoment>
										}
									/>
								</Col>

								<Col span={12}>
									<MoleculeInfoGroup
										title="Tanggal di Update"
										content={
											<ReactMoment format="DD-MM-YYYY">
												{address.updated_at}
											</ReactMoment>
										}
									/>
								</Col>

								<Col span={12}>
									<MoleculeInfoGroup
										title="Didaftarkan Oleh"
										content={address.created_by}
									/>
								</Col>

								<Col span={12}>
									<MoleculeInfoGroup
										title="Diupdate Oleh"
										content={address.updated_by}
									/>
								</Col>
							</Row>
						</AtomCard>
					</Col>

					<Col className="mt4" span={24}>
						<Space>
							<Link to={`/customer/${id}/detail`}>
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

export default CustomerAddressDetailPage;
