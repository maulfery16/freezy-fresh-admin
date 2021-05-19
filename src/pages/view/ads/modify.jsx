/* eslint-disable no-mixed-spaces-and-tabs */
import React, { useRef, useState } from 'react';
import { Col, Form, message, Row, Typography } from 'antd';
import { useHistory, useLocation } from 'react-router-dom';

import AtomCard from '../../../components/atoms/card';
import AtomPromotionSelect from '../../../components/atoms/selection/promotion';
import MoleculeFileInputGroup from '../../../components/molecules/input-group/file-input';
import MoleculeModifyActionButtons from '../../../components/molecules/modify-action-buttons';
import MoleculeTextInputGroup from '../../../components/molecules/input-group/text-input';
import OrganismLayout from '../../../components/organisms/layout';

import AdvertisementService from '../../../services/advertisement';

const AdsModifyPage = (props) => {
	const adsService = new AdvertisementService();

	const dekstopImageRef = useRef();
	const mobileImageRef = useRef();

	const history = useHistory();
	const location = useLocation();

	let ads;
	if (props.location.state === undefined) history.push('/view/ads');
	else ads = props.location.state.ads;

	const [isSubmitting, setIsSubmitting] = useState(false);

	const setAdsInitialValues = () => {
		return ads
			? {
					promo: ads.promotion_id,
					title_en: ads.title.en,
					title_id: ads.title.id,
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
			data.append('promotion_id', values.promotion_id);

			await adsService.editAdvertisement(data);

			message.success(`Berhasil mengubah iklan`);
			message.info(
				`Akan dikembalikan ke halaman detail iklan dalam 2 detik`
			);
			setTimeout(() => {
				history.push('/view/ads');
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
				{ name: `Iklan`, link: '/view/ads' },
				{
					name: 'Ubah',
					link: location.pathname,
				},
			]}
			title={`Ubah Iklan`}
		>
			<Typography.Title level={4}>
				<span className="fw7">{`Ubah Iklan`.toUpperCase()}</span>
			</Typography.Title>

			<Form
				className="w-100 mt4"
				name="modify_ads"
				initialValues={setAdsInitialValues()}
				onFinish={submit}
				onFinishFailed={(error) => {
					message.error(`Failed: ${error}`);
					console.error(error);
				}}
			>
				<Row>
					<Col span={18}>
						<AtomCard title="Info Iklan">
							<Row
								align="top"
								style={{ paddingTop: '1rem' }}
								gutter={12}
							>
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
									<AtomPromotionSelect required />
								</Col>

								<Col span={24}>
									<MoleculeFileInputGroup
										label="Gambar Poster"
										description=""
										fileInputs={[
											{
												defaultValue: ads
													? ads.banner_mobile
													: null,
												isMobileImage: true,
												label: 'Mobile',
												ref: mobileImageRef,
											},
											{
												defaultValue: ads
													? ads.banner_desktop
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
							backUrl="/view/ads"
							isCreating={false}
							isSubmitting={isSubmitting}
							label="Iklan"
						/>
					</Col>
				</Row>
			</Form>
		</OrganismLayout>
	);
};

export default AdsModifyPage;
