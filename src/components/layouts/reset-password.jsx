import React from 'react';

import AtomFooter from '../atoms/footer';
import FFLogoBlue from '../../assets/logos/ff-logo-blue.svg';
import MaskBanner from '../../assets/images/mask-banner.svg';

const ResetPasswordLayout = (props) => {
	return (
		<div
			className="flex flex-column items-center w-100 bg-light-grey"
			style={{ height: '100vh' }}
		>
			<div
				className="w-100 bg-denim"
				style={{
					height: '15vh',
					backgroundImage: `url(${MaskBanner})`,
					backgroundSize: 'contain',
					backgroundPosition: 'fixed',
				}}
			></div>

			<div className="flex items-center justify-center mt4">
				<img src={FFLogoBlue} width="150vw" alt="Logo" />
			</div>

			<div
				className="flex flex-column items-center justify-center"
				style={{ height: '100%' }}
			>
				{props.children}
			</div>

			<AtomFooter />
		</div>
	);
};

export default ResetPasswordLayout;
