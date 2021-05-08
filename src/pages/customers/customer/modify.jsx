/* eslint-disable no-mixed-spaces-and-tabs */
import moment from 'moment';
import React, { useEffect, useRef, useState } from 'react';
import { Col, Form, message, Row, Skeleton, Typography } from 'antd';
import { useHistory, useLocation, useParams } from 'react-router-dom';

import AtomCard from '../../../components/atoms/card';
import MoleculeDatePickerGroup from '../../../components/molecules/input-group/date-time-input';
import MoleculeFileInputGroup from '../../../components/molecules/input-group/file-input';
import MoleculeModifyActionButtons from '../../../components/molecules/modify-action-buttons';
import MoleculeSelectInputGroup from '../../../components/molecules/input-group/select-input';
import MoleculeTextInputGroup from '../../../components/molecules/input-group/text-input';
import OrganismLayout from '../../../components/organisms/layout';

import PelangganService from '../../../services/customer';

const PelangganModifyPage = () => {
	const { id } = useParams();
	const customerService = new PelangganService();
	const location = useLocation();
	const history = useHistory();
	const isCreating = location.pathname.includes('add') ? true : false;

	const [customer, setCustomer] = useState(null);
	const [isSubmitting, setIsSubmitting] = useState(false);
	const profileImageRef = useRef();
	const idCardImageRef = useRef();

	const getCustomerDetail = async (id) => {
		try {
			const { data: customer } = await customerService.getCustomerById(
				id
			);

			setCustomer(customer);
		} catch (error) {
			message.error(error.message);
			console.error(error);
		}
	};

	const setCustomerInitialValues = () => {
		return isCreating
			? {}
			: {
					birth: moment(new Date(customer.birth)),
					email: customer.email,
					first_name: customer.first_name,
					gender: customer.gender,
					id_card_image: customer.id_card_image,
					last_name: customer.last_name,
					marital_status: customer.marital_status,
					phone_number: customer.phone_number,
					profile_image: customer.profile_image,
					frequency_groceries_one_month:
						customer.frequency_groceries_one_month,
			  };
	};

	const submit = async (values) => {
		try {
			setIsSubmitting(true);
			const profileImage = await profileImageRef.current.getImage();
			const idCardImage = await idCardImageRef.current.getImage();

			const data = new FormData();
			data.append('birth', values.birth);
			data.append('email', values.email);
			data.append('first_name', values.first_name);
			data.append(
				'frequency_groceries_one_month',
				values.frequency_groceries_one_month
			);
			data.append('gender', values.gender);
			data.append('last_name', values.last_name);
			data.append('marital_status', values.marital_status);
			data.append('phone_number', values.phone_number);
			if (idCardImage) data.append('id_card_image', idCardImage);
			if (profileImage) data.append('profile_image', profileImage);

			if (isCreating) {
				await customerService.createCustomer(data);
				message.success('Berhasil menambah pelanggan');
			} else {
				await customerService.editCustomer(id, data);
				message.success('Berhasil mengubah pelanggan');
			}

			message.info(
				'Akan dikembalikan ke halaman daftar pelanggan dalam 2 detik'
			);
			setTimeout(() => {
				history.push('/customer');
			}, 2000);
		} catch (error) {
			message.error(error.message);
			console.error(error);
		} finally {
			setIsSubmitting(false);
		}
	};

	useEffect(() => {
		(async () => {
			if (!isCreating) {
				await getCustomerDetail(id);
			}
		})();
	}, []);

	return (
		<OrganismLayout
			breadcumbs={[
				{ name: 'Pelanggan', link: '/customer' },
				{
					name: location.pathname.includes('add') ? 'Tambah' : 'Ubah',
					link: location.pathname,
				},
			]}
			title={`${isCreating ? 'Tambah' : 'Ubah'} Pelanggan`}
		>
			<Typography.Title level={4}>
				<span className="fw7">
					{`${
						isCreating ? 'Tambah' : 'Ubah'
					} Pelanggan`.toUpperCase()}
				</span>
			</Typography.Title>

			{!isCreating && !customer ? (
				<Skeleton active />
			) : (
				<Form
					className="w-100 mt4"
					name="modify_customer"
					initialValues={setCustomerInitialValues()}
					onFinish={submit}
					onFinishFailed={(errors) => {
						if (typeof errors === 'object') {
							errors.errorFields.map((item) => {
								message.error(`Failed: ${item.errors}`);
							});
							console.error(errors.errorFields);
						}
					}}
				>
					<Row>
						<Col span={18}>
							<AtomCard title="Info Pelanggan">
								<Row gutter={12}>
									<Col span={24}>
										<MoleculeFileInputGroup
											label="Upload Foto"
											description="
												Format gambar .jpg .jpeg .png, Untuk foto banner mobile ukuran minimum 0 x 0px (Untuk
												gambar optimal gunakan ukuran minimum 0 x 0 px) Untuk foto banner desktop ukuran
												minimum 0 x 0px (Untuk gambar optimal gunakan ukuran minimum 0 x 0 px)
											"
											fileInputs={[
												{
													defaultValue: customer
														? customer.profile_image
														: null,
													label: 'Foto Profil',
													ref: profileImageRef,
												},
												{
													defaultValue: customer
														? customer.id_card_image
														: null,
													label: 'Foto KTP',
													ref: idCardImageRef,
												},
											]}
										/>
									</Col>

									<Col span={12}>
										<MoleculeTextInputGroup
											name="first_name"
											label="Nama Depan"
											placeholder="Nama Depan"
											type="text"
											required={true}
										/>
									</Col>

									<Col span={12}>
										<MoleculeTextInputGroup
											name="last_name"
											label="Nama Belakang"
											placeholder="Nama Belakang"
											type="text"
											required={true}
										/>
									</Col>

									<Col span={12}>
										<MoleculeDatePickerGroup
											format={'YYYY-MM-DD'}
											label="Tanggal Lahir"
											name="birth"
											placeholder="Tanggal Lahir"
											required={true}
										/>
									</Col>

									<Col span={12}>
										<MoleculeSelectInputGroup
											label="Jenis Kelamin"
											name="gender"
											placeholder="Jenis Kelamin"
											required
											data={{
												options: [
													{
														label: 'Pria',
														value: 'MALE',
													},
													{
														label: 'Wanita',
														value: 'FEMALE',
													},
												],
											}}
										/>
									</Col>

									<Col span={12}>
										<MoleculeSelectInputGroup
											label="Status Pernikahan"
											name="marital_status"
											placeholder="Status Pernikahan"
											required
											data={{
												options: [
													{
														value: 'Belum Menikah',
														label: 'Belum Menikah',
													},
													{
														value: 'Menikah',
														label: 'Menikah',
													},
												],
											}}
										/>
									</Col>

									<Col span={12}>
										<MoleculeTextInputGroup
											name="frequency_groceries_one_month"
											label="Frekuensi Belanja (Per Bulan)"
											placeholder="Frekuensi Belanja (Per Bulan)"
											type="number"
											min={0}
											required={true}
										/>
									</Col>

									<Col span={12}>
										<MoleculeTextInputGroup
											name="email"
											label="Email"
											placeholder="Email"
											type="email"
											required={true}
										/>
									</Col>

									<Col span={12}>
										<MoleculeTextInputGroup
											name="phone_number"
											label="Nomor Handpone"
											placeholder="Nomor Handpone"
											type="phone"
											required={true}
										/>
									</Col>
								</Row>
							</AtomCard>
						</Col>

						<Col className="mt4" span={24}>
							<MoleculeModifyActionButtons
								backUrl="/customer"
								isCreating={isCreating}
								isSubmitting={isSubmitting}
								label="Pelanggan"
							/>
						</Col>
					</Row>
				</Form>
			)}
		</OrganismLayout>
	);
};

export default PelangganModifyPage;
