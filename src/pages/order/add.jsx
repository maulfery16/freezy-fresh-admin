/* eslint-disable no-mixed-spaces-and-tabs */
/* eslint-disable no-unused-vars */
import React, { useEffect, useRef, useState } from 'react';
import {
	Checkbox,
	Col,
	Form,
	message,
	Radio,
	Row,
	Space,
	Typography,
} from 'antd';
import { useHistory } from 'react-router';

import AtomBranchSelect from '../../components/atoms/selection/branch';
import AtomCard from '../../components/atoms/card';
import AtomNumberFormat from '../../components/atoms/number-format';
import MoleculeModifyActionButtons from '../../components/molecules/modify-action-buttons';
import MoleculeOrderCostBreakdownInfo from '../../components/molecules/order/creation/cost-breakdown-info';
import MoleculeOrderCreationAddressInfo from '../../components/molecules/order/creation/address-info';
import MoleculeOrderCreationCustomerInfo from '../../components/molecules/order/creation/customer-info';
import MoleculeOrderInfoGroup from '../../components/molecules/info-group-order';
import MoleculeSelectInputGroup from '../../components/molecules/input-group/select-input';
import MoleculeTextInputGroup from '../../components/molecules/input-group/text-input';
import OrganismLayout from '../../components/organisms/layout';
import OrganismProductOrderDatatable from '../../components/organisms/datatable/product-order-datatable';

import CustomerService from '../../services/customer';
import ShippingService from '../../services/shipping';
import VoucherService from '../../services/voucher';
import OrderService from '../../services/order';

const AddOrderPage = () => {
	const addressInputSelectRef = useRef();
	const customerService = new CustomerService();
	const shippingService = new ShippingService();
	const voucherService = new VoucherService();
	const orderService = new OrderService();
	const history = useHistory();

	const [cashback, setCashback] = useState(0);
	const [customer, setCustomer] = useState(null);
	const [customerAddresses, setCustomerAddresses] = useState([]);
	const [customerAdress, setCustomerAdress] = useState(null);
	const [isSubmitting, setIsSubmitting] = useState(false);
	const [isUsingFreezyPoint, setIsUsingFreezyPoint] = useState(false);
	const [paymentMethod, setPaymentMethod] = useState(null);
	const [products, setProducts] = useState(null);
	const [selectedAddress, setSelectedAddress] = useState(null);
	const [selectedBranch, setSelectedBranch] = useState(null);
	const [selectedCustomer, setSelectedCustomer] = useState(null);
	const [selectedShipping, setSelectedShipping] = useState(null);
	const [selectedShippingType, setSelectedShippingType] = useState(null);
	const [selectedVoucher, setSelectedVoucher] = useState(null);

	const calculateCashback = async () => {
		if (!products || products.length === 0) return 0;

		try {
			const payload = {
				added_by: customer.name,
				is_order_owner: true,
				products: products.map((product) => ({
					product_name: product.name,
					total: product.total * product.price,
				})),
			};

			const { data: cashback } = await orderService.calculateCashback(
				payload
			);

			setCashback(cashback.reduce((acc, cash) => acc + cash.cashback, 0));
		} catch (error) {
			message.error(error.message);
		}
	};

	const calculateSubTotal = () => {
		return (
			calculateTotalOrder() -
			calculateTotalDiscount() -
			calculateVocuherDiscount +
			selectedShippingType?.price +
			selectedShippingType?.shipping_arrangement_fee +
			customerAdress?.parking_fee
		);
	};

	const calculateTotalDiscount = () => {
		products?.reduce((current, product) => {
			return current + product.total * parseInt(product.price, 10);
		}, 0);
	};

	const calculateTotalOrder = () => {
		products?.reduce((current, product) => {
			return (
				current +
				product.total *
					(parseInt(product.price, 10) -
						parseInt(product.fixed_price, 10))
			);
		}, 0);
	};

	const calculateVocuherDiscount = () => {
		if (!selectedVoucher) return 0;

		const {
			cashback_type,
			cashback_rp,
			cashback_percentage,
			max_discount_rp,
			min_order_rp,
		} = selectedVoucher;

		if (cashback_type === 'RUPIAH') {
			return cashback_rp;
		} else {
			const productTotalPrice = products?.reduce((current, product) => {
				return (
					current + product.total * parseInt(product.fixed_price, 10)
				);
			}, 0);

			if (productTotalPrice < min_order_rp) {
				message.warning(
					`Tidak dapat menggunakan voucher, minimal belanja harus ${(
						<AtomNumberFormat prefix="Rp. " value={min_order_rp} />
					)}`
				);
			}

			const discountValue =
				(cashback_percentage / 100) * productTotalPrice;

			return discountValue < max_discount_rp
				? discountValue
				: max_discount_rp;
		}
	};

	const createOrder = async () => {
		setIsSubmitting(true);

		try {
			const newOrder = {
				branch_id: selectedBranch,
				cashback: cashback,
				customer_id: selectedCustomer,
				delivery_address_id: selectedAddress,
				is_using_freezy_point: isUsingFreezyPoint,
				parking_fee: customerAdress.parking_fee,
				payment_method: paymentMethod,
				products,
				shipping_fee: selectedShippingType.price,
				shipping_id: selectedShipping,
				shipping_type_id: selectedShippingType.id,
				sub_total: calculateSubTotal(),
				total_discount: calculateTotalDiscount(),
				total_order: calculateTotalOrder(),
				total_voucher: calculateVocuherDiscount(),
				voucher_code: selectedVoucher.code,
				voucher: selectedVoucher.id,
				shipping_arrangement_fee:
					selectedShippingType.shipping_arrangement_fee,
			};

			await orderService.createOrder(newOrder);

			message.success('Berhasil menambah pesanan');
			message.info('Akan dikembalikan ke halaman pesanan dalam 2 detik');
			setTimeout(() => history.push('/orders'), 2000);
		} catch (error) {
			message.error(error.message);
		} finally {
			setIsSubmitting(false);
		}
	};

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

	const getSelectedCustomerAddressDetail = async (id) => {
		try {
			const response = await customerService.getCustomerAddressById(
				selectedCustomer,
				id
			);

			setCustomerAdress(response.data);
		} catch (error) {
			message.error(error.message);
		}
	};

	const getCustomerDetail = async (id) => {
		try {
			const response = await customerService.getCustomerById(id, {});

			setCustomer(response.data);
		} catch (error) {
			message.error(error.message);
		}
	};

	const getShippingTypeDetail = async (id) => {
		try {
			const response = await shippingService.getShippingById(id);
			setSelectedShippingType(response.data);
		} catch (error) {
			message.error(error.message);
		}
	};

	const getVoucherDetailByCode = async (code) => {
		if (code.length < 10) return;

		try {
			const response = await voucherService.getVoucherByCode(code);
			setSelectedVoucher(response.data);
		} catch (error) {
			message.error(error.message);
		}
	};

	const getVoucherDetailById = async (id) => {
		try {
			const response = await voucherService.getVoucherById(id);
			setSelectedVoucher(response.data);
		} catch (error) {
			message.error(error.message);
		}
	};

	useEffect(() => {
		addressInputSelectRef?.current?.refetchData();
	}, [customerAddresses]);

	useEffect(() => {
		calculateCashback();
	}, [products]);

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
											getCustomerDetail(value);
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

					<OrganismProductOrderDatatable
						branch={selectedBranch}
						customer={selectedCustomer}
						onDataChange={setProducts}
					/>

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
										onChange: (value) => {
											setSelectedAddress(value);
											getSelectedCustomerAddressDetail(
												value
											);
										},
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
										data={{
											url: 'shippings',
											onDataChange: setSelectedShipping,
										}}
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
									<MoleculeOrderInfoGroup
										title="Estimasi Biaya Pengiriman"
										content={
											selectedShippingType?.price && (
												<AtomNumberFormat
													prefix="Rp. "
													value={
														selectedShippingType?.price
													}
												/>
											)
										}
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
											onChange: getVoucherDetailById,
											generateCustomOption: (item) => ({
												value: item.id,
												label: item.name.id,
											}),
										}}
									/>
								</Col>

								<Col span={12}>
									<MoleculeTextInputGroup
										name="voucher_code"
										label="Kode Voucher"
										placeholder="Kode Voucher"
										type="text"
										onChange={(e) =>
											getVoucherDetailByCode(
												e.target.value
											)
										}
									/>
								</Col>

								{selectedVoucher && (
									<Col span={24}>
										<MoleculeOrderInfoGroup
											title="Voucher dipilih"
											content={`${selectedVoucher.code} - ${selectedVoucher.name.id}`}
										/>
									</Col>
								)}
							</Row>
						</Form>
					</AtomCard>

					<AtomCard title="Rincian Biaya">
						<Row className="mt3">
							<Col span={18}>
								<MoleculeOrderCostBreakdownInfo
									cashback={cashback}
									customerId={selectedCustomer}
									parkingFee={customerAdress?.parking_fee}
									shippingCost={selectedShippingType?.price}
									totalDiscount={calculateTotalDiscount()}
									totalOrder={calculateTotalOrder()}
									voucherDiscount={calculateVocuherDiscount()}
									subTotal={calculateSubTotal()}
									shippingArrangementCost={
										selectedShippingType?.shipping_arrangement_fee
									}
								/>
							</Col>
						</Row>
					</AtomCard>

					<AtomCard title="Info Pembayaran">
						<Radio.Group
							style={{ marginTop: '20px', width: '100%' }}
							onChange={(e) => setPaymentMethod(e.target.value)}
						>
							<Space
								direction="vertical"
								style={{ width: '100%' }}
								size="large"
							>
								<Radio
									value="FREEZY_CASH"
									style={{ width: '100%' }}
								>
									<Space
										direction="vertical"
										style={{ width: '100%' }}
									>
										<span className="fw6">Frezzy Cash</span>

										<>
											<Row>
												<Col span={3}>Freezy Cash</Col>
												<Col span={12}>
													{customer?.freezy_cash || 0}
												</Col>
											</Row>
											<Row>
												<Col span={3}>Freezy Point</Col>
												<Col span={12}>
													{customer?.freezy_point ||
														0}
												</Col>
											</Row>
											<Checkbox
												className="fw6"
												onChange={(e) =>
													setIsUsingFreezyPoint(
														e.target.checked
													)
												}
											>
												Pakai Freezy Point
											</Checkbox>
										</>
									</Space>
								</Radio>

								<Radio value="E_WALLET_CASHLEZ">
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
							onClick={createOrder}
						/>
					</Col>
				</Space>
			</Row>
		</OrganismLayout>
	);
};

export default AddOrderPage;
