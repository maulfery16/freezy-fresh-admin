/* eslint-disable no-mixed-spaces-and-tabs */
import React, { useEffect, useRef, useState } from 'react';
import { Col, Form, message, Row, Skeleton, Typography } from 'antd';
import { useHistory, useLocation, useParams } from 'react-router-dom';

import AtomCard from '../../../../components/atoms/card';
import MoleculeFileInputGroup from '../../../../components/molecules/input-group/file-input';
import MoleculeModifyActionButtons from '../../../../components/molecules/modify-action-buttons';
import MoleculeSelectInputGroup from '../../../../components/molecules/input-group/select-input';
import MoleculeTextInputGroup from '../../../../components/molecules/input-group/text-input';
import OrganismLayout from '../../../../components/organisms/layout';

import CustomerService from '../../../../services/customer';

const CustomerAddressModifyPage = () => {
	const customerService = new CustomerService();

	const { id, address_id } = useParams();
	const location = useLocation();
	const history = useHistory();
	const isCreating = location.pathname.includes('edit') ? false : true;

	const [address, setAddress] = useState(null);
	const [isSubmitting, setIsSubmitting] = useState(false);
	const [provinceId, setProvinceId] = useState(null);
	const [cityId, setCityId] = useState(null);
	const [districtId, setDistrictId] = useState(null);
	const [subdistrictId, setSubdistrictId] = useState(null);

	const locationImageRef = useRef();
	const cityOptionsRef = useRef();
	const districtOptionsRef = useRef();
	const subDistrictOptionsRef = useRef();

	const getAddressDetail = async (id) => {
		try {
			const { data: address } =
				await customerService.getCustomerAddressById(id, address_id);

			setProvinceId(address && address.province_id);
			setCityId(address && address.city_id);
			setDistrictId(address && address.district_id);
			setSubdistrictId(address && address.subdistrict_id);
			setAddress(address);
		} catch (error) {
			message.error(error.message);
			console.error(error);
		}
	};

	const getRegionChild = async () => {
		const { data: provices } = await customerService.getRegionChild();
		const { data: cities } = await customerService.getRegionChild(
			provinceId
		);
		const { data: districts } = await customerService.getRegionChild(
			cityId
		);
		const { data: subdistricts } = await customerService.getRegionChild(
			districtId
		);

		const getName = (arr, id) => {
			const selectedRegion = arr.find((obj) => {
				return obj.id === id;
			});

			return selectedRegion && selectedRegion.name.id;
		};

		return {
			province: getName(provices, provinceId),
			city: getName(cities, cityId),
			district: getName(districts, districtId),
			subdistrict: getName(subdistricts, subdistrictId),
		};
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
			const regionChildren = await getRegionChild();
			const locationImage = await locationImageRef.current.getImage();

			const data = new FormData();
			data.append('title', values.title);
			data.append('address', values.address);
			data.append('province_name', regionChildren.province);
			data.append('city_name', regionChildren.city);
			data.append('district_name', regionChildren.district);
			data.append('subdistrict_name', regionChildren.subdistrict);
			data.append('postal_code', values.postal_code);
			data.append(
				'additional_information',
				values.additional_information
			);
			data.append(
				'additional_information_driver',
				values.additional_information_driver
			);
			data.append('parking_fee', values.parking_fee);
			data.append(
				'parking_fee_status',
				values.parking_fee > 0 || values.parking_fee !== undefined
			);
			data.append('receiver_name', values.receiver_name);
			data.append('receiver_phone_number', values.receiver_phone_number);
			if (locationImage) data.append('image_location', locationImage);

			if (isCreating) {
				await customerService.createCustomerAddress(id, data);
				message.success('Berhasil menambah alamat');
			} else {
				await customerService.editCustomerAddress(id, address_id, data);
				message.success('Berhasil mengubah alamat');
			}

			message.info(
				'Akan dikembalikan ke halaman detail pelanggan dalam 2 detik'
			);
			setTimeout(() => {
				history.push(`/customer/${id}/detail`);
			}, 2000);
		} catch (error) {
			message.error(error.message);
			console.error(error);
		} finally {
			setIsSubmitting(false);
		}
	};

	const setAddressInitialValues = () => {
		return isCreating
			? {}
			: {
					title: address.title,
					address: address.address,
					parking_fee: address.parking_fee,
					additional_information: address.additional_information,
					additional_information_driver:
						address.additional_information_driver,
					receiver_name: address.receiver_name,
					receiver_phone_number: address.receiver_phone_number,
					postal_code: address.postal_code,
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
		if (address && address.province_id) {
			setAddress({
				...address,
				address: {
					...address,
					province_id: null,
					city_id: null,
					district_id: null,
					subdistrict_id: null,
				},
			});
		}
	};

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

	useEffect(() => {
		(async () => {
			if (!isCreating) {
				await getAddressDetail(id);
			}
		})();
	}, []);

	return (
		<OrganismLayout
			breadcumbs={[
				{ name: 'Pelanggan', link: '/customer' },
				{
					name: 'Detail Pelanggan',
					link: `/customer/${id}/detail`,
				},
				{
					name: `${isCreating ? 'Tambah' : 'Ubah'} Alamat`,
					link: location.pathname,
				},
			]}
			title={`${isCreating ? 'Tambah' : 'Ubah'} Alamat Pelanggan`}
		>
			<Typography.Title level={4}>
				<span className="fw7">
					{`${
						isCreating ? 'Tambah' : 'Ubah'
					} Alamat Pelanggan`.toUpperCase()}
				</span>
			</Typography.Title>

			{!isCreating && !address ? (
				<Skeleton active />
			) : (
				<Form
					className="w-100 mt4"
					name="modify_address"
					initialValues={setAddressInitialValues()}
					onFinish={submit}
					onFinishFailed={(error) => {
						message.error(`Failed: ${error.errorFields}`);
						console.error(error);
					}}
				>
					<Row>
						<Col span={18}>
							<AtomCard title="Info Alamat">
								<Row gutter={12}>
									<Col span={12}>
										<MoleculeTextInputGroup
											name="title"
											label="Nama Alamat"
											placeholder="Masukkan Nama Alamat"
											type="text"
											required={true}
										/>
									</Col>

									<Col span={12}>
										<MoleculeTextInputGroup
											name="address"
											label="Nama Jalan"
											placeholder="Masukkan Nama Jalan"
											type="text"
											required={true}
										/>
									</Col>

									<Col span={12}>
										<MoleculeSelectInputGroup
											label="Provinsi*"
											name="province_id"
											placeholder="Pilih Provinsi"
											defaultValue={
												address && address.province_id
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
												address && address.city_id
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
													(address &&
														address.province_id)
														? `regions/fetch/child/${
																provinceId ||
																address.province_id
														  }`
														: `regions/fetch/cities/0`,
												generateCustomOption: (
													item
												) => ({
													value: item.id,
													label: `${item.name.id} / ${item.name.en} `,
												}),
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
												address && address.district_id
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
													(address && address.city_id)
														? `regions/fetch/child/${
																cityId ||
																address.city_id
														  }`
														: `regions/fetch/cities/0`,
												generateCustomOption: (
													item
												) => ({
													value: item.id,
													label: `${item.name.id} / ${item.name.en} `,
												}),
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
												address &&
												address.subdistrict_id
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
													(address &&
														address.district_id)
														? `regions/fetch/child/${
																districtId ||
																address.district_id
														  }`
														: `regions/fetch/districts/0`,
												generateCustomOption: (
													item
												) => ({
													value: item.id,
													label: `${item.name.id} / ${item.name.en} `,
												}),
											}}
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
											required={true}
										/>
									</Col>

									<Col span={12}>
										<MoleculeTextInputGroup
											name="additional_information"
											label="Detail Alamat"
											placeholder="Masukkan Detail Alamat"
											type="text"
											required={true}
										/>
									</Col>

									<Col span={12}>
										<MoleculeTextInputGroup
											name="additional_information_driver"
											label="Catatan Untuk Driver"
											placeholder="Masukkan Catatan Untuk Driver (jika ada)"
											type="text"
										/>
									</Col>

									<Col span={12}>
										<MoleculeTextInputGroup
											name="parking_fee"
											label="Biaya Parkir"
											placeholder="Masukkan Biaya Parkir (jika ada)"
											type="number"
											maxLength={5}
											min={0}
										/>
									</Col>

									<Col span={12}>
										<MoleculeTextInputGroup
											name="receiver_name"
											label="Nama Penerima"
											placeholder="Masukkan Nama Penerima"
											type="text"
											required={true}
										/>
									</Col>

									<Col span={12}>
										<MoleculeTextInputGroup
											name="receiver_phone_number"
											label="Nomor Handphone Penerima"
											placeholder="Masukkan Nomor Handphone Penerima"
											type="phone"
											required={true}
										/>
									</Col>

									<Col span={24}>
										<MoleculeFileInputGroup
											label="Foto Lokasi"
											fileInputs={[
												{
													defaultValue: address
														? address.image_location
														: null,
													label: '',
													ref: locationImageRef,
												},
											]}
										/>
									</Col>
								</Row>
							</AtomCard>
						</Col>

						<Col className="mt4" span={24}>
							<MoleculeModifyActionButtons
								backUrl={`/customer/${id}/detail`}
								isCreating={isCreating}
								isSubmitting={isSubmitting}
								label="Alamat Pelanggan"
							/>
						</Col>
					</Row>
				</Form>
			)}
		</OrganismLayout>
	);
};

export default CustomerAddressModifyPage;
