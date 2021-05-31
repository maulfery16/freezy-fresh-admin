/* eslint-disable no-mixed-spaces-and-tabs */
/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react';
import { Col, Form, message, Row, Typography } from 'antd';
import { useHistory } from 'react-router';

import AtomCard from '../../../components/atoms/card';
import MoleculeModifyActionButtons from '../../../components/molecules/modify-action-buttons';
import MoleculeNumberInputGroup from '../../../components/molecules/input-group/number-input';
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

	const setMgmInitialValues = () => {
		return mgm
			? {
					customer_nominal_point: Number(mgm[1].value),
					member_nominal_point: Number(mgm[0].value),
					minimal_price: Number(mgm[2].value),
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

			<Form
				className="w-100 mt4"
				name="modify_mgm"
				initialValues={setMgmInitialValues()}
				onFinish={submit}
				onFinishFailed={(error) => {
					message.error(`Failed: ${error}`);
					console.error(error);
				}}
			>
				<Row>
					<Col span={18}>
						<AtomCard title="Info Member Get Member">
							<Row
								align="top"
								style={{ paddingTop: '1rem' }}
								gutter={12}
							>
								<Col span={12}>
									<MoleculeTextInputGroup
										label="Nominal Point Pelanggan (Pts)"
										name="customer_nominal_point"
										placeholder="Masukkan Nominal Point Pelanggan"
										type="number"
									/>
								</Col>

								<Col span={12}>
									<MoleculeTextInputGroup
										label="Nominal Point Member (Pts)"
										name="member_nominal_point"
										placeholder="Masukkan Nominal Point Member"
										type="number"
									/>
								</Col>

								<Col span={12}>
									<MoleculeNumberInputGroup
										label="Nominal Minimal Belanja (Rp)"
										name="minimal_price"
										placeholder="Masukkan Minimal Belanja"
										required={true}
									/>
								</Col>
							</Row>
						</AtomCard>
					</Col>

					<Col className="mt4" span={24}>
						<MoleculeModifyActionButtons
							backUrl="/customer/member-get-member"
							isCreating={false}
							isSubmitting={isSubmitting}
							label="Member Get Member"
						/>
					</Col>
				</Row>
			</Form>
		</OrganismLayout>
	);
};

export default EditMemberGetMemberPage;
