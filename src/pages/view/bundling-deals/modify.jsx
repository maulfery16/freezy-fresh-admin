/* eslint-disable no-unused-vars */
/* eslint-disable react/display-name */
import React, { useEffect, useRef, useState } from 'react';
import { Col, Row, Skeleton, Typography, message, Form } from 'antd';
import { useHistory } from 'react-router-dom';

import AtomCard from '../../../components/atoms/card';
import MoleculeFileInputGroup from '../../../components/molecules/input-group/file-input';
import MoleculeModifyActionButtons from '../../../components/molecules/modify-action-buttons';
import MoleculeTextInputGroup from '../../../components/molecules/input-group/text-input';
import OrganismLayout from '../../../components/organisms/layout';

import BundlingDealsService from '../../../services/bundling-deals';
const bundlingDealsService = new BundlingDealsService();

const BundlingDealsModifyPage = () => {
	const bundlingDealsMobileHomeRef = useRef();
	const bundlingDealsDesktopHomeRef = useRef();

	const history = useHistory();
	const [form] = Form.useForm();

	const [bundlingDeals, setBundlingDeals] = useState(null);

	// eslint-disable-next-line no-unused-vars
	const [isSubmitting, setIsSubmitting] = useState(false);
	const [isCreating, setIsCreating] = useState(false);

	const getBundlingDeals = async () => {
		try {
			const {data} = await bundlingDealsService.getBundlingDeals();
			setBundlingDeals(data);
			setIsCreating(!data);
		} catch (error) {
			message.error(error.message);
			console.error(error);
		}
	};

	const setHolidayInitialValues = () => {
		return isCreating
			? {}
			: {
					en_title: bundlingDeals?.title?.en,
					id_title: bundlingDeals?.title?.id,
					id_short_desc: bundlingDeals?.short_description?.id,
					en_short_desc: bundlingDeals?.short_description?.en,
					// eslint-disable-next-line no-mixed-spaces-and-tabs
			  };
	};

	const submit = async (values) => {
		try {
			setIsSubmitting(true);

			const formData = new FormData();
			const mobileHomeImage = await bundlingDealsMobileHomeRef.current.getImage();
			const desktopHomeImage = await bundlingDealsDesktopHomeRef.current.getImage();
			// if (mobileHomeImage)
			// 	formData.append('banner_mobile_home', mobileHomeImage);
			// if (desktopHomeImage)
			// 	formData.append('banner_desktop_home', desktopHomeImage);
			// formData.append('title[id]', values.id_title);
			// formData.append('title[en]', values.en_title);
			// formData.append('short_description[id]', values.id_short_desc);
			// formData.append('short_description[en]', values.en_short_desc);
			
			// await bundlingDealsService.updateBundlingDeals(formData);

			// message.info(
			// 	'Akan dikembalikan ke halaman daftar bundling deals dalam 2 detik'
			// );
			// setTimeout(() => {
			// 	history.push('/view/bundling-deals');
			// }, 2000);
		} catch (error) {
			message.error(error.message);
			console.error(error);
		} finally {
			setIsSubmitting(false);
		}
	};

	useEffect(() => {
		(async () => {
			await getBundlingDeals();
		})();
	}, []);

	return (
		<OrganismLayout
			breadcumbs={[
				{ name: 'Tampilan', link: '/view' },
				{ name: 'Bundling Deals', link: '/view/bundling-deals' },
				{
					name: location.pathname.includes('add') ? 'Tambah' : 'Ubah Bundling Deals',
					link: location.pathname,
				},
			]}
			title="Bundling Deals"
		>
			<Typography.Title level={4}>
				<span className="fw7">{`Ubah Bundling Deals`.toUpperCase()}</span>
			</Typography.Title>

			{!bundlingDeals ? (
				<Skeleton active />
			) : (
				<>
					<Form
						className="w-100 mt4"
						name="modify_bundling_deals"
						form={form}
						onFinish={submit}
						initialValues={setHolidayInitialValues()}
						onFinishFailed={(error) => {
							message.error(`Failed: ${error}`);
							console.error(error);
						}}
					>
						<Row align="top" className="mt4" gutter={24}>
							<Col span={24}>
								<AtomCard>
									<Row gutter={[24, 24]}>
										<Col span={24}>
											<Typography.Text strong>
												<span className="denim f5">
													{'Info Bundling Deals'.toUpperCase()}
												</span>
											</Typography.Text>
										</Col>

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
														defaultValue: bundlingDeals
															? bundlingDeals.banner_mobile_home
															: null,
														isMobileImage: true,
														label:
															'Foto Banner Mobile',
														ref: bundlingDealsMobileHomeRef,
													},
													{
														defaultValue: bundlingDeals
															? bundlingDeals.banner_desktop_home
															: null,
														label:
															'Foto Banner Desktop',
														ref: bundlingDealsDesktopHomeRef,
													},
												]}
											/>
										</Col>

										<Col span={12}>
											<MoleculeTextInputGroup
												name="id_title"
												label="Title (ID)"
												placeholder="Judul Title (ID)"
												type="text"
												value={bundlingDeals?.title?.id}
											/>
										</Col>

										<Col span={12}>
											<MoleculeTextInputGroup
												name="en_title"
												label="Judul (EN)"
												placeholder="Judul (EN)"
												type="text"
												value={bundlingDeals?.title?.en}
											/>
										</Col>

										<Col span={12}>
											<MoleculeTextInputGroup
												autoSize={{
													minRows: 2,
													maxRows: 6,
												}}
												label="Deskripsi Singkat (ID)"
												name="id_short_desc"
												placeholder="Deskripsi Singkat (ID)"
												type="textarea"
												value={bundlingDeals?.short_description?.id}
											/>
										</Col>

										<Col span={12}>
											<MoleculeTextInputGroup
												autoSize={{
													minRows: 2,
													maxRows: 6,
												}}
												name="en_short_desc"
												label="Deskripsi Singkat (EN)"
												placeholder="Deskripsi Singkat (EN)"
												type="textarea"
												value={bundlingDeals?.short_description?.en}
											/>
										</Col>
									</Row>
								</AtomCard>
							</Col>
						</Row>
					</Form>
					<Col className="mt4" span={24}>
						<MoleculeModifyActionButtons
							backUrl="/view/daily-deals"
							isCreating={isCreating}
							isSubmitting={isSubmitting}
							label="Bundling Deals"
							onClick={() => form.submit()}
						/>
					</Col>
				</>
			)}
		</OrganismLayout>
	);
};

export default BundlingDealsModifyPage;
