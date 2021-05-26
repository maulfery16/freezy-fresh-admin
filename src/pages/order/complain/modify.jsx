/* eslint-disable no-mixed-spaces-and-tabs */
/* eslint-disable no-unused-vars */
import React, { useEffect, useRef, useState } from 'react';
import { Col, Form, message, Row, Space, Typography } from 'antd';
import { useHistory, useParams } from 'react-router';

import AtomBranchSelect from '../../../components/atoms/selection/branch';
import AtomCard from '../../../components/atoms/card';
import AtomFileInput from '../../../components/atoms/input/file-input';
import AtomSectionTitle from '../../../components/atoms/section-title';
import MoleculeModifyActionButtons from '../../../components/molecules/modify-action-buttons';
import MoleculeOrderCreationCustomerInfo from '../../../components/molecules/order/creation/customer-info';
import MoleculeSelectInputGroup from '../../../components/molecules/input-group/select-input';
import MoleculeTextInputGroup from '../../../components/molecules/input-group/text-input';
import OrganismLayout from '../../../components/organisms/layout';
import OrganismOrderComplaintModifyProduct from '../../../components/organisms/order/modify-product';

import OrderService from '../../../services/order';
import MasterService from '../../../services/master';

const ModifyOrderComplainPage = () => {
	const history = useHistory();
	const isCreating = history.location.pathname.includes('add') ? true : false;

	const masterService = new MasterService();
	const orderService = new OrderService();
	const productModifyRef = useRef();

	const [complaintTicket, setComplaintTicket] = useState(null);
	const [form] = Form.useForm();
	const [complaintMediaUrl, setComplaintMediaUrl] = useState(null);
	const [proofOfReturnUrl, setProofOfReturnUrl] = useState(null);
	const [isSubmitting, setIsSubmitting] = useState(false);
	const [selectedBranch, setSelectedBranch] = useState(null);
	const [selectedCustomer, setSelectedCustomer] = useState(null);
	const [selectedOrder, setSelectedOrder] = useState(null);
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
			setOrder(response.data);
		} catch (error) {
			message.error(error.message);
		}
	};

	const setComplaintTicketInitialValues = () => {
		if (!isCreating) {
			setSelectedOrder(complaintTicket.order_id);
			setSelectedCustomer(complaintTicket.customer_id);
			setSelectedBranch(complaintTicket.branch_id);
			getOrderDetail(complaintTicket.order_id);
			setOrder({
				...order,
				products: complaintTicket.products,
			});
		}

		return isCreating || !complaintTicket
			? {}
			: {
					branch_id: complaintTicket.branch_id,
					complaint_detail: complaintTicket.detail,
					customer_id: complaintTicket.customer_id,
					order_id: complaintTicket.order_id,
					problem_type: complaintTicket.problem_type,
			  };
	};

	const submit = async (values) => {
		if (!selectedBranch) {
			message.error('Pilih cabang terlebih dahulu');
			return;
		}

		if (!selectedCustomer) {
			message.error('Pilih customer terlebih dahulu');
			return;
		}

		if (!selectedOrder) {
			message.error('Pilih pesanan terlebih dahulu');
			return;
		}

		setIsSubmitting(true);

		try {
			const data = {
				branch_id: selectedBranch,
				complaint_detail: values.detail,
				customer_id: selectedCustomer,
				order_id: selectedOrder,
				problem_type: values.problem_type,
				products: productModifyRef.current.products,
				total_funds_problem: productModifyRef.current.products.reduce(
					(current, product) => {
						return current + product.price * product.quantity;
					},
					0
				),
				complaint_media_url: [
					{
						url: complaintMediaUrl,
					},
				],
			};

			if (isCreating) {
				await orderService.createComplaintTicket(data);
			} else {
				data.return_type = values.return_type;
				data.notes = values.notes;
				data.proof_of_return_url = [
					{
						url: proofOfReturnUrl,
					},
				];

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

	const uploadImage = async (file, setter) => {
		try {
			if (file && file.uid !== '-1') {
				const data = new FormData();
				data.append('file', file);
				data.append('type', 'image');
				const url = await masterService.uploadImage(data);

				setter(url);
			}
		} catch (error) {
			message.error(error.message);
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
				form={form}
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
								data={{
									url: 'orders',
									generateCustomOption: (item) => ({
										value: item.id,
										label: item.code,
									}),
									onChange: (value) => {
										setSelectedOrder(value);
										getOrderDetail(value);
									},
								}}
							/>
						</Col>

						<Col span={16}>
							<AtomSectionTitle title="Produk Yang Dikomplain" />

							<OrganismOrderComplaintModifyProduct
								products={order?.products}
								ref={productModifyRef}
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
							<Space direction="vertical">
								<Typography.Text>
									<span className="gray fw5 mb2">
										Pilih Gambar/Video (Opsional)
									</span>
								</Typography.Text>

								<AtomFileInput
									defaultValue={
										complaintTicket?.complaint_media_url[0]
									}
									onChange={async (file) =>
										uploadImage(file, setComplaintMediaUrl)
									}
								/>
							</Space>
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
									<Space direction="vertical">
										<Typography.Text>
											<span className="gray fw5 mb2">
												Pilih Gambar/Video Pengembalian
												(Opsional)
											</span>
										</Typography.Text>

										<AtomFileInput
											defaultValue={
												complaintTicket
													?.proof_of_return_url[0]
											}
											onChange={async (file) =>
												uploadImage(
													file,
													setProofOfReturnUrl
												)
											}
										/>
									</Space>
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

			<Col className="mt4" span={24}>
				<MoleculeModifyActionButtons
					backUrl="/order/complain"
					isCreating={isCreating}
					isSubmitting={isSubmitting}
					label="Pesanan Dikomplain"
					onClick={() => form.submit()}
				/>
			</Col>
		</OrganismLayout>
	);
};

export default ModifyOrderComplainPage;
