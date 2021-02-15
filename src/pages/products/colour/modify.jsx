/* eslint-disable no-mixed-spaces-and-tabs */
import React, { useEffect, useState } from 'react';
import { Col, Form, message, Row, Skeleton, Typography, Popover } from 'antd';
import { SketchPicker } from 'react-color';
import { useHistory, useLocation, useParams } from 'react-router-dom';

import AtomCard from '../../../components/atoms/card';
import MoleculeTextInputGroup from '../../../components/molecules/input-group/text-input';
import OrganismLayout from '../../../components/organisms/layout';

import ColorService from '../../../services/colour';
import MoleculeModifyActionButtons from '../../../components/molecules/modify-action-buttons';
const colourService = new ColorService();

const ColourModifyPage = () => {
	const { id } = useParams();
	const history = useHistory();
	const location = useLocation();
	const isCreating = location.pathname.includes('add') ? true : false;

	const [colour, setColour] = useState(null);
	const [hexaCode, setHexaCode] = useState('');
	const [isSubmitting, setIsSubmitting] = useState(false);

	const getColourDetail = async (id) => {
		try {
			const { data: colour } = await colourService.getColourById(id);

			setColour(colour);
			setHexaCode(colour.data.hexa_code);
		} catch (error) {
			message.error(error.message);
			console.error(error);
		}
	};

	const setColourInitialValues = () => {
		return isCreating
			? {}
			: {
					en_name: colour.data.name.en,
					hexa_code: colour.data.hexa_code,
					id_name: colour.data.name.id,
			  };
	};

	const submit = async (values) => {
		try {
			const data = new FormData();
			data.append('code', new Date()); // deleted soon, after fixing from BE
			data.append('hexa_code', values.hexa_code);
			data.append('name[en]', values.en_name);
			data.append('name[id]', values.id_name);
			if (!isCreating) data.append('is_active', false);

			if (isCreating) {
				await colourService.createColour(data);
				message.success('Berhasil menambah warna');
			} else {
				await colourService.editColour(id, data);
				message.success('Berhasil mengubah warna');
			}

			message.info(
				'Akan dikembalikan ke halaman daftar warna dalam 2 detik'
			);
			setTimeout(() => {
				history.push('/products/colour');
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
				await getColourDetail(id);
			}
		})();
	}, []);

	const handleChangeColorComplete = (color) => {
		setHexaCode(color.hex);
	};

	const handleChangeHexaCode = (e) => {
		setHexaCode(e.target.value);
	};

	const colorPicker = (
		<SketchPicker
			color={hexaCode}
			onChangeComplete={handleChangeColorComplete}
		/>
	);

	return (
		<OrganismLayout
			breadcumbs={[
				{ name: 'Produk', link: '/products/colour' },
				{
					name: 'Warna',
					link: '/products/colour',
				},
				{
					name: location.pathname.includes('add') ? 'Tambah' : 'Ubah',
					link: location.pathname,
				},
			]}
			title={`${isCreating ? 'Tambah' : 'Ubah'} Warna`}
		>
			<Typography.Title level={4}>
				<span className="fw7">
					{`${isCreating ? 'Tambah' : 'Ubah'} Warna`.toUpperCase()}
				</span>
			</Typography.Title>

			{!isCreating && !colour ? (
				<Skeleton active />
			) : (
				<Form
					className="w-100 mt4"
					name="modify_colour"
					initialValues={setColourInitialValues()}
					onFinish={submit}
					onFinishFailed={(error) => {
						message.error(`Failed: ${error}`);
						console.error(error);
					}}
				>
					<Row>
						<Col span={15}>
							<AtomCard title="Info Warna">
								<Row gutter={12} justify="space-between">
									<Col span={24}>
										<MoleculeTextInputGroup
											label="Nama Warna (ID)"
											name="id_name"
											placeholder="Nama Warna (ID)"
											type="text"
										/>
									</Col>

									<Col span={24}>
										<MoleculeTextInputGroup
											label="Nama Warna (EN)"
											name="en_name"
											placeholder="Nama Warna (EN)"
											type="text"
										/>
									</Col>

									<Col span={20}>
										<MoleculeTextInputGroup
											label="Kode Hexa"
											name="hexa_code"
											onChange={handleChangeHexaCode}
											placeholder="Kode Hexa"
											type="text"
											value={hexaCode || ''}
										/>
									</Col>

									<Col span={4}>
										<Popover content={colorPicker}>
											<div
												className="br3 ba bw1 b--black-10"
												style={{
													background: hexaCode,
													height: '49%',
													marginTop: '21px',
													width: '100%',
												}}
											></div>
										</Popover>
									</Col>
								</Row>
							</AtomCard>
						</Col>

						<Col className="mt4" span={24}>
							<MoleculeModifyActionButtons
								backUrl="/products/colour"
								isCreating={isCreating}
								isSubmitting={isSubmitting}
								label="Warna"
							/>
						</Col>
					</Row>
				</Form>
			)}
		</OrganismLayout>
	);
};

export default ColourModifyPage;
