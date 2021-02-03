import React from 'react';
import { Button, Space, Typography } from 'antd';

import ResetPasswordLayout from '../../components/layouts/reset-password';

import ResetPasswordSuccess from '../../assets/images/reset-password-success.svg';

const PasswordResetSuccessPages = () => {
	return (
		<ResetPasswordLayout>
			<Space direction="vertical" size={15} align="center">
				<img
					src={ResetPasswordSuccess}
					width="130vw"
					alt="Check Email"
				/>

				<Typography className="f5 fw7 tc">
					Password Anda Berhasil Dirubah
				</Typography>

				<Typography type="secondary" className="f6 tc b--black-10">
					Sekarang Anda dapat menggunakan kata sandi baru untuk masuk
					ke akun Anda.
				</Typography>

				<Button
					block
					href="/login"
					className="bg-denim f7 fw5 shadow-3 white pv2 ph4"
					htmlType="button"
					size="large"
					style={{ borderRadius: '8px' }}
				>
					Kembali
				</Button>
			</Space>
		</ResetPasswordLayout>
	);
};

export default PasswordResetSuccessPages;
