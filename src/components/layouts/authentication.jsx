import PropTypes from 'prop-types';
import React from 'react';
import { Col, Row } from 'antd';

import AtomFooter from '../atoms/footer';
import AuthBanner from '../../assets/images/background-auth.svg';
import FFLogo from '../../assets/logos/ff-logo.png';

const AuthenticationLayout = (props) => {
	return (
		<Row
			className="pa0 ma0 bg-light-grey"
			justify="space-between"
			style={{
				height: '100vh',
				backgroundImage: `url(${AuthBanner})`,
				backgroundSize: 'contain',
				backgroundRepeat: 'no-repeat',
				backgroundPosition: 'fixed',
			}}
		>
			<Col className="flex items-center justify-start ph6" span={10}>
				<img src={FFLogo} width="280vw" alt="Logo" />
			</Col>
			<Col span={12} offset={1}>
				<div
					className="flex flex-column items-center"
					style={{ height: '100%' }}
				>
					<div
						className="flex items-center"
						style={{ flex: '1 1 auto' }}
					>
						{props.children}
					</div>
					<AtomFooter />
				</div>
			</Col>
			<div className="w2 bg-denim" span={1}></div>
		</Row>
	);
};

AuthenticationLayout.propTypes = {
	children: PropTypes.node,
};

export default AuthenticationLayout;
