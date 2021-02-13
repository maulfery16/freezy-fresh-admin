/* eslint-disable no-mixed-spaces-and-tabs */
import React, { useEffect, useState } from 'react';
import {
	Button,
	Col,
	Form,
	message,
	Row,
	Skeleton,
	Space,
	Typography,
} from 'antd';
import { Link, useHistory, useLocation, useParams } from 'react-router-dom';

import AtomCard from '../../../components/atoms/card';
import MoleculeTextInputGroup from '../../../components/molecules/input-group/text-input';
import OrganismLayout from '../../../components/organisms/layout';

import AdditionalCategoryService from '../../../services/additional-category';
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
			const {
				data: additionalCategory,
			} = await additionalCategoryService.getAdditionalCategoryById(id);
			setAdditionalCategory(additionalCategory);
		} catch (error) {
			message.error(error.message);
			console.error(error);
		}
	};

	const setAdditionalCategoryInitialValues = () => {
		return isCreating
			? {}
			: {
					code: additionalCategory.data.code,
					en_name: additionalCategory.data.name,
					id_name: additionalCategory.data.name,
					// en_name: additionalCategory.name.en,
					// id_name: additionalCategory.name.id,
			  };
	};

	const submit = async (values) => {
		try {
			setIsSubmitting(true);

			const data = new FormData();
			// data.append('code', values.code);
			// data.append('name[en]', values.en_name);
			// data.append('name[id]', values.id_name);
			data.append('name', values.name);
			if (!isCreating) data.append('is_active', false);

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
										/>
									</Col>

									<Col span={24}>
										<MoleculeTextInputGroup
											name="en_name"
											label="Nama Kategori Tambahan (EN)"
											placeholder="Nama Kategori Tambahan (EN)"
											type="text"
										/>
									</Col>

									<Col span={24}>
										<MoleculeTextInputGroup
											name="code"
											label="Kode Kategori Tambahan"
											placeholder="Kode Kategori Tambahan"
											type="text"
										/>
									</Col>
								</Row>
							</AtomCard>
						</Col>

						<Col className="mt5" span={24}>
							<Space>
								<Link to="/products/additional-category">
									<Button
										className="br3 denim b--denim"
										size="large"
									>
										Kembali
									</Button>
								</Link>
								<Button
									className="br3 bg-denim white"
									size="large"
									htmlType="submit"
									loading={isSubmitting}
								>
									{`${
										isCreating ? 'Tambah' : 'Ubah'
									} Kategori Tambahan`}
								</Button>
							</Space>
						</Col>
					</Row>
				</Form>
			)}
		</OrganismLayout>
	);
};
export default AdditionalCategoryModifyPage;
