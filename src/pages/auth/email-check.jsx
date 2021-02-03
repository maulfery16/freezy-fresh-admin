import React from 'react';
import { Button, Space, Typography } from 'antd';

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

        <Typography.Link href="mailto:contactus@freezyfresh.com" className="f6 fw5 denim">
          contactus@freezyfresh.com
				</Typography.Link>

        <Button
          block
          href="/login"
          className="bg-denim f7 fw5 shadow-3 white pv2 ph4 mt3"
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

export default EmailCheckPages;
