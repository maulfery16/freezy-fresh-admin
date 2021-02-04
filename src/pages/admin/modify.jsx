import React, { useEffect, useState } from 'react';
import {
	Button,
	Col,
	Form,
	message,
	Row,
	Skeleton,
	Space,
	Typography,
} from 'antd';
import { Link, useLocation, useParams } from 'react-router-dom';

import AtomCard from '../../components/atoms/card';
import MoleculeFileInputGroup from '../../components/molecules/input-group/file-input';
import MoleculePasswordInputGroup from '../../components/molecules/input-group/password-input';
import MoleculeSelectInputGroup from '../../components/molecules/input-group/select-input';
import MoleculeTextInputGroup from '../../components/molecules/input-group/text-input';
import OrganismLayout from '../../components/organisms/layout';

import AdminService from '../../services/admin';
const adminService = new AdminService();

const AdminModifyPage = () => {
	const { id } = useParams();
	const location = useLocation();
	const isCreating = location.pathname.includes('add') ? true : false;

	const [admin, setAdmin] = useState(null);

	const getAdminDetail = (id) => {
		try {
			const admin = adminService.getAdminById(id);
			setAdmin(admin);
		} catch (error) {
			message.error(error.message);
		}
	};

	const submit = async (values) => {
		try {
			const data = new FormData();

			Object.keys(values).forEach((key) => {
				data.append(key, values[key]);
			});

			if (isCreating) {
				await adminService.createAdmin(data);

				message.success('Berhasil menambah admin');
			} else {
				await adminService.editAdmin(id, data);
				message.success('Berhasil mengubah admin');
			}
		} catch (error) {
			message.error(error.message);
		} finally {
			message.info(
				'Akan dikembalikan ke halaman daftar admin dalam 2 detik'
			);
			setTimeout(() => {
				history.push('/admin');
			}, 2000);
		}
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
					initialValues={{ ...admin }}
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
														value: 'MAN',
													},
													{
														label: 'WANITA',
														value: 'WOMAN',
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
												url: '/banks',
												mock: [
													{
														label: 'Mandiri',
														value: 'Mandiri',
													},
													{
														label: 'BCA',
														value: 'BCA',
													},
												],
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

									<Col span={12}>
										<MoleculeFileInputGroup
											label="Foto Profile"
											id="profile-photo-upload"
											name="profile_photo"
											placeholder="jpg, png"
										/>
									</Col>

									<Col span={12}>
										<MoleculeFileInputGroup
											label="Foto KTP"
											name="id_card_photo"
											id="card-photo-upload"
											placeholder="jpg, png"
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
												url: '/roles',
												mock: [
													{
														label: 'Staff',
														value: 'staff',
													},
													{
														label: 'Administrator',
														value: 'Administrator',
													},
												],
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
												url: '/branches',
												mock: [
													{
														label: 'Bandung',
														value: 'Bandung',
													},
													{
														label: 'Garut',
														value: 'Garut',
													},
												],
											}}
										/>
									</Col>
								</Row>
							</AtomCard>
						</Col>

						<Col className="mt5" span={24}>
							<Space>
								<Link to="/admin">
									<Button
										className="br3 denim b--denim"
										size="large"
									>
										Kembali
									</Button>
								</Link>
								<Button
									className="br3 bg-denim white"
									size="large"
									type="submit"
								>
									{`${isCreating ? 'Tambah' : 'Ubah'} Admin`}
								</Button>
							</Space>
						</Col>
					</Row>
				</Form>
			)}
		</OrganismLayout>
	);
};

export default AdminModifyPage;
