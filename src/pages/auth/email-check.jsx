import React from 'react';
import { Space, Typography } from 'antd';

import AtomPrimaryButton from '../../components/atoms/button/primary-button';
import ResetPasswordLayout from '../../components/layouts/reset-password';

import CheckEmail from '../../assets/images/check-email.svg';

const EmailCheckPages = () => {
	return (
		<ResetPasswordLayout>
			<Space direction="vertical" size={12} align="center">
				<Typography className="f5 fw7 tc denim">
					Periksa Email Anda!
				</Typography>

				<Typography type="secondary" className="f6 tc b--black-10">
					Kami baru saja mengirimi Anda email petunjuk untuk <br />
					mereset kata sandi Anda
				</Typography>

				<img src={CheckEmail} width="150vw" alt="Check Email" />

				<Typography type="secondary" className="f6 tc b--black-10">
					Untuk pertanyaan atau masalah apa pun <br />
					silakan email kami di
				</Typography>

				<Typography.Link
					href="mailto:contactus@freezyfresh.com"
					className="f6 fw5 denim"
				>
					contactus@freezyfresh.com
				</Typography.Link>

				<AtomPrimaryButton
					block
					href="/login"
					className="f7 fw5 shadow-3 pv2 ph4 mt3"
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

export default EmailCheckPages;
