/* eslint-disable no-mixed-spaces-and-tabs */
import React, { useState } from 'react';
import { Button, Col, Form, message, Row, Space, Typography } from 'antd';
import { Link, useHistory } from 'react-router-dom';

import AtomCard from '../../../components/atoms/card';
import MoleculeTextInputGroup from '../../../components/molecules/input-group/text-input';
import OrganismLayout from '../../../components/organisms/layout';

import BankService from '../../../services/bank';
const bankService = new BankService();

const BankModifyPage = () => {
	const history = useHistory();

	const [isSubmitting, setIsSubmitting] = useState(false);

	const submit = async (values) => {
		try {
			setIsSubmitting(true);

			const data = new FormData();
			data.append('name', values.name);
			data.append('code', values.code);

			await bankService.createBank(data);

			message.success('Berhasil menambah data bank');
			message.info(
				'Akan dikembalikan ke halaman daftar bank dalam 2 detik'
			);
			setTimeout(() => {
				history.push('/products/bank');
			}, 2000);
		} catch (error) {
			message.error(error.message);
			console.error(error);
		} finally {
			setIsSubmitting(false);
		}
	};

	return (
		<OrganismLayout
			breadcumbs={[
				{ name: 'Produk', link: '/products/bank' },
				{ name: 'Bank', link: '/products/bank' },
				{
					name: location.pathname.includes('add') ? 'Tambah' : 'Ubah',
					link: location.pathname,
				},
			]}
			title={`Tambah Bank`}
		>
			<Typography.Title level={4}>
				<span className="fw7">{`Tambah Bank`.toUpperCase()}</span>
			</Typography.Title>

			<Form
				className="w-100 mt4"
				name="modify_bank"
				onFinish={submit}
				onFinishFailed={(error) => {
					message.error(`Failed: ${error}`);
					console.error(error);
				}}
			>
				<Row>
					<Col span={15}>
						<AtomCard title="Info Bank">
							<Row gutter={12}>
								<Col span={12}>
									<MoleculeTextInputGroup
										name="name"
										label="Nama Bank"
										placeholder="Nama Bank"
										type="text"
									/>
								</Col>

								<Col span={12}>
									<MoleculeTextInputGroup
										name="code"
										label="Kode Bank"
										placeholder="Kode Bank"
										type="text"
									/>
								</Col>
							</Row>
						</AtomCard>
					</Col>

					<Col className="mt5" span={24}>
						<Space>
							<Link to="/products/bank">
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
								{`Tambah Bank`}
							</Button>
						</Space>
					</Col>
				</Row>
			</Form>
		</OrganismLayout>
	);
};

export default BankModifyPage;
