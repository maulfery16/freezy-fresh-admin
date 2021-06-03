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

import { MdRssFeed } from 'react-icons/md';
import { BsPersonFill } from 'react-icons/bs';
import {
	AiFillGift,
	AiOutlineTransaction,
	AiTwotoneBank,
} from 'react-icons/ai';
import {
	FaBuilding,
	FaMoneyBill,
	FaMotorcycle,
	FaStoreAlt,
} from 'react-icons/fa';
import {
	BellOutlined,
	CustomerServiceOutlined,
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

const OrganismLayout = (props) => {
	const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
	const [notifications] = useState([]);
	const { roles, user } = useSelector((state) => state.auth);

	const dispatch = useDispatch();
	const history = useHistory();
	const location = useLocation();

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
			hidden: !roles.includes('super-admin') || !roles.includes('admin'),
		},
		{
			name: 'Pesanan',
			icon: <ShoppingCartOutlined />,
			subMenuKey: 'order',
			subMenus: [
				{
					name: 'Pesanan',
					link: '/order/',
				},
				{
					name: 'Pesanan Dikomplain',
					link: '/order/complain',
				},
				{
					name: 'Ulasan',
					link: '/order/review',
					hidden: roles.includes('manager-freezy'),
				},
			],
		},
		{
			name: 'Produk-Produk',
			icon: <DropboxOutlined />,
			subMenuKey: 'products',
			subMenus: [
				{
					name: 'Produk',
					link: '/products/',
				},
				{
					name: 'Brand',
					link: '/products/brand',
					hidden:
						!roles.includes('super-admin') ||
						!roles.includes('admin'),
				},
				{
					name: 'Kategori Dasar',
					link: '/products/category',
					hidden:
						!roles.includes('super-admin') ||
						!roles.includes('admin'),
				},
				{
					name: 'Kategori Tambahan',
					link: '/products/additional-category',
					hidden:
						!roles.includes('super-admin') ||
						!roles.includes('admin'),
				},
				{
					name: 'Rekomendasi',
					link: '/products/recomandation',
					hidden:
						!roles.includes('super-admin') ||
						!roles.includes('admin'),
				},
				{
					name: 'Warna',
					link: '/products/colour',
					hidden:
						!roles.includes('super-admin') ||
						!roles.includes('admin'),
				},
				{
					name: 'Wishlist',
					link: '/products/wishlist',
					hidden:
						!roles.includes('super-admin') ||
						!roles.includes('admin'),
				},
				{
					name: 'Zona',
					link: '/products/zone',
					hidden:
						!roles.includes('super-admin') ||
						!roles.includes('admin'),
				},
			],
		},
		{
			name: 'Tampilan',
			icon: <LayoutFilled />,
			subMenuKey: 'view',
			hidden: !roles.includes('super-admin') || !roles.includes('admin'),
			subMenus: [
				{
					name: 'Tampilan Lainnya',
					link: '/view/additional-sections',
				},
				{
					name: 'Banner',
					link: '/view/banner',
				},
				{
					name: 'Holiday',
					link: '/view/holiday',
				},
				{
					name: 'Daily Deals',
					link: '/view/daily-deals',
				},
				{
					name: 'Flash Sale',
					link: '/view/flash-sale',
				},
				{
					name: 'Bundling Deals',
					link: '/view/bundling-deals',
				},
				{
					name: 'Produk Baru',
					link: '/view/new-product',
				},
				{
					name: `Circle's Favorite`,
					link: '/view/circle-favorite',
				},
				{
					name: 'Based on Search',
					link: '/view/based-on-search',
				},
				{
					name: 'Artikel',
					link: '/view/article',
				},
				{
					name: 'Kategori Artikel',
					link: '/view/article-category',
				},
				{
					name: 'Promo',
					link: '/view/promotion',
				},
				{
					name: 'Iklan',
					link: '/view/ads',
				},
				{
					name: 'Special Benefit',
					link: '/view/special-benefit',
				},
			],
		},
		{
			name: 'Pelanggan',
			icon: <CustomerServiceOutlined />,
			subMenuKey: 'customer',
			hidden: roles.includes('manager-tows'),
			subMenus: [
				{
					name: 'Pelanggan',
					link: '/customer/',
				},
				{
					name: 'Daftar Teman',
					link: '/customer/friend-list',
				},
				{
					name: 'Daftar Keluarga',
					link: '/customer/family-list',
				},
				{
					name: 'Favorite',
					link: '/customer/favorite',
				},
				{
					name: 'My Catalog',
					link: '/customer/catalog',
				},
				{
					name: 'MGM',
					link: '/customer/member-get-member',
				},
			],
		},
		{
			name: 'Feed',
			icon: <MdRssFeed />,
			link: '/feed',
		},
		{
			name: 'Transaksi',
			icon: <AiOutlineTransaction />,
			link: '/transaction',
			hidden: !roles.includes('super-admin') || !roles.includes('admin'),
		},
		{
			name: 'Cabang Freezy',
			icon: <FaStoreAlt />,
			link: '/branch',
			hidden: !roles.includes('super-admin') || !roles.includes('admin'),
		},
		{
			name: 'Perusahaan',
			icon: <FaBuilding />,
			link: '/perusahaan',
			hidden: !roles.includes('super-admin') || !roles.includes('admin'),
		},
		{
			name: 'Bank',
			icon: <AiTwotoneBank />,
			link: '/bank',
			hidden: !roles.includes('super-admin') || !roles.includes('admin'),
		},
		{
			name: 'Pendapatan',
			icon: <FaMoneyBill />,
			link: '/income',
		},
		{
			name: 'Voucher',
			icon: <AiFillGift />,
			link: '/voucher',
			hidden: !roles.includes('super-admin') || !roles.includes('admin'),
		},
		{
			name: 'Kurir',
			icon: <FaMotorcycle />,
			link: '/courier',
		},
	];

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

			<Layout style={{ maxHeight: '100vh' }}>
				<Layout.Sider
					collapsible
					collapsed={isSidebarCollapsed}
					onCollapse={() =>
						setIsSidebarCollapsed((collapsed) => !collapsed)
					}
					width={300}
					style={{ maxHeight: '100vh', overflow: 'auto' }}
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
								src={user.profile_image}
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
														{`${user.first_name} ${
															user.last_name &&
															user.last_name
														}`}
													</span>
												</Typography.Text>
												<Typography.Text>
													<span className="white f6">
														{user.roles &&
															user.roles.data
																.map(
																	(res) =>
																		res.display_name
																)
																.join(', ')}
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
																	user.created_at
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
														{user.branches.length >
														0
															? user.branches
																	.map(
																		(res) =>
																			res
																				.name
																				.id ||
																			res
																				.name
																				.en
																	)
																	.join(', ')
															: '-'}
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
							return !menus.hidden ? (
								!menu.subMenus ? (
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
												menu.subMenuKey
											)
												? 'ant-menu-submenu-open'
												: ''
										}
										key={menu.subMenuKey}
										icon={menu.icon}
										title={menu.name}
									>
										{menu.subMenus.map(
											(sub) =>
												!sub.hidden && (
													<Menu.Item
														className={
															location.pathname.includes(
																sub.link
															)
																? 'ant-menu-item-selected'
																: ''
														}
														key={sub.link}
														onClick={() =>
															history.push(
																sub.link
															)
														}
													>
														{sub.name}
													</Menu.Item>
												)
										)}
									</Menu.SubMenu>
								)
							) : null;
						})}
					</Menu>
				</Layout.Sider>

				<Layout
					className="site-layout"
					style={{ maxHeight: '100vh', overflow: 'auto' }}
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
