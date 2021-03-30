/* eslint-disable no-mixed-spaces-and-tabs */
import React, { useEffect, useState } from 'react';
import ReactMoment from 'react-moment';
import { Col, Form, message, Row, Skeleton, Typography } from 'antd';
import { useHistory, useLocation, useParams } from 'react-router-dom';

import AtomBranchSelection from '../../components/atoms/selection/branch';
import AtomCard from '../../components/atoms/card';
import MoleculeInfoGroup from '../../components/molecules/info-group';
import MoleculeModifyActionButtons from '../../components/molecules/modify-action-buttons';
import MoleculeNumberInputGroup from '../../components/molecules/input-group/number-input';
import MoleculeSelectInputGroup from '../../components/molecules/input-group/select-input';
import MoleculeTextInputGroup from '../../components/molecules/input-group/text-input';
import OrganismLayout from '../../components/organisms/layout';

const customerOptionsDataSource = [
	{
		id: 83510986823,
		email: 'kim@gmail.com',
		name: {
			first_name: 'Kim',
			last_name: '',
		},
		phone_number: '0844678323534',
		birth: new Date('01-02-1990'),
	},
	{
		id: 'AA-4189571235',
		email: 'armin@gmail.com',
		name: {
			first_name: 'Armin',
			last_name: null,
		},
		phone_number: '0894678323534',
		birth: new Date('01-02-1990'),
	},
	{
		id: 'EY-4189571235',
		email: 'eren@gmail.com',
		name: {
			first_name: 'Eren',
			last_name: 'Yeagger',
		},
		phone_number: '0834678323534',
		birth: new Date('01-02-1990'),
	},
	{
		id: 'MA-4189571235',
		email: 'mikasa@gmail.com',
		name: {
			first_name: 'Mikasa',
			last_name: 'Ackerman',
		},
		phone_number: '0824678323534',
		birth: new Date('01-02-1990'),
	},
];

// import {
// 	translateTransactionKind,
// 	translateTransactionStatus,
// } from '../../services/transaction';
// const transactionService = new TransactionService();

const TransactionModifyPage = () => {
	const { id } = useParams();
	const location = useLocation();
	const history = useHistory();
	const isCreating = location.pathname.includes('add') ? true : false;

	const [form] = Form.useForm();
	const [customer, setCustomer] = useState(null);
	const [isSubmitting, setIsSubmitting] = useState(false);
	const [transType, setTransType] = useState(null);
	const [transaction, setTransaction] = useState(null);

	const getTransactionDetail = async () => {
		try {
			// const { data: transaction } = await transactionService.getTransactionById(id);
			const transaction = {
				id: 5,
				trans_source: 'manual',
				trans_kind: 'cashback',
				trans_type: 'credit',
				created_at: new Date(),
				created_by: 'Mikasa',
				success_at: new Date(),
				failed_at: new Date(),
				customer: {
					id: 83510986823,
					email: 'kim@gmail.com',
					name: {
						first_name: 'Kim',
						last_name: '',
					},
					phone_number: '0844678323534',
					birth: new Date('01-02-1990'),
				},
				total: 27500,
				merchant: 'm1',
				freezy_branch: 'Bandung',
				rezeki_branch: 'Kalimantan',
				fund_source: 'freezy_cash',
				freezy_cash: 15000,
				freezy_point: 3500,
				url_payment: 'http:/google.com',
				description: 'System payment failed, do manual payment please',
				status: 'success',
				updated_at: new Date(),
				updated_by: 'Eren',
			};
			setTransType(
				transaction.trans_type === 'credit' ? 'Kredit' : 'Debit'
			);
			setCustomer(transaction.customer);
			setTransaction(transaction);
		} catch (error) {
			message.error(error.message);
			console.error(error);
		}
	};

	const submit = async (values) => {
		try {
			setIsSubmitting(true);

			const data = new FormData();
			data.append('merchant', values.merchant);
			data.append('freezy_branch', values.freezy_branch);
			data.append('customer', values.customer);
			data.append('trans_source', values.region_id);
			data.append('trans_kind', values.is_active);
			data.append(
				'trans_type',
				values.trans_type === 'Kredit' ? 'credit' : 'debt'
			);
			data.append('fund_source', values.fund_source);
			data.append('total', values.total);
			data.append('description', values.description);

			if (isCreating) {
				// await transactionService.createTransaction(data);
				message.success('Berhasil menambah transaksi');
			} else {
				// await transactionService.editTransaction(id, data);
				message.success('Berhasil mengubah transaksi');
			}

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

	const setTransactionInitialValues = () => {
		return isCreating || !transaction
			? {}
			: {
					merchant: transaction.merchant,
					freezy_branch: transaction.freezy_branch,
					customer: JSON.stringify(customer),
					trans_source: transaction.trans_source,
					trans_kind: transaction.trans_kind,
					trans_type: transaction.trans_type,
					fund_source: transaction.fund_source,
					total: transaction.total,
					description: transaction.description,
			  };
	};

	const changeTransTypeValue = (trans_kind) => {
		switch (trans_kind) {
			case 'adjustment_debt':
			case 'payment':
				setTransType('Debit');
				break;
			default:
				setTransType('Kredit');
				break;
		}
	};

	const customerOptions = customerOptionsDataSource.map((item) => ({
		value: JSON.stringify(item),
		label: `${item.name.first_name || ''} ${item.name.last_name || ''} (${
			item.id
		}, ${item.email}, ${item.phone_number})`,
	}));

	useEffect(() => {
		(async () => {
			if (!isCreating) {
				getTransactionDetail(id);
			}
		})();
	}, []);

	useEffect(() => {
		form.setFieldsValue({
			trans_type: transType,
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
			title={`${isCreating ? 'Tambah' : 'Ubah'} Transaksi`}
		>
			<Typography.Title level={4}>
				<span className="fw7">
					{`${
						isCreating ? 'Tambah' : 'Ubah'
					} Transaksi`.toUpperCase()}
				</span>
			</Typography.Title>

			{!isCreating && !transaction ? (
				<Skeleton active />
			) : (
				<Form
					className="w-100 mt4"
					name="modify_transaction"
					form={form}
					initialValues={setTransactionInitialValues()}
					onFinish={submit}
					onFinishFailed={(error) => {
						message.error(`Failed: ${error.errorFields}`);
						console.error(error);
					}}
				>
					<Row>
						<Col span={18}>
							<AtomCard title="Info Transaksi">
								<Row gutter={[12, 24]}>
									<Col span={12}>
										<MoleculeSelectInputGroup
											name="merchant"
											label="Merchant"
											placeholder="Pilih Merchant"
											required={true}
											data={{
												// url: 'roles',
												// generateCustomOption: (item) => ({
												// 	value: item.name,
												// 	label: item.name,
												// }),
												options: [
													{
														value: 'm1',
														label: 'Merchant 1',
													},
													{
														value: 'm2',
														label: 'Merchant 2',
													},
												],
											}}
										/>
									</Col>

									<Col span={12}>
										<AtomBranchSelection required />
									</Col>

									<Col span={24}>
										<MoleculeSelectInputGroup
											name="customer"
											label="Pelanggan"
											placeholder="Pilih Pelanggan"
											required={true}
											onChange={(value) => {
												setCustomer(JSON.parse(value));
											}}
											data={{
												// url: 'customers',
												options: customerOptions,
												generateCustomOption: (
													item
												) => ({
													value: JSON.stringify(item),
													label: `${item.name.first_name} ${item.name.last_name} (${item.id}, ${item.email}, ${item.phone_number})`,
												}),
											}}
										/>
									</Col>

									<Col span={24}>
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
																		customer
																			.name
																			.first_name ||
																		''
																  } ${
																		customer
																			.name
																			.last_name ||
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
																? customer.phone_number
																: '-'
														}
													/>
												</Col>

												<Col span={12}>
													<MoleculeInfoGroup
														title="Email"
														content={
															customer
																? customer.email
																: '-'
														}
													/>
												</Col>

												<Col span={12}>
													<MoleculeInfoGroup
														title="Tanggal Lahir"
														content={
															customer ? (
																<ReactMoment format="DD/MM/YY">
																	{
																		customer.birth
																	}
																</ReactMoment>
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
											name="trans_source"
											label="Asal Transaksi"
											placeholder="Pilih Asal Transaksi"
											required={true}
											data={{
												options: [
													{
														value: 'manual',
														label: 'Manual',
													},
													{
														value: 'system',
														label: 'System',
													},
												],
											}}
										/>
									</Col>

									<Col span={12}>
										<MoleculeSelectInputGroup
											name="trans_kind"
											label="Jenis Transaksi"
											placeholder="Pilih Jenis Transaksi"
											required={true}
											onChange={(value) =>
												changeTransTypeValue(value)
											}
											data={{
												options: [
													{
														value:
															'adjustment_credit',
														label:
															'Adjustment Credit',
													},
													{
														value:
															'adjustment_debt',
														label:
															'Adjustment Debit',
													},
													{
														value: 'cashback',
														label: 'Cashback',
													},
													{
														value: 'payment',
														label: 'Pembayaran',
													},
													{
														value: 'refund',
														label:
															'Pengembalian Dana',
													},
													{
														value: 'top_up',
														label: 'Top Up',
													},
												],
											}}
										/>
									</Col>

									<Col span={12}>
										<MoleculeTextInputGroup
											label="Tipe Transaksi"
											name="trans_type"
											placeholder="Pilih jenis transaksi terlebih dahulu"
											type="text"
											value={transType}
											readOnly
										/>
									</Col>

									<Col span={12}>
										<MoleculeSelectInputGroup
											name="fund_source"
											label="Sumber / Tujuan Dana"
											placeholder="Pilih Sumber / Tujuan Dana"
											required={true}
											data={{
												options: [
													{
														value: 'freezy_point',
														label: 'Freezy Point',
													},
													{
														value: 'freezy_cash',
														label: 'Freezy Cash',
													},
												],
											}}
										/>
									</Col>

									<Col span={12}>
										<MoleculeNumberInputGroup
											label="Nominal Transaksi (Rp)"
											name="total"
											placeholder="Masukkan Nominal Transaksi"
											required={true}
										/>
									</Col>

									<Col span={12}>
										<MoleculeTextInputGroup
											label="Keterangan"
											name="description"
											placeholder="Masukkan Keterangan"
											type="textarea"
											autoSize={{
												maxRows: 6,
											}}
											required
										/>
									</Col>
								</Row>
							</AtomCard>
						</Col>

						<Col className="mt4" span={24}>
							<MoleculeModifyActionButtons
								backUrl="/transaction"
								isCreating={isCreating}
								isSubmitting={isSubmitting}
								label="Transaksi"
							/>
						</Col>
					</Row>
				</Form>
			)}
		</OrganismLayout>
	);
};

export default TransactionModifyPage;
