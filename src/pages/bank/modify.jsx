/* eslint-disable no-mixed-spaces-and-tabs */
import React, { useEffect, useState } from 'react';
import { Col, Form, message, Row, Skeleton, Typography } from 'antd';
import { useHistory, useParams } from 'react-router-dom';

import AtomCard from '../../components/atoms/card';
import MoleculeModifyActionButtons from '../../components/molecules/modify-action-buttons';
import MoleculeTextInputGroup from '../../components/molecules/input-group/text-input';
import OrganismLayout from '../../components/organisms/layout';

import BankService from '../../services/bank';

const BankModifyPage = () => {
	const bankService = new BankService();
	const history = useHistory();
	const isCreating = history.location.pathname.includes('add') ? true : false;

	const [isSubmitting, setIsSubmitting] = useState(false);
	const [bank, setBank] = useState(null);
	const { id } = useParams();

	const getBankDetail = async (id) => {
		try {
			const response = await bankService.getBankById(id);
			setBank(response.data);
		} catch (error) {
			message.error(error.message);
			console.error(error);
		}
	};

	const submit = async (values) => {
		try {
			setIsSubmitting(true);

			const data = new FormData();
			data.append('name', values.name);

			if (isCreating) await bankService.createBank(data);
			else await bankService.editBank(id, data);

			message.success('Berhasil menambah data bank');
			message.info(
				'Akan dikembalikan ke halaman daftar bank dalam 2 detik'
			);
			setTimeout(() => {
				history.push('/bank');
			}, 2000);
		} catch (error) {
			message.error(error.message);
			console.error(error);
		} finally {
			setIsSubmitting(false);
		}
	};

	const setBankInitialValue = () => {
		return isCreating || !bank
			? {}
			: {
					name: bank.name,
			  };
	};

	useEffect(() => {
		(async () => {
			if (!isCreating) {
				await getBankDetail(id);
			}
		})();
	}, []);

	return (
		<OrganismLayout
			breadcumbs={[
				{ name: 'Bank', link: '/bank' },
				{
					name: location.pathname.includes('add') ? 'Tambah' : 'Ubah',
					link: location.pathname,
				},
			]}
			title={`${isCreating ? 'Tambah' : 'Ubah'} Bank`}
		>
			<Typography.Title level={4}>
				<span className="fw7">
					{`${isCreating ? 'Tambah' : 'Ubah'} Bank`.toUpperCase()}
				</span>
			</Typography.Title>

			{!isCreating && !bank ? (
				<Skeleton active />
			) : (
				<Form
					className="w-100 mt4"
					name="modify_bank"
					initialValues={setBankInitialValue()}
					onFinish={submit}
					onFinishFailed={(error) => {
						message.error(`Failed: ${error}`);
						console.error(error);
					}}
				>
					<Row>
						<Col span={15}>
							<AtomCard title="Info Bank">
								<Row gutter={12} className="mt4">
									<Col span={24}>
										<MoleculeTextInputGroup
											name="name"
											label="Nama Bank"
											placeholder="Nama Bank"
											type="text"
										/>
									</Col>
								</Row>
							</AtomCard>
						</Col>

						<Col className="mt4" span={24}>
							<MoleculeModifyActionButtons
								backUrl="/bank"
								isCreating={isCreating}
								isSubmitting={isSubmitting}
								label="Bank"
							/>
						</Col>
					</Row>
				</Form>
			)}
		</OrganismLayout>
	);
};

export default BankModifyPage;
