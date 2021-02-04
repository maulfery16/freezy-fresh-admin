import React, { useState } from 'react';
import ReactMoment from 'react-moment';
import { Helmet } from 'react-helmet-async';
import {
	Avatar,
	Badge,
	Breadcrumb,
	Col,
	Divider,
	Layout,
	Menu,
	Row,
	Space,
	Typography,
} from 'antd';
import { Link, useHistory, useLocation } from 'react-router-dom';
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
	UserOutlined,
} from '@ant-design/icons';

import AtomFooter from '../atoms/footer';
import FFLogo from '../../assets/logos/ff-logo.png';

const menus = [
	{
		name: 'Beranda',
		icon: <HomeFilled />,
		link: '/',
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
		icon: <FaBoxOpen style={{ marginRight: '10px' }} />,
		subMenuKey: 'produts',
		subMenus: [
			{
				name: 'Kategori Dasar',
				link: '/products/category',
			},
			{
				name: 'Kategori Tambahan',
				link: '/products/additional-category',
			},
			{
				name: 'Warna',
				link: '/products/colour',
			},
			{
				name: 'Brand',
				link: '/products/brand',
			},
		],
	},
	{
		name: 'Membership',
		icon: <BsFillPersonCheckFill />,
		link: '/membership',
	},
	{
		name: 'Cabang',
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
					style={{ height: '100vh' }}
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
						<Col span={8}>
							<Avatar
								icon={<UserOutlined />}
								size={50}
								src={user.image}
							/>
						</Col>
						<Col span={16}>
							<Row>
								<Col span={17}>
									<Space size={15}>
										{!isSidebarCollapsed && (
											<Space
												direction="vertical"
												size={-3}
											>
												<Typography.Text>
													<span className="yellow f5 fw7">
														{user.name}
													</span>
												</Typography.Text>
												<Typography.Text>
													<span className="white f6">
														{user.role}
													</span>
												</Typography.Text>
											</Space>
										)}
									</Space>
								</Col>

								{!isSidebarCollapsed && (
									<>
										<Col span={7}>
											<Space size={5}>
												<Badge count={notifCount}>
													<BellOutlined className="white f4 pointer" />
												</Badge>
												<SettingOutlined className="white f4 pointer" />
											</Space>
										</Col>
										<Col span={22}>
											<Space
												direction="vertical"
												size={0}
											>
												<Typography.Text>
													<span
														className="white i"
														style={{ fontSize: 10 }}
													>
														bergabung pada{' '}
														<ReactMoment format="D MMM YYYY">
															{
																new Date(
																	user.joined_at
																)
															}
														</ReactMoment>
													</span>
												</Typography.Text>
												<Typography.Text>
													<span
														className="white fw7"
														style={{ fontSize: 10 }}
													>
														{user.branches.join(
															', '
														)}
													</span>
												</Typography.Text>
											</Space>
										</Col>
									</>
								)}
							</Row>
						</Col>

						<Divider className="b--white" />
					</Row>

					<Menu
						defaultOpenKeys={[location.pathname.split('/')[1]]}
						defaultSelectedKeys={[
							location.pathname,
							`/${location.pathname.split('/')[1]}`,
						]}
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

				<Layout
					className="site-layout"
					style={{ height: '100vh', overflow: 'scroll' }}
				>
					<div className="ph5 pv4">
						{props.breadcumbs && (
							<Breadcrumb>
								{props.breadcumbs.map((breadcumb, index) => (
									<Breadcrumb.Item
										className="denim"
										key={`breadcumb-${index}`}
									>
										<Link to={breadcumb.link}>
											{breadcumb.name}
										</Link>
									</Breadcrumb.Item>
								))}
							</Breadcrumb>
						)}
						<Divider />
						<Layout.Content style={{ minHeight: '80vh' }}>
							{props.children}
						</Layout.Content>
						<Layout.Footer style={{ textAlign: 'center' }}>
							<AtomFooter />
						</Layout.Footer>
					</div>
				</Layout>
			</Layout>
		</>
	);
};

export default OrganismLayout;
