/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import { Collapse, Space, Typography } from 'antd';

import AtomCard from '../../components/atoms/card';
import AtomDetailCollapseHeader from '../../components/atoms/order-detail-collapse-header';
import MoleculeOrderDeliveryInfo from '../../components/molecules/order/detail/delivery-info';
import MoleculeOrderDetailBillingInfo from '../../components/molecules/order/detail/billing-info';
import MoleculeOrderDetailBillingMethodInfo from '../../components/molecules/order/detail/billing-method-info';
import MoleculeOrderDetailBranchInfo from '../../components/molecules/order/detail/branch-info';
import MoleculeOrderDetailInfo from '../../components/molecules/order/detail/info';
import MoleculeOrderDetailPaymentInfo from '../../components/molecules/order/detail/payment-info';
import MoleculeOrderDetailVoucherInfo from '../../components/molecules/order/detail/voucher-info';
import MoleculeOrderUpdateInfo from '../../components/molecules/order/detail/update-info';
import OrganismLayout from '../../components/organisms/layout';
import OrganismProductOrderDatatable from '../../components/organisms/datatable/product-order-datatable';

const OrderDetailPage = () => {
	const [order, setOrder] = useState(null);

	return (
		<OrganismLayout
			breadcumbs={[
				{ name: 'Pesanan', link: '/order/' },
				{ name: 'Detail', link: location.pathname },
			]}
			title="Detail Pesanan"
		>
			<Typography.Title level={4}>
				<span className="fw7">{`Detail Pesanan`.toUpperCase()}</span>
			</Typography.Title>

			<Space className="mt3 w-100" direction="vertical" size="large">
				<AtomCard title="">
					{' '}
					<Collapse defaultActiveKey={['1']} ghost>
						<Collapse.Panel
							key="1"
							header={
								<AtomDetailCollapseHeader title="Info Cabang Freezy" />
							}
						>
							<MoleculeOrderDetailBranchInfo order={order} />
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

				<OrganismProductOrderDatatable isReadOnly />

				<AtomCard title="">
					{' '}
					<Collapse defaultActiveKey={['1']} ghost>
						<Collapse.Panel
							key="1"
							header={
								<AtomDetailCollapseHeader title="Info Penagihan" />
							}
						>
							<MoleculeOrderDetailBillingInfo order={order} />
						</Collapse.Panel>
						<Collapse.Panel
							key="2"
							header={
								<AtomDetailCollapseHeader title="Info Pengiriman" />
							}
						>
							<MoleculeOrderDeliveryInfo order={order} />
						</Collapse.Panel>
						<Collapse.Panel
							key="3"
							header={
								<AtomDetailCollapseHeader title="Voucher" />
							}
						>
							<MoleculeOrderDetailVoucherInfo order={order} />
						</Collapse.Panel>
						<Collapse.Panel
							key="4"
							header={
								<AtomDetailCollapseHeader title="Metode Pembayaran" />
							}
						>
							<MoleculeOrderDetailBillingMethodInfo
								order={order}
							/>
						</Collapse.Panel>
						<Collapse.Panel
							key="5"
							header={
								<AtomDetailCollapseHeader title="Rincian Biaya" />
							}
						>
							<MoleculeOrderDetailPaymentInfo order={order} />
						</Collapse.Panel>
						<Collapse.Panel
							key="6"
							header={
								<AtomDetailCollapseHeader title="Info Update" />
							}
						>
							<MoleculeOrderUpdateInfo order={order} />
						</Collapse.Panel>
					</Collapse>
				</AtomCard>
			</Space>
		</OrganismLayout>
	);
};

export default OrderDetailPage;

<div>ldflwjkflkwjef</div>;
