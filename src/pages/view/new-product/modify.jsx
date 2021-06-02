/* eslint-disable no-mixed-spaces-and-tabs */
import React, { useState } from 'react';
import { Col, Form, message, Row, Skeleton, Typography } from 'antd';
import { useHistory, useLocation } from 'react-router-dom';

import AtomCard from '../../../components/atoms/card';
import MoleculeModifyActionButtons from '../../../components/molecules/modify-action-buttons';
import MoleculeTextInputGroup from '../../../components/molecules/input-group/text-input';
import OrganismLayout from '../../../components/organisms/layout';

import NewProductService from '../../../services/new-product';
const newProductService = new NewProductService();

const NewProductModifyPage = (props) => {
	const history = useHistory();
	const location = useLocation();
	let newProduct;

	if (props.location.state === undefined) history.push('/view/new-product');
	else newProduct = props.location.state.newProduct;

	const [isSubmitting, setIsSubmitting] = useState(false);

	const setNewProductInitialValues = () => {
		return {
			short_description_en: newProduct.short_description.en,
			short_description_id: newProduct.short_description.id,
			title_en: newProduct.title.en,
			title_id: newProduct.title.id,
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

			await newProductService.editNewProduct(newProduct.id, data);
			message.success('Berhasil mengubah produk baru');

			message.info(
				'Akan dikembalikan ke halaman detail produk baru dalam 2 detik'
			);
			setTimeout(() => {
				history.push('/view/new-product');
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
				{ name: 'Produk Baru', link: '/view/new-product' },
				{
					name: 'Ubah',
					link: location.pathname,
				},
			]}
			title={`Ubah Produk Baru`}
		>
			<Typography.Title level={4}>
				<span className="fw7">{`Ubah Produk Baru`.toUpperCase()}</span>
			</Typography.Title>

			{!newProduct ? (
				<Skeleton active />
			) : (
				<Form
					className="w-100 mt4"
					name="modify_new_product"
					initialValues={setNewProductInitialValues()}
					onFinish={submit}
					onFinishFailed={(error) => {
						message.error(`Failed: ${error}`);
						console.error(error);
					}}
				>
					<Row>
						<Col span={15}>
							<AtomCard title="Info Produk Baru">
								<Row gutter={12} className="mt4">
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
								backUrl="/view/new-product"
								isCreating={false}
								isSubmitting={isSubmitting}
								label="Produk Baru"
							/>
						</Col>
					</Row>
				</Form>
			)}
		</OrganismLayout>
	);
};

export default NewProductModifyPage;
