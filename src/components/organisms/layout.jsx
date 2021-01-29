import React, { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { Layout, Menu } from 'antd';
import { useHistory } from 'react-router-dom';

import {
	DesktopOutlined,
	PieChartOutlined,
	TeamOutlined,
} from '@ant-design/icons';

import FFLogo from '../../assets/logos/ff-logo.png';

const OrganismLayout = (props) => {
	const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
	const history = useHistory();

	const menus = [
		{
			key: '1',
			name: 'Option 1',
			icon: <PieChartOutlined />,
			link: '/to-some-link-1',
		},
		{
			key: '2',
			name: 'Option 2',
			icon: <DesktopOutlined />,
			link: '/to-some-link-2',
		},
		{
			key: 'Sub 1',
			name: 'Sub 1',
			icon: <TeamOutlined />,
			subMenus: [
				{
					key: '3',
					name: 'Sub Option 1',
					link: '/to-some-link-3',
				},
				{
					key: '4',
					name: 'Sub Option 2',
					link: '/to-some-link-4',
				},
			],
		},
	];

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

					<Menu
						theme="dark"
						defaultSelectedKeys={['1']}
						mode="inline"
					>
						{menus.map((menu) => {
							return !menu.subMenus ? (
								<Menu.Item
									key={menu.key}
									icon={menu.icon}
									onClick={() => history.push(menu.link)}
								>
									{menu.name}
								</Menu.Item>
							) : (
								<Menu.SubMenu
									key={menu.key}
									icon={menu.icon}
									title={menu.name}
								>
									{menu.subMenus.map((sub) => (
										<Menu.Item
											key={sub.key}
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
					<div className="ph5 pv4">{props.children}</div>
				</Layout>
			</Layout>
		</>
	);
};

export default OrganismLayout;
