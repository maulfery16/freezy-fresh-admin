/* eslint-disable no-mixed-spaces-and-tabs */
/* eslint-disable no-unused-vars */
import React, { useEffect, useRef, useState } from 'react';
import { Col, Form, message, Row, Typography } from 'antd';
import { useHistory, useParams } from 'react-router';

import AtomBranchSelect from '../../../components/atoms/selection/branch';
import AtomCard from '../../../components/atoms/card';
import AtomSectionTitle from '../../../components/atoms/section-title';
import MoleculeFileInputGroup from '../../../components/molecules/input-group/file-input';
import MoleculeOrderCreationCustomerInfo from '../../../components/molecules/order/creation/customer-info';
import MoleculeSelectInputGroup from '../../../components/molecules/input-group/select-input';
import MoleculeTextInputGroup from '../../../components/molecules/input-group/text-input';
import OrganismLayout from '../../../components/organisms/layout';
import OrganismOrderComplaintModifyProduct from '../../../components/organisms/order/modify-product';

import CustomerService from '../../../services/customer';
import OrderService from '../../../services/order';

const ModifyOrderComplainPage = () => {
	const complaintTicketImageRef = useRef();
	const complaintReturnImageRef = useRef();
	const orderService = new OrderService();
	const history = useHistory();
	const isCreating = history.location.pathname.includes('add') ? true : false;

	const [complaintTicket, setComplaintTicket] = useState(null);
	const [isSubmitting, setIsSubmitting] = useState(false);
	const [selectedBranch, setSelectedBranch] = useState(null);
	const [selectedCustomer, setSelectedCustomer] = useState(null);
	const [order, setOrder] = useState(null);
	const { id } = useParams();

	const getComplaintTicketDetail = async (id) => {
		try {
			const response = await orderService.getComplaintOrderById(id);
			setComplaintTicket(response.data);
		} catch (error) {
			message.error(error.message);
			console.error(error);
		}
	};

	const getOrderDetail = async (id) => {
		try {
			const response = await orderService.getOrderById(id);
			console.log(response.data);
			setOrder(response.data);
		} catch (error) {
			message.error(error.message);
		}
	};

	const setComplaintTicketInitialValues = () => {
		return isCreating || !complaintTicket ? {} : {};
	};

	const submit = async () => {
		setIsSubmitting(true);

		try {
			const data = {};

			if (isCreating) {
				await orderService.createComplaintTicket(data);
			} else {
				await orderService.editComplaintTicket(data);
			}

			message.success('Berhasil menambah pesanan');
			message.info('Akan dikembalikan ke halaman pesanan dalam 2 detik');
			setTimeout(() => history.push('/orders'), 2000);
		} catch (error) {
			message.error(error.message);
		} finally {
			setIsSubmitting(false);
		}
	};

	useEffect(() => {
		(async () => {
			if (!isCreating) {
				await getComplaintTicketDetail(id);
			}
		})();
	}, []);

	return (
		<OrganismLayout
			breadcumbs={[
				{ name: 'Pesanan', link: '/order' },
				{ name: 'Pesanan Dikomplain', link: '/order/complain' },
				{
					name: location.pathname.includes('add') ? 'Tambah' : 'Ubah',
					link: location.pathname,
				},
			]}
			title={`${isCreating ? 'Add' : 'Edit'} Complaint Ticket`}
		>
			<Typography.Title level={4}>
				<span className="fw7">
					{`${
						isCreating ? 'Tambah' : 'Ubah'
					} Tiket Komplain`.toUpperCase()}
				</span>
			</Typography.Title>

			<Form
				className="w-100 mt4"
				name="modify_complaint_ticket"
				initialValues={setComplaintTicketInitialValues()}
				onFinish={submit}
				onFinishFailed={(error) => {
					message.error(`Failed: ${error.errorFields}`);
					console.error(error);
				}}
			>
				<AtomCard>
					<Row gutter={[24, 8]}>
						<AtomSectionTitle title="Info Cabang" />

						<Col span={12}>
							<AtomBranchSelect onChange={setSelectedBranch} />
						</Col>

						<AtomSectionTitle title="Info Pelanggan" />

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
									},
								}}
							/>
						</Col>

						<Col className="mb3" span={18}>
							<MoleculeOrderCreationCustomerInfo
								customerId={selectedCustomer}
							/>
						</Col>

						<AtomSectionTitle title="Info Pesanan" />

						<Col span={12}>
							<MoleculeSelectInputGroup
								label="Info Pesanan"
								name="order_id"
								placeholder="Pilih ID Pesanan"
								required
								data={{
									url: 'orders',
									generateCustomOption: (item) => ({
										value: item.id,
										label: item.code,
									}),
									onChange: (value) => {
										getOrderDetail(value);
									},
								}}
							/>
						</Col>

						<Col span={16}>
							<AtomSectionTitle title="Produk Yang Dikomplain" />

							<OrganismOrderComplaintModifyProduct
								products={order?.products}
							/>
						</Col>

						<AtomSectionTitle
							className="mt3"
							title="Info Komplain"
						/>

						<Col span={12}>
							<MoleculeSelectInputGroup
								label="Tipe Masalah"
								name="problem_type"
								placeholder="Pilih Tipe Masalah"
								required
								data={{
									options: [
										{
											label: 'Produk Tidak Lengkap',
											value: 'PRODUCT_IS_INCOMPLETED',
										},
										{
											label: 'Produk Rusak',
											value: 'PRODUCT_IS_BROKEN',
										},
									],
								}}
							/>
						</Col>

						<Col span={1}></Col>

						<Col span={12}>
							<MoleculeFileInputGroup
								label="Pilih Gambar/Video (Opsional)"
								fileInputs={[
									{
										defaultValue: complaintTicket
											? complaintTicket.image
											: null,
										ref: complaintTicketImageRef,
									},
								]}
							/>
						</Col>

						<Col span={12}>
							<MoleculeTextInputGroup
								label="Detail Komplain"
								name="detail"
								placeholder="Masukan Detail Komplain"
								required
								type="textarea"
								autoSize={{
									minRows: 2,
									maxRows: 6,
								}}
							/>
						</Col>

						{!isCreating && (
							<>
								<AtomSectionTitle
									className="mt3"
									title="Info Solusi"
								/>

								<Col span={12}>
									<MoleculeSelectInputGroup
										label="Tipe Pengembalian"
										name="return_type"
										placeholder="Pilih Tipe Pengembalian"
										required
										data={{
											options: [
												{
													label: 'Pengembalian Dana',
													value: 'RETURN_BALANCE',
												},
												{
													label: 'Pengembalian Barang',
													value: 'RETURN_GOODS',
												},
											],
										}}
									/>
								</Col>

								<Col span={1}></Col>

								<Col span={12}>
									<MoleculeFileInputGroup
										label="Bukti Gambar/Video Pengembalian (Opsional)"
										fileInputs={[
											{
												defaultValue: complaintTicket
													? complaintTicket.image
													: null,
												ref: complaintReturnImageRef,
											},
										]}
									/>
								</Col>

								<Col span={12}>
									<MoleculeTextInputGroup
										label="Catatan"
										name="notes"
										placeholder="Masukan Catatan Pengembalian"
										required
										type="textarea"
										autoSize={{
											minRows: 2,
											maxRows: 6,
										}}
									/>
								</Col>
							</>
						)}
					</Row>
				</AtomCard>
			</Form>
		</OrganismLayout>
	);
};

export default ModifyOrderComplainPage;
