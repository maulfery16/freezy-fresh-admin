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
import MoleculeFileInputGroup from '../../../components/molecules/input-group/file-input';
import MoleculeNumberInputGroup from '../../../components/molecules/input-group/number-input';
import MoleculeTextInputGroup from '../../../components/molecules/input-group/text-input';
import OrganismLayout from '../../../components/organisms/layout';

import BrandService from '../../../services/brand';
const brandService = new BrandService();

const BrandModifyPage = () => {
	const { id } = useParams();
	const location = useLocation();
	const isCreating = location.pathname.includes('add') ? true : false;

	const [brand, setBrand] = useState(null);

	const getBrandDetail = (id) => {
		try {
			const brand = brandService.getBrandById(id);
			setBrand(brand);
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
				await brandService.createBrand(data);
				message.success('Berhasil menambah brand');
			} else {
				await brandService.editBrand(id, data);
				message.success('Berhasil mengubah brand');
			}
		} catch (error) {
			message.error(error.message);
		} finally {
			message.info(
				'Akan dikembalikan ke halaman daftar brand dalam 2 detik'
			);
			setTimeout(() => {
				history.push('/products/brand');
			}, 2000);
		}
	};

	useEffect(() => {
		(async () => {
			if (!isCreating) {
				await getBrandDetail(id);
			}
		})();
	}, []);

	return (
		<OrganismLayout
			breadcumbs={[
				{ name: 'Produk', link: '/products/brand' },
				{ name: 'Brand Dasar', link: '/products/brand' },
				{
					name: location.pathname.includes('add') ? 'Tambah' : 'Ubah',
					link: location.pathname,
				},
			]}
			title={`${isCreating ? 'Tambah' : 'Ubah'} Brand`}
		>
			<Typography.Title level={4}>
				<span className="fw7">
					{`${isCreating ? 'Tambah' : 'Ubah'} Brand`.toUpperCase()}
				</span>
			</Typography.Title>

			{!isCreating && !brand ? (
				<Skeleton active />
			) : (
				<Form
					className="w-100 mt4"
					name="modify_brand"
					initialValues={{
						...brand,
						followers: brand ? brand.followers : 1,
					}}
					onFinish={submit}
					onFinishFailed={(error) => {
						message.error(`Failed: ${error}`);
						console.error(error);
					}}
				>
					<Row>
						<Col span={15}>
							<AtomCard title="Info Brand">
								<Row gutter={12}>
									<Col span={24}>
										<MoleculeTextInputGroup
											name="name"
											label="Nama Brand"
											placeholder="Nama Brand"
											type="text"
										/>
									</Col>

									<Col span={12}>
										<MoleculeFileInputGroup
											label="Logo Brand"
											id="brand-logo-upload"
											name="image"
											placeholder="png"
										/>
									</Col>

									<Col span={12}>
										<MoleculeNumberInputGroup
											id="followers"
											label="Jumlah Followers Sosmed"
											name="followers"
											placeholder="Followers"
											formatter={(value) =>
												value
													.toString()
													.replace(
														/\B(?=(\d{3})+(?!\d))/g,
														'.'
													)
											}
											parser={(value) =>
												value.replaceAll('.', '')
											}
										/>
									</Col>
								</Row>
							</AtomCard>
						</Col>

						<Col className="mt5" span={24}>
							<Space>
								<Link to="/products/brand">
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
									{`${isCreating ? 'Tambah' : 'Ubah'} Brand`}
								</Button>
							</Space>
						</Col>
					</Row>
				</Form>
			)}
		</OrganismLayout>
	);
};

export default BrandModifyPage;
