import React from 'react';
import { Button, Checkbox, Col, Form, Row, Space, Typography } from 'antd';
import { Link } from 'react-router-dom';

import AtomInput from '../../components/atoms/inputs/input';
import AtomInputPassword from '../../components/atoms/inputs/password';
import AuthenticationLayout from '../../components/layouts/authentication';

const LoginPages = () => {
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
				>
					<Space className="w-100" direction="vertical" size={15}>
						<AtomInput
							className="silver"
							isRequired
							name="email"
							prefix="Email"
							type="email"
							requiredMessage="Alamat email tidak boleh kosong"
						/>
						<AtomInputPassword
							className="silver"
							isRequired
							name="password"
							prefix="Password"
							requiredMessage="Password tidak boleh kosong"
						/>

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
