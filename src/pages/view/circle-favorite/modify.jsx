/* eslint-disable no-mixed-spaces-and-tabs */
import React, { useState } from 'react';
import { Col, Form, message, Row, Skeleton, Typography } from 'antd';
import { useHistory, useLocation } from 'react-router-dom';

import AtomCard from '../../../components/atoms/card';
import MoleculeModifyActionButtons from '../../../components/molecules/modify-action-buttons';
import MoleculeTextInputGroup from '../../../components/molecules/input-group/text-input';
import OrganismLayout from '../../../components/organisms/layout';

import CircleFavoriteService from '../../../services/circle-favorite';
const circleFavoriteService = new CircleFavoriteService();

const CircleFavoriteModifyPage = (props) => {
	const history = useHistory();
	const location = useLocation();
	let circleFavorite;

	if (props.location.state === undefined)
		history.push('/view/circle-favorite');
	else circleFavorite = props.location.state.circleFavorite;

	const [isSubmitting, setIsSubmitting] = useState(false);

	const setCircleFavoriteInitialValues = () => {
		return {
			short_description_en: circleFavorite.short_description.en,
			short_description_id: circleFavorite.short_description.id,
			title_en: circleFavorite.title.en,
			title_id: circleFavorite.title.id,
		};
	};

	const submit = async (values) => {
		try {
			setIsSubmitting(true);

			const data = new FormData();
			data.append('title[en]', values.title_en);
			data.append('title[id]', values.title_id);
			data.append('short_description[en]', values.short_description_en);
			data.append('short_description[id]', values.short_description_id);

			await circleFavoriteService.editCircleFavorite(
				circleFavorite.id,
				data
			);
			message.success(`Berhasil mengubah circle's favorite`);

			message.info(
				`Akan dikembalikan ke halaman detail circle's favorite dalam 2 detik`
			);
			setTimeout(() => {
				history.push('/view/circle-favorite');
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
				{ name: `Circle's Favorite`, link: '/view/circle-favorite' },
				{
					name: 'Ubah',
					link: location.pathname,
				},
			]}
			title={`Ubah Circle's Favorite`}
		>
			<Typography.Title level={4}>
				<span className="fw7">
					{`Ubah Circle's Favorite`.toUpperCase()}
				</span>
			</Typography.Title>

			{!circleFavorite ? (
				<Skeleton active />
			) : (
				<Form
					className="w-100 mt4"
					name="modify_circle_favorite"
					initialValues={setCircleFavoriteInitialValues()}
					onFinish={submit}
					onFinishFailed={(error) => {
						message.error(`Failed: ${error}`);
						console.error(error);
					}}
				>
					<Row>
						<Col span={15}>
							<AtomCard title="Info Circle's Favorite">
								<Row gutter={12}>
									<Col span={24}>
										<MoleculeTextInputGroup
											name="title_id"
											label="Title Konten (ID)"
											placeholder="Title Konten (ID)"
											type="text"
											required={true}
										/>
									</Col>

									<Col span={24}>
										<MoleculeTextInputGroup
											name="title_en"
											label="Title Konten (EN)"
											placeholder="Title Konten (EN)"
											type="text"
											required={true}
										/>
									</Col>

									<Col span={24}>
										<MoleculeTextInputGroup
											name="short_description_id"
											label="Deskripsi Singkat (ID)"
											placeholder="Deskripsi Singkat (ID)"
											type="textarea"
											required
										/>
									</Col>

									<Col span={24}>
										<MoleculeTextInputGroup
											name="short_description_en"
											label="Deskripsi Singkat (EN)"
											placeholder="Deskripsi Singkat (EN)"
											type="textarea"
											required
										/>
									</Col>
								</Row>
							</AtomCard>
						</Col>

						<Col className="mt4" span={24}>
							<MoleculeModifyActionButtons
								backUrl="/view/circle-favorite"
								isCreating={false}
								isSubmitting={isSubmitting}
								label="Circle's Favorite"
							/>
						</Col>
					</Row>
				</Form>
			)}
		</OrganismLayout>
	);
};

export default CircleFavoriteModifyPage;
