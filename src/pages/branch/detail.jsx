import React, { useEffect, useState } from 'react';
import ReactMoment from 'react-moment';

import { Col, message, Row, Skeleton, Space, Typography } from 'antd';
import { Link, useParams } from 'react-router-dom';

import AtomCard from '../../components/atoms/card';
import AtomSecondaryButton from '../../components/atoms/button/secondary-button';
import MoleculeInfoGroup from '../../components/molecules/info-group';
import OrganismLayout from '../../components/organisms/layout';

import BranchService from '../../services/branch';
const branchService = new BranchService();

const BranchModifyPage = () => {
	const { id } = useParams();
	const [branch, setBranch] = useState(null);

	const getBranchDetail = async () => {
		try {
			const { data: branch } = await branchService.getBranchById(id);
			setBranch(branch);
		} catch (error) {
			message.error(error.message);
			console.error(error);
		}
	};

	useEffect(() => {
		(async () => {
			getBranchDetail(id);
		})();
	}, []);

	return (
		<OrganismLayout
			breadcumbs={[
				{ name: 'Branch', link: '/branch' },
				{ name: 'Detail', link: location.pathname },
			]}
			title="Detail Branch"
		>
			<Typography.Title level={4}>
				<span className="fw7">{`Detail Branch`.toUpperCase()}</span>
			</Typography.Title>

			{!branch ? (
				<Skeleton active />
			) : (
				<Row align="top" className="mt4" gutter={24}>
					<Col span={18}>
						<AtomCard title="Info Cabang Freezy">
							<Row gutter={[12, 24]}>
								<Col span={12}>
									<MoleculeInfoGroup
										title="Kode Cabang"
										content={branch.code}
									/>
								</Col>

								<Col span={12}>
									<MoleculeInfoGroup
										title="Status"
										content={
											branch.is_active
												? 'Aktif'
												: 'Tidak Aktif'
										}
									/>
								</Col>

								<Col span={12}>
									<MoleculeInfoGroup
										title="Nama Cabang (ID)"
										content={branch.name.id}
									/>
								</Col>

								<Col span={12}>
									<MoleculeInfoGroup
										title="Nama Cabang (EN)"
										content={branch.name.en}
									/>
								</Col>

								<Col span={12}>
									<MoleculeInfoGroup
										title="Provinsi"
										content={branch.address.province_name}
									/>
								</Col>

								<Col span={12}>
									<MoleculeInfoGroup
										title="Kota/Kabupaten"
										content={branch.address.city_name}
									/>
								</Col>

								<Col span={12}>
									<MoleculeInfoGroup
										title="Kode Kecamatan"
										content={branch.address.district_code}
									/>
								</Col>

								<Col span={12}>
									<MoleculeInfoGroup
										title="Kecamatan"
										content={branch.address.district_name}
									/>
								</Col>

								<Col span={12}>
									<MoleculeInfoGroup
										title="Kelurahan"
										content={
											branch.address.subdistrict_name
										}
									/>
								</Col>

								<Col span={12}>
									<MoleculeInfoGroup
										title="Kode Pos"
										content={branch.address.postal_code}
									/>
								</Col>

								<Col span={12}>
									<MoleculeInfoGroup
										title="Alamat"
										content={branch.address.address}
									/>
								</Col>

								<Col span={12}>
									<MoleculeInfoGroup
										title="Latitude"
										content={branch.address.latitude}
									/>
								</Col>

								<Col span={12}>
									<MoleculeInfoGroup
										title="Longitude"
										content={branch.address.longitude}
									/>
								</Col>

								<Col span={24} style={{ paddingTop: '2rem' }}>
									<Typography.Text strong>
										<span className="denim f5">
											INFO UPDATE PRODUK
										</span>
									</Typography.Text>
								</Col>

								<Col span={12}>
									<MoleculeInfoGroup
										title="Tanggal di Daftarkan"
										content={
											<ReactMoment format="DD-MM-YYYY">
												{branch.created_at}
											</ReactMoment>
										}
									/>
								</Col>

								<Col span={12}>
									<MoleculeInfoGroup
										title="Tanggal di Update"
										content={
											<ReactMoment format="DD-MM-YYYY">
												{branch.updated_at}
											</ReactMoment>
										}
									/>
								</Col>

								<Col span={12}>
									<MoleculeInfoGroup
										title="Didaftarkan Oleh"
										content={branch.created_by}
									/>
								</Col>

								<Col span={12}>
									<MoleculeInfoGroup
										title="Diupdate Oleh"
										content={branch.updated_by}
									/>
								</Col>
							</Row>
						</AtomCard>
					</Col>

					<Col className="mt4" span={24}>
						<Space>
							<Link to="/branch">
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

export default BranchModifyPage;
