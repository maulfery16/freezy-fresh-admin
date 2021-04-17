import { Col, Input, message, Modal, Row, Space, Typography } from 'antd';
import React, { useState } from 'react';

import AtomPrimaryButton from '../../atoms/button/primary-button';
import OrderService from '../../../services/order';

const MoleculeOrderPickupModal = () => {
	const orderService = new OrderService();
	const [isModalVisible, setIsModalVisible] = useState(false);
	const [order, setOrder] = useState(null);

	const pickupOrder = async () => {
		try {
			await orderService.pickupOrder(order.id);
			setIsModalVisible(false);
			message.success('Berhasil meminta layanan pickup ke server');
		} catch (error) {
			message.error(error.message);
		}
	};

	const searchOrderCode = async (event) => {
		const code = event.target.value;

		if (code.length > 3) {
			try {
				const response = await orderService.getOrderByPickUpCode(code);
				setOrder(response);
			} catch (error) {
				message.error(error.message);
			}
		}
	};

	return (
		<>
			<AtomPrimaryButton
				onClick={() => setIsModalVisible(true)}
				size="large"
			>
				Pickup Pesanan
			</AtomPrimaryButton>

			<Modal
				footer={null}
				title="Pickup Pesanan"
				visible={isModalVisible}
				width={420}
				onCancel={() => setIsModalVisible(false)}
			>
				<Row gutter={[12, 24]} justify="center">
					<Col span={24}>
						<Space className="w-100" direction="vertical">
							<Typography.Text>
								<span className="moon-gray fw6">
									Kode Pesanan
								</span>
							</Typography.Text>

							<Input
								className="br3 ba bw1 b--black-10 pv2 ph3"
								defaultValue={order?.code}
								disabled
								placeholder="Kode Pesanan"
							/>
						</Space>
					</Col>

					<Col span={24}>
						<Space className="w-100" direction="vertical">
							<Typography.Text>
								<span className="moon-gray fw6">
									Kode Pickup Pesanan
								</span>
							</Typography.Text>

							<Input
								className="br3 ba bw1 b--black-10 pv2 ph3"
								placeholder="Kode Pickup Pesanan"
								onChange={(event) => searchOrderCode(event)}
							/>
						</Space>
					</Col>

					<AtomPrimaryButton
						className="mt3"
						onClick={() => pickupOrder()}
						size="large"
					>
						Terapkan
					</AtomPrimaryButton>
				</Row>
			</Modal>
		</>
	);
};

export default MoleculeOrderPickupModal;
