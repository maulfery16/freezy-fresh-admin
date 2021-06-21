/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react';
import { Col, Collapse, message, Row, Skeleton, Space, Typography } from 'antd';
import { Link, useParams, withRouter } from 'react-router-dom';
import { useSelector } from 'react-redux';

import AtomCard from '../../components/atoms/card';
import AtomSecondaryButton from '../../components/atoms/button/secondary-button';
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

const OrderDetailPage = (props) => {
	const orderService = new OrderService();
	const { id } = useParams();
	const [order, setOrder] = useState(null);
	const [isLoading, setIsLoading] = useState(true);

	const { roles } = useSelector((state) => state.auth);

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
					<Row justify="space-between">
						<Typography.Title level={4}>
							<span className="fw7">
								{`Detail Pesanan`.toUpperCase()}
							</span>
						</Typography.Title>

						{props?.location?.state?.backUrl && (
							<Col>
								<Link to={props.location.state.backUrl}>
									<AtomSecondaryButton size="large">
										Kembali
									</AtomSecondaryButton>
								</Link>
							</Col>
						)}
					</Row>

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
										branch={order?.branch_info}
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
							defaultData={order?.products}
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
										customer={order?.customer_info}
									/>
								</Collapse.Panel>

								{(roles === 'super-admin' || roles === 'admin' || roles === 'manager-freezy') && (
									<Collapse.Panel
										key="2"
										header={
											<AtomDetailCollapseHeader title="Info Pengiriman" />
										}
									>
										<MoleculeOrderDeliveryInfo
											delivery={order?.delivery_info}
										/>
									</Collapse.Panel>
								)}

								<Collapse.Panel
									key="3"
									header={
										<AtomDetailCollapseHeader title="Info Metode Pengiriman" />
									}
								>
									<MoleculeOrderDetailShippingInfo
										shipping={order?.shipping_info}
									/>
								</Collapse.Panel>

								{(roles === 'super-admin' || roles === 'admin' || roles === 'manager-freezy') && (
									<>
										<Collapse.Panel
											key="4"
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
												createdAt={order?.created_at}
												createdBy={order?.created_by}
												updatedAt={order?.updated_at}
												updatedBy={order?.updated_by}
											/>
										</Collapse.Panel>
									</>
								)}
							</Collapse>
						</AtomCard>
					</Space>
				</>
			)}
		</OrganismLayout>
	);
};

export default withRouter(OrderDetailPage);
