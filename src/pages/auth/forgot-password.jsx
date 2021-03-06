import React from 'react';
import { Col, Form, message, Row, Space, Typography } from 'antd';
import { Link } from 'react-router-dom';

import AtomPrimaryButton from '../../components/atoms/button/primary-button';
import AuthenticationLayout from '../../components/layouts/authentication';
import MoleculeTextInputGroup from '../../components/molecules/input-group/text-input';

import AuthService from '../../services/auth';
const authService = new AuthService();

const ForgotPasswordPages = () => {
	const showForgotPasswordErrorMessage = (errorInfo) => {
		console.error('Failed:', errorInfo);
	};

	const sendForgotPasswordRequest = async (values) => {
		try {
			await authService.reqForgotPassword({
				...values,
				reseturl: 'reset-password',
			});

			window.location = '/email-check';
		} catch (error) {
			message.error(error.message);
			console.error(error);
		}
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

				<Form
					name="forgot-password"
					onFinish={sendForgotPasswordRequest}
					onFinishFailed={showForgotPasswordErrorMessage}
				>
					<Space className="w-100" direction="vertical" size={30}>
						<MoleculeTextInputGroup
							label="Masukkan Email Anda"
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
								<AtomPrimaryButton
									block
									className="f6 fw5"
									htmlType="submit"
									size="large"
									style={{ borderRadius: '8px' }}
								>
									SUBMIT
								</AtomPrimaryButton>
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
