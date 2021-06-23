/* eslint-disable no-mixed-spaces-and-tabs */
import moment from 'moment';
import React, { useEffect, useState } from 'react';
import { Col, Form, message, Row, Skeleton, Tabs, Typography } from 'antd';
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

	let defaultStartDate = new Date();
	defaultStartDate.setDate(defaultStartDate.getDate() + 1);
	let defaultEndDate = new Date();
	defaultEndDate.setDate(defaultEndDate.getDate() + 7);

	const [cashbackNominal, setCashbackNominal] = useState(0);
	const [cashbackPeriode, setCashbackPeriode] = useState({
		start_periode: moment(defaultStartDate, 'YYYY-MM-DD HH:mm:ss'),
		end_periode: moment(defaultEndDate, 'YYYY-MM-DD HH:mm:ss'),
	});

	const [howToUseEn, setHowToUseEn] = useState('');
	const [howToUseId, setHowToUseId] = useState('');
	const [maxDiscount, setMaxDiscount] = useState(0);
	const [minOrder, setMinOrder] = useState(null);
	const [minOrderValidation, setMinOrderValidation] = useState({
		validateStatus: 'success',
		errorMsg: null,
	});
	const [quota, setQuota] = useState(null);
	const [termEn, setTermEn] = useState('');
	const [termId, setTermId] = useState('');

	const [isCashbackNominalEnabled, setIsCashbackNominalEnabled] =
		useState(false);
	const [isCodeEnabled, setIsCodeEnabled] = useState(false);

	const getVoucherDetail = async (id) => {
		try {
			const { data: voucher } = await voucherService.getVoucherById(id);
			setVoucher(voucher);

			setIsCodeEnabled(voucher.target === 'LIMITED');
			setCashbackNominal(voucher.cashback_rp);
			setCashbackPeriode({
				start_periode: moment(
					voucher.start_periode,
					'YYYY-MM-DD HH:mm:ss'
				),
				end_periode: moment(voucher.end_periode, 'YYYY-MM-DD HH:mm:ss'),
			});
			setHowToUseEn(voucher.how_to_use?.en);
			setHowToUseId(voucher.how_to_use?.id);
			setIsCashbackNominalEnabled(voucher.type === 'RUPIAH');
			setMaxDiscount(voucher.max_discount_rp);
			setMinOrder(voucher.cashback_rp);
			setTermEn(voucher.terms_and_condition?.en);
			setTermId(voucher.terms_and_condition?.id);
		} catch (error) {
			message.error(error.message);
			console.error(error);
		}
	};

	const submit = async (values) => {
		if (!termEn || !termId) {
			message.error('Syarat dan Ketentuan wajib diisi');
			return false;
		}
		if (!howToUseEn || !howToUseId) {
			message.error('Cara Pakai wajib diisi');
			return false;
		}
		if (!cashbackPeriode) {
			message.error('Periode Cashback wajib diisi');
			return false;
		}

		try {
			setIsSubmitting(true);

			const data = new FormData();
			data.append('target', values.target);
			data.append('code', values.code || '0000000000');
			data.append('name[id]', values.id_name);
			data.append('name[en]', values.en_name);
			data.append('cashback_type', values.cashback_type);
			data.append('cashback_percentage', values.cashback_percentage || 0);
			data.append('cashback_rp', values.cashback_rp || 0);
			data.append('max_discount_rp', values.max_discount_rp || 0);
			data.append('min_order_rp', values.min_order_rp);
			data.append('quota', values.quota);
			data.append('estimation_costs_rp', values.estimation_costs_rp);
			data.append(
				'start_periode',
				moment(cashbackPeriode.start_periode, 'YYYY-MM-DD HH:mm:ss')
			);
			data.append(
				'end_periode',
				moment(cashbackPeriode.end_periode, 'YYYY-MM-DD HH:mm:ss')
			);
			data.append('how_to_use[id]', howToUseId);
			data.append('how_to_use[en]', howToUseEn);
			data.append('terms_and_condition[id]', termId);
			data.append('terms_and_condition[en]', termEn);

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
					cashback_periode: moment(
						new Date(voucher.start_periode),
						'YYYY-MM-DD HH:mm:ss'
					),
					end_periode: moment(
						new Date(voucher.end_periode),
						'YYYY-MM-DD HH:mm:ss'
					),
			  };
	};

	const validateMinOrder = () => {
		if (!isCashbackNominalEnabled && minOrder > maxDiscount) {
			setMinOrderValidation({
				validateStatus: 'error',
				errorMsg:
					'Minimum Pembelian Tidak Boleh Kurang Dari Maksimum Diskon',
			});
			return;
		}

		if (isCashbackNominalEnabled && minOrder > cashbackNominal) {
			setMinOrderValidation({
				validateStatus: 'error',
				errorMsg:
					'Minimum Pembelian Tidak Boleh Kurang Dari Nominal Diskon',
			});
			return;
		}

		setMinOrderValidation({
			validateStatus: 'success',
			errorMsg: null,
		});
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
			form.setFieldsValue({
				estimation_costs_rp: (quota || 0) * (maxDiscount || 0),
			});
		}

		validateMinOrder();
	}, [cashbackNominal, maxDiscount, quota]);

	useEffect(() => {
		if (!isCodeEnabled) {
			form.setFieldsValue({
				code: null,
			});
		}
	}, [isCodeEnabled]);

	useEffect(() => {
		validateMinOrder();
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
					<Tabs defaultActiveKey="1">
						<Tabs.TabPane
							tab={`Info Voucher`.toUpperCase()}
							key="1"
						>
							<Row align="top" gutter={24}>
								<Col span={24}>
									<AtomCard title="">
										<Row gutter={24}>
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
													help="Kode harus 10 karakter huruf atau angka"
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
																value: 'PERCENTAGE',
																label: 'Persentase',
															},
														],
													}}
												/>
											</Col>

											<Col span={12}></Col>

											<Col span={12}>
												<MoleculeNumberInputGroup
													disabled={
														isCashbackNominalEnabled
													}
													max={100}
													name="cashback_percentage"
													label="Persentase Cashback (%)"
													placeholder="Masukkan Persentase Cashback"
												/>
											</Col>

											<Col span={12}>
												<MoleculeNumberInputGroup
													disabled={
														!isCashbackNominalEnabled
													}
													name="cashback_rp"
													label="Nominal Cashback (Rp)"
													placeholder="Masukkan Nominal Cashback (Rp)"
													onChange={(value) =>
														setCashbackNominal(
															value
														)
													}
												/>
											</Col>

											<Col span={12}>
												<MoleculeNumberInputGroup
													disabled={
														isCashbackNominalEnabled
													}
													name="max_discount_rp"
													label="Maksimum Diskon (Rp)"
													placeholder="Masukkan Maksimum Diskon (Rp)"
													onChange={(value) =>
														setMaxDiscount(value)
													}
												/>
											</Col>

											<Col span={12}>
												<MoleculeNumberInputGroup
													name="min_order_rp"
													label="Minimal Pembelian (Rp)"
													placeholder="Masukkan Minimal Pembelian (Rp)"
													help={
														minOrderValidation.errorMsg ||
														''
													}
													validateStatus={
														minOrderValidation.validateStatus
													}
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
													readOnly
												/>
											</Col>

											<Col span={24}>
												<MoleculeDatePickerGroup
													format="YYYY-MM-DD HH:mm:ss"
													isDisabledDate={true}
													isDisabledTime={true}
													label="Periode Cashback"
													name="cashback_periode"
													onChange={(date) => {
														setCashbackPeriode({
															...cashbackPeriode,
															start_periode:
																date[0],
															end_periode:
																date[1],
														});
													}}
													placeholder={[
														'Tanggal dan Jam Mulai',
														'Tanggal dan Jam Selesai',
													]}
													defaultValue={[
														cashbackPeriode.start_periode,
														cashbackPeriode.end_periode,
													]}
													showTime={{
														hideDisabledOptions: true,
													}}
													type="range"
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
								<Col span={24}>
									<AtomCard>
										<Row gutter={24}>
											<Col span={24}>
												<MoleculeTextEditorGroup
													label="Syarat dan Ketentuan (ID)"
													onChange={setTermId}
													value={termId}
													required={true}
												/>
											</Col>

											<Col span={24}>
												<MoleculeTextEditorGroup
													label="Syarat dan Ketentuan (EN)"
													onChange={setTermEn}
													value={termEn}
													required={true}
												/>
											</Col>
										</Row>
									</AtomCard>
								</Col>
							</Row>
						</Tabs.TabPane>

						<Tabs.TabPane tab={`Cara Pakai`.toUpperCase()} key="3">
							<Row align="top" gutter={24}>
								<Col span={24}>
									<AtomCard>
										<Row gutter={24}>
											<Col span={24}>
												<MoleculeTextEditorGroup
													label="Cara Pakai (ID)"
													onChange={setHowToUseId}
													value={howToUseId}
													required={true}
												/>
											</Col>

											<Col span={24}>
												<MoleculeTextEditorGroup
													label="Cara Pakai (EN)"
													onChange={setHowToUseEn}
													value={howToUseEn}
													required={true}
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
