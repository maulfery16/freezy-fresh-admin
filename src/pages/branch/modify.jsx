/* eslint-disable no-mixed-spaces-and-tabs */
import React, { useEffect, useRef, useState } from 'react';
import { Col, Form, message, Row, Skeleton, Typography } from 'antd';
import { useHistory, useLocation, useParams } from 'react-router-dom';

import AtomCard from '../../components/atoms/card';
import MoleculeModifyActionButtons from '../../components/molecules/modify-action-buttons';
import MoleculeSelectInputGroup from '../../components/molecules/input-group/select-input';
import MoleculeTextInputGroup from '../../components/molecules/input-group/text-input';
import OrganismLayout from '../../components/organisms/layout';

import BranchService from '../../services/branch';
const branchService = new BranchService();

const BranchModifyPage = () => {
	const { id } = useParams();
	const location = useLocation();
	const history = useHistory();
	const isCreating = location.pathname.includes('add') ? true : false;

	const [branch, setBranch] = useState(null);
	const [isSubmitting, setIsSubmitting] = useState(false);
	const [provinceCode, setProvinceCode] = useState(0);
	const [cityCode, setCityCode] = useState(0);
	const [districtCode, setDistrictCode] = useState(0);

	const cityOptionsRef = useRef();
	const districthOptionsRef = useRef();
	const subDistrictOptionsRef = useRef();

	useEffect(() => {
		if (provinceCode) cityOptionsRef.current.refetchData();
		if (cityCode) districthOptionsRef.current.refetchData();
		if (districtCode) subDistrictOptionsRef.current.refetchData();
	}, [provinceCode, cityCode, districtCode]);

	const getBranchDetail = async (id) => {
		try {
			let branch = await branchService.getBranchById(id);
			branch = branch.data;

			setBranch(branch);
		} catch (error) {
			message.error(error.message);
			console.error(error);
		}
	};

	const submit = async (values) => {
		try {
			setIsSubmitting(true);

			const data = new FormData();
			data.append('code', values.code);
			data.append('name[id]', values.id_name);
			data.append('name[en]', values.en_name);
			data.append('address', values.address);
			data.append('region_id', values.region_id);
			data.append('is_active', values.is_active);
			data.append('province_name', values.province_name);
			data.append('city_name', values.city_name);
			data.append('district_name', values.district_name);
			data.append('subdistrict_name', values.subdistrict_name);
			data.append('postal_code', values.postal_code);
			data.append('latitude', values.latitude);
			data.append('longitude', values.postal_code);

			if (isCreating) {
				await branchService.createBranch(data);
				message.success('Berhasil menambah cabang');
			} else {
				await branchService.editBranch(id, data);
				message.success('Berhasil mengubah cabang');
			}

			message.info(
				'Akan dikembalikan ke halaman daftar cabang dalam 2 detik'
			);
			setTimeout(() => {
				history.push('/branch');
			}, 2000);
		} catch (error) {
			message.error(error.message);
			console.error(error);
		} finally {
			setIsSubmitting(false);
		}
	};

	const setBranchInitialValues = () => {
		return isCreating || !branch
			? {}
			: {
					en_name: branch.name ? branch.name.en : null,
					id_name: branch.name ? branch.name.id : null,
					code: branch.code,
					is_active: branch.is_active,
					address: branch.address.address,
					province_name: branch.address.province_name,
					city_name: branch.address.city_name,
					district_name: branch.address.district_name,
					subdistrict_name: branch.address.subdistrict_name,
					postal_code: branch.address.postal_code,
					latitude: branch.address.latitude,
					longitude: branch.address.longitude,
			  };
	};

	useEffect(() => {
		(async () => {
			if (!isCreating) {
				await getBranchDetail(id);
			}
		})();
	}, []);

	return (
		<OrganismLayout
			breadcumbs={[
				{ name: 'Cabang Freezy', link: '/branch' },
				{
					name: location.pathname.includes('add') ? 'Tambah' : 'Ubah',
					link: location.pathname,
				},
			]}
			title={`${isCreating ? 'Tambah' : 'Ubah'} Cabang Freezy`}
		>
			<Typography.Title level={4}>
				<span className="fw7">
					{`${
						isCreating ? 'Tambah' : 'Ubah'
					} Cabang Freezy`.toUpperCase()}
				</span>
			</Typography.Title>

			{!isCreating && !branch ? (
				<Skeleton active />
			) : (
				<Form
					className="w-100 mt4"
					name="modify_branch"
					initialValues={setBranchInitialValues()}
					onFinish={submit}
					onFinishFailed={(error) => {
						message.error(`Failed: ${error}`);
						console.error(error);
					}}
				>
					<Row>
						<Col span={18}>
							<AtomCard title="Info Cabang Freezy">
								<Row gutter={12}>
									<Col span={12}>
										<MoleculeTextInputGroup
											name="code"
											label="Kode Cabang"
											placeholder="Masukkan Kode Cabang"
											type="text"
											required
										/>
									</Col>

									<Col span={12}>
										<MoleculeSelectInputGroup
											name="is_active"
											label="Status"
											placeholder="Status"
											required
											data={{
												mock: [
													{
														label: 'Aktif',
														value: true,
													},
													{
														label: 'Tidak Aktif',
														value: false,
													},
												],
											}}
										/>
									</Col>

									<Col span={12}>
										<MoleculeTextInputGroup
											name="id_name"
											label="Nama Cabang (ID)"
											placeholder="Masukkan Nama Cabang (ID)"
											type="text"
											required
										/>
									</Col>

									<Col span={12}>
										<MoleculeTextInputGroup
											name="en_name"
											label="Nama Cabang (EN)"
											placeholder="Masukkan Nama Cabang (EN)"
											type="text"
											required
										/>
									</Col>

									<Col span={12}>
										<MoleculeSelectInputGroup
											label="Provinsi"
											name="province_name"
											placeholder="Pilih Provinsi"
											data={{
												onChange: (value) =>
													setProvinceCode(value),
												url: 'regions/fetch/provinces',
												generateCustomOption: (
													item
												) => ({
													value: item.code,
													label: `${item.name.id} / ${item.name.en} `,
												}),
											}}
											required={true}
										/>
									</Col>

									<Col span={12}>
										<MoleculeSelectInputGroup
											label="Kota/Kabupaten"
											name="city_name"
											placeholder="Pilih Kota/Kabupaten"
											branchOptionsRef={cityOptionsRef}
											data={{
												onChange: (value) =>
													setCityCode(value),
												url: `regions/fetch/cities/${provinceCode}`,
												generateCustomOption: (
													item
												) => ({
													value: item.code,
													label: `${item.name.id} / ${item.name.en} `,
												}),
											}}
											required={true}
										/>
									</Col>

									<Col span={12}>
										<MoleculeSelectInputGroup
											label="Kecamatan"
											name="district_name"
											placeholder="Pilih Kecamatan"
											branchOptionsRef={cityOptionsRef}
											data={{
												onChange: (value) =>
													setDistrictCode(value),
												url: `regions/fetch/districts/${cityCode}`,
												generateCustomOption: (
													item
												) => ({
													value: item.code,
													label: `${item.name.id} / ${item.name.en} `,
												}),
											}}
											required={true}
										/>
									</Col>

									<Col span={12}>
										<MoleculeSelectInputGroup
											label="Kelurahan"
											name="subdistrict_name"
											placeholder="Pilih Kelurahan"
											branchOptionsRef={
												subDistrictOptionsRef
											}
											data={{
												url: `regions/fetch/sub-districts/${districtCode}`,
											}}
											required={true}
										/>
									</Col>

									<Col span={12}>
										<MoleculeTextInputGroup
											name="address"
											label="Alamat"
											placeholder="Masukkan Alamat"
											type="text"
											required
										/>
									</Col>

									<Col span={12}>
										<MoleculeTextInputGroup
											name="postal_code"
											label="Kode Pos"
											placeholder="Masukkan Kode Pos"
											type="number"
											required
										/>
									</Col>

									<Col span={12}>
										<MoleculeTextInputGroup
											name="latitude"
											label="Latitude"
											placeholder="Masukkan Latitude"
											type="text"
											required
										/>
									</Col>

									<Col span={12}>
										<MoleculeTextInputGroup
											name="longitude"
											label="Longitude"
											placeholder="Masukkan Longitude"
											type="text"
											required
										/>
									</Col>
								</Row>
							</AtomCard>
						</Col>

						<Col className="mt4" span={24}>
							<MoleculeModifyActionButtons
								backUrl="/branch"
								isCreating={isCreating}
								isSubmitting={isSubmitting}
								label="Cabang Freezy"
							/>
						</Col>
					</Row>
				</Form>
			)}
		</OrganismLayout>
	);
};

export default BranchModifyPage;
