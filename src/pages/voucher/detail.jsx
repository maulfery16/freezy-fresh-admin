import React, { useEffect, useState } from 'react';
import ReactMoment from 'react-moment';

import { Col, message, Row, Skeleton, Space, Typography } from 'antd';
import { Link, useParams } from 'react-router-dom';

import AtomCard from '../../components/atoms/card';
import AtomNumberFormat from '../../components/atoms/number-format';
import AtomSecondaryButton from '../../components/atoms/button/secondary-button';
import MoleculeInfoGroup from '../../components/molecules/info-group';
import OrganismLayout from '../../components/organisms/layout';

import VoucherService from '../../services/voucher';
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
				<Row align="top" className="mt4" gutter={24}>
					<Col span={18}>
						<AtomCard title="Info Voucher">
							<Row gutter={[12, 24]}>
								<Col span={12}>
									<MoleculeInfoGroup
										title="Target Voucher"
										content={voucher.target}
									/>
								</Col>

								<Col span={12}>
									<MoleculeInfoGroup
										title="Name Voucher"
										content={voucher.code || '-'}
									/>
								</Col>

								<Col span={12}>
									<MoleculeInfoGroup
										title="Name Voucher"
										content={voucher.name}
									/>
								</Col>

								<Col span={12}>
									<MoleculeInfoGroup
										title="Tipe Voucher"
										content={
											voucher.cashback_type ===
											'PERSENTAGE'
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
												value={voucher.cashback_rp || 0}
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
													voucher.min_order_rp || 0
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
													voucher.max_discount_rp || 0
												}
											/>
										}
									/>
								</Col>

								<Col span={24} style={{ paddingTop: '2rem' }}>
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
												{voucher.start_periode}
											</ReactMoment>
										}
									/>
								</Col>

								<Col span={12}>
									<MoleculeInfoGroup
										title="Jam Mulai"
										content={
											voucher.start_time_periode || '-'
										}
									/>
								</Col>

								<Col span={12}>
									<MoleculeInfoGroup
										title="Tanggal Selesai"
										content={
											<ReactMoment format="DD-MM-YY">
												{voucher.end_periode}
											</ReactMoment>
										}
									/>
								</Col>

								<Col span={12}>
									<MoleculeInfoGroup
										title="Jam Selesai"
										content={
											voucher.end_time_periode || '-'
										}
									/>
								</Col>

								<Col span={24} style={{ paddingTop: '2rem' }}>
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
										content={voucher.created_by || '-'}
									/>
								</Col>

								<Col span={12}>
									<MoleculeInfoGroup
										title="Diupdate Oleh"
										content={voucher.updated_by || '-'}
									/>
								</Col>
							</Row>
						</AtomCard>
					</Col>

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
			)}
		</OrganismLayout>
	);
};

export default VoucherModifyPage;
