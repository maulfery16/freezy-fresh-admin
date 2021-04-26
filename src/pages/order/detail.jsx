/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react';
import { Collapse, message, Skeleton, Space, Typography } from 'antd';
import { useParams } from 'react-router';

import AtomCard from '../../components/atoms/card';
import AtomDetailCollapseHeader from '../../components/atoms/order-detail-collapse-header';
import MoleculeOrderDeliveryInfo from '../../components/molecules/order/detail/delivery-info';
import MoleculeOrderDetailBillingMethodInfo from '../../components/molecules/order/detail/billing-method-info';
import MoleculeOrderDetailBranchInfo from '../../components/molecules/order/detail/branch-info';
import MoleculeOrderDetailCustomerInfo from '../../components/molecules/order/detail/customer-info';
import MoleculeOrderDetailInfo from '../../components/molecules/order/detail/info';
import MoleculeOrderDetailPaymentInfo from '../../components/molecules/order/detail/payment-info';
import MoleculeOrderDetailShippingInfo from '../../components/molecules/order/detail/shipping-info';
import MoleculeOrderDetailVoucherInfo from '../../components/molecules/order/detail/voucher-info';
import MoleculeOrderUpdateInfo from '../../components/molecules/order/detail/update-info';
import OrganismLayout from '../../components/organisms/layout';
import OrganismProductOrderDatatable from '../../components/organisms/datatable/product-order-datatable';
import OrderService from '../../services/order';

const OrderDetailPage = () => {
	const orderService = new OrderService();
	const { id } = useParams();
	const [order, setOrder] = useState(null);
	const [isLoading, setIsLoading] = useState(true);

	const getOrderDetail = async () => {
		setIsLoading(true);

		try {
			// const response = await orderService.getOrderById(id);

			// console.log(response);
			setOrder({
				branch_info: {
					code: 'TGR',
					name: {
						en: 'Tangerang',
						id: 'Tangerang',
					},
					address: {
						province_name: 'BANTEN',
						city_name: 'KOTA TANGERANG',
						district_name: 'Jatiuwung',
						subdistrict_name: null,
						postal_code: '15334',
						address: 'Ruko Darwin Timur No.73',
						additional_information: 'Kel.Medang Kec.Pagedangan',
						latitude: '-6.254746',
						longitude: '106.611046',
					},
				},
				products: [
					{
						added_name: 'Superadmin Administartor',
						age_limit: '0',
						discount_percentage: 0,
						fixed_price: 10000,
						is_freezy_pick: true,
						note: null,
						price: 10000,
						product_owner: 'OT',
						promotion_name: null,
						sku_id: 'SKU0071',
						total: 1,
						upc_code: '1234567890',
						base_category: {
							id: 2,
							code: 'BAC0000000002',
							name: {
								en: 'Clothes',
								id: 'Pakaian',
							},
							color_id: 1,
							is_active: true,
							created_by: 1,
							updated_by: 1,
							inactive_by: null,
							created_at: '2021-02-26T18:24:45.000000Z',
							updated_at: '2021-02-26T18:24:45.000000Z',
						},
						brand: {
							id: 1,
							code: 'BRD0000000001',
							name: {
								en: 'Unilever',
								id: 'Unilever',
							},
							social_media_followers: 10,
							is_active: true,
							created_by: 1,
							updated_by: 1,
							inactive_by: null,
							created_at: '2021-02-26T18:24:21.000000Z',
							updated_at: '2021-02-26T18:24:21.000000Z',
							image: 'uploads/images/zHC8hkEXubZIeayl0eyf.jpg',
						},
						name: {
							en: 'Fifth Product',
							id: 'Produk Kelima',
						},
						zone: {
							id: 1,
							code: 'KRG',
							name: {
								en: 'Dry',
								id: 'Edit Kering',
							},
							is_active: true,
							created_by: 1,
							updated_by: 1,
							inactive_by: null,
							created_at: '2021-02-26T18:26:07.000000Z',
							updated_at: '2021-03-24T14:23:13.000000Z',
						},
					},
					{
						sku_id: 'SKU0071',
						upc_code: '1234567890',
						name: '{"en":"Fifth Product","id":"Produk Kelima"}',
						total: 1,
						base_category: {
							id: 2,
							code: 'BAC0000000002',
							name: {
								en: 'Clothes',
								id: 'Pakaian',
							},
							color_id: 1,
							is_active: true,
							created_by: 1,
							updated_by: 1,
							inactive_by: null,
							created_at: '2021-02-26T18:24:45.000000Z',
							updated_at: '2021-02-26T18:24:45.000000Z',
						},
						age_limit: '0',
						is_freezy_pick: true,
						zone: {
							id: 1,
							code: 'KRG',
							name: {
								en: 'Dry',
								id: 'Edit Kering',
							},
							is_active: true,
							created_by: 1,
							updated_by: 1,
							inactive_by: null,
							created_at: '2021-02-26T18:26:07.000000Z',
							updated_at: '2021-03-24T14:23:13.000000Z',
						},
						brand: {
							id: 1,
							code: 'BRD0000000001',
							name: {
								en: 'Unilever',
								id: 'Unilever',
							},
							social_media_followers: 10,
							is_active: true,
							created_by: 1,
							updated_by: 1,
							inactive_by: null,
							created_at: '2021-02-26T18:24:21.000000Z',
							updated_at: '2021-02-26T18:24:21.000000Z',
							image: 'uploads/images/zHC8hkEXubZIeayl0eyf.jpg',
						},
						product_owner: 'OT',
						price: 10000,
						fixed_price: 10000,
						discount_percentage: 0,
						promotion_name: null,
						note: null,
						added_name: 'Superadmin Administartor',
					},
				],
				delivery_info: {
					additional_information_driver: null,
					additional_information: 'Kel.Medang Kec.Pagedangan',
					address: 'Ruko Darwin Timur No.73',
					city_name: 'KOTA TANGERANG',
					district_name: 'Jatiuwung',
					latitude: '-6.254746',
					longitude: '106.611046',
					parking_fee: null,
					postal_code: '15334',
					province_name: 'BANTEN',
					receiver_name: null,
					receiver_phone_number: null,
					subdistrict_name: null,
					title: 'Tangerang',
				},
				customer_info: {
					code: null,
					email: 'cstm@mailinator.com',
					id: '6dpbgq5ka0axoe8r',
					name: 'customer lastname',
					phone_number: null,
				},
				shipping_info: {
					product_delivered_image: null,
					product_take_from_store_image: null,
					shipping_by: 'Superkul',
					shipping_code: null,
					shipping_estimation_fee: 20000,
					shipping_estimation_weight_gr: null,
					shipping_type: 'Instant',
					tracking_history: null,
				},
				admin_status: 'WAITING_CONFIRMATION',
				bank: null,
				cancel_date: null,
				cashback_point: 0,
				created_at: '2021-04-03T08:43:32.000000Z',
				created_by: 'Superadmin Administartor',
				customer_status: 'WAITING_CONFIRMATION',
				finish_date: null,
				id: 'n6m4eb5jemyp9vao',
				order_frequency: null,
				parking_fee: 0,
				payment_date: null,
				payment_method: 'FREEZY_CASH',
				refund_date: null,
				return_date: null,
				shipping_arrangement_fee: 0,
				shipping_delivered_date: null,
				shipping_fee: 0,
				shipping_process_date: null,
				sub_total: 0,
				total_discount: 0,
				total_order: 100000,
				total_voucher: 0,
				transaction_code: null,
				updated_at: '2021-04-03T08:43:32.000000Z',
				updated_by: 'Superadmin Administartor',
				voucher_code: null,
				voucher: null,

				status: {
					OT: null,
				},
				code: 'FRZ202104031543321643595894',
				is_using_freezy_point: false,
			});
		} catch (error) {
			message.error(error.message);
		} finally {
			setIsLoading(false);
		}
	};

	useEffect(() => {
		(async () => {
			await getOrderDetail();
		})();
	}, []);

	return (
		<OrganismLayout
			breadcumbs={[
				{ name: 'Pesanan', link: '/order/' },
				{ name: 'Detail', link: location.pathname },
			]}
			title="Detail Pesanan"
		>
			{isLoading ? (
				<Skeleton active />
			) : (
				<>
					{' '}
					<Typography.Title level={4}>
						<span className="fw7">
							{`Detail Pesanan`.toUpperCase()}
						</span>
					</Typography.Title>
					<Space
						className="mt3 w-100"
						direction="vertical"
						size="large"
					>
						<AtomCard title="">
							{' '}
							<Collapse defaultActiveKey={['1']} ghost>
								<Collapse.Panel
									key="1"
									header={
										<AtomDetailCollapseHeader title="Info Cabang Freezy" />
									}
								>
									<MoleculeOrderDetailBranchInfo
										branch={order.branch_info}
									/>
								</Collapse.Panel>

								<Collapse.Panel
									key="2"
									header={
										<AtomDetailCollapseHeader title="Info Pesanan" />
									}
								>
									<MoleculeOrderDetailInfo order={order} />
								</Collapse.Panel>
							</Collapse>
						</AtomCard>

						<OrganismProductOrderDatatable
							defaultData={order.products}
							isReadOnly
						/>

						<AtomCard title="">
							{' '}
							<Collapse defaultActiveKey={['1']} ghost>
								<Collapse.Panel
									key="1"
									header={
										<AtomDetailCollapseHeader title="Info Penagihan" />
									}
								>
									<MoleculeOrderDetailCustomerInfo
										customer={order.customer_info}
									/>
								</Collapse.Panel>

								<Collapse.Panel
									key="2"
									header={
										<AtomDetailCollapseHeader title="Info Pengiriman" />
									}
								>
									<MoleculeOrderDeliveryInfo
										delivery={order.delivery_info}
									/>
								</Collapse.Panel>

								<Collapse.Panel
									key="3"
									header={
										<AtomDetailCollapseHeader title="Info Metode Pengiriman" />
									}
								>
									<MoleculeOrderDetailShippingInfo
										shipping={order.shipping_info}
									/>
								</Collapse.Panel>

								<Collapse.Panel
									key="4"
									header={
										<AtomDetailCollapseHeader title="Voucher" />
									}
								>
									<MoleculeOrderDetailVoucherInfo
										code={order.voucher_code}
										voucher={order.voucher}
									/>
								</Collapse.Panel>

								<Collapse.Panel
									key="5"
									header={
										<AtomDetailCollapseHeader title="Metode Pembayaran" />
									}
								>
									<MoleculeOrderDetailBillingMethodInfo
										order={order}
									/>
								</Collapse.Panel>

								<Collapse.Panel
									key="6"
									header={
										<AtomDetailCollapseHeader title="Rincian Biaya" />
									}
								>
									<MoleculeOrderDetailPaymentInfo
										order={order}
									/>
								</Collapse.Panel>
								<Collapse.Panel
									key="7"
									header={
										<AtomDetailCollapseHeader title="Info Update" />
									}
								>
									<MoleculeOrderUpdateInfo
										createdAt={order.created_at}
										createdBy={order.created_by}
										updatedAt={order.updated_at}
										updatedBy={order.updated_by}
									/>
								</Collapse.Panel>
							</Collapse>
						</AtomCard>
					</Space>
				</>
			)}
		</OrganismLayout>
	);
};

export default OrderDetailPage;

<div>ldflwjkflkwjef</div>;
