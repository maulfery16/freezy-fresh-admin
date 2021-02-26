/* eslint-disable no-mixed-spaces-and-tabs */
import React, { useEffect, useState } from 'react';
import { Col, Form, message, Row, Skeleton, Space, Typography } from 'antd';
import { useHistory, useLocation, useParams } from 'react-router-dom';

import AtomCard from '../../../components/atoms/card';
import MoleculeFileInputGroup from '../../../components/molecules/input-group/file-input';
import MoleculeTextInputGroup from '../../../components/molecules/input-group/text-input';
import OrganismLayout from '../../../components/organisms/layout';

import RequestAdapterService from '../../../services/request-adapter';
import BannerService from '../../../services/banner';
import MoleculeModifyActionButtons from '../../../components/molecules/modify-action-buttons';
import MoleculeSelectInputGroup from '../../../components/molecules/input-group/select-input';
const bannerService = new BannerService();

const BannerModifyPage = () => {
	const { id } = useParams();
	const history = useHistory();
	const location = useLocation();
	const isCreating = location.pathname.includes('add') ? true : false;

	const [banner, setBanner] = useState(null);
	const [bannerMobileImage, setBannerMobileImage] = useState(null);
	const [bannerWebsiteImage, setBannerWebsiteImage] = useState(null);
	const [isSubmitting, setIsSubmitting] = useState(false);

	const getBannerDetail = async (id) => {
		try {
			const { data: banner } = await bannerService.getBannerById(id);

			setBanner(banner);
			const bannerMobileImageFile = await RequestAdapterService.convertImageURLtoFile(
				banner.mobileImage.original
			);
			setBannerMobileImage(bannerMobileImageFile);
			const bannerWebsiteImageFile = await RequestAdapterService.convertImageURLtoFile(
				banner.websiteImage.original
			);
			setBannerWebsiteImage(bannerWebsiteImageFile);
		} catch (error) {
			message.error(error.message);
			console.error(error);
		}
	};

	const setBannerInitialValues = () => {
		return isCreating
			? {}
			: {
					title: banner.title,
					promo: banner.promo,
					mobileImage: bannerMobileImage,
					websiteImage: bannerWebsiteImage,
			  };
	};

	const submit = async (values) => {
		try {
			setIsSubmitting(true);

			const data = new FormData();
			data.append('mobile_image', bannerMobileImage);
			data.append('website_image', bannerWebsiteImage);
			data.append('title[id]', values.title_id);
			data.append('title[en]', values.title_en);
			data.append('promo', values.promo);

			if (isCreating) {
				await bannerService.createBanner(data);
				message.success('Berhasil menambah banner');
			} else {
				await bannerService.editBanner(id, data);
				message.success('Berhasil mengubah banner');
			}

			message.info(
				'Akan dikembalikan ke halaman daftar banner dalam 2 detik'
			);
			setTimeout(() => {
				history.push('/view/banner');
			}, 2000);
		} catch (error) {
			message.error(error.message);
			console.error(error);
		} finally {
			setIsSubmitting(false);
		}
	};

	useEffect(() => {
		(async () => {
			if (!isCreating) {
				await getBannerDetail(id);
			}
		})();
	}, []);

	return (
		<OrganismLayout
			breadcumbs={[
				{ name: 'Banner', link: '/view/banner' },
				{
					name: location.pathname.includes('add') ? 'Tambah' : 'Ubah',
					link: location.pathname,
				},
			]}
			title={`${isCreating ? 'Tambah' : 'Ubah'} Banner`}
		>
			<Typography.Title level={4}>
				<span className="fw7">
					{`${isCreating ? 'Tambah' : 'Ubah'} Banner`.toUpperCase()}
				</span>
			</Typography.Title>

			{!isCreating && !banner ? (
				<Skeleton active />
			) : (
				<Form
					className="w-100 mt4"
					name="modify_banner"
					initialValues={setBannerInitialValues()}
					onFinish={submit}
					onFinishFailed={(error) => {
						message.error(`Failed: ${error}`);
						console.error(error);
					}}
				>
					<Row>
						<Col span={15}>
							<AtomCard title="Info Banner">
								<Row gutter={12}>
									<Col span={24}>
										<MoleculeTextInputGroup
											name="title_id"
											label="Title Banner (ID)"
											placeholder="Title Banner (ID)"
											type="text"
										/>
									</Col>

									<Col span={24}>
										<MoleculeTextInputGroup
											name="title_en"
											label="Title Banner (EN)"
											placeholder="Title Banner (EN)"
											type="text"
										/>
									</Col>

									<Col span={12}>
										<MoleculeFileInputGroup
											defaultValue={bannerMobileImage}
											height="100"
											label="Foto Banner Mobile"
											id="banner-mobile-upload"
											name="mobile_image"
											placeholder="png"
											setImage={setBannerMobileImage}
											width="100"
										/>
									</Col>

									<Col span={12}>
										<MoleculeFileInputGroup
											defaultValue={bannerWebsiteImage}
											height="100"
											id="banner-website-upload"
											label="Foto Banner Website"
											name="website_image"
											placeholder="png"
											setImage={setBannerWebsiteImage}
											width="100"
										/>
									</Col>

									<Col span={24}>
										<MoleculeSelectInputGroup
											label="Pilih Promo"
											name="promo"
											placeholder="Pilih Promo"
											data={{
												url: 'colors',
												generateCustomOption: (
													item
												) => ({
													value: item.id,
													label: (
														<Space>
															<div
																className="br2"
																style={{
																	background:
																		item.hexa_code,
																	height: 20,
																	width: 20,
																}}
															/>
															{item.name.en} /
															{item.name.id}
														</Space>
													),
												}),
											}}
										/>
									</Col>
								</Row>
							</AtomCard>
						</Col>

						<Col className="mt4" span={24}>
							<MoleculeModifyActionButtons
								backUrl="/view/banner"
								isCreating={isCreating}
								isSubmitting={isSubmitting}
								label="Banner"
							/>
						</Col>
					</Row>
				</Form>
			)}
		</OrganismLayout>
	);
};

export default BannerModifyPage;