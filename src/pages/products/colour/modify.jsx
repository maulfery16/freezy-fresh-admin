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
	Popover,
} from 'antd';
import { SketchPicker } from 'react-color';
import { Link, useLocation, useParams } from 'react-router-dom';

import AtomCard from '../../../components/atoms/card';
import MoleculeTextInputGroup from '../../../components/molecules/input-group/text-input';
import OrganismLayout from '../../../components/organisms/layout';

import ColorService from '../../../services/colour';
const colourService = new ColorService();

const ColourModifyPage = () => {
	const { id } = useParams();
	const location = useLocation();
	const isCreating = location.pathname.includes('add') ? true : false;

	const [colour, setColour] = useState({ colour: { hexa: null } });
	const [hexaCode, setHexaCode] = useState(colour.hexa_code || '#ffffff');
	const handleChangeColorComplete = (color) => {
		setHexaCode(color.hex);
	};

	const colorPicker = (
		<SketchPicker
			color={hexaCode}
			onChangeComplete={handleChangeColorComplete}
		/>
	);

	const getColourDetail = (id) => {
		try {
			const colour = colourService.getColourById(id);
			setColour(colour);
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
				await colourService.createColour(data);
				message.success('Berhasil menambah warna');
			} else {
				await colourService.editColour(id, data);
				message.success('Berhasil mengubah warna');
			}
		} catch (error) {
			message.error(error.message);
		} finally {
			message.info(
				'Akan dikembalikan ke halaman daftar warna dalam 2 detik'
			);
			setTimeout(() => {
				history.push('/products/colour');
			}, 2000);
		}
	};

	useEffect(() => {
		(async () => {
			if (!isCreating) {
				await getColourDetail(id);
			}
		})();
	}, []);

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
					name="modify_additional_category"
					initialValues={{ ...colour }}
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
											name="id_name"
											label="Nama Warna (ID)"
											placeholder="Nama Warna (ID)"
											type="text"
										/>
									</Col>

									<Col span={24}>
										<MoleculeTextInputGroup
											name="en_name"
											label="Nama Warna (EN)"
											placeholder="Nama Warna (EN)"
											type="text"
										/>
									</Col>

									<Col span={20}>
										<MoleculeTextInputGroup
											name="code"
											label="Kode Hexa"
											placeholder="Kode Hexa"
											type="text"
										/>
									</Col>

									<Col span={4}>
										<Popover content={colorPicker}>
											<div
												className="br3 ba bw1 b--black-10"
												style={{
													background: hexaCode,
													marginTop: '21px',
													height: '49%',
													width: '100%',
												}}
											></div>
										</Popover>
									</Col>
								</Row>
							</AtomCard>
						</Col>

						<Col className="mt5" span={24}>
							<Space>
								<Link to="/products/colour">
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
									{`${isCreating ? 'Tambah' : 'Ubah'} Warna`}
								</Button>
							</Space>
						</Col>
					</Row>
				</Form>
			)}
		</OrganismLayout>
	);
};

export default ColourModifyPage;
