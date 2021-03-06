/* eslint-disable no-mixed-spaces-and-tabs */
import React, { useEffect, useState } from 'react';
import { Col, Form, message, Row, Skeleton, Typography } from 'antd';
import { useHistory, useLocation, useParams } from 'react-router-dom';

import AtomCard from '../../../components/atoms/card';
import MoleculeModifyActionButtons from '../../../components/molecules/modify-action-buttons';
import MoleculeTextInputGroup from '../../../components/molecules/input-group/text-input';
import OrganismLayout from '../../../components/organisms/layout';

import ZoneService from '../../../services/zone';
const zoneService = new ZoneService();

const ZoneModifyPage = () => {
	const { id } = useParams();
	const history = useHistory();
	const location = useLocation();
	const isCreating = location.pathname.includes('edit') ? false : true;

	const [zone, setZone] = useState(null);
	const [isSubmitting, setIsSubmitting] = useState(false);

	const getZoneDetail = async (id) => {
		try {
			const zone = await zoneService.getZoneById(id);

			setZone(zone.data);
		} catch (error) {
			message.error(error.message);
			console.error(error);
		}
	};

	const setZoneInitialValues = () => {
		return isCreating || !zone
			? {}
			: {
					en_name: zone.name.en,
					id_name: zone.name.id,
			  };
	};

	const submit = async (values) => {
		try {
			setIsSubmitting(true);

			const data = new FormData();
			data.append('name[en]', values.en_name);
			data.append('name[id]', values.id_name);

			if (isCreating) {
				await zoneService.createZone(data);
				message.success('Berhasil menambah zona');
			} else {
				await zoneService.editZone(id, data);
				message.success('Berhasil mengubah zona');
			}
			message.info(
				'Akan dikembalikan ke halaman daftar zona dalam 2 detik'
			);
			setTimeout(() => {
				history.push('/products/zone');
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
				await getZoneDetail(id);
			}
		})();
	}, []);

	return (
		<OrganismLayout
			breadcumbs={[
				{ name: 'Produk', link: '/products/zone' },
				{
					name: 'Zona',
					link: '/products/zone',
				},
				{
					name: isCreating ? 'Tambah' : 'Ubah',
					link: location.pathname,
				},
			]}
			title={`${isCreating ? 'Tambah' : 'Ubah'} Zona`}
		>
			<Typography.Title level={4}>
				<span className="fw7">
					{`${isCreating ? 'Tambah' : 'Ubah'} Zona`.toUpperCase()}
				</span>
			</Typography.Title>

			{!isCreating && !zone ? (
				<Skeleton active />
			) : (
				<Form
					className="w-100 mt4"
					name="modify_zone"
					initialValues={setZoneInitialValues()}
					onFinish={submit}
					onFinishFailed={(error) => {
						message.error(`Failed: ${error}`);
						console.error(error);
					}}
				>
					<Row>
						<Col span={15}>
							<AtomCard title="Info Zona">
								<Row gutter={12}>
									<Col span={24}>
										<MoleculeTextInputGroup
											name="id_name"
											label="Nama Zona (ID)"
											placeholder="Nama Zona (ID)"
											type="text"
											required
										/>
									</Col>

									<Col span={24}>
										<MoleculeTextInputGroup
											name="en_name"
											label="Nama Zona (EN)"
											placeholder="Nama Zona (EN)"
											type="text"
											required
										/>
									</Col>
								</Row>
							</AtomCard>
						</Col>

						<Col className="mt4" span={24}>
							<MoleculeModifyActionButtons
								backUrl="/products/zone"
								isCreating={isCreating}
								isSubmitting={isSubmitting}
								label="Zona"
							/>
						</Col>
					</Row>
				</Form>
			)}
		</OrganismLayout>
	);
};
export default ZoneModifyPage;
