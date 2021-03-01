import React from 'react';
import { Form, message, Space, Typography } from 'antd';
import { Redirect, useLocation } from 'react-router-dom';

import AtomPrimaryButton from '../../components/atoms/button/primary-button';
import MoleculePasswordInputGroup from '../../components/molecules/input-group/password-input';
import ResetPasswordLayout from '../../components/layouts/reset-password';

import AuthService from '../../services/auth';
import RequestAdapterService from '../../services/request-adapter';
const authService = new AuthService();

const PasswordResetPages = () => {
	const location = useLocation();
	let { email, token } = RequestAdapterService.getURLParams(location.search);

	const showResetPasswordErrorMessage = (errorInfo) => {
		console.error('Failed:', errorInfo);
	};

	const sendResetPasswordRequest = async (values) => {
		try {
			await authService.reqResetPassword({
				email: email,
				token: token.replace('.', ''),
				password: values.password,
			});

			window.location = '/reset-password/success';
		} catch (error) {
			message.error(error.message);
			console.error(error);
		}
	};

	return (
		<>
			{email && token ? (
				<ResetPasswordLayout>
					<Space
						direction="vertical"
						size={20}
						align="center"
						className="w-80"
					>
						<Typography.Title className="tc" level={4}>
							RESET PASSWORD ANDA
						</Typography.Title>

						<Form
							name="reset-password"
							onFinish={sendResetPasswordRequest}
							onFinishFailed={showResetPasswordErrorMessage}
						>
							<Space direction="vertical" align="center">
								<MoleculePasswordInputGroup
									label="Masukkkan Password Baru"
									name="password"
									required={true}
									requiredMessage="Password tidak boleh kosong"
								/>

								<MoleculePasswordInputGroup
									label="Konfirmasi Password Baru"
									name="confirmPassword"
									required={true}
									requiredMessage="Password tidak boleh kosong"
								/>

								<AtomPrimaryButton
									block
									additionalClassName="f6 fw5 ph5 pv2"
									htmlType="submit"
									size="large"
									style={{ borderRadius: '8px' }}
								>
									Submit
								</AtomPrimaryButton>
							</Space>
						</Form>
					</Space>
				</ResetPasswordLayout>
			) : (
				<Redirect key={`login-redirect`} to="/login" />
			)}
		</>
	);
};

export default PasswordResetPages;
