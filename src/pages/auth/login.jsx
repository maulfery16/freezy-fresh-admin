import React from 'react';
import {
	Button,
	Checkbox,
	Col,
	Form,
	Input,
	Row,
	Space,
	Typography,
} from 'antd';
import { Link } from 'react-router-dom';

import AuthenticationLayout from '../../components/layouts/authentication';

const LoginPages = () => {
	const validateMessages = {
		required: '${name} tidak boleh kosong',
		types: {
			email: '${name} harus dalam bentuk email',
		},
	};

	const onFinishFailed = (errorInfo) => {
		console.log('Failed:', errorInfo);
	};

	return (
		<AuthenticationLayout>
			<Space direction="vertical" size={35}>
				<Typography.Title className="tc" level={4}>
					LOGIN DASHBOARD
				</Typography.Title>
				<Form
					name="basic"
					// onFinish={onFinish}
					onFinishFailed={onFinishFailed}
					validateMessages={validateMessages}
				>
					<Space className="w-100" direction="vertical" size={20}>
						<Form.Item
							className="mb0"
							name="Email"
							rules={[
								{
									type: 'email',
								},
								{
									required: true,
								},
							]}
						>
							<Input
								className={`br3 ba bw1 b--black-10 pv2 ph3`}
								prefix="Email"
								size="middle"
							/>
						</Form.Item>

						<Form.Item
							className="mb0"
							name="Password"
							rules={[
								{
									required: true,
								},
							]}
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
									<Checkbox className="f6 silver">
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
								<Button
									block
									className="bg-denim f6 fw5 shadow-3 white"
									htmlType="submit"
									// loading={isLoggingIn}
									size="large"
									style={{ borderRadius: '8px' }}
								>
									LOGIN
								</Button>
							</Col>
						</Row>
					</Space>
				</Form>
			</Space>
		</AuthenticationLayout>
	);
};

export default LoginPages;
