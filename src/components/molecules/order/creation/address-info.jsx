import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
import { Col, Divider, message, Row, Typography } from 'antd';

import AtomImage from '../../../atoms/image';
import MoleculeOrderInfoGroup from '../../info-group-order';

import CustomerService from '../../../../services/customer';

const MoleculeOrderCreationAddressInfo = (props) => {
	const customerService = new CustomerService();
	const [address, setAddress] = useState(null);

	const getSelectedCustomerAddressDetail = async () => {
		try {
			const response = await customerService.getCustomerAddressById(
				props.customerId,
				props.addressId
			);

			console.log(response.data);
			setAddress(response.data);
		} catch (error) {
			message.error(error.message);
		}
	};

	useEffect(() => {
		(async () => {
			if (props.customerId && props.addressId) {
				getSelectedCustomerAddressDetail();
			}
		})();
	}, [props]);

	return (
		<>
			<Typography.Text>
				<span className="gray fw5 mb2">Info Alamat</span>
			</Typography.Text>

			<Divider className="mv2" />

			<Row gutter={[12, 12]}>
				<Col span={12}>
					<MoleculeOrderInfoGroup
						title="Nama Alamat"
						content={address?.title}
					/>
				</Col>

				<Col span={12}>
					<MoleculeOrderInfoGroup
						title="Name Penerima"
						content={address?.receiver_name}
					/>
				</Col>

				<Col span={12}>
					<MoleculeOrderInfoGroup
						title="Nama Jalan"
						content={address?.address}
					/>
				</Col>

				<Col span={12}>
					<MoleculeOrderInfoGroup
						title="No Handpone Penerima"
						content={address?.receiver_phone_number || '-'}
					/>
				</Col>

				<Col span={12}>
					<MoleculeOrderInfoGroup
						title="Provinsi"
						content={address?.province_name}
					/>
				</Col>

				<Col span={12}>
					<MoleculeOrderInfoGroup
						title="Kota"
						content={address?.city_name}
					/>
				</Col>

				<Col span={12}>
					<MoleculeOrderInfoGroup
						title="Kecamatan"
						content={address?.district_name}
					/>
				</Col>

				<Col span={12}>
					<MoleculeOrderInfoGroup
						title="Kelurahan"
						content={address?.subdistrict_name}
					/>
				</Col>

				<Col span={12}>
					<MoleculeOrderInfoGroup
						title="Detail Alamat"
						content={address?.additional_information}
					/>
				</Col>

				<Col span={12}>
					<MoleculeOrderInfoGroup
						title="Kode POS"
						content={address?.postal_code}
					/>
				</Col>

				<Col span={12}>
					<MoleculeOrderInfoGroup
						title="Latitude"
						content={address?.latitude}
					/>
				</Col>

				<Col span={12}>
					<MoleculeOrderInfoGroup
						title="Longitude"
						content={address?.longitude}
					/>
				</Col>

				<Col span={12}>
					<MoleculeOrderInfoGroup
						title="Catatan untuk driver"
						content={address?.additional_information_driver}
					/>
				</Col>

				<Col span={12}>
					<MoleculeOrderInfoGroup
						title="Biaya Parkir"
						content={
							address?.parking_fee_status
								? address?.parking_fee
								: '-'
						}
					/>
				</Col>

				<Col span={12}>
					<MoleculeOrderInfoGroup
						title="Gambar Lokasi"
						content={
							address ? (
								<AtomImage
									src={address.image_location}
									size={170}
								/>
							) : (
								'-'
							)
						}
					/>
				</Col>
			</Row>
		</>
	);
};

MoleculeOrderCreationAddressInfo.propTypes = {
	addressId: PropTypes.string,
	customerId: PropTypes.string,
};

export default MoleculeOrderCreationAddressInfo;
