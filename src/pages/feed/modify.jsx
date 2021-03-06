/* eslint-disable no-mixed-spaces-and-tabs */
import React, { useEffect, useRef, useState } from 'react';
import { Col, Form, message, Row, Skeleton, Typography } from 'antd';
import { useHistory, useParams } from 'react-router-dom';

import AtomCard from '../../components/atoms/card';
import MoleculeFileInputGroup from '../../components/molecules/input-group/file-input';
import MoleculeModifyActionButtons from '../../components/molecules/modify-action-buttons';
import MoleculeSelectInputGroup from '../../components/molecules/input-group/select-input';
import MoleculeTextEditorGroup from '../../components/molecules/input-group/text-editor';
import MoleculeTextInputGroup from '../../components/molecules/input-group/text-input';
import OrganismLayout from '../../components/organisms/layout';

import FeedService from '../../services/feed';

const FeedModifyPage = () => {
	const feedService = new FeedService();
	const history = useHistory();
	const isCreating = history.location.pathname.includes('add') ? true : false;
	const storyImageRef = useRef();
	const [feed, setFeed] = useState(null);
	const [isSubmitting, setIsSubmitting] = useState(false);
	const [longDescription, setLongDescription] = useState('');
	const [selectedContentType, setSelectedContentType] = useState('VIDEO');
	const { id } = useParams();
	const [form] = Form.useForm();

	const getFeedDetail = async (id) => {
		try {
			const response = await feedService.getFeedById(id);
			setLongDescription(response.data.long_description?.id);
			setFeed(response.data);
			setSelectedContentType(response.data.content_type);
		} catch (error) {
			message.error(error.message);
			console.error(error);
		}
	};

	const submit = async (values) => {
		try {
			if (!selectedContentType)
				message.warning('Pilih tipe konten terlebih dahulu');

			setIsSubmitting(true);

			const data = new FormData();
			data.append('content_type', selectedContentType);
			data.append('update_type', 'MANUAL');

			if (selectedContentType === 'VIDEO') {
				data.append('video_link', values.video_link);
				data.append('video_title[id]', values.video_title);
				data.append('video_title[en]', values.video_title);
			} else {
				const storyImage = await storyImageRef.current.getImage();
				if (storyImage) data.append('story_image', storyImage);
				values.products.map((x) => data.append('products[]', x));
				data.append('long_description[id]', longDescription);
				data.append('long_description[en]', longDescription);
				data.append('short_description[id]', values.short_description);
				data.append('short_description[en]', values.short_description);
				data.append('title[id]', values.story_title);
				data.append('title[en]', values.story_title);
			}

			if (isCreating) {
				await feedService.createFeed(data);
				message.success('Berhasil menambah feed');
			} else {
				await feedService.editFeed(id, data);
				message.success('Berhasil mengubah feed');
			}

			message.info(
				'Akan dikembalikan ke halaman daftar feed dalam 2 detik'
			);
			setTimeout(() => {
				history.push('/feed');
			}, 2000);
		} catch (error) {
			message.error(error.message);
			console.error(error);
		} finally {
			setIsSubmitting(false);
		}
	};

	const setFeedInitialValues = () => {
		return isCreating || !feed
			? {
					content_type: 'VIDEO',
			  }
			: {
					content_type: feed.content_type,
					products: feed?.products?.map((x) => x.sku_id),
					short_description: feed?.short_description?.id,
					story_title: feed.title?.id,
					video_link: feed?.video_link,
					video_title: feed?.video_title?.id,
			  };
	};

	useEffect(() => {
		(async () => {
			if (!isCreating) {
				await getFeedDetail(id);
			}
		})();
	}, []);

	return (
		<OrganismLayout
			breadcumbs={[
				{ name: 'Feed', link: '/feed' },
				{
					name: location.pathname.includes('add') ? 'Tambah' : 'Ubah',
					link: location.pathname,
				},
			]}
			title={`${isCreating ? 'Tambah' : 'Ubah'} Konten`}
		>
			<Typography.Title level={4}>
				<span className="fw7">
					{`${isCreating ? 'Tambah' : 'Ubah'} Konten`.toUpperCase()}
				</span>
			</Typography.Title>

			{!isCreating && !feed ? (
				<Skeleton active />
			) : (
				<Form
					className="w-100 mt4"
					name="modify_feed"
					initialValues={setFeedInitialValues()}
					onFinish={submit}
					form={form}
					onFinishFailed={() => {
						message.error('Kesalahan saat mengambil nilai pada form. Silahkan periksa kembali');
					}}
				>
					<Row>
						<Col span={18}>
							<AtomCard title="Info Konten">
								<Row gutter={12}>
									<Col span={12}>
										<MoleculeSelectInputGroup
											name="content_type"
											label="Tipe Konten"
											placeholder="Pilih Tipe Konten"
											data={{
												onChange: (val) => {
													setSelectedContentType(val);
													form.setFieldsValue({ content_type: val });
												},
												options: [
													{
														value: 'STORY',
														label: 'Story',
													},
													{
														value: 'VIDEO',
														label: 'Video',
													},
												],
											}}
										/>
									</Col>

									<Col
										span={24}
										style={{ paddingTop: '2rem' }}
									>
										<Typography.Text strong>
											<span className="denim f5">
												INFO {selectedContentType}
											</span>
										</Typography.Text>
									</Col>

									{selectedContentType === 'VIDEO' ? (
										<>
											<Col span={12}>
												<MoleculeTextInputGroup
													name="video_title"
													label="Title Video"
													placeholder="Masukan Title Video"
													type="text"
													required
												/>
											</Col>

											<Col span={12}>
												<MoleculeTextInputGroup
													name="video_link"
													label="Link Video"
													placeholder="Masukan Link Video Youtube"
													type="text"
													required
												/>
											</Col>
										</>
									) : (
										<>
											<Col span={12}>
												<MoleculeTextInputGroup
													name="story_title"
													label="Title Story"
													placeholder="Masukan Title Story"
													type="text"
													required
												/>
											</Col>

											<Col span={24}>
												<MoleculeFileInputGroup
													label="Gambar (opsional)"
													fileInputs={[
														{
															defaultValue:
																feed?.story_image,
															ref: storyImageRef,
														},
													]}
												/>
											</Col>

											<Col span={24}>
												<MoleculeSelectInputGroup
													label="Produk Terkait"
													name="products"
													mode="multiple"
													placeholder="Produk Terkait"
													required
													data={{
														url: 'product/variants/lists',
														generateCustomOption: (
															item
														) => ({
															value: item.sku_id,
															label: `${item.sku_id} - ${item.name.id}`,
														}),
													}}
												/>
											</Col>

											<Col span={12}>
												<MoleculeTextEditorGroup
													label="Story Lengkap (ID)"
													onChange={
														setLongDescription
													}
													value={longDescription}
												/>
											</Col>

											<Col span={12}>
												<MoleculeTextInputGroup
													name="short_description"
													label="Story Singkat"
													placeholder="Story Singkat"
													type="textarea"
													required
												/>
											</Col>
										</>
									)}
								</Row>
							</AtomCard>
						</Col>

						<Col className="mt4" span={24}>
							<MoleculeModifyActionButtons
								backUrl="/feed"
								isCreating={isCreating}
								isSubmitting={isSubmitting}
								label="Konten"
							/>
						</Col>
					</Row>
				</Form>
			)}
		</OrganismLayout>
	);
};

export default FeedModifyPage;
