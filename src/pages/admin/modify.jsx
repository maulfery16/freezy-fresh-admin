/* eslint-disable no-mixed-spaces-and-tabs */
import React, { useEffect, useState } from 'react';
import { Col, Form, message, Row, Skeleton, Typography } from 'antd';
import { useHistory, useLocation, useParams } from 'react-router-dom';

import AtomCard from '../../components/atoms/card';
import MoleculeFileInputGroup from '../../components/molecules/input-group/file-input';
import MoleculeModifyActionButtons from '../../components/molecules/modify-action-buttons';
import MoleculePasswordInputGroup from '../../components/molecules/input-group/password-input';
import MoleculeSelectInputGroup from '../../components/molecules/input-group/select-input';
import MoleculeTextInputGroup from '../../components/molecules/input-group/text-input';
import OrganismLayout from '../../components/organisms/layout';

import AdminService from '../../services/admin';
import RequestAdapterService from '../../services/request-adapter';
const adminService = new AdminService();

const AdminModifyPage = () => {
	const { id } = useParams();
	const location = useLocation();
	const history = useHistory();
	const isCreating = location.pathname.includes('add') ? true : false;

	const [admin, setAdmin] = useState(null);
	const [idCardImage, setIdCardImage] = useState(null);
	const [isSubmitting, setIsSubmitting] = useState(false);
	const [profileImage, setProfileImage] = useState(null);

	const getAdminDetail = async (id) => {
		try {
			let admin = await adminService.getAdminById(id);
			admin = admin.data;
			setAdmin(admin);

			const profileImage = await RequestAdapterService.convertImageURLtoFile(
				admin.profileImage
			);
			setProfileImage(profileImage);

			const IdCardImage = await RequestAdapterService.convertImageURLtoFile(
				admin.idcard_image
			);
			setIdCardImage(IdCardImage);
		} catch (error) {
			message.error(error.message);
			console.error(error);
		}
	};

	const submit = async (values) => {
		try {
			setIsSubmitting(true);
			const data = new FormData();

			data.append('bank[account_number]', values.rek_number);
			data.append('bank[name]', values.bank);
			data.append('email', values.email);
			data.append('first_name', values.first_name);
			data.append('gender', values.gender);
			data.append('idcard_image', idCardImage);
			data.append('last_name', values.last_name);
			data.append('phone_number', values.phone_number);
			data.append('profile_image', profileImage);
			data.append('role_name', values.role);
			if (isCreating) data.append('password', values.password);
			values.branches.forEach((branch) => {
				data.append('branch_id[]', branch);
			});

			if (isCreating) {
				await adminService.createAdmin(data);

				message.success('Berhasil menambah admin');
			} else {
				await adminService.editAdmin(id, data);
				message.success('Berhasil mengubah admin');
			}

			message.info(
				'Akan dikembalikan ke halaman daftar admin dalam 2 detik'
			);
			setTimeout(() => {
				history.push('/admin');
			}, 2000);
		} catch (error) {
			message.error(error.message);
			console.error(error);
		} finally {
			setIsSubmitting(false);
		}
	};

	const setAdminInitialValues = () => {
		return isCreating || !admin
			? {}
			: {
					bank: admin.bank_info ? admin.bank_info.name : null,
					branch: admin.branch,
					email: admin.email,
					first_name: admin.first_name,
					profile_image: admin.profile_image,
					idcard_image: admin.idcard_image,
					gender: admin.gender,
					last_name: admin.last_name,
					phone_number: admin.phone_number,
					rek_number: admin.bank_info
						? admin.bank_info.account_number
						: null,
					role: admin.role,
			  };
	};

	useEffect(() => {
		(async () => {
			if (!isCreating) {
				await getAdminDetail(id);
			}
		})();
	}, []);

	return (
		<OrganismLayout
			breadcumbs={[
				{ name: 'Admin', link: '/admin' },
				{
					name: location.pathname.includes('add') ? 'Tambah' : 'Ubah',
					link: location.pathname,
				},
			]}
			title={`${isCreating ? 'Tambah' : 'Ubah'} Admin`}
		>
			<Typography.Title level={4}>
				<span className="fw7">
					{`${isCreating ? 'Tambah' : 'Ubah'} Admin`.toUpperCase()}
				</span>
			</Typography.Title>

			{!isCreating && !admin ? (
				<Skeleton active />
			) : (
				<Form
					className="w-100 mt4"
					name="modify_admin"
					initialValues={setAdminInitialValues()}
					onFinish={submit}
					onFinishFailed={(error) => {
						message.error(`Failed: ${error}`);
						console.error(error);
					}}
				>
					<Row>
						<Col span={15}>
							<AtomCard title="Info Admin">
								<Row gutter={12}>
									<Col span={12}>
										<MoleculeTextInputGroup
											name="first_name"
											label="Nama Depan"
											placeholder="Nama Depan"
											type="text"
										/>
									</Col>

									<Col span={12}>
										<MoleculeTextInputGroup
											name="last_name"
											label="Nama Belakang"
											placeholder="Nama Belakang"
											type="text"
										/>
									</Col>

									<Col span={24}>
										<MoleculeSelectInputGroup
											label="Jenis Kelamin"
											name="gender"
											placeholder="Jenis Kelamin"
											required
											data={{
												mock: [
													{
														label: 'Pria',
														value: 'male',
													},
													{
														label: 'Wanita',
														value: 'female',
													},
												],
											}}
										/>
									</Col>

									<Col span={24}>
										<MoleculeTextInputGroup
											name="phone_number"
											label="Nomor Handpone"
											placeholder="Nomor Handpone"
											type="phone"
										/>
									</Col>

									<Col span={8}>
										<MoleculeSelectInputGroup
											label="Bank (Opsional)"
											name="bank"
											placeholder="Bank (Opsional)"
											data={{
												url: 'banks',
											}}
										/>
									</Col>

									<Col span={16}>
										<MoleculeTextInputGroup
											name="rek_number"
											label="Nomor Rekening"
											placeholder="Nomor Rekening"
											type="number"
										/>
									</Col>

									<Col span={24}>
										<MoleculeFileInputGroup
											defaultValue={profileImage}
											label="Foto Profile"
											id="profile-photo-upload"
											name="profile_photo"
											placeholder="jpg, png"
											setImage={setProfileImage}
										/>
									</Col>

									<Col span={24}>
										<MoleculeFileInputGroup
											defaultValue={idCardImage}
											label="Foto KTP"
											name="id_card_photo"
											id="card-photo-upload"
											placeholder="jpg, png"
											setImage={setIdCardImage}
										/>
									</Col>
								</Row>
							</AtomCard>
						</Col>

						<Col className="mt4" span={15}>
							<AtomCard title="Info Admin">
								<Row gutter={12}>
									<Col span={12}>
										<MoleculeTextInputGroup
											name="email"
											label="Email"
											placeholder="Email"
											required
											type="email"
										/>
									</Col>

									{isCreating && (
										<Col span={12}>
											<MoleculePasswordInputGroup
												name="password"
												label="Password"
												placeholder="Password"
											/>
										</Col>
									)}

									<Col span={isCreating ? 10 : 12}>
										<MoleculeSelectInputGroup
											label="Peranan"
											name="role"
											placeholder="Peranan"
											required
											data={{
												url: 'roles',
												mock: [
													{
														label: 'Administrator',
														value: 'asdasd',
													},
													{
														label: 'Kasir',
														value: 'aihkbfiu3',
													},
												],
												generateCustomOption: (
													item
												) => ({
													value: item.name,
													label: item.name,
												}),
											}}
										/>
									</Col>

									<Col span={isCreating ? 14 : 24}>
										<MoleculeSelectInputGroup
											label="Cabang"
											name="branches"
											placeholder="Cabang"
											mode="multiple"
											required
											data={{
												url: 'branches',
											}}
										/>
									</Col>
								</Row>
							</AtomCard>
						</Col>

						<Col className="mt4" span={24}>
							<MoleculeModifyActionButtons
								backUrl="/admin"
								isCreating={isCreating}
								isSubmitting={isSubmitting}
								label="Admin"
							/>
						</Col>
					</Row>
				</Form>
			)}
		</OrganismLayout>
	);
};

export default AdminModifyPage;
