/* eslint-disable no-mixed-spaces-and-tabs */
import React, { useEffect, useRef, useState } from 'react';
import { Col, Form, message, Row, Skeleton, Typography } from 'antd';
import { useHistory, useLocation, useParams } from 'react-router-dom';

import AtomCard from '../../components/atoms/card';
import MoleculeFileInputGroup from '../../components/molecules/input-group/file-input';
import MoleculeModifyActionButtons from '../../components/molecules/modify-action-buttons';
import MoleculeTextInputGroup from '../../components/molecules/input-group/text-input';
import OrganismLayout from '../../components/organisms/layout';

import ProductOwnerService from '../../services/product-owners';

const productOwnerService = new ProductOwnerService();

const ProductOwnerModifyPage = () => {
	const productOwnerImageRef = useRef();

	const { id } = useParams();
	const history = useHistory();
	const location = useLocation();
	const isCreating = location.pathname.includes('add') ? true : false;
	const [ownerForm] = Form.useForm();

	const [productOwner, setProductOwner] = useState(null);
	const [isSubmitting, setIsSubmitting] = useState(false);

	const getProductOwnerDetail = async (id) => {
		try {
			const productOwner = await productOwnerService.getProductOwnerById(
				id
			);
			setProductOwner(productOwner.data);
		} catch (error) {
			message.error(error.message);
			console.error(error);
		}
	};

	const setProductOwnerInitialValues = () => {
		return isCreating || !productOwner
			? {}
			: {
					name: productOwner.name,
			  };
	};

	const submit = async (values) => {
		try {
			setIsSubmitting(true);
			const productOwnerImage = await productOwnerImageRef.current.getImage();

			const data = new FormData();
			data.append('image', productOwnerImage);
			data.append('name', values.name);

			if (isCreating) {
				await productOwnerService.createProductOwner(data);
				message.success('Berhasil menambah perusahaan');
			} else {
				await productOwnerService.editProductOwner(id, data);
				message.success('Berhasil mengubah perusahaan');
			}

			message.info(
				'Akan dikembalikan ke halaman daftar perusahaan dalam 2 detik'
			);
			setTimeout(() => {
				history.push('/perusahaan');
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
				await getProductOwnerDetail(id);
			}
		})();
	}, []);

	return (
		<OrganismLayout
			breadcumbs={[
				{ name: 'Produk', link: '/perusahaan' },
				{ name: 'Perusahaan Dasar', link: '/perusahaan' },
				{
					name: location.pathname.includes('add') ? 'Tambah' : 'Ubah',
					link: location.pathname,
				},
			]}
			title={`${isCreating ? 'Tambah' : 'Ubah'} Perusahaan`}
		>
			<Typography.Title level={4}>
				<span className="fw7">
					{`${
						isCreating ? 'Tambah' : 'Ubah'
					} Perusahaan`.toUpperCase()}
				</span>
			</Typography.Title>

			{!isCreating && !productOwner ? (
				<Skeleton active />
			) : (
				<Form
					form={ownerForm}
					className="w-100 mt4"
					name="modify_productOwner"
					initialValues={setProductOwnerInitialValues()}
					onFinish={submit}
					onFinishFailed={() => {
						message.error('Kesalahan saat mengambil nilai pada form. Silahkan periksa kembali');
					}}
				>
					<Row>
						<Col span={15}>
							<AtomCard title="Info Perusahaan">
								<Row gutter={12} className="mt4">
									<Col span={18}>
										<MoleculeTextInputGroup
											name="name"
											label="Nama Perusahaan"
											placeholder="Nama Perusahaan"
											required
											type="alphanumeric"
											validationMessage="Spasi dan simbol tidak diperbolehkan"
										/>
									</Col>

									<Col span={24}>
										<MoleculeFileInputGroup
											label="Foto Icon"
											fileInputs={[
												{
													defaultValue: productOwner
														? productOwner.image
														: null,
													ref: productOwnerImageRef,
												},
											]}
										/>
									</Col>
								</Row>
							</AtomCard>
						</Col>

						<Col className="mt4" span={24}>
							<MoleculeModifyActionButtons
								backUrl="/perusahaan"
								isCreating={isCreating}
								isSubmitting={isSubmitting}
								label="Perusahaan"
							/>
						</Col>
					</Row>
				</Form>
			)}
		</OrganismLayout>
	);
};

export default ProductOwnerModifyPage;
