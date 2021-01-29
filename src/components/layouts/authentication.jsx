
import React from 'react';
import { Layout } from 'antd';

import FFMainLogo from '../../assets/images/ff-main-logo.png';

const { Header, Footer, Sider, Content } = Layout;

const AuthenticationLayout = (props) => {

	return (
    <Layout styles={{ backgroundImage:`url(${FFMainLogo})` }}>
      <Sider>Sider</Sider>
      <Layout>
        <Header>Header</Header>
        <Content>{props.children}</Content>
        <Footer>Footer</Footer>
      </Layout>
    </Layout>
  )
}

export default AuthenticationLayout;
