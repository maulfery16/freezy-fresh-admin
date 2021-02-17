import React, { useState } from 'react';
import ReactMoment from 'react-moment';
import { Helmet } from 'react-helmet-async';
import {
	Avatar,
	Badge,
	Breadcrumb,
	Col,
	Divider,
	Dropdown,
	Layout,
	Menu,
	message,
	Row,
	Space,
	Typography,
} from 'antd';
import { Link, useHistory, useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import { BsFillPersonCheckFill, BsPersonFill } from 'react-icons/bs';
import { FaMoneyBill, FaMotorcycle, FaStoreAlt } from 'react-icons/fa';
import {
	BellOutlined,
	DropboxOutlined,
	HomeFilled,
	LayoutFilled,
	SettingOutlined,
	ShoppingCartOutlined,
	UserOutlined,
} from '@ant-design/icons';

import AtomFooter from '../atoms/footer';
import FFLogo from '../../assets/logos/ff-logo.png';

import {
	setAuthToken,
	setLoginStatus,
	setRefreshToken,
	setRememberMeStatus,
} from '../../stores/auth/actions';

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
		icon: <DropboxOutlined />,
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
			{
				name: 'Bank',
				link: '/products/bank',
			},
		],
	},
	{
		name: 'Tampilan',
		icon: <LayoutFilled />,
		subMenuKey: 'view',
		subMenus: [
			{
				name: 'Banner',
				link: '/banner',
			},
			{
				name: 'Artikel',
				link: '/article',
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
	const [notifications] = useState([]);
	const { user } = useSelector((state) => state.auth);
	const dispatch = useDispatch();
	const history = useHistory();
	const location = useLocation();

	const notificationMenus = () => (
		<Space className="pa3" direction="vertical" style={{ width: 300 }}>
			<Typography.Text>
				<span className="f5 fw6">Notifikasi</span>
			</Typography.Text>

			<hr />

			{notifications.length < 1 ? (
				<Typography.Text type="secondary">
					Tidak ada notifikasi
				</Typography.Text>
			) : (
				notifications.map((notification, index) => (
					<Typography.Text key={`_notif-${index}`} type="secondary">
						{notification.title}
					</Typography.Text>
				))
			)}
		</Space>
	);

	const settingMenus = () => (
		<Space className="pa3" direction="vertical">
			<Link to="/profile/edit">
				<span className="gray">Ubah Profil</span>
			</Link>
			<Typography.Text onClick={() => logout()} type="danger">
				Logout
			</Typography.Text>
		</Space>
	);

	const logout = () => {
		try {
			dispatch(setAuthToken(null));
			dispatch(setLoginStatus(false));
			dispatch(setRefreshToken(null));
			dispatch(setRememberMeStatus(null));
			history.replace('/login');
		} catch (error) {
			message.error(error.message);
			console.error(error);
		}
	};

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
					width={300}
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
						<Col span={6}>
							<Avatar
								icon={<UserOutlined />}
								size={50}
								src={user.image}
							/>
						</Col>
						<Col span={18}>
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
											<Space size={15}>
												<Badge
													count={notifications.length}
												>
													<Dropdown
														overlay={
															notificationMenus
														}
														trigger={['click']}
													>
														<BellOutlined className="white f4 pointer" />
													</Dropdown>
												</Badge>

												<Dropdown
													overlay={settingMenus}
													trigger={['click']}
												>
													<SettingOutlined className="white f4 pointer" />
												</Dropdown>
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
					style={{ maxHeight: '100vh', overflow: 'scroll' }}
				>
					<div className="ph5 pv4">
						{props.breadcumbs && (
							<Breadcrumb>
								<Breadcrumb.Item
									className="denim"
									key={`breadcumb-0`}
								>
									<Link to={`/`}>Dashboard</Link>
								</Breadcrumb.Item>
								{props.breadcumbs.map((breadcumb, index) => (
									<Breadcrumb.Item
										className="denim"
										key={`breadcumb-${index + 1}`}
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
