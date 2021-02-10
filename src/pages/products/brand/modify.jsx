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
import MoleculeFileInputGroup from '../../../components/molecules/input-group/file-input';
import MoleculeNumberInputGroup from '../../../components/molecules/input-group/number-input';
import MoleculeTextInputGroup from '../../../components/molecules/input-group/text-input';
import OrganismLayout from '../../../components/organisms/layout';

import RequestAdapterService from '../../../services/request-adapter';
import BrandService from '../../../services/brand';
const brandService = new BrandService();

const BrandModifyPage = () => {
	const { id } = useParams();
	const history = useHistory();
	const location = useLocation();
	const isCreating = location.pathname.includes('add') ? true : false;

	const [brand, setBrand] = useState(null);
	const [brandImage, setBrandImage] = useState(null);
	const [isSubmitting, setIsSubmitting] = useState(false);

	const getBrandDetail = async (id) => {
		try {
			const { data: brand } = await brandService.getBrandById(id);

			setBrand(brand);
			const brandImageFile = await RequestAdapterService.convertImageURLtoFile(
				brand.image.original
			);
			setBrandImage(brandImageFile);
		} catch (error) {
			message.error(error.message);
			console.error(error);
		}
	};

	const setBrandInitialValues = () => {
		return isCreating
			? {}
			: {
					code: brand.code,
					en_name: brand.name.en,
					followers: brand.social_media_followers || 1,
					id_name: brand.name.id,
					image: brandImage,
			  };
	};

	const submit = async (values) => {
		try {
			setIsSubmitting(true);

			const data = new FormData();
			data.append('social_media_followers', values.followers);
			data.append('image', brandImage);
			data.append('name[en]', values.en_name);
			data.append('name[id]', values.id_name);
			if (!isCreating) data.append('is_active', false);

			if (isCreating) {
				await brandService.createBrand(data);
				message.success('Berhasil menambah brand');
			} else {
				await brandService.editBrand(id, data);
				message.success('Berhasil mengubah brand');
			}

			message.info(
				'Akan dikembalikan ke halaman daftar brand dalam 2 detik'
			);
			setTimeout(() => {
				history.push('/products/brand');
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
					initialValues={setBrandInitialValues()}
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
									<Col span={12}>
										<MoleculeTextInputGroup
											name="id_name"
											label="Nama Brand (ID)"
											placeholder="Nama Brand"
											type="text"
										/>
									</Col>

									<Col span={12}>
										<MoleculeTextInputGroup
											name="en_name"
											label="Nama Brand (EN)"
											placeholder="Nama Brand"
											type="text"
										/>
									</Col>

									<Col span={24}>
										<MoleculeFileInputGroup
											defaultValue={brandImage}
											label="Logo Brand"
											id="brand-logo-upload"
											name="image"
											placeholder="png"
											setImage={setBrandImage}
										/>
									</Col>

									<Col span={24}>
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
									htmlType="submit"
									loading={isSubmitting}
									size="large"
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
