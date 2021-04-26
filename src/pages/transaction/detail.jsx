import React, { useEffect, useState } from 'react';
import ReactMoment from 'react-moment';

import { Col, message, Row, Skeleton, Space, Typography } from 'antd';
import { Link, useParams } from 'react-router-dom';

import AtomCard from '../../components/atoms/card';
import AtomNumberFormat from '../../components/atoms/number-format';
import AtomSecondaryButton from '../../components/atoms/button/secondary-button';
import MoleculeInfoGroup from '../../components/molecules/info-group';
import OrganismLayout from '../../components/organisms/layout';

import TransactionService, {
	translateTransactionKind,
	translateTransactionStatus,
} from '../../services/transaction';
const transactionService = new TransactionService();

const TransactionModifyPage = () => {
	const { id } = useParams();
	const [transaction, setTransaction] = useState(null);

	const getTransactionDetail = async () => {
		try {
			const {
				data: transaction,
			} = await transactionService.getTransactionById(id);
			// const transaction = {
			// 	id: 5,
			// 	transaction_from: 'manual',
			// 	transaction_for: 'cashback',
			// 	transaction_type: 'credit',
			// 	created_at: new Date(),
			// 	created_by: 'Mikasa',
			// 	finish_at: new Date(),
			// 	failed_at: new Date(),
			// 	customer: {
			// 		id: 83510986823,
			// 		name: {
			// 			first_name: 'Kim',
			// 			last_name: '',
			// 		},
			// 	},
			// 	total: 27500,
			// 	merchant: 'Freezy Fresh',
			// 	freezy_branch: 'Bandung',
			// 	rezeki_branch: 'Kalimantan',
			// 	freezy_cash: 15000,
			// 	freezy_point: 3500,
			// 	url_payment: 'http:/google.com',
			// 	description: 'System payment failed, do manual payment please',
			// 	status: 'success',
			// 	updated_at: new Date(),
			// 	updated_by: 'Eren',
			// };
			setTransaction(transaction);
		} catch (error) {
			message.error(error.message);
			console.error(error);
		}
	};

	useEffect(() => {
		(async () => {
			getTransactionDetail(id);
		})();
	}, []);

	return (
		<OrganismLayout
			breadcumbs={[
				{ name: 'Transaction', link: '/transaction' },
				{ name: 'Detail', link: location.pathname },
			]}
			title="Detail Transaction"
		>
			<Typography.Title level={4}>
				<span className="fw7">{`Detail Transaksi`.toUpperCase()}</span>
			</Typography.Title>

			{!transaction ? (
				<Skeleton active />
			) : (
				<Row align="top" className="mt4" gutter={24}>
					<Col span={18}>
						<AtomCard title="Info Transaksi">
							<Row gutter={[12, 24]}>
								<Col span={12}>
									<MoleculeInfoGroup
										title="ID Transaksi"
										content={transaction.id}
									/>
								</Col>

								<Col span={12}>
									<MoleculeInfoGroup
										title="Status"
										content={translateTransactionStatus(
											transaction.status
										)}
									/>
								</Col>

								<Col span={12}>
									<MoleculeInfoGroup
										title="Nominal Transaksi (Rp)"
										content={
											<AtomNumberFormat
												value={transaction.amount}
											/>
										}
									/>
								</Col>

								<Col span={12}>
									<MoleculeInfoGroup
										title="Merchant"
										content={transaction.product_owner_info}
									/>
								</Col>

								<Col span={12}>
									<MoleculeInfoGroup
										title="Jenis Transaksi"
										content={translateTransactionKind(
											transaction.transaction_for
										)}
									/>
								</Col>

								<Col span={12}>
									<MoleculeInfoGroup
										title="Tanggal Transaksi"
										content={
											<ReactMoment format="DD-MM-YYYY H:mm">
												{transaction.created_at}
											</ReactMoment>
										}
									/>
								</Col>

								<Col span={12}>
									<MoleculeInfoGroup
										title="Tipe Transaksi"
										content={
											transaction.transaction_type ===
											'DEBIT'
												? 'Debit'
												: 'Kredit'
										}
									/>
								</Col>

								<Col span={12}>
									<MoleculeInfoGroup
										title="Tanggal Transaksi Berhasil"
										content={
											transaction.finish_at ? (
												<ReactMoment format="DD/MM/YY H:mm:ss">
													{transaction.finish_at}
												</ReactMoment>
											) : (
												'-'
											)
										}
									/>
								</Col>

								<Col span={12}>
									<MoleculeInfoGroup
										title="Asal Transaksi"
										content={transaction.transaction_from}
									/>
								</Col>

								<Col span={12}>
									<MoleculeInfoGroup
										title="Tanggal Transaksi Gagal"
										content={
											transaction.failed_at ? (
												<ReactMoment format="DD/MM/YY H:mm:ss">
													{transaction.failed_at}
												</ReactMoment>
											) : (
												'-'
											)
										}
									/>
								</Col>

								<Col span={12}>
									<MoleculeInfoGroup
										title="Cabang Freezy"
										content={transaction.branch_info.id}
									/>
								</Col>

								<Col span={12}>
									<MoleculeInfoGroup
										title="Cabang Rezeki"
										content={transaction.branch_info.id}
									/>
								</Col>

								<Col span={24}>
									<fieldset>
										<legend>Sumber/Tujuan Dana</legend>
										<Row gutter={[12, 24]}>
											<Col span={12}>
												<MoleculeInfoGroup
													title="Freezy Cash (Rp)"
													content={
														transaction.source_or_destination ===
														'FREEZY_CASH' ? (
															<AtomNumberFormat
																value={`-${transaction.amount}`}
															/>
														) : (
															'-'
														)
													}
												/>
											</Col>

											<Col span={12}>
												<MoleculeInfoGroup
													title="Nominal Transaksi (Rp)"
													content={
														transaction.source_or_destination ===
														'FREEZY_POINT' ? (
															<AtomNumberFormat
																value={`-${transaction.amount}`}
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
									<MoleculeInfoGroup
										title="Nama Pelanggan"
										content={`${transaction.customer_info.name}`}
									/>
								</Col>

								<Col span={12}>
									<MoleculeInfoGroup
										title="ID Pelanggan"
										content={transaction.customer_info.code}
									/>
								</Col>

								<Col span={12}>
									<MoleculeInfoGroup
										title="URL Payment"
										content={
											<a
												href={`${transaction.payment_url}`}
											>
												{transaction.payment_url || '-'}
											</a>
										}
									/>
								</Col>

								<Col span={12}>
									<MoleculeInfoGroup
										title="Keterangan"
										content={transaction.note}
									/>
								</Col>

								<Col span={24} style={{ paddingTop: '2rem' }}>
									<Typography.Text strong>
										<span className="denim f5">
											INFO UPDATE PRODUK
										</span>
									</Typography.Text>
								</Col>

								<Col span={12}>
									<MoleculeInfoGroup
										title="Tanggal di Daftarkan"
										content={
											<ReactMoment format="DD-MM-YYYY">
												{transaction.created_at}
											</ReactMoment>
										}
									/>
								</Col>

								<Col span={12}>
									<MoleculeInfoGroup
										title="Tanggal di Update"
										content={
											<ReactMoment format="DD-MM-YYYY">
												{transaction.updated_at}
											</ReactMoment>
										}
									/>
								</Col>

								<Col span={12}>
									<MoleculeInfoGroup
										title="Didaftarkan Oleh"
										content={transaction.created_by}
									/>
								</Col>

								<Col span={12}>
									<MoleculeInfoGroup
										title="Diupdate Oleh"
										content={transaction.updated_by}
									/>
								</Col>
							</Row>
						</AtomCard>
					</Col>

					<Col className="mt4" span={24}>
						<Space>
							<Link to="/transaction">
								<AtomSecondaryButton size="large">
									Kembali
								</AtomSecondaryButton>
							</Link>
						</Space>
					</Col>
				</Row>
			)}
		</OrganismLayout>
	);
};

export default TransactionModifyPage;
