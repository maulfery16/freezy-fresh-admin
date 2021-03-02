import React, { useState } from 'react';
import {
	Checkbox,
	Col,
	Form,
	Input,
	message,
	Row,
	Space,
	Typography,
} from 'antd';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';

import AuthenticationLayout from '../../components/layouts/authentication';
import {
	setAuthToken,
	setCurrentUser,
	setLoginStatus,
	setRefreshToken,
	setRememberMeStatus,
} from '../../stores/auth/actions';
import AtomPrimaryButton from '../../components/atoms/button/primary-button';

import AuthService from '../../services/auth';
const authService = new AuthService();

const LoginPages = () => {
	const dispatch = useDispatch();
	const [isChecked, setIsChecked] = useState(false);
	const [validateStatus, setValidateStatus] = useState();
	const [validateMessage, setValidateMessage] = useState();

	const handleCheckChanged = () => {
		setIsChecked(!isChecked);
	};

	const validateMessages = {
		required: '${name} tidak boleh kosong',
		types: {
			email: '${name} harus dalam bentuk email',
		},
	};

	const showLoginErrorMessage = (errorInfo) => {
		console.log('Failed:', errorInfo);
	};

	const login = async (values) => {
		setValidateStatus('');
		setValidateMessage('');
		try {
			const { access_token, refresh_token } = await authService.login({
				...values,
				grant_type: 'password',
			});

			dispatch(setAuthToken(access_token));
			dispatch(setLoginStatus(true));
			dispatch(setRefreshToken(refresh_token));
			dispatch(setRememberMeStatus(isChecked));

			authService.overrideAuthToken(access_token);

			const { data } = await authService.getAuthenticatedUser();
			dispatch(setCurrentUser(data));

			window.location = '/';
		} catch (error) {
			setValidateStatus('error');
			setValidateMessage('Email dan password tidak sesuai');
			message.error(error.message);
			console.error(error);
		}
	};

	return (
		<AuthenticationLayout>
			<Space direction="vertical" size={35}>
				<Typography.Title className="tc" level={4}>
					LOGIN DASHBOARD
				</Typography.Title>
				<Form
					name="basic"
					onFinish={login}
					onFinishFailed={showLoginErrorMessage}
					validateMessages={validateMessages}
				>
					<Space className="w-100" direction="vertical" size={20}>
						<Form.Item
							className="mb0"
							name="email"
							onChange={() => {
								setValidateStatus('');
								setValidateMessage('');
							}}
							rules={[
								{
									type: 'email',
								},
								{
									required: true,
								},
							]}
							validateStatus={validateStatus}
						>
							<Input
								className={`br3 ba bw1 b--black-10 pv2 ph3`}
								prefix="Email"
								size="middle"
							/>
						</Form.Item>

						<Form.Item
							className="mb0"
							help={validateMessage}
							name="password"
							onChange={() => {
								setValidateStatus('');
								setValidateMessage('');
							}}
							rules={[
								{
									required: true,
								},
							]}
							validateStatus={validateStatus}
						>
							<Input.Password
								className={`br3 ba bw1 b--black-10 pv2 ph3`}
								prefix="Password"
								size="middle"
							/>
						</Form.Item>

						<Row
							justify="space-between"
							className="flex items-center"
						>
							<Col span={12}>
								<Form.Item className="mb0" name="remember">
									<Checkbox
										className="f6 silver"
										checked={isChecked}
										onChange={handleCheckChanged}
									>
										Ingat saya
									</Checkbox>
								</Form.Item>
							</Col>
							<Col className="tr" span={12}>
								<Link
									to="/forgot-password"
									className="f6 silver"
								>
									Lupa Password?
								</Link>
							</Col>
						</Row>

						<Row justify="end">
							<Col span={12}>
								<AtomPrimaryButton
									block
									className="f6 fw5 shadow-3"
									htmlType="submit"
									// loading={isLoggingIn}
									size="large"
									style={{ borderRadius: '8px' }}
								>
									LOGIN
								</AtomPrimaryButton>
							</Col>
						</Row>
					</Space>
				</Form>
			</Space>
		</AuthenticationLayout>
	);
};

export default LoginPages;
