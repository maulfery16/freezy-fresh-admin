import React from 'react';
import { Button, Form, Space, Typography } from 'antd';

import MoleculePasswordInputGroup from '../../components/molecules/input-group/password-input';
import ResetPasswordLayout from '../../components/layouts/reset-password';

const PasswordResetPages = () => {
	return (
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

				<Form name="reset-password">
					<Space direction="vertical" align="center">
						<MoleculePasswordInputGroup
							label="Masukkkan Password Baru"
							name="new-password"
							required={true}
							requiredMessage="Password tidak boleh kosong"
						/>

						<MoleculePasswordInputGroup
							label="Konfirmasi Password Baru"
							name="confirm-password"
							required={true}
							requiredMessage="Password tidak boleh kosong"
						/>

						<Button
							block
							className="bg-denim f6 fw5 ph5 pv2 shadow-3 white"
							htmlType="submit"
							size="large"
							style={{ borderRadius: '8px' }}
						>
							Submit
						</Button>
					</Space>
				</Form>
			</Space>
		</ResetPasswordLayout>
	);
};

export default PasswordResetPages;
