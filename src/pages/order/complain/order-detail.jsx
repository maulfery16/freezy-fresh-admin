/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react';
import { Col, Collapse, message, Row, Skeleton, Space, Typography } from 'antd';
import { useParams } from 'react-router';

import AtomCard from '../../../components/atoms/card';
import AtomDetailCollapseHeader from '../../../components/atoms/order-detail-collapse-header';
import MoleculeOrderDeliveryInfo from '../../../components/molecules/order/detail/delivery-info';
import MoleculeOrderDetailBillingMethodInfo from '../../../components/molecules/order/detail/billing-method-info';
import MoleculeOrderDetailBranchInfo from '../../../components/molecules/order/detail/branch-info';
import MoleculeOrderDetailCustomerInfo from '../../../components/molecules/order/detail/customer-info';
import MoleculeOrderDetailInfo from '../../../components/molecules/order/detail/info';
import MoleculeOrderDetailPaymentInfo from '../../../components/molecules/order/detail/payment-info';
import MoleculeOrderDetailShippingInfo from '../../../components/molecules/order/detail/shipping-info';
import MoleculeOrderDetailVoucherInfo from '../../../components/molecules/order/detail/voucher-info';
import MoleculeOrderUpdateInfo from '../../../components/molecules/order/detail/update-info';
import OrganismLayout from '../../../components/organisms/layout';
import OrganismProductOrderDatatable from '../../../components/organisms/datatable/product-order-datatable';
import OrderService from '../../../services/order';
import MoleculeOrderInfoGroup from '../../../components/molecules/info-group-order';
import AtomSecondaryButton from '../../../components/atoms/button/secondary-button';

const OrderComplainOrderDetailPage = () => {
	const orderService = new OrderService();
	const { id } = useParams();
	const [order, setOrder] = useState(null);
	const [isLoading, setIsLoading] = useState(true);

	const getOrderDetail = async () => {
		setIsLoading(true);

		try {
			const response = await orderService.getOrderById(id);
			setOrder(response.data);
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
							<Row>
								<Col span={21}>
									<Collapse
										defaultActiveKey={[
											'0',
											'1',
											'2',
											'3',
											'4',
											'5',
										]}
										ghost
									>
										<Collapse.Panel
											key="0"
											header={
												<AtomDetailCollapseHeader title="Info Pesanan" />
											}
										>
											<Row gutter={[12, 12]}>
												<Col span={12}>
													<MoleculeOrderInfoGroup
														title="ID Pesanan"
														content={order?.id}
													/>
												</Col>
												<Col span={12}>
													<MoleculeOrderInfoGroup
														title="Frekuensi Pesanan"
														content={
															order?.order_frequency
														}
													/>
												</Col>
											</Row>
										</Collapse.Panel>

										<Collapse.Panel
											key="1"
											header={
												<AtomDetailCollapseHeader title="Info Cabang Freezy" />
											}
										>
											<MoleculeOrderDetailBranchInfo
												branch={
													order?.branch_info || {}
												}
											/>
										</Collapse.Panel>

										<Collapse.Panel
											key="2"
											header={
												<AtomDetailCollapseHeader title="Info Pesanan" />
											}
										>
											<MoleculeOrderDetailInfo
												order={order}
											/>
										</Collapse.Panel>

										<Collapse.Panel
											key="3"
											header={
												<AtomDetailCollapseHeader title="Info Penagihan" />
											}
										>
											<MoleculeOrderDetailCustomerInfo
												customer={order?.customer_info}
											/>
										</Collapse.Panel>

										<Collapse.Panel
											key="4"
											header={
												<AtomDetailCollapseHeader title="Info Pengiriman" />
											}
										>
											<MoleculeOrderDeliveryInfo
												delivery={order?.delivery_info}
											/>
										</Collapse.Panel>

										<Collapse.Panel
											key="5"
											header={
												<AtomDetailCollapseHeader title="Info Metode Pengiriman" />
											}
										>
											<MoleculeOrderDetailShippingInfo
												shipping={order?.shipping_info}
											/>
										</Collapse.Panel>
									</Collapse>
								</Col>

								<Col span={3}>
									<AtomSecondaryButton size="large">
										Terima Pesanan
									</AtomSecondaryButton>
								</Col>
							</Row>
						</AtomCard>

						<OrganismProductOrderDatatable
							defaultData={order?.products}
							isReadOnly
						/>

						<AtomCard title="">
							{' '}
							<Collapse
								defaultActiveKey={['1', '2', '3', '4']}
								ghost
							>
								<Collapse.Panel
									key="2"
									header={
										<AtomDetailCollapseHeader title="Metode Pembayaran" />
									}
								>
									<MoleculeOrderDetailBillingMethodInfo
										order={order}
									/>
								</Collapse.Panel>

								<Collapse.Panel
									key="1"
									header={
										<AtomDetailCollapseHeader title="Voucher" />
									}
								>
									<MoleculeOrderDetailVoucherInfo
										code={order?.voucher_code}
										voucher={order?.voucher.id}
									/>
								</Collapse.Panel>

								<Collapse.Panel
									key="3"
									header={
										<AtomDetailCollapseHeader title="Rincian Biaya" />
									}
								>
									<MoleculeOrderDetailPaymentInfo
										order={order}
									/>
								</Collapse.Panel>
								<Collapse.Panel
									key="4"
									header={
										<AtomDetailCollapseHeader title="Info Update" />
									}
								>
									<MoleculeOrderUpdateInfo
										createdAt={order?.created_at}
										createdBy={order?.created_by}
										updatedAt={order?.updated_at}
										updatedBy={order?.updated_by}
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

export default OrderComplainOrderDetailPage;
