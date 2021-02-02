import React from 'react';
import { Button, Col, Form, Row, Space, Typography } from 'antd';
import { Link } from 'react-router-dom';

import MoleculeTextInputGroup from '../../components/molecules/input-group/text-input';
import AuthenticationLayout from '../../components/layouts/authentication';

const ForgotPasswordPages = () => {
	const onFinishFailed = (errorInfo) => {
		console.log('Failed:', errorInfo);
	};

	return (
		<AuthenticationLayout>
			<Space direction="vertical" size={25}>
				<Typography.Title className="tc" level={4}>
					LUPA PASSWORD ANDA?
				</Typography.Title>

				<Typography type="secondary" className="f6 tc b--black-10">
					Silakan masukkan alamat email Anda dan kami akan <br />
					mengirimkan Anda tautan untuk mereset kata <br />
					sandi Anda.
				</Typography>

				<Form name="reset-password" onFinishFailed={onFinishFailed}>
					<Space className="w-100" direction="vertical" size={30}>
						<MoleculeTextInputGroup
							label="Masukkkan Email Anda"
							name="email"
							required={true}
							validationMessage="Email harus dalam bentuk email"
							requiredMessage="Email tidak boleh kosong"
							type="email"
						/>
						<Row
							justify="space-between"
							className="flex items-center"
						>
							<Col className="tl" span={12}>
								<Link to="/login" className="f6 denim">
									Kembali
								</Link>
							</Col>
							<Col span={10}>
								<Button
									block
									className="bg-denim f6 fw5 shadow-3 white"
									htmlType="submit"
									size="large"
									style={{ borderRadius: '8px' }}
								>
									SUBMIT
								</Button>
							</Col>
						</Row>

						<Row justify="end">
							<Col span={12}></Col>
						</Row>
					</Space>
				</Form>
			</Space>
		</AuthenticationLayout>
	);
};

export default ForgotPasswordPages;
