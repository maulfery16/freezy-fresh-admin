import React, { useEffect, useState } from 'react';
import ReactMoment from 'react-moment';

import { Col, message, Row, Skeleton, Space, Tabs, Typography } from 'antd';
import { Link, useParams } from 'react-router-dom';

import AtomCard from '../../components/atoms/card';
import AtomNumberFormat from '../../components/atoms/number-format';
import AtomSecondaryButton from '../../components/atoms/button/secondary-button';
import MoleculeInfoGroup from '../../components/molecules/info-group';
import MoleculeMarkdownRenderer from '../../components/molecules/markdown-renderer';
import OrganismLayout from '../../components/organisms/layout';

import VoucherService, {
	translateVoucherTargetEnum,
} from '../../services/voucher';
const voucherService = new VoucherService();

const VoucherModifyPage = () => {
	const { id } = useParams();
	const [voucher, setVoucher] = useState(null);

	const getVoucherDetail = async () => {
		try {
			const voucher = await voucherService.getVoucherById(id);
			setVoucher(voucher.data);
		} catch (error) {
			message.error(error.message);
			console.error(error);
		}
	};

	useEffect(() => {
		(async () => {
			getVoucherDetail(id);
		})();
	}, []);

	return (
		<OrganismLayout
			breadcumbs={[
				{ name: 'Voucher', link: '/voucher' },
				{ name: 'Detail', link: location.pathname },
			]}
			title="Detail Voucher"
		>
			<Typography.Title level={4}>
				<span className="fw7">{`Detail Voucher`.toUpperCase()}</span>
			</Typography.Title>

			{!voucher ? (
				<Skeleton active />
			) : (
				<>
					<Tabs defaultActiveKey="1">
						<Tabs.TabPane
							tab={`Info Voucher`.toUpperCase()}
							key="1"
						>
							<Row align="top" gutter={24}>
								<Col span={20}>
									<AtomCard title="">
										<Row gutter={[12, 24]}>
											<Col span={12}>
												<MoleculeInfoGroup
													title="Target Voucher"
													content={translateVoucherTargetEnum(
														voucher.target
													)}
												/>
											</Col>

											<Col span={12}>
												<MoleculeInfoGroup
													title="Name Voucher"
													content={
														voucher.code || '-'
													}
												/>
											</Col>

											<Col span={12}>
												<MoleculeInfoGroup
													title="Name Voucher (ID)"
													content={voucher.name?.id}
												/>
											</Col>

											<Col span={12}>
												<MoleculeInfoGroup
													title="Name Voucher (EN)"
													content={voucher.name?.en}
												/>
											</Col>

											<Col span={12}>
												<MoleculeInfoGroup
													title="Tipe Voucher"
													content={
														voucher.cashback_type ===
														'PERCENTAGE'
															? 'Persentase'
															: 'Rupiah'
													}
												/>
											</Col>

											<Col span={12}>
												<MoleculeInfoGroup
													title="Nominal Cashback (Rp)"
													content={
														<AtomNumberFormat
															value={
																voucher.cashback_rp ||
																0
															}
														/>
													}
												/>
											</Col>

											<Col span={12}>
												<MoleculeInfoGroup
													title="Kuota"
													content={voucher.quota}
												/>
											</Col>

											<Col span={12}>
												<MoleculeInfoGroup
													title="Minimum Pembalian (Rp)"
													content={
														<AtomNumberFormat
															value={
																voucher.min_order_rp ||
																0
															}
														/>
													}
												/>
											</Col>

											<Col span={12}>
												<MoleculeInfoGroup
													title="Maksimal Pembelian (Rp)"
													content={
														<AtomNumberFormat
															value={
																voucher.max_discount_rp ||
																0
															}
														/>
													}
												/>
											</Col>

											<Col
												span={24}
												style={{ paddingTop: '2rem' }}
											>
												<Typography.Text strong>
													<span className="denim f5">
														INFO PERIODE
													</span>
												</Typography.Text>
											</Col>

											<Col span={12}>
												<MoleculeInfoGroup
													title="Tanggal Mulai"
													content={
														<ReactMoment format="DD-MM-YY">
															{
																voucher.start_periode
															}
														</ReactMoment>
													}
												/>
											</Col>

											<Col span={12}>
												<MoleculeInfoGroup
													title="Jam Mulai"
													content={
														voucher.start_time_periode ||
														'-'
													}
												/>
											</Col>

											<Col span={12}>
												<MoleculeInfoGroup
													title="Tanggal Selesai"
													content={
														<ReactMoment format="DD-MM-YY">
															{
																voucher.end_periode
															}
														</ReactMoment>
													}
												/>
											</Col>

											<Col span={12}>
												<MoleculeInfoGroup
													title="Jam Selesai"
													content={
														voucher.end_time_periode ||
														'-'
													}
												/>
											</Col>

											<Col
												span={24}
												style={{ paddingTop: '2rem' }}
											>
												<Typography.Text strong>
													<span className="denim f5">
														INFO UPDATE
													</span>
												</Typography.Text>
											</Col>

											<Col span={12}>
												<MoleculeInfoGroup
													title="Tanggal di Daftarkan"
													content={
														<ReactMoment format="DD-MM-YY">
															{voucher.created_at}
														</ReactMoment>
													}
												/>
											</Col>

											<Col span={12}>
												<MoleculeInfoGroup
													title="Tanggal di Update"
													content={
														<ReactMoment format="DD-MM-YY">
															{voucher.updated_at}
														</ReactMoment>
													}
												/>
											</Col>

											<Col span={12}>
												<MoleculeInfoGroup
													title="Didaftarkan Oleh"
													content={
														voucher.created_by ||
														'-'
													}
												/>
											</Col>

											<Col span={12}>
												<MoleculeInfoGroup
													title="Diupdate Oleh"
													content={
														voucher.updated_by ||
														'-'
													}
												/>
											</Col>
										</Row>
									</AtomCard>
								</Col>
							</Row>
						</Tabs.TabPane>

						<Tabs.TabPane
							tab={`Syarat & ketentuan`.toUpperCase()}
							key="2"
						>
							<Row align="top" gutter={24}>
								<Col span={20}>
									<AtomCard title="">
										<Row gutter={24}>
											<Col span={24}>
												<MoleculeInfoGroup
													title="Syarat dan Ketentuan (ID)"
													content={
														<MoleculeMarkdownRenderer
															withBorder
															text={
																voucher
																	.terms_and_condition
																	.id
															}
														/>
													}
												/>
											</Col>

											<Col span={24}>
												<MoleculeInfoGroup
													title="Syarat dan Ketentuan (EN)"
													content={
														<MoleculeMarkdownRenderer
															withBorder
															text={
																voucher
																	.terms_and_condition
																	.en
															}
														/>
													}
												/>
											</Col>
										</Row>
									</AtomCard>
								</Col>
							</Row>
						</Tabs.TabPane>

						<Tabs.TabPane tab={`Cara Pakai`.toUpperCase()} key="3">
							<Row align="top" gutter={24}>
								<Col span={20}>
									<AtomCard>
										<Row gutter={24}>
											<Col span={24}>
												<MoleculeInfoGroup
													title="Cara Pakai (ID)"
													content={
														<MoleculeMarkdownRenderer
															withBorder
															text={
																voucher
																	.how_to_use
																	.id
															}
														/>
													}
												/>
											</Col>

											<Col span={24}>
												<MoleculeInfoGroup
													title="Cara Pakai (EN)"
													content={
														<MoleculeMarkdownRenderer
															withBorder
															text={
																voucher
																	.how_to_use
																	.en
															}
														/>
													}
												/>
											</Col>
										</Row>
									</AtomCard>
								</Col>
							</Row>
						</Tabs.TabPane>
					</Tabs>
					<Row>
						<Col className="mt4" span={24}>
							<Space>
								<Link to="/voucher">
									<AtomSecondaryButton size="large">
										Kembali
									</AtomSecondaryButton>
								</Link>
							</Space>
						</Col>
					</Row>
				</>
			)}
		</OrganismLayout>
	);
};

export default VoucherModifyPage;
