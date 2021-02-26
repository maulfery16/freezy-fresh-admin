/* eslint-disable no-mixed-spaces-and-tabs */
import React, { useEffect, useState } from 'react';
import { Col, Form, message, Row, Skeleton, Typography } from 'antd';
import { useHistory, useLocation, useParams } from 'react-router-dom';

import AtomCard from '../../../components/atoms/card';
import MoleculeTextInputGroup from '../../../components/molecules/input-group/text-input';
import OrganismLayout from '../../../components/organisms/layout';

import AdditionalCategoryService from '../../../services/additional-category';
import MoleculeModifyActionButtons from '../../../components/molecules/modify-action-buttons';
const additionalCategoryService = new AdditionalCategoryService();

const AdditionalCategoryModifyPage = () => {
	const { id } = useParams();
	const history = useHistory();
	const location = useLocation();
	const isCreating = location.pathname.includes('edit') ? false : true;

	const [additionalCategory, setAdditionalCategory] = useState(null);
	const [isSubmitting, setIsSubmitting] = useState(false);

	const getAdditionalCategoryDetail = async (id) => {
		try {
			const additionalCategory = await additionalCategoryService.getAdditionalCategoryById(
				id
			);

			setAdditionalCategory(additionalCategory.data);
		} catch (error) {
			message.error(error.message);
			console.error(error);
		}
	};

	const setAdditionalCategoryInitialValues = () => {
		console.log(additionalCategory);

		return isCreating || !additionalCategory
			? {}
			: {
					code: additionalCategory.code,
					en_name: additionalCategory.name.en,
					id_name: additionalCategory.name.id,
			  };
	};

	const submit = async (values) => {
		try {
			setIsSubmitting(true);

			const data = new FormData();
			data.append('code', values.code);
			data.append('name[en]', values.en_name);
			data.append('name[id]', values.id_name);

			if (isCreating) {
				await additionalCategoryService.createAdditionalCategory(data);
				message.success('Berhasil menambah kategori tambahan');
			} else {
				await additionalCategoryService.editAdditionalCategory(
					id,
					data
				);
				message.success('Berhasil mengubah kategori tambahan');
			}
			message.info(
				'Akan dikembalikan ke halaman daftar kategori tambahan dalam 2 detik'
			);
			setTimeout(() => {
				history.push('/products/additional-category');
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
				await getAdditionalCategoryDetail(id);
			}
		})();
	}, []);

	return (
		<OrganismLayout
			breadcumbs={[
				{ name: 'Produk', link: '/products/additional-category' },
				{
					name: 'Kategori Tambahan',
					link: '/products/additional-category',
				},
				{
					name: isCreating ? 'Tambah' : 'Ubah',
					link: location.pathname,
				},
			]}
			title={`${isCreating ? 'Tambah' : 'Ubah'} Kategori Tambahan`}
		>
			<Typography.Title level={4}>
				<span className="fw7">
					{`${
						isCreating ? 'Tambah' : 'Ubah'
					} Kategori Tambahan`.toUpperCase()}
				</span>
			</Typography.Title>

			{!isCreating && !additionalCategory ? (
				<Skeleton active />
			) : (
				<Form
					className="w-100 mt4"
					name="modify_additional_category"
					initialValues={setAdditionalCategoryInitialValues()}
					onFinish={submit}
					onFinishFailed={(error) => {
						message.error(`Failed: ${error}`);
						console.error(error);
					}}
				>
					<Row>
						<Col span={15}>
							<AtomCard title="Info Kategori Tambahan">
								<Row gutter={12}>
									<Col span={24}>
										<MoleculeTextInputGroup
											name="id_name"
											label="Nama Kategori Tambahan (ID)"
											placeholder="Nama Kategori Tambahan (ID)"
											type="text"
											required
										/>
									</Col>

									<Col span={24}>
										<MoleculeTextInputGroup
											name="en_name"
											label="Nama Kategori Tambahan (EN)"
											placeholder="Nama Kategori Tambahan (EN)"
											type="text"
											required
										/>
									</Col>

									<Col span={24}>
										<MoleculeTextInputGroup
											name="code"
											label="Kode Kategori Tambahan"
											placeholder="Kode Kategori Tambahan"
											type="text"
											required
										/>
									</Col>
								</Row>
							</AtomCard>
						</Col>

						<Col className="mt4" span={24}>
							<MoleculeModifyActionButtons
								backUrl="/products/additional-category"
								isCreating={isCreating}
								isSubmitting={isSubmitting}
								label="Kategori Tambahan"
							/>
						</Col>
					</Row>
				</Form>
			)}
		</OrganismLayout>
	);
};
export default AdditionalCategoryModifyPage;
