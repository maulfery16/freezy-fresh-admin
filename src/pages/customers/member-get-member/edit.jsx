/* eslint-disable no-mixed-spaces-and-tabs */
/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react';
import { Col, Form, message, Row, Typography } from 'antd';
import { useHistory } from 'react-router';

import AtomCard from '../../../components/atoms/card';
import MoleculeTextInputGroup from '../../../components/molecules/input-group/text-input';
import OrganismLayout from '../../../components/organisms/layout';

import MemberGetMemberService from '../../../services/member-get-member';

const EditMemberGetMemberPage = (props) => {
	const mgmService = new MemberGetMemberService();
	const history = useHistory();

	const [isSubmitting, setIsSubmitting] = useState(false);

	let mgm;
	if (props.location.state === undefined)
		history.push('/customer/member-get-member');
	else mgm = props.location.state.mgm;

	const setAdsInitialValues = () => {
		return mgm
			? {
					customer_nominal_point: mgm[0].value,
					member_nominal_point: mgm[1].value,
					minimal_price: mgm[2].value,
			  }
			: {};
	};

	const submit = async (values) => {
		try {
			setIsSubmitting(true);
			const data = {
				mgm_settings: [
					{
						key: 'MEMBER_POINT',
						value: values.member_nominal_point,
					},
					{
						key: 'CUSTOMER_POINT',
						value: values.customer_nominal_point,
					},
					{
						key: 'MINIMUM_PAYMENT',
						value: values.minimal_price,
					},
				],
			};

			await mgmService.editMemberGetMember(data);

			message.success(`Berhasil mengubah detail member get member`);
			message.info(
				`Akan dikembalikan ke halaman member get member dalam 2 detik`
			);
			setTimeout(() => {
				history.push('/customer/member-get-member');
			}, 2000);
		} catch (error) {
			message.error(error.message);
			console.error(error);
		} finally {
			setIsSubmitting(false);
		}
	};

	return (
		<OrganismLayout
			breadcumbs={[
				{ name: 'Customer', link: '/customer' },
				{
					name: 'Ubah Member Get Member',
					link: location.pathname,
				},
			]}
			title={`Ubah Member Get Member`}
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
