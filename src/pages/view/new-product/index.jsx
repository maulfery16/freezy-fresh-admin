import React, { useEffect, useState } from 'react';
import ReactMoment from 'react-moment';

import { Col, message, Row, Skeleton, Typography } from 'antd';
import { Link } from 'react-router-dom';

import AtomCard from '../../../components/atoms/card';
import AtomPrimaryButton from '../../../components/atoms/button/primary-button';
import MoleculeInfoGroup from '../../../components/molecules/info-group';
import OrganismLayout from '../../../components/organisms/layout';

import NewProductService from '../../../services/new-product';
const newProductService = new NewProductService();

const NewProductPage = () => {
	const [newProduct, setNewProduct] = useState(null);

	const getNewProductDetail = async () => {
		try {
			const {
				data: newProduct,
			} = await newProductService.getNewProducts();

			setNewProduct(newProduct.data && newProduct.data[0]);
		} catch (error) {
			message.error(error.message);
			console.error(error);
		}
	};

	useEffect(() => {
		(async () => {
			getNewProductDetail();
		})();
	}, []);

	return (
		<OrganismLayout
			breadcumbs={[
				{ name: 'Tampilan', link: '/view/new-product' },
				{ name: 'Produk Baru', link: '/view/newProduct' },
				{ name: 'Detail', link: location.pathname },
			]}
			title="Detail Produk Baru"
		>
			<Row align="middle" justify="space-between">
				<Col>
					<Typography.Title level={4}>
						<span className="fw7">
							{`Detail Produk Baru`.toUpperCase()}
						</span>
					</Typography.Title>
				</Col>

				<Col>
					{newProduct && (
						<Link
							to={{
								pathname: '/view/new-product/edit',
								state: {
									newProduct: newProduct,
								},
							}}
						>
							<AtomPrimaryButton size="large">{`Edit Detail`}</AtomPrimaryButton>
						</Link>
					)}
				</Col>
			</Row>

			{!newProduct ? (
				<Skeleton active />
			) : (
				<Row align="top" className="mt4" gutter={24}>
					<Col span={15}>
						<AtomCard title="Info Produk Baru">
							<Row gutter={[12, 24]}>
								<Col span={12}>
									<MoleculeInfoGroup
										title="Title Konten (ID)"
										content={newProduct.title.id}
									/>
								</Col>

								<Col span={12}>
									<MoleculeInfoGroup
										title="Title Konten (EN)"
										content={newProduct.title.en}
									/>
								</Col>

								<Col span={12}>
									<MoleculeInfoGroup
										title="Deskripsi Singkat (ID)"
										content={
											newProduct.short_description.id
										}
									/>
								</Col>

								<Col span={12}>
									<MoleculeInfoGroup
										title="Deskripsi Singkat (EN)"
										content={
											newProduct.short_description.en
										}
									/>
								</Col>

								<Col span={24} style={{ paddingTop: '2rem' }}>
									<Typography.Text strong>
										<span className="denim f5">
											INFO UPDATE PRODUK
										</span>
									</Typography.Text>
								</Col>

								<Col span={12}>
									<MoleculeInfoGroup
										title="Tanggal di Daftarkan"
										content={
											<ReactMoment format="DD-MM-YYYY">
												{newProduct.created_at}
											</ReactMoment>
										}
									/>
								</Col>

								<Col span={12}>
									<MoleculeInfoGroup
										title="Tanggal di Update"
										content={
											<ReactMoment format="DD-MM-YYYY">
												{newProduct.updated_at}
											</ReactMoment>
										}
									/>
								</Col>

								<Col span={12}>
									<MoleculeInfoGroup
										title="Didaftarkan Oleh"
										content={newProduct.created_by}
									/>
								</Col>

								<Col span={12}>
									<MoleculeInfoGroup
										title="Diupdate Oleh"
										content={newProduct.updated_by}
									/>
								</Col>
							</Row>
						</AtomCard>
					</Col>
				</Row>
			)}
		</OrganismLayout>
	);
};

export default NewProductPage;
