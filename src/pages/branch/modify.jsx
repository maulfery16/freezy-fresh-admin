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
	const [provinceId, setProvinceId] = useState(null);
	const [cityId, setCityId] = useState(null);
	const [districtId, setDistrictId] = useState(null);
	const [subdistrictId, setSubdistrictId] = useState(null);

	const cityOptionsRef = useRef();
	const districtOptionsRef = useRef();
	const subDistrictOptionsRef = useRef();

	useEffect(() => {
		if (provinceId && cityOptionsRef.current) {
			setCityId(null);

			cityOptionsRef.current.refetchData();
			districtOptionsRef.current.refetchData();
			subDistrictOptionsRef.current.refetchData();
		}
	}, [provinceId]);

	useEffect(() => {
		if (cityId && districtOptionsRef.current) {
			setDistrictId(null);

			districtOptionsRef.current.refetchData();
			subDistrictOptionsRef.current.refetchData();
		}
	}, [cityId]);

	useEffect(() => {
		if (districtId && subDistrictOptionsRef.current) {
			setSubdistrictId(null);
			subDistrictOptionsRef.current.refetchData();
		}
	}, [districtId]);

	const getBranchDetail = async (id) => {
		try {
			const { data: branch } = await branchService.getBranchById(id);

			setProvinceId(
				branch && branch.address && branch.address.province_id
			);
			setCityId(branch && branch.address && branch.address.city_id);
			setDistrictId(
				branch && branch.address && branch.address.district_id
			);
			setSubdistrictId(
				branch && branch.address && branch.address.subdistrict_id
			);
			setBranch(branch);
		} catch (error) {
			message.error(error.message);
			console.error(error);
		}
	};

	const submit = async (values) => {
		if (!provinceId || !cityId || !districtId || !subdistrictId) {
			message.error(
				'Provinsi / Kota/Kabupaten / Kecamatan / Kelurahan tidak boleh kosong'
			);
			return false;
		}

		try {
			setIsSubmitting(true);

			const data = new FormData();
			data.append('code', values.code);
			data.append('name[id]', values.id_name);
			data.append('name[en]', values.en_name);
			data.append('address', values.address);
			data.append('region_id', values.region_id);
			data.append('is_active', values.is_active);
			data.append('province_id', provinceId);
			data.append('city_id', cityId);
			data.append('district_id', districtId);
			data.append('subdistrict_id', subdistrictId);
			data.append('postal_code', values.postal_code);
			data.append('latitude', values.latitude);
			data.append('longitude', values.longitude);

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
					postal_code: branch.address.postal_code,
					latitude: branch.address.latitude,
					longitude: branch.address.longitude,
			  };
	};

	const handleOptionChange = (setRegionChildId, regionChildName, value) => {
		setRegionChildId(value);

		switch (regionChildName) {
			case 'province':
				setCityId(null);
				setDistrictId(null);
				setSubdistrictId(null);
				break;
			case 'city':
				setDistrictId(null);
				setSubdistrictId(null);
				break;
			case 'district':
				setSubdistrictId(null);
				break;
		}

		/* reset region children value */
		if (branch && branch.address && branch.address.province_id) {
			setBranch({
				...branch,
				address: {
					...branch.address,
					province_id: null,
					city_id: null,
					district_id: null,
					subdistrict_id: null,
				},
			});
		}
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
						message.error(`Failed: ${error.errorFields}`);
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
											maxLength={3}
											minLength={3}
											required
										/>
									</Col>

									<Col span={12}>
										<MoleculeSelectInputGroup
											name="is_active"
											label="Status"
											placeholder="Status"
											required={true}
											data={{
												options: [
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
											label="Provinsi*"
											name="province_id"
											placeholder="Pilih Provinsi"
											defaultValue={
												branch &&
												branch.address.province_id
											}
											data={{
												onChange: (value) =>
													handleOptionChange(
														setProvinceId,
														'province',
														value
													),
												url: 'regions/fetch/provinces',
												generateCustomOption: (
													item
												) => ({
													value: item.id,
													label: `${item.name.id} / ${item.name.en} `,
												}),
												limit: 50
											}}
										/>
									</Col>

									<Col span={12}>
										<MoleculeSelectInputGroup
											label="Kota/Kabupaten*"
											name="city_id"
											placeholder="Pilih Kota/Kabupaten"
											optionsRef={cityOptionsRef}
											defaultValue={
												branch && branch.address.city_id
											}
											data={{
												onChange: (value) =>
													handleOptionChange(
														setCityId,
														'city',
														value
													),
												url:
													provinceId ||
													(branch &&
														branch.address
															.province_id)
														? `regions/fetch/child/${
																provinceId ||
																branch.address
																	.province_id
														  }`
														: `regions/fetch/cities/0`,
												generateCustomOption: (
													item
												) => ({
													value: item.id,
													label: `${item.name.id} / ${item.name.en} `,
												}),
												limit: 300
											}}
										/>
									</Col>

									<Col span={12}>
										<MoleculeSelectInputGroup
											label="Kecamatan*"
											name="district_id"
											placeholder="Pilih Kecamatan"
											optionsRef={districtOptionsRef}
											defaultValue={
												branch &&
												branch.address.district_id
											}
											data={{
												onChange: (value) =>
													handleOptionChange(
														setDistrictId,
														'district',
														value
													),
												url:
													cityId ||
													(branch &&
														branch.address.city_id)
														? `regions/fetch/child/${
																cityId ||
																branch.address
																	.city_id
														  }`
														: `regions/fetch/cities/0`,
												generateCustomOption: (
													item
												) => ({
													value: item.id,
													label: `${item.name.id} / ${item.name.en} `,
												}),
												limit: 300
											}}
										/>
									</Col>

									<Col span={12}>
										<MoleculeSelectInputGroup
											label="Kelurahan*"
											name="subdistrict_id"
											placeholder="Pilih Kelurahan"
											optionsRef={subDistrictOptionsRef}
											defaultValue={
												branch &&
												branch.address.subdistrict_id
											}
											data={{
												onChange: (value) =>
													handleOptionChange(
														setSubdistrictId,
														'',
														value
													),
												url:
													districtId ||
													(branch &&
														branch.address
															.district_id)
														? `regions/fetch/child/${
																districtId ||
																branch.address
																	.district_id
														  }`
														: `regions/fetch/districts/0`,
												generateCustomOption: (
													item
												) => ({
													value: item.id,
													label: `${item.name.id} / ${item.name.en} `,
												}),
												limit: 300
											}}
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
											maxLength={5}
											minLength={5}
											required
										/>
									</Col>

									<Col span={12}>
										<MoleculeTextInputGroup
											name="latitude"
											label="Latitude"
											placeholder="Masukkan Latitude"
											type="number"
											maxLength={180}
											required
										/>
									</Col>

									<Col span={12}>
										<MoleculeTextInputGroup
											name="longitude"
											label="Longitude"
											placeholder="Masukkan Longitude"
											type="number"
											maxLength={360}
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
