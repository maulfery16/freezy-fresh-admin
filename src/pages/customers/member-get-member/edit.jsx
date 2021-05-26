/* eslint-disable no-mixed-spaces-and-tabs */
/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react';
import { Col, Form, message, Row, Typography } from 'antd';
import { useHistory } from 'react-router';

import AtomCard from '../../../components/atoms/card';
import MoleculeTextInputGroup from '../../../components/molecules/input-group/text-input';
import OrganismLayout from '../../../components/organisms/layout';

const EditMemberGetMemberPage = () => {
	const history = useHistory();
	const [memberGetMember, setMemberGetMember] = useState(null);

	const getMemberGetMemberDetail = async (code) => {
		try {
			console.log('try block');
		} catch (error) {
			message.error(error.message);
		} finally {
			console.log('finally block ');
		}
	};

	useEffect(() => {
		getMemberGetMemberDetail();
	}, []);

	return (
		<OrganismLayout
			breadcumbs={[
				{ name: 'Customer', link: '/order' },
				{
					name: 'Ubah Member Get Member',
					link: location.pathname,
				},
			]}
			title={`Tambah Pesanan`}
		>
			<Typography.Title className="mb4" level={4}>
				<span className="fw7">
					{`Ubah Member Get Member`.toUpperCase()}
				</span>
			</Typography.Title>

			<AtomCard title="Info Member Get Member">
				<Form>
					<Row gutter={[24, 0]}>
						<Col span={12}>
							<MoleculeTextInputGroup
								name="customer_nominal_point"
								label="Nominal Point Pelanggan (Rp)"
								placeholder="Masukkan Nominal Point Pelanggan"
								type="text"
							/>
						</Col>

						<Col span={12}>
							<MoleculeTextInputGroup
								name="member_nominal_point"
								label="Nominal Point Member (Rp)"
								placeholder="Masukkan Nominal Point Member"
								type="text"
							/>
						</Col>
						<Col span={12}>
							<MoleculeTextInputGroup
								name="minimal_price"
								label="Nominal Minimal Belanja (Rp)"
								placeholder="Masukkan Minimal Belanja"
								type="text"
							/>
						</Col>
					</Row>
				</Form>
			</AtomCard>
		</OrganismLayout>
	);
};

export default EditMemberGetMemberPage;
