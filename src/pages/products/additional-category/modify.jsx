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
import { Link, useLocation, useParams } from 'react-router-dom';

import AtomCard from '../../../components/atoms/card';
import MoleculeTextInputGroup from '../../../components/molecules/input-group/text-input';
import OrganismLayout from '../../../components/organisms/layout';

import AdditionalCategoryService from '../../../services/additional-category';
const additionalCategoryService = new AdditionalCategoryService();

const AddAdditionalCategoryPage = () => {
	const { id } = useParams();
	const location = useLocation();
	const isCreating = location.pathname.includes('add') ? true : false;

	const [additionalCategory, setAdditionalCategory] = useState(null);

	const getAdditionalCategoryDetail = (id) => {
		try {
			const additionalCategory = additionalCategoryService.getAdditionalCategoryById(id);
			setAdditionalCategory(additionalCategory);
		} catch (error) {
			message.error(error.message);
		}
	};

	const submit = async (values) => {
		try {
			const data = new FormData();
			Object.keys(values).forEach((key) => {
				data.append(key, values[key]);
			});

			if (isCreating) {
				await additionalCategoryService.createAdditionalCategory(data);
				message.success('Berhasil menambah kategori tambahan');
			} else {
				await additionalCategoryService.editAdditionalCategory(id, data);
				message.success('Berhasil mengubah kategori tambahan');
			}
		} catch (error) {
			message.error(error.message);
		} finally {
			message.info(
				'Akan dikembalikan ke halaman daftar kategori tambahan dalam 2 detik'
			);
			setTimeout(() => {
				history.push('/products/additional-category');
			}, 2000);
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
				{ name: 'Kategori Tambahan', link: '/products/additional-category' },
				{
					name: location.pathname.includes('add') ? 'Tambah' : 'Ubah',
					link: location.pathname,
				},
			]}
			title={`${isCreating ? 'Tambah' : 'Ubah'} Kategori Tambahan`}
		>
			<Typography.Title level={4}>
				<span className="fw7">
					{`${isCreating ? 'Tambah' : 'Ubah'} Kategori Tambahan`.toUpperCase()}
				</span>
			</Typography.Title>

			{!isCreating && !additionalCategory ? (
				<Skeleton active />
			) : (
				<Form
					className="w-100 mt4"
					name="modify_additional_category"
					initialValues={{ ...additionalCategory }}
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
											label="Kode Kategori Tambahan (EN)"
											placeholder="Kode Kategori Tambahan (EN)"
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
									type="submit"
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
export default AddAdditionalCategoryPage;
