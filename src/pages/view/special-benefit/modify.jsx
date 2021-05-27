/* eslint-disable no-mixed-spaces-and-tabs */
import React, { useRef, useState } from 'react';
import { Col, Form, message, Row, Typography } from 'antd';
import { useHistory, useLocation } from 'react-router-dom';

import AtomCard from '../../../components/atoms/card';
import MoleculeFileInputGroup from '../../../components/molecules/input-group/file-input';
import MoleculeModifyActionButtons from '../../../components/molecules/modify-action-buttons';
import MoleculeTextInputGroup from '../../../components/molecules/input-group/text-input';
import MoleculeSelectInputGroup from '../../../components/molecules/input-group/select-input';
import OrganismLayout from '../../../components/organisms/layout';

import SpecialBenefitService from '../../../services/special-benefit';

const AdsModifyPage = (props) => {
	const specialBenefitService = new SpecialBenefitService();

	const dekstopImageRef = useRef();
	const mobileImageRef = useRef();

	const history = useHistory();
	const location = useLocation();

	let specialBenefit;
	if (props.location.state === undefined)
		history.push('/view/special-benefit');
	else specialBenefit = props.location.state.specialBenefit;

	const [isSubmitting, setIsSubmitting] = useState(false);

	const setAdsInitialValues = () => {
		return specialBenefit
			? {
					title_en: specialBenefit.title.en,
					title_id: specialBenefit.title.id,
					is_active: specialBenefit.is_active,
			  }
			: {};
	};

	const submit = async (values) => {
		try {
			setIsSubmitting(true);
			const dekstopImage = await dekstopImageRef.current.getImage();
			const mobileImage = await mobileImageRef.current.getImage();

			const data = new FormData();
			data.append('banner_mobile', mobileImage);
			data.append('banner_desktop', dekstopImage);
			data.append('title[en]', values.title_en);
			data.append('title[id]', values.title_id);
			data.append('is_active', values.is_active);

			await specialBenefitService.editSpecialBenefit(data);

			message.success(`Berhasil mengubah special benefit`);
			message.info(
				`Akan dikembalikan ke halaman detail special benefit dalam 2 detik`
			);
			setTimeout(() => {
				history.push('/view/special-benefit');
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
				{ name: 'Tampilan', link: '/view' },
				{ name: `Special Benefit`, link: '/view/special-benefit' },
				{
					name: 'Ubah',
					link: location.pathname,
				},
			]}
			title={`Ubah Special Benefit`}
		>
			<Typography.Title level={4}>
				<span className="fw7">
					{`Ubah Special Benefit`.toUpperCase()}
				</span>
			</Typography.Title>

			<Form
				className="w-100 mt4"
				name="modify_specialBenefit"
				initialValues={setAdsInitialValues()}
				onFinish={submit}
				onFinishFailed={(error) => {
					message.error(`Failed: ${error}`);
					console.error(error);
				}}
			>
				<Row>
					<Col span={18}>
						<AtomCard title="Info Special Benefit">
							<Row
								align="top"
								style={{ paddingTop: '1rem' }}
								gutter={12}
							>
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
								<Col span={12}></Col>
								<Col span={12}>
									<MoleculeTextInputGroup
										name="title_id"
										label="Title Konten (ID)"
										placeholder="Title Konten (ID)"
										type="text"
										required={true}
									/>
								</Col>

								<Col span={12}>
									<MoleculeTextInputGroup
										name="title_en"
										label="Title Konten (EN)"
										placeholder="Title Konten (EN)"
										type="text"
										required={true}
									/>
								</Col>

								<Col span={24}>
									<MoleculeFileInputGroup
										label="Gambar Poster"
										fileInputs={[
											{
												defaultValue: specialBenefit
													? specialBenefit.banner_mobile
													: null,
												isMobileImage: true,
												label: 'Mobile',
												ref: mobileImageRef,
											},
											{
												defaultValue: specialBenefit
													? specialBenefit.banner_desktop
													: null,
												label: 'Dekstop',
												ref: dekstopImageRef,
											},
										]}
									/>
								</Col>
							</Row>
						</AtomCard>
					</Col>

					<Col className="mt4" span={24}>
						<MoleculeModifyActionButtons
							backUrl="/view/special-benefit"
							isCreating={false}
							isSubmitting={isSubmitting}
							label="Special Benefit"
						/>
					</Col>
				</Row>
			</Form>
		</OrganismLayout>
	);
};

export default AdsModifyPage;
