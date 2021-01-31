import React, { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import {
	Avatar,
	Badge,
	Divider,
	Input,
	Layout,
	Menu,
	Row,
	Space,
	Typography,
} from 'antd';
import { useHistory, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';

import { BsFillPersonCheckFill, BsPersonFill } from 'react-icons/bs';
import {
	FaBoxOpen,
	FaMoneyBill,
	FaMotorcycle,
	FaStoreAlt,
} from 'react-icons/fa';
import {
	BellOutlined,
	HomeFilled,
	SettingOutlined,
	ShoppingCartOutlined,
	SearchOutlined,
	UserOutlined,
} from '@ant-design/icons';

import FFLogo from '../../assets/logos/ff-logo.png';
const menus = [
	{
		name: 'Dashboard',
		icon: <HomeFilled />,
		link: '/dashboard',
	},
	{
		name: 'Admin',
		icon: <BsPersonFill />,
		link: '/admin',
	},

	{
		name: 'Pesanan',
		icon: <ShoppingCartOutlined />,
		subMenuKey: 'order',
		subMenus: [
			{
				name: 'Pesanan Baru',
				link: '/order/new',
			},
			{
				name: 'Pesanan Diproses',
				link: '/order/proceed',
			},
			{
				name: 'Pesanan Batal',
				link: '/order/cancel',
			},
		],
	},
	{
		name: 'Produk-Poduk',
		icon: <FaBoxOpen />,
		link: '/product',
	},
	{
		name: 'Membership',
		icon: <BsFillPersonCheckFill />,
		link: '/membership',
	},
	{
		name: 'Cabang Page',
		icon: <FaStoreAlt />,
		link: '/branch',
	},
	{
		name: 'Pendapatan',
		icon: <FaMoneyBill />,
		link: '/income',
	},
	{
		name: 'Kurir',
		icon: <FaMotorcycle />,
		link: '/courier',
	},
];

const OrganismLayout = (props) => {
	const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
	const [notifCount] = useState(0);
	const { user } = useSelector((state) => state.auth);
	const history = useHistory();
	const location = useLocation();

	return (
		<>
			<Helmet>
				<title>Fresh Freeze Admin | {props.title || ''}</title>
			</Helmet>

			<Layout style={{ minHeight: '100vh' }}>
				<Layout.Sider
					collapsible
					collapsed={isSidebarCollapsed}
					onCollapse={() =>
						setIsSidebarCollapsed((collapsed) => !collapsed)
					}
					width={250}
				>
					<div className="pa2 mv3 mh4">
						<img src={FFLogo} alt="Logo" />
					</div>

					<Row
						className="mh3"
						justify={
							isSidebarCollapsed ? 'center' : 'space-between'
						}
					>
						<Space size={15}>
							<Avatar
								icon={<UserOutlined />}
								size={50}
								src={user.image}
							/>

							{!isSidebarCollapsed && (
								<Space direction="vertical" size={10}>
									<Space direction="vertical" size={-3}>
										<Typography.Text strong>
											<span className="white">
												{user.name}
											</span>
										</Typography.Text>
										<Typography.Text className="f7">
											<span className="white">
												{user.role} - {user.domicile}
											</span>
										</Typography.Text>
									</Space>

									<Space size={15}>
										<Badge count={notifCount}>
											<BellOutlined className="white f4 pointer" />
										</Badge>
										<SettingOutlined className="white f4 pointer" />
									</Space>
								</Space>
							)}
						</Space>

						{!isSidebarCollapsed && (
							<Input
								className="mt4 br4"
								onPressEnter={(event) =>
									console.log(event.target.value)
								}
								placeholder="Cari"
								prefix={<SearchOutlined />}
							/>
						)}

						<Divider className="b--white" />
					</Row>

					<Menu
						defaultOpenKeys={[location.pathname.split('/')[1]]}
						defaultSelectedKeys={[location.pathname]}
						mode="inline"
						theme="dark"
					>
						{menus.map((menu) => {
							return !menu.subMenus ? (
								<Menu.Item
									key={menu.link}
									icon={menu.icon}
									onClick={() => history.push(menu.link)}
								>
									{menu.name}
								</Menu.Item>
							) : (
								<Menu.SubMenu
									className={
										location.pathname.includes(
											menu.subMenyKey
										)
											? 'ant-menu-submenu-open'
											: ''
									}
									key={menu.subMenuKey}
									icon={menu.icon}
									title={menu.name}
								>
									{menu.subMenus.map((sub) => (
										<Menu.Item
											key={sub.link}
											onClick={() =>
												history.push(sub.link)
											}
										>
											{sub.name}
										</Menu.Item>
									))}
								</Menu.SubMenu>
							);
						})}
					</Menu>
				</Layout.Sider>

				<Layout className="site-layout">
					<div className="ph5 pv4">
						<Divider />
						<Layout.Content style={{ minHeight: '80vh' }}>
							{props.children}
						</Layout.Content>
						<Layout.Footer style={{ textAlign: 'center' }}>
							Copyright © 2021 Freezy Fresh. All rights reserved
						</Layout.Footer>
					</div>
				</Layout>
			</Layout>
		</>
	);
};

export default OrganismLayout;
