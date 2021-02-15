import React, { useEffect, useState } from 'react';
import ReactMoment from 'react-moment';

import {
	Button,
	Col,
	Image,
	message,
	Row,
	Skeleton,
	Space,
	Typography,
} from 'antd';
import { Link, useParams } from 'react-router-dom';

import AtomCard from '../../components/atoms/card';
import MoleculeInfoGroup from '../../components/molecules/info-group';
import OrganismLayout from '../../components/organisms/layout';

// import AdminService from '../../services/admin';
// const adminService = new AdminService();

const AdminModifyPage = () => {
	const { id } = useParams();
	const [admin, setAdmin] = useState(null);

	const getAdminDetail = () => {
		try {
			// const admin = adminService.getAdminDetail(adminId);
			// setAdmin(admin);

			setTimeout(() => {
				setAdmin({
					bank: 'Hana Bank',
					email: 'sejeong.kim@gududan.co.kr',
					first_name: 'Kim',
					gender: 'Wanita',
					last_name: 'Sejeong',
					phone_number: '087739893738467',
					registered_at: new Date(),
					registered_by: 'Kim Ji Yeon',
					rek_number: '994850284596048',
					role: 'Super Admin',
					updated_at: new Date(),
					updated_by: 'Dita Karang',
					branches: [
						'Banjar',
						'Ciamis',
						'Garut',
						'Pangandaran',
						'Sumedang',
						'Tasik',
					],
					id_card_photo:
						'https://cdn.shopify.com/s/files/1/0533/2089/files/placeholder-images-image_large.png?format=jpg&quality=90&v=1530129081',
					profile_photo:
						'https://cdn.shopify.com/s/files/1/0533/2089/files/placeholder-images-image_large.png?format=jpg&quality=90&v=1530129081',
				});
			}, 1000);
		} catch (error) {
			message.error(error.message);
			console.error(error);
		}
	};

	useEffect(() => {
		(async () => {
			getAdminDetail(id);
		})();
	}, []);

	return (
		<OrganismLayout
			breadcumbs={[
				{ name: 'Admin', link: '/admin' },
				{ name: 'Detail', link: location.pathname },
			]}
			title="Detail Admin"
		>
			<Typography.Title level={4}>
				<span className="fw7">{`Detail Admin`.toUpperCase()}</span>
			</Typography.Title>

			{!admin ? (
				<Skeleton active />
			) : (
				<Row align="top" className="mt4" gutter={24}>
					<Col span={15}>
						<AtomCard title="Info Admin">
							<Row gutter={[12, 24]}>
								<Col span={12}>
									<Image
										preview
										src={admin.profile_photo}
										width="100%"
									/>
								</Col>

								<Col span={12}>
									<Image
										preview
										src={admin.id_card_photo}
										width="100%"
									/>
								</Col>

								<Col span={12}>
									<MoleculeInfoGroup
										title="Name Depan"
										content={admin.first_name}
									/>
								</Col>

								<Col span={12}>
									<MoleculeInfoGroup
										title="Name Belakang"
										content={admin.last_name}
									/>
								</Col>

								<Col span={24}>
									<MoleculeInfoGroup
										title="Jenis Kelamin"
										content={admin.gender}
									/>
								</Col>

								<Col span={24}>
									<MoleculeInfoGroup
										title="Nomor Handphone"
										content={admin.phone_number}
									/>
								</Col>

								<Col span={12}>
									<MoleculeInfoGroup
										title="Bank (Opsional)"
										content={admin.bank}
									/>
								</Col>

								<Col span={12}>
									<MoleculeInfoGroup
										title="No Rekening"
										content={admin.rek_number}
									/>
								</Col>
							</Row>
						</AtomCard>
					</Col>

					<Col span={9}>
						<AtomCard title="Info Ototitas">
							<Row gutter={[12, 24]}>
								<Col span={24}>
									<MoleculeInfoGroup
										title="Tanggal Daftar"
										content={
											<ReactMoment format="DD-MM-YY">
												{admin.registered_at}
											</ReactMoment>
										}
									/>
								</Col>

								<Col span={24}>
									<MoleculeInfoGroup
										title="Otorisasi Pendaftaran oleh"
										content={admin.registered_by}
									/>
								</Col>

								<Col span={24}>
									<MoleculeInfoGroup
										title="Tanggal Diperbaharui"
										content={
											<ReactMoment format="DD-MM-YY">
												{admin.updated_at}
											</ReactMoment>
										}
									/>
								</Col>

								<Col span={24}>
									<MoleculeInfoGroup
										title="Pembaharuan Data Terakhir oleh"
										content={admin.updated_by}
									/>
								</Col>
							</Row>
						</AtomCard>
					</Col>

					<Col className="mt4" span={15}>
						<AtomCard title="Info Admin">
							<Row gutter={[12, 24]}>
								<Col span={12}>
									<MoleculeInfoGroup
										title="Email"
										content={admin.email}
									/>
								</Col>

								<Col span={12}>
									<MoleculeInfoGroup
										title="Peran"
										content={admin.role}
									/>
								</Col>

								<Col span={24}>
									<MoleculeInfoGroup
										title="Cabang"
										content={admin.branches.join(', ')}
									/>
								</Col>
							</Row>
						</AtomCard>
					</Col>

					<Col className="mt4" span={24}>
						<Space>
							<Link to="/admin">
								<Button
									className="br3 denim b--denim"
									size="large"
								>
									Kembali
								</Button>
							</Link>
							<Link to={`/admin/${id}/edit`}>
								<Button
									className="br3 bg-denim white"
									size="large"
									type="submit"
								>
									Ubah Admin
								</Button>
							</Link>
						</Space>
					</Col>
				</Row>
			)}
		</OrganismLayout>
	);
};

export default AdminModifyPage;
