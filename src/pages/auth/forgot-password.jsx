import React from 'react';
import { Button, Col, Form, Row, Space, Typography } from 'antd';
import { Link } from 'react-router-dom';

import AtomInput from '../../components/atoms/inputs/input';
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

				<Typography type="secondary" className="f7 tc silver">
					Silakan masukkan alamat email Anda dan kami akan <br />
					mengirimkan Anda tautan untuk mereset kata <br />
					sandi Anda.
				</Typography>

				<Form
					name="basic"
					// onFinish={onFinish}
					onFinishFailed={onFinishFailed}
				>
					<Space className="w-100" direction="vertical" size={30}>
						<AtomInput
							className="silver"
							isRequired
							name="email"
							prefix="Email"
							type="email"
							requiredMessage="Alamat email tidak boleh kosong"
						/>
						<Row
							justify="space-between"
							className="flex items-center"
						>
							<Col className="tl" span={12}>
								<Link to="/login" className="f6 blue">
									Kembali
								</Link>
							</Col>
							<Col span={10}>
								<Button
									block
									className="btn-blue f6 fw5 shadow-3 white"
									htmlType="submit"
									// loading={isLoggingIn}
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
