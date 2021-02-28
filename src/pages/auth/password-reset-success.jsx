import React from 'react';
import { Space, Typography } from 'antd';

import AtomPrimaryButton from '../../components/atoms/button/primary-button';
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

				<AtomPrimaryButton
					block
					href="/login"
					className="f7 fw5 pv2 ph4"
					htmlType="button"
					size="large"
					style={{ borderRadius: '8px' }}
				>
					Kembali
				</AtomPrimaryButton>
			</Space>
		</ResetPasswordLayout>
	);
};

export default PasswordResetSuccessPages;
