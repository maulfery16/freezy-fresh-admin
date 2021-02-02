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
	const label = location.pathname.includes('add')
		? 'Tambah Admin'
		: 'Ubah Admin';

	const [admin, setAdmin] = useState(null);

	const submit = async (values) => {
		try {
			const data = new FormData();

			Object.keys(values).forEach((key) => {
				data.append(key, values[key]);
			});

			if (isCreating) {
				await adminService.createAdmin(data);
			} else {
				await adminService.editAdmin(data, id);
			}
		} catch (error) {
			message.error(error.message);
		}
	};

	useEffect(() => {
		(async () => {
			if (!isCreating) {
				const admin = await adminService.getAdmin(id);
				setAdmin(admin);
			}
		})();
	}, []);

	return !isCreating && !admin ? (
		<Skeleton active />
	) : (
		<OrganismLayout
			breadcumbs={[
				{ name: 'Admin', link: '/admin' },
				{
					name: location.pathname.includes('add') ? 'Tambah' : 'Ubah',
					link: location.pathname,
				},
			]}
			title={label}
		>
			<Typography.Title level={4}>
				<span className="fw7">{label.toUpperCase()}</span>
			</Typography.Title>

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

								<Col span={12}>
									<MoleculePasswordInputGroup
										name="password"
										label="Password"
										placeholder="Password"
									/>
								</Col>

								<Col span={10}>
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

								<Col span={14}>
									<MoleculeSelectInputGroup
										label="Cabang"
										name="branches"
										placeholder="Cabang"
										mode="multiple"
										required
										data={{
											url: '/domiciles',
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
								{label}
							</Button>
						</Space>
					</Col>
				</Row>
			</Form>
		</OrganismLayout>
	);
};

export default AdminModifyPage;
