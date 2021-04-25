/* eslint-disable no-mixed-spaces-and-tabs */
/* eslint-disable no-unused-vars */
import React, { useEffect, useRef, useState } from 'react';
import { Col, Form, message, Radio, Row, Space, Typography } from 'antd';
import { useHistory } from 'react-router';

import AtomBranchSelect from '../../components/atoms/selection/branch';
import AtomCard from '../../components/atoms/card';
import MoleculeModifyActionButtons from '../../components/molecules/modify-action-buttons';
import MoleculeNumberInputGroup from '../../components/molecules/input-group/number-input';
import MoleculeOrderCreationAddressInfo from '../../components/molecules/order/creation/address-info';
import MoleculeOrderCreationCustomerInfo from '../../components/molecules/order/creation/customer-info';
import MoleculeSelectInputGroup from '../../components/molecules/input-group/select-input';
import MoleculeTextInputGroup from '../../components/molecules/input-group/text-input';
import OrganismLayout from '../../components/organisms/layout';
import OrganismProductOrderDatatable from '../../components/organisms/datatable/product-order-datatable';

import CustomerService from '../../services/customer';

const AddOrderPage = () => {
	const addressInputSelectRef = useRef();
	const customerService = new CustomerService();
	const history = useHistory();
	const [customerAddresses, setCustomerAddresses] = useState([]);
	const [isSubmitting, setIsSubmitting] = useState(false);
	const [selectedAddress, setSelectedAddress] = useState(null);
	const [selectedBranch, setSelectedBranch] = useState(null);
	const [selectedCustomer, setSelectedCustomer] = useState(null);
	const [selectedShippingType, setSelectedShippingType] = useState(null);

	const getCustomerAddresses = async (id) => {
		try {
			const response = await customerService.getCustomerAddresses(id, {});
			setCustomerAddresses(
				response.data.map((address) => {
					return {
						value: address.id,
						label: address.title,
					};
				})
			);
		} catch (error) {
			message.error(error.message);
		}
	};

	const getShippingTypeDetail = async (id) => {
		try {
			const response = await customerService.getCustomerAddresses(id, {});
			setCustomerAddresses(
				response.data.map((address) => {
					return {
						value: address.id,
						label: address.title,
					};
				})
			);
		} catch (error) {
			message.error(error.message);
		}
	};

	useEffect(() => {
		addressInputSelectRef?.current?.refetchData();
	}, [customerAddresses]);

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
						<Row className="mt3">
							<Col span={12}>
								<AtomBranchSelect
									onChange={setSelectedBranch}
								/>
							</Col>
						</Row>
					</AtomCard>

					<AtomCard title="Info Pelanggan">
						<Row className="mt3">
							<Col span={12}>
								<MoleculeSelectInputGroup
									label="Pelanggan"
									name="customer_id"
									placeholder="Pelanggan"
									required
									data={{
										url: 'admin/customers',
										generateCustomOption: (item) => ({
											value: item.id,
											label: `${item.first_name} ${item.last_name}`,
										}),
										onChange: (value) => {
											setSelectedCustomer(value);
											getCustomerAddresses(value);
										},
									}}
								/>
							</Col>

							<Col span={18}>
								<MoleculeOrderCreationCustomerInfo
									customerId={selectedCustomer}
								/>
							</Col>
						</Row>
					</AtomCard>

					<OrganismProductOrderDatatable branch={selectedBranch} />

					<AtomCard title="Info Alamat Tujuan">
						<Row>
							<Col span={12}>
								<MoleculeSelectInputGroup
									label="Alamat"
									name="addresses"
									placeholder="Alamat"
									required
									optionsRef={addressInputSelectRef}
									data={{
										options: customerAddresses,
										onChange: setSelectedAddress,
									}}
								/>
							</Col>

							<Col span={18}>
								<MoleculeOrderCreationAddressInfo
									addressId={selectedAddress}
									customerId={selectedCustomer}
								/>
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
											url: 'develivery/types',
											generateCustomOption: (item) => ({
												value: item.value,
												label: item.name.id,
											}),
										}}
									/>
								</Col>

								<Col span={12}>
									<MoleculeSelectInputGroup
										label="Perusahaan Logistik"
										name="logistic"
										placeholder="Perusahaan Logistik"
										required
										data={{ url: 'shippings' }}
									/>
								</Col>

								<Col span={12}>
									<MoleculeSelectInputGroup
										label="Tipe Pengiriman"
										name="shipping_type"
										placeholder="Tipe Pengiriman"
										required
										data={{
											url: 'shipping-company',
											onChange: getShippingTypeDetail,
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
											url: 'vouchers',
											// generateCustomOption: (item) => ({
											// 	value: item.id,
											// 	label: item.name,
											// }),
											// options: [
											// 	{
											// 		value: 1,
											// 		label: 'Marukana... Udon?',
											// 	},
											// 	{
											// 		value: 2,
											// 		label: 'Marukana... Udon?',
											// 	},
											// 	{
											// 		value: 3,
											// 		label: 'Marukana... Udon?',
											// 	},
											// ],
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

					<AtomCard title="Rincian Biaya">
						<Row className="mt3">
							<Col span={18}>
								<MoleculeOrderCreationCustomerInfo
									customerId={selectedCustomer}
								/>
							</Col>
						</Row>
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

export default AddOrderPage;