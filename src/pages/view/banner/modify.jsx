/* eslint-disable no-mixed-spaces-and-tabs */
import React, { useEffect, useRef, useState } from 'react';
import { Col, Form, message, Row, Skeleton, Space, Typography } from 'antd';
import { useHistory, useLocation, useParams } from 'react-router-dom';

import AtomCard from '../../../components/atoms/card';
import MoleculeFileInputGroup from '../../../components/molecules/input-group/file-input';
import MoleculeModifyActionButtons from '../../../components/molecules/modify-action-buttons';
import MoleculeSelectInputGroup from '../../../components/molecules/input-group/select-input';
import MoleculeTextInputGroup from '../../../components/molecules/input-group/text-input';
import OrganismLayout from '../../../components/organisms/layout';

import BannerService from '../../../services/banner';
const bannerService = new BannerService();

const BannerModifyPage = () => {
	const dekstopImageRef = useRef();
	const mobileImageRef = useRef();

	const { id } = useParams();
	const history = useHistory();
	const location = useLocation();
	const isCreating = location.pathname.includes('add') ? true : false;

	const [banner, setBanner] = useState(null);
	const [isSubmitting, setIsSubmitting] = useState(false);

	const getBannerDetail = async (id) => {
		try {
			let { data: banner } = await bannerService.getBannerById(id);
			banner.promotions = banner.promotions
				? banner.promotions.map((promo) => promo.id)
				: null;
			banner.branches = banner.branches.map((branch) => branch.id);

			setBanner(banner);
		} catch (error) {
			message.error(error.message);
			console.error(error);
		}
	};

	const setBannerInitialValues = () => {
		return isCreating
			? {}
			: {
					branches: banner.branches,
					promo: banner.promo,
					title_en: banner.title.en,
					title_id: banner.title.id,
			  };
	};

	const submit = async (values) => {
		const dekstopImage = await dekstopImageRef.current.getImage();
		const mobileImage = await mobileImageRef.current.getImage();

		try {
			setIsSubmitting(true);

			const data = new FormData();
			data.append('image_mobile', mobileImage);
			data.append('image_desktop', dekstopImage);
			data.append('title[id]', values.title_id);
			data.append('title[en]', values.title_en);
			data.append('promo', values.promo);
			values.branches.forEach((branch) => {
				data.append('branches[]', branch);
			});

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
										<MoleculeFileInputGroup
											label="Foto Banner"
											description="
												Format gambar .jpg .jpeg .png, Untuk foto banner mobile ukuran minimum 0 x 0px (Untuk
												gambar optimal gunakan ukuran minimum 0 x 0 px) Untuk foto banner desktop ukuran
												minimum 0 x 0px (Untuk gambar optimal gunakan ukuran minimum 0 x 0 px)
											"
											fileInputs={[
												{
													defaultValue: banner
														? banner.image_mobile
														: null,
													isMobileImage: true,
													label: 'Foto Banner Mobile',
													ref: mobileImageRef,
												},
												{
													defaultValue: banner
														? banner.image_desktop
														: null,
													label:
														'Foto Banner Dekstop',
													ref: dekstopImageRef,
												},
											]}
										/>
									</Col>

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

									<Col span={24}>
										<MoleculeSelectInputGroup
											label="Pilih Promo"
											name="promo"
											placeholder="Pilih Promo"
											data={{
												url: 'promotions',
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
															{item.title.en} /
															{item.title.id}
														</Space>
													),
												}),
											}}
										/>
									</Col>

									<Col span={24}>
										<MoleculeSelectInputGroup
											label="Cabang"
											name="branches"
											placeholder="Cabang"
											mode="multiple"
											required
											data={{
												url: 'branches',
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
