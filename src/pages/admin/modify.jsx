/* eslint-disable no-mixed-spaces-and-tabs */
import React, { useEffect, useRef, useState } from 'react';
import { Col, Form, message, Row, Skeleton, Typography } from 'antd';
import { useHistory, useLocation, useParams } from 'react-router-dom';

import AtomBranchSelection from '../../components/atoms/selection/branch';
import AtomCard from '../../components/atoms/card';
import AtomProductOwnerSelect from '../../components/atoms/selection/product-owner';
import MoleculeFileInputGroup from '../../components/molecules/input-group/file-input';
import MoleculeModifyActionButtons from '../../components/molecules/modify-action-buttons';
import MoleculePasswordInputGroup from '../../components/molecules/input-group/password-input';
import MoleculeSelectInputGroup from '../../components/molecules/input-group/select-input';
import MoleculeTextInputGroup from '../../components/molecules/input-group/text-input';
import OrganismLayout from '../../components/organisms/layout';

import AdminService from '../../services/admin';
const adminService = new AdminService();

const AdminModifyPage = () => {
	const profileImageRef = useRef();
	const idCardImageRef = useRef();

	const { id } = useParams();
	const location = useLocation();
	const history = useHistory();
	const isCreating = location.pathname.includes('add') ? true : false;
	const branchSelectRef = useRef();
	const [form] = Form.useForm();

	const [admin, setAdmin] = useState(null);
	const [branches, setBranches] = useState([]);
	const [isSubmitting, setIsSubmitting] = useState(false);

	const getAdminDetail = async (id) => {
		try {
			let admin = await adminService.getAdminById(id);
			admin = admin.data;
			admin.roles = admin.roles.map((role) => role.name);
			admin.branches = admin.branches.map((branch) => branch.id);

			setAdmin(admin);
		} catch (error) {
			message.error(error.message);
			console.error(error);
		}
	};

	const submit = async (values) => {
		try {
			setIsSubmitting(true);
			const profileImage = await profileImageRef.current.getImage();
			const idCardImage = await idCardImageRef.current.getImage();

			const data = new FormData();
			if (values.rek_number) data.append('bank_account_number', values.rek_number);
			if (values.bank) data.append('bank_id', values.bank);
			data.append('email', values.email);
			data.append('first_name', values.first_name);
			data.append('gender', values.gender);
			data.append('last_name', values.last_name);
			data.append('phone_number', values.phone_number);
			data.append('role_name', values.role);
			data.append('company', values.company);
			if (idCardImage) data.append('idcard_image', idCardImage);
			if (profileImage) data.append('profile_image', profileImage);
			if (isCreating) {
				if (values.password) data.append('password', values.password);
			}
			branches.forEach((branch) => {
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
					bank: admin.bank_info.bank ? admin.bank_info.bank.id : null,
					branches: admin.branches,
					company: admin.company,
					email: admin.email,
					first_name: admin.first_name,
					profile_image: admin.profile_image,
					idcard_image: admin.idcard_image,
					gender: admin.gender,
					last_name: admin.last_name,
					phone_number: admin.phone_number,
					rek_number: admin.bank_info.account_number,
					role: admin.roles,
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
					form={form}
					initialValues={setAdminInitialValues()}
					onFinish={submit}
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
											required
										/>
									</Col>

									<Col span={12}>
										<MoleculeTextInputGroup
											name="last_name"
											label="Nama Belakang"
											placeholder="Nama Belakang"
											type="text"
											required
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
										<MoleculeTextInputGroup
											name="phone_number"
											label="Nomor Handphone"
											placeholder="Nomor Handphone"
											type="phone"
											required
										/>
									</Col>

									<Col span={12}>
										<MoleculeSelectInputGroup
											label="Bank (Opsional)"
											name="bank"
											placeholder="Bank (Opsional)"
											data={{
												url: 'banks',
												limit: 300
											}}
										/>
									</Col>

									<Col span={12}>
										<MoleculeTextInputGroup
											name="rek_number"
											label="Nomor Rekening"
											placeholder="Nomor Rekening"
											type="number"
										/>
									</Col>

									<Col span={24}>
										<MoleculeFileInputGroup
											label="Foto Profile"
											fileInputs={[
												{
													defaultValue: admin
														? admin.profile_image
														: null,
													ref: profileImageRef,
													required: true,
												},
											]}
										/>
									</Col>

									<Col span={24}>
										<MoleculeFileInputGroup
											label="Foto KTP"
											fileInputs={[
												{
													defaultValue: admin
														? admin.idcard_image
														: null,
													ref: idCardImageRef,
												},
											]}
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
											autoComplete="new-password"
										/>
									</Col>

									{isCreating && (
										<Col span={12}>
											<MoleculePasswordInputGroup
												name="password"
												label="Password"
												placeholder="Password"
												autoComplete="new-password"
											/>
										</Col>
									)}

									<Col span={12}>
										<MoleculeSelectInputGroup
											label="Peranan"
											name="role"
											placeholder="Peranan"
											required
											data={{
												url: 'roles',
												generateCustomOption: (
													item
												) => ({
													value: item.name,
													label: item.description,
												}),
											}}
										/>
									</Col>

									<Col span={12}>
										<AtomBranchSelection
											mode="multiple"
											required
											onChange={(_, options) => {
												let values = [];
												let val = [];
												if (_.includes('all')) {
													const allOptions = branchSelectRef.current.getAllOptions();
													values = allOptions.filter(x => x.value !== 'all').map((option) => ({
														branch_id: option.value,
														branch: option.label,
													}))
													val = allOptions.filter(x => x.value !== 'all').map((option) => option.value);
												} else {
													if (branches.length !== options) {
														values = options.map((option) => ({
															branch_id: option.value,
															branch: option.children,
														}))
														val = options.map((option) => option.value);
													}
												}
												form.setFieldsValue({ branches: val })
												setBranches(values);
											}}
											optionsRef={branchSelectRef}
											canSelectAll={true}
										/>
									</Col>

									<Col span={12}>
										<AtomProductOwnerSelect required />
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
