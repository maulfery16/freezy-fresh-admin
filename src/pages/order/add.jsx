/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import ReactMoment from 'react-moment';
import { Col, Divider, Form, Radio, Row, Space, Typography } from 'antd';
import { useHistory } from 'react-router';

import AtomBranchSelect from '../../components/atoms/selection/branch';
import AtomCard from '../../components/atoms/card';
import AtomImage from '../../components/atoms/image';
import MoleculeNumberInputGroup from '../../components/molecules/input-group/number-input';
import MoleculeOrderInfoGroup from '../../components/molecules/info-group-order';
import MoleculeSelectInputGroup from '../../components/molecules/input-group/select-input';
import MoleculeTextInputGroup from '../../components/molecules/input-group/text-input';
import OrganismLayout from '../../components/organisms/layout';
import MoleculeModifyActionButtons from '../../components/molecules/modify-action-buttons';
import OrganismProductOrderDatatable from '../../components/organisms/datatable/product-order-datatable';

const ModifyOrderPage = () => {
	const [address, setAddress] = useState(null);
	const [isSubmitting, setIsSubmitting] = useState(false);
	const [customer, setCustomer] = useState(null);
	const history = useHistory();

	return (
		<OrganismLayout
			breadcumbs={[
				{ name: 'Order', link: '/order' },
				{
					name: location.pathname.includes('add') ? 'Tambah' : 'Ubah',
					link: location.pathname,
				},
			]}
			title={`Tambah Pesanan`}
		>
			<Typography.Title level={4}>
				<span className="fw7">{`Tambah Pesanan`.toUpperCase()}</span>
			</Typography.Title>

			<Row className="mt4">
				<Space className="w-100" direction="vertical" size="large">
					<AtomCard title="Info Cabang">
						<Row>
							<Col span={12}>{/* <AtomBranchSelect /> */}</Col>
						</Row>
					</AtomCard>

					<AtomCard title="Info Pelanggan">
						<Row>
							<Col span={12}>
								<MoleculeSelectInputGroup
									label="Pelanggan"
									name="customer_id"
									placeholder="Pelanggan"
									required
									data={{
										// url: 'customers',
										// generateCustomOption: (item) => ({
										// 	value: item.id,
										// 	label: `${item.first_name} ${item.last_name}`,
										// }),
										options: [
											{
												value: 1,
												label: 'John Doe',
											},
											{
												value: 2,
												label: 'Eric Cantona',
											},
											{
												value: 3,
												label: 'Marukana... Udon?',
											},
										],
									}}
								/>
							</Col>

							<Col span={18}>
								<Typography.Text>
									<span className="gray fw5 mb2">
										Info Pelanggan
									</span>
								</Typography.Text>

								<Divider className="mv2" />

								<Row gutter={[12, 12]}>
									<Col span={12}>
										<MoleculeOrderInfoGroup
											title="ID Pelanggan"
											content={customer?.id}
										/>
									</Col>

									<Col span={12}>
										<MoleculeOrderInfoGroup
											title="Name Pelanggan"
											content={
												customer
													? `${customer.first_name} ${customer.last_name}`
													: '-'
											}
										/>
									</Col>

									<Col span={12}>
										<MoleculeOrderInfoGroup
											title="Nomor Handpone"
											content={customer?.phone_number}
										/>
									</Col>

									<Col span={12}>
										<MoleculeOrderInfoGroup
											title="Email"
											content={customer?.email}
										/>
									</Col>

									<Col span={12}>
										<MoleculeOrderInfoGroup
											title="Tanggal Lahir"
											content={
												customer ? (
													<ReactMoment format="DD-MM-YY">
														{customer.birth_date}
													</ReactMoment>
												) : (
													'-'
												)
											}
										/>
									</Col>
								</Row>
							</Col>
						</Row>
					</AtomCard>

					<OrganismProductOrderDatatable />

					<AtomCard title="Info Alamat Tujuan">
						<Row>
							<Col span={12}>
								<MoleculeSelectInputGroup
									label="Alamat"
									name="addresses"
									placeholder="Alamat"
									required
									data={{
										// url: 'addresses',
										// generateCustomOption: (item) => ({
										// 	value: item.id,
										// 	label: item.name,
										// }),
										options: [
											{
												value: 1,
												label: 'Marukana... Udon?',
											},
											{
												value: 2,
												label: 'Marukana... Udon?',
											},
											{
												value: 3,
												label: 'Marukana... Udon?',
											},
										],
									}}
								/>
							</Col>

							<Col span={18}>
								<Typography.Text>
									<span className="gray fw5 mb2">
										Info Alamat
									</span>
								</Typography.Text>

								<Divider className="mv2" />

								<Row gutter={[12, 12]}>
									<Col span={12}>
										<MoleculeOrderInfoGroup
											title="Nama Alamat"
											content={address?.name}
										/>
									</Col>

									<Col span={12}>
										<MoleculeOrderInfoGroup
											title="Name Penerima"
											content={address?.receiver_name}
										/>
									</Col>

									<Col span={12}>
										<MoleculeOrderInfoGroup
											title="Nama Jalan"
											content={address?.address_name}
										/>
									</Col>

									<Col span={12}>
										<MoleculeOrderInfoGroup
											title="No Handpone Penerima"
											content={
												address?.receiver_phone_number ||
												'-'
											}
										/>
									</Col>

									<Col span={12}>
										<MoleculeOrderInfoGroup
											title="Provinsi"
											content={address?.province?.name}
										/>
									</Col>

									<Col span={12}>
										<MoleculeOrderInfoGroup
											title="Kota"
											content={address?.city?.name}
										/>
									</Col>

									<Col span={12}>
										<MoleculeOrderInfoGroup
											title="Kecamatan"
											content={address?.district?.name}
										/>
									</Col>

									<Col span={12}>
										<MoleculeOrderInfoGroup
											title="Kelurahan"
											content={address?.village?.name}
										/>
									</Col>

									<Col span={12}>
										<MoleculeOrderInfoGroup
											title="Detail Alamat"
											content={address?.address_detail}
										/>
									</Col>

									<Col span={12}>
										<MoleculeOrderInfoGroup
											title="Kode POS"
											content={address?.portal_code}
										/>
									</Col>

									<Col span={12}>
										<MoleculeOrderInfoGroup
											title="Latitude"
											content={address?.latitude}
										/>
									</Col>

									<Col span={12}>
										<MoleculeOrderInfoGroup
											title="Longitude"
											content={address?.longitude}
										/>
									</Col>

									<Col span={12}>
										<MoleculeOrderInfoGroup
											title="Catatan untuk driver"
											content={address?.note}
										/>
									</Col>

									<Col span={12}>
										<MoleculeOrderInfoGroup
											title="Biaya Parkir"
											content={address?.park_fee}
										/>
									</Col>

									<Col span={12}>
										<MoleculeOrderInfoGroup
											title="Kota"
											content={
												address ? (
													<AtomImage
														src={
															address.location_image
														}
														size={170}
													/>
												) : (
													'-'
												)
											}
										/>
									</Col>
								</Row>
							</Col>
						</Row>
					</AtomCard>

					<AtomCard title="Info Metode Pengiriman">
						<Form className="w-100">
							<Row gutter={[12, 12]}>
								<Col span={12}>
									<MoleculeSelectInputGroup
										label="Jenis Pengiriman"
										name="delivery_type"
										placeholder="Jenis Pengiriman"
										required
										data={{
											// url: 'delivery-types',
											// generateCustomOption: (item) => ({
											// 	value: item.id,
											// 	label: item.name,
											// }),
											options: [
												{
													value: 1,
													label: 'Marukana... Udon?',
												},
												{
													value: 2,
													label: 'Marukana... Udon?',
												},
												{
													value: 3,
													label: 'Marukana... Udon?',
												},
											],
										}}
									/>
								</Col>

								<Col span={12}>
									<MoleculeSelectInputGroup
										label="Perusahaan Logistik"
										name="logistic"
										placeholder="Perusahaan Logistik"
										required
										data={{
											// url: 'logistic-companies',
											// generateCustomOption: (item) => ({
											// 	value: item.id,
											// 	label: item.name,
											// }),
											options: [
												{
													value: 1,
													label: 'Marukana... Udon?',
												},
												{
													value: 2,
													label: 'Marukana... Udon?',
												},
												{
													value: 3,
													label: 'Marukana... Udon?',
												},
											],
										}}
									/>
								</Col>

								<Col span={12}>
									<MoleculeSelectInputGroup
										label="Tipe Pengiriman"
										name="delivery_type"
										placeholder="Tipe Pengiriman"
										required
										data={{
											// url: 'delivery_types',
											// generateCustomOption: (item) => ({
											// 	value: item.id,
											// 	label: item.name,
											// }),
											options: [
												{
													value: 1,
													label: 'Marukana... Udon?',
												},
												{
													value: 2,
													label: 'Marukana... Udon?',
												},
												{
													value: 3,
													label: 'Marukana... Udon?',
												},
											],
										}}
									/>
								</Col>

								<Col span={12}>
									<MoleculeNumberInputGroup
										disabled
										id="estimation_fee"
										label="Estimasi Biaya Pengiriman (Rp)"
										name="estimation_fee"
										placeholder="Estimasi Biaya Pengiriman"
									/>
								</Col>
							</Row>
						</Form>
					</AtomCard>

					<AtomCard title="Info Kode Voucher">
						<Form className="w-100">
							<Row gutter={[12, 12]}>
								<Col span={12}>
									<MoleculeSelectInputGroup
										label="Pilih Voucer"
										name="voucher"
										placeholder="Voucher"
										required
										data={{
											// url: 'vouchers',
											// generateCustomOption: (item) => ({
											// 	value: item.id,
											// 	label: item.name,
											// }),
											options: [
												{
													value: 1,
													label: 'Marukana... Udon?',
												},
												{
													value: 2,
													label: 'Marukana... Udon?',
												},
												{
													value: 3,
													label: 'Marukana... Udon?',
												},
											],
										}}
									/>
								</Col>

								<Col span={12}>
									<MoleculeTextInputGroup
										name="voucher_code"
										label="Kode Voucher"
										placeholder="Kode Voucher"
										type="text"
									/>
								</Col>
							</Row>
						</Form>
					</AtomCard>

					<AtomCard title="Info Pembayaran">
						<Radio.Group>
							<Space direction="vertical">
								<Radio value={1}>
									<span className="fw6">Freezy Cash</span>
								</Radio>

								<Radio value={2}>
									<span className="fw6">
										E-Wallet Cashlez
									</span>
								</Radio>
							</Space>
						</Radio.Group>
					</AtomCard>

					<Col className="mt4" span={24}>
						<MoleculeModifyActionButtons
							backUrl="/order/"
							isCreating={true}
							isSubmitting={isSubmitting}
							label="Pesanan"
						/>
					</Col>
				</Space>
			</Row>
		</OrganismLayout>
	);
};

export default ModifyOrderPage;
