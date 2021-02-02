import React from 'react';

const routes = [
	{
		component: React.lazy(() => import('./pages/dasboard.jsx')),
		exact: true,
		name: 'Hallo from dashbord',
		path: '/',
	},
	{
		component: React.lazy(() => import('./pages/admin')),
		exact: true,
		name: 'Admin Page',
		path: '/admin',
	},
	{
		name: 'Pesanan Page',
		path: '/order',
		children: [
			{
				component: React.lazy(() => import('./pages/admin')),
				exact: true,
				name: 'Pesanan Baru Page',
				path: '/new',
			},
		],
	},
	{
		component: React.lazy(() => import('./pages/auth/login')),
		exact: true,
		name: 'Login Pages',
		path: '/login',
	},
	{
		component: React.lazy(() => import('./pages/auth/forgot-password')),
		exact: true,
		name: 'Forgot Password Pages',
		path: '/forgot-password',
	},
];

export default routes;
