/* eslint-disable no-mixed-spaces-and-tabs */
import moment from 'moment';
import React, { useEffect, useState } from 'react';
import {
	Col,
	Form,
	message,
	Row,
	Skeleton,
	// Tabs,
	Typography,
} from 'antd';
import { useHistory, useLocation, useParams } from 'react-router-dom';

import AtomCard from '../../components/atoms/card';
import MoleculeDatePickerGroup from '../../components/molecules/input-group/date-time-input';
import MoleculeModifyActionButtons from '../../components/molecules/modify-action-buttons';
import MoleculeNumberInputGroup from '../../components/molecules/input-group/number-input';
import MoleculeSelectInputGroup from '../../components/molecules/input-group/select-input';
import MoleculeTextEditorGroup from '../../components/molecules/input-group/text-editor';
import MoleculeTextInputGroup from '../../components/molecules/input-group/text-input';
import OrganismLayout from '../../components/organisms/layout';

import VoucherService from '../../services/voucher';
import { generateFormFailedError } from '../../utils/helpers';

const VoucherModifyPage = () => {
	const voucherService = new VoucherService();

	const { id } = useParams();
	const location = useLocation();
	const history = useHistory();
	const isCreating = location.pathname.includes('add') ? true : false;

	const [form] = Form.useForm();
	const [isSubmitting, setIsSubmitting] = useState(false);
	const [voucher, setVoucher] = useState(null);

	const [cashbackNominal, setCashbackNominal] = useState(null);
	const [howToUseEn, setHowToUseEn] = useState('');
	const [howToUseId, setHowToUseId] = useState('');
	const [maxDiscount, setMaxDiscount] = useState(null);
	const [minOrder, setMinOrder] = useState(null);
	const [quota, setQuota] = useState(null);
	const [termEn, setTermEn] = useState('');
	const [termId, setTermId] = useState('');

	const [isCashbackNominalEnabled, setIsCashbackNominalEnabled] = useState(
		false
	);
	const [isCodeEnabled, setIsCodeEnabled] = useState(false);

	const getVoucherDetail = async (id) => {
		try {
			let voucher = await voucherService.getVoucherById(id);
			voucher = voucher.data;

			setVoucher(voucher);
			setTermId(voucher.terms_and_condition?.id);
			setTermEn(voucher.terms_and_condition?.en);
			setHowToUseId(voucher.how_to_use?.id);
			setHowToUseEn(voucher.how_to_use?.en);
		} catch (error) {
			message.error(error.message);
			console.error(error);
		}
	};

	const submit = async (values) => {
		try {
			setIsSubmitting(true);

			const data = new FormData();
			data.append('target', values.target);
			data.append('code', values.code);
			data.append('name[id]', values.id_name);
			data.append('name[en]', values.en_name);
			data.append('cashback_type', values.cashback_type);
			data.append('cashback_percentage', values.cashback_percentage);
			data.append('cashback_rp', values.cashback_rp);
			data.append('max_discount_rp', values.max_discount_rp);
			data.append('min_order_rp', values.min_order_rp);
			data.append('quota', values.quota);
			data.append('estimation_costs_rp', values.estimation_costs_rp);
			data.append('start_date_periode', values.start_date_periode);
			data.append('end_date_periode', values.end_date_periode);
			data.append('start_time_periode', values.start_time_periode);
			data.append('end_time_periode', values.end_time_periode);

			if (isCreating) {
				await voucherService.createVoucher(data);

				message.success('Berhasil menambah voucher');
			} else {
				await voucherService.editVoucher(id, data);
				message.success('Berhasil mengubah voucher');
			}

			message.info(
				'Akan dikembalikan ke halaman daftar voucher dalam 2 detik'
			);
			setTimeout(() => {
				history.push('/voucher');
			}, 2000);
		} catch (error) {
			message.error(error.message);
			console.error(error);
		} finally {
			setIsSubmitting(false);
		}
	};

	const setVoucherInitialValues = () => {
		return isCreating || !voucher
			? {}
			: {
					target: voucher.target,
					code: voucher.code,
					en_name: voucher.name ? voucher.name.en : null,
					id_name: voucher.name ? voucher.name.id : null,
					cashback_type: voucher.cashback_type,
					cashback_percentage: voucher.cashback_percentage,
					cashback_rp: voucher.cashback_rp,
					max_discount_rp: voucher.max_discount_rp,
					min_order_rp: voucher.min_order_rp,
					quota: voucher.quota,
					estimation_costs_rp: voucher.estimation_costs_rp,
					start_date_periode: moment(
						new Date(voucher.start_date_periode)
					),
					end_date_periode: moment(
						new Date(voucher.end_date_periode)
					),
					start_time_periode: voucher.start_time_periode,
					end_time_periode: voucher.end_time_periode,
			  };
	};

	useEffect(() => {
		if (isCashbackNominalEnabled) {
			form.setFieldsValue({
				cashback_percentage: null,
				max_discount_rp: null,
			});
		} else {
			form.setFieldsValue({
				cashback_rp: null,
			});
		}
	}, [isCashbackNominalEnabled]);

	useEffect(() => {
		if (isCashbackNominalEnabled) {
			form.setFieldsValue({
				estimation_costs_rp: cashbackNominal,
			});
		} else {
			if (quota) {
				const _quota = quota.target.value || 0;
				form.setFieldsValue({
					estimation_costs_rp: _quota * (maxDiscount || 0),
				});
			}
		}
	}, [cashbackNominal, maxDiscount, quota]);

	useEffect(() => {
		if (!isCodeEnabled) {
			form.setFieldsValue({
				code: null,
			});
		}
	}, [isCodeEnabled]);

	useEffect(() => {
		console.log('');
	}, [minOrder]);

	useEffect(() => {
		(async () => {
			if (!isCreating) {
				await getVoucherDetail(id);
			}
		})();
	}, []);

	return (
		<OrganismLayout
			breadcumbs={[
				{ name: 'Voucher', link: '/voucher' },
				{
					name: location.pathname.includes('add') ? 'Tambah' : 'Ubah',
					link: location.pathname,
				},
			]}
			title={`${isCreating ? 'Tambah' : 'Ubah'} Voucher`}
		>
			<Typography.Title level={4}>
				<span className="fw7">
					{`${isCreating ? 'Tambah' : 'Ubah'} Voucher`.toUpperCase()}
				</span>
			</Typography.Title>

			{!isCreating && !voucher ? (
				<Skeleton active />
			) : (
				<Form
					className="w-100 mt4"
					name="modify_voucher"
					form={form}
					initialValues={setVoucherInitialValues()}
					onFinish={submit}
					onFinishFailed={(errors) => {
						message.error(
							`Failed: ${generateFormFailedError(errors)}`
						);
					}}
				>
					<Row>
						<Col span={18}>
							<AtomCard title="Info Voucher">
								<Row gutter={12}>
									<Col span={12}>
										<MoleculeSelectInputGroup
											label="Target Voucher"
											name="target"
											placeholder="Pilih Target Voucher"
											required={true}
											value="PUBLIC"
											onChange={(value) =>
												setIsCodeEnabled(
													value === 'LIMITED'
												)
											}
											data={{
												options: [
													{
														value: 'PUBLIC',
														label: 'Publik',
													},
													{
														value: 'LIMITED',
														label: 'Terbatas',
													},
												],
											}}
										/>
									</Col>

									<Col span={12}>
										<MoleculeTextInputGroup
											disabled={!isCodeEnabled}
											maxLength={10}
											minLength={10}
											name="code"
											label="Kode Voucher"
											placeholder="Masukkan Kode Voucher"
											type="alphanumeric"
										/>
									</Col>

									<Col span={12}>
										<MoleculeTextInputGroup
											label="Nama Voucher (ID)"
											name="id_name"
											placeholder="Masukkan Nama Voucher (ID)"
											type="text"
											required={true}
										/>
									</Col>

									<Col span={12}>
										<MoleculeTextInputGroup
											label="Nama Voucher (EN)"
											name="en_name"
											placeholder="Masukkan Nama Voucher (EN)"
											type="text"
											required={true}
										/>
									</Col>

									<Col span={12}>
										<MoleculeSelectInputGroup
											label="Tipe Cashback"
											name="cashback_type"
											placeholder="Pilih Tipe Cashback"
											required={true}
											value="RUPIAH"
											onChange={(value) =>
												setIsCashbackNominalEnabled(
													value === 'RUPIAH'
												)
											}
											data={{
												options: [
													{
														value: 'RUPIAH',
														label: 'Rupiah',
													},
													{
														value: 'PERSENTAGE',
														label: 'Persentase',
													},
												],
											}}
										/>
									</Col>

									<Col span={12}></Col>

									<Col span={12}>
										<MoleculeTextInputGroup
											disabled={isCashbackNominalEnabled}
											name="cashback_percentage"
											label="Persentase Cashback (%)"
											placeholder="Masukkan Persentase Cashback"
											type="number"
										/>
									</Col>

									<Col span={12}>
										<MoleculeNumberInputGroup
											disabled={!isCashbackNominalEnabled}
											name="cashback_rp"
											label="Nominal Cashback (Rp)"
											placeholder="Masukkan Nominal Cashback (Rp)"
											onChange={(value) =>
												setCashbackNominal(value)
											}
										/>
									</Col>

									<Col span={12}>
										<MoleculeNumberInputGroup
											disabled={isCashbackNominalEnabled}
											name="max_discount_rp"
											label="Maksimum Pembelian (Rp)"
											placeholder="Masukkan Maksimum Pembelian (Rp)"
											onChange={(value) =>
												setMaxDiscount(value)
											}
										/>
									</Col>

									<Col span={12}>
										<MoleculeNumberInputGroup
											name="min_discount_rp"
											label="Minimal Pembelian (Rp)"
											placeholder="Masukkan Minimal Pembelian (Rp)"
											rules={({ getFieldValue }) => ({
												validator(_, value) {
													if (
														value <
															getFieldValue(
																'cashback_rp'
															) ||
														value <
															getFieldValue(
																'max_discount_rp'
															)
													) {
														return Promise.resolve();
													}
													return Promise.reject(
														'Minimum Pembelian Tidak Boleh Kurang Dari Nominal Diskon atau Maksimum Diskon'
													);
												},
											})}
											onChange={(value) =>
												setMinOrder(value)
											}
										/>
									</Col>

									<Col span={12}>
										<MoleculeNumberInputGroup
											name="quota"
											label="Kuota"
											placeholder="Masukkan Kuota"
											onChange={(value) =>
												setQuota(value)
											}
											required={true}
										/>
									</Col>

									<Col span={12}>
										<MoleculeNumberInputGroup
											name="estimation_costs_rp"
											label="Maksimum Pengeluaran Toko (Rp)"
											placeholder="0"
											value={0}
											readOnly
										/>
									</Col>

									<Col span={12}>
										<MoleculeDatePickerGroup
											format={'YYYY-MM-DD'}
											label="Tanggal Mulai"
											name="start_date_periode"
											placeholder="Tanggal Lahir"
											required={true}
										/>
									</Col>

									<Col span={12}>
										<MoleculeDatePickerGroup
											// format={'YYYY-MM-DD'}
											label="Jam Mulai"
											type="time"
											name="start_time_periode"
											placeholder="Jam Mulai"
											required={true}
										/>
									</Col>

									<Col span={12}>
										<MoleculeDatePickerGroup
											format={'YYYY-MM-DD'}
											label="Tanggal Selesai"
											name="end_date_periode"
											placeholder="Tanggal Selesai"
											required={true}
										/>
									</Col>

									<Col span={12}>
										<MoleculeDatePickerGroup
											// format={'YYYY-MM-DD'}
											label="Jam Selesai"
											type="time"
											name="end_time_periode"
											placeholder="Jam Selesai"
											required={true}
										/>
									</Col>

									<Col span={24}>
										<MoleculeTextEditorGroup
											label="Syarat dan Ketentuan (ID)"
											onChange={setTermId}
											value={termId}
										/>
									</Col>

									<Col span={24}>
										<MoleculeTextEditorGroup
											label="Syarat dan Ketentuan (EN)"
											onChange={setTermEn}
											value={termEn}
										/>
									</Col>

									<Col span={24}>
										<MoleculeTextEditorGroup
											label="Cara Pakai (ID)"
											onChange={setHowToUseId}
											value={howToUseId}
										/>
									</Col>

									<Col span={24}>
										<MoleculeTextEditorGroup
											label="Cara Pakai (EN)"
											onChange={setHowToUseEn}
											value={howToUseEn}
										/>
									</Col>
								</Row>
							</AtomCard>
						</Col>

						<Col className="mt4" span={24}>
							<MoleculeModifyActionButtons
								backUrl="/voucher"
								isCreating={isCreating}
								isSubmitting={isSubmitting}
								label="Voucher"
							/>
						</Col>
					</Row>
				</Form>
			)}
		</OrganismLayout>
	);
};

export default VoucherModifyPage;
