/* eslint-disable no-mixed-spaces-and-tabs */
import React, { useEffect, useState } from 'react';
import ReactMoment from 'react-moment';
import { Col, Form, message, Row, Typography } from 'antd';
import { useHistory, useLocation } from 'react-router-dom';

import AtomBranchSelection from '../../components/atoms/selection/branch';
import AtomCard from '../../components/atoms/card';
import AtomNumberFormat from '../../components/atoms/number-format';
import MoleculeInfoGroup from '../../components/molecules/info-group';
import MoleculeModifyActionButtons from '../../components/molecules/modify-action-buttons';
import MoleculeNumberInputGroup from '../../components/molecules/input-group/number-input';
import MoleculeSelectInputGroup from '../../components/molecules/input-group/select-input';
import MoleculeTextInputGroup from '../../components/molecules/input-group/text-input';
import OrganismLayout from '../../components/organisms/layout';
import TransactionService from '../../services/transaction';

const TransactionModifyPage = () => {
	const transactionService = new TransactionService();

	const location = useLocation();
	const history = useHistory();

	const [form] = Form.useForm();
	const [customer, setCustomer] = useState(null);
	const [isSubmitting, setIsSubmitting] = useState(false);
	const [transType, setTransType] = useState(null);

	const submit = async (values) => {
		try {
			setIsSubmitting(true);

			const data = new FormData();
			data.append('product_owner_id', values.product_owner_id);
			data.append('customer_id', customer.id);
			data.append('branch_id', values.branches);
			data.append('transaction_from', values.transaction_from);
			data.append('transaction_for', values.transaction_for);
			data.append(
				'transaction_type',
				values.transaction_type === 'Kredit' ? 'CREDIT' : 'DEBIT'
			);
			data.append('source_or_destination', values.source_or_destination);
			data.append('amount', values.amount);
			data.append('note', values.note);

			await transactionService.createTransaction(data);
			message.success('Berhasil menambah transaksi');

			message.info(
				'Akan dikembalikan ke halaman daftar transaksi dalam 2 detik'
			);
			setTimeout(() => {
				history.push('/transaction');
			}, 2000);
		} catch (error) {
			message.error(error.message);
			console.error(error);
		} finally {
			setIsSubmitting(false);
		}
	};

	const changeTransTypeValue = (transaction_for) => {
		switch (transaction_for) {
			case 'ADJUSTMENT_DEBIT':
			case 'PAYMENT':
				setTransType('Debit');
				break;
			default:
				setTransType('Kredit');
				break;
		}
	};

	useEffect(() => {
		form.setFieldsValue({
			transaction_type: transType,
		});
	}, [transType]);

	return (
		<OrganismLayout
			breadcumbs={[
				{ name: 'Transaction', link: '/transaction' },
				{
					name: location.pathname.includes('add') ? 'Tambah' : 'Ubah',
					link: location.pathname,
				},
			]}
			title={`Tambah Transaksi`}
		>
			<Typography.Title level={4}>
				<span className="fw7">{`Tambah Transaksi`.toUpperCase()}</span>
			</Typography.Title>

			<Form
				className="w-100 mt4"
				name="add_transaction"
				form={form}
				initialValues={{}}
				onFinish={submit}
				onFinishFailed={(error) => {
					message.error(`Failed: ${error.errorFields}`);
					console.error(error);
				}}
			>
				<Row>
					<Col span={18}>
						<AtomCard title="Info Transaksi">
							<Row gutter={12}>
								<Col span={12}>
									<MoleculeSelectInputGroup
										name="product_owner_id"
										label="Merchant"
										placeholder="Pilih Merchant"
										required={true}
										data={{
											url:
												'product-owners?filter=id;name',
											generateCustomOption: (item) => ({
												value: item.id,
												label: item.name,
											}),
										}}
									/>
								</Col>

								<Col span={12}>
									<AtomBranchSelection required />
								</Col>

								<Col span={24}>
									<MoleculeSelectInputGroup
										name="customer_id"
										label="Pelanggan"
										placeholder="Pilih Pelanggan"
										required={true}
										onChange={(value) => {
											setCustomer(JSON.parse(value));
										}}
										data={{
											url:
												'admin/customers?filter=id;first_name;last_name;phone_number;email;birth;freezy_cash;freezy_point',
											generateCustomOption: (item) => ({
												value: JSON.stringify(item),
												label: `${item.first_name} ${
													item.last_name || ''
												} (${item.id}, ${
													item.email ? item.email : ''
												} ${
													item.phone_number
														? ', ' +
														  item.phone_number
														: ''
												})`,
											}),
										}}
									/>
								</Col>

								<Col span={24} className="mb4">
									<fieldset>
										<legend>Info Pelanggan</legend>
										<Row gutter={[12, 24]}>
											<Col span={12}>
												<MoleculeInfoGroup
													title="ID Pelanggan"
													content={
														customer
															? customer.id
															: '-'
													}
												/>
											</Col>

											<Col span={12}>
												<MoleculeInfoGroup
													title="Nama Pelanggan"
													content={
														customer
															? `${
																	customer.first_name ||
																	''
															  } ${
																	customer.last_name ||
																	''
															  }`
															: '-'
													}
												/>
											</Col>

											<Col span={12}>
												<MoleculeInfoGroup
													title="Nomor Handphone"
													content={
														customer
															? customer.phone_number ||
															  '-'
															: '-'
													}
												/>
											</Col>

											<Col span={12}>
												<MoleculeInfoGroup
													title="Email"
													content={
														customer
															? customer.email ||
															  '-'
															: ''
													}
												/>
											</Col>

											<Col span={12}>
												<MoleculeInfoGroup
													title="Tanggal Lahir"
													content={
														customer ? (
															customer.birth ? (
																<ReactMoment format="DD/MM/YY">
																	{
																		customer.birth
																	}
																</ReactMoment>
															) : (
																'-'
															)
														) : (
															'-'
														)
													}
												/>
											</Col>

											<Col span={12}>
												<MoleculeInfoGroup
													title="Freezy Point"
													content={
														customer ? (
															<AtomNumberFormat
																value={
																	customer.freezy_point ||
																	0
																}
															/>
														) : (
															'-'
														)
													}
												/>
											</Col>

											<Col span={12}>
												<MoleculeInfoGroup
													title="Freezy Cash"
													content={
														customer ? (
															<AtomNumberFormat
																value={
																	customer.freezy_fresh ||
																	0
																}
															/>
														) : (
															'-'
														)
													}
												/>
											</Col>
										</Row>
									</fieldset>
								</Col>

								<Col span={12}>
									<MoleculeSelectInputGroup
										name="transaction_from"
										label="Asal Transaksi"
										placeholder="Pilih Asal Transaksi"
										required={true}
										data={{
											url: 'transactions/parameters/from',
											generateCustomOption: (item) => ({
												value: item.value,
												label: `${item.name.id} / ${item.name.en} `,
											}),
										}}
									/>
								</Col>

								<Col span={12}>
									<MoleculeSelectInputGroup
										name="transaction_for"
										label="Jenis Transaksi"
										placeholder="Pilih Jenis Transaksi"
										required={true}
										onChange={(value) =>
											changeTransTypeValue(value)
										}
										data={{
											url: 'transactions/parameters/for',
											generateCustomOption: (item) => ({
												value: item.value,
												label: `${item.name.id} / ${item.name.en} `,
											}),
										}}
									/>
								</Col>

								<Col span={12}>
									<MoleculeTextInputGroup
										label="Tipe Transaksi"
										name="transaction_type"
										placeholder="Pilih jenis transaksi terlebih dahulu"
										type="text"
										value={transType}
										readOnly
									/>
								</Col>

								<Col span={12}>
									<MoleculeSelectInputGroup
										name="source_or_destination"
										label="Sumber / Tujuan Dana"
										placeholder="Pilih Sumber / Tujuan Dana"
										required={true}
										data={{
											options: [
												{
													value: 'FREEZY_POINT',
													label: 'Freezy Point',
												},
												{
													value: 'FREEZY_CASH',
													label: 'Freezy Cash',
												},
											],
										}}
									/>
								</Col>

								<Col span={12}>
									<MoleculeNumberInputGroup
										label="Nominal Transaksi (Rp)"
										name="amount"
										placeholder="Masukkan Nominal Transaksi"
										required={true}
									/>
								</Col>

								<Col span={12}>
									<MoleculeTextInputGroup
										label="Keterangan"
										name="note"
										placeholder="Masukkan Keterangan"
										type="textarea"
										autoSize={{
											maxRows: 6,
										}}
									/>
								</Col>
							</Row>
						</AtomCard>
					</Col>

					<Col className="mt4" span={24}>
						<MoleculeModifyActionButtons
							backUrl="/transaction"
							isCreating={true}
							isSubmitting={isSubmitting}
							label="Transaksi"
						/>
					</Col>
				</Row>
			</Form>
		</OrganismLayout>
	);
};

export default TransactionModifyPage;
