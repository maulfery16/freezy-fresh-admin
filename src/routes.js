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
		children: [
			{
				component: React.lazy(() => import('./pages/admin/modify')),
				exact: true,
				name: 'Add Admin',
				path: '/add',
			},
			{
				component: React.lazy(() => import('./pages/admin/modify')),
				exact: true,
				name: 'Edit Admin',
				path: '/edit',
			},
		],
	},
	{
		skipRenderParent: true,
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
		name: 'Login Page',
		path: '/login',
	},
	{
		component: React.lazy(() => import('./pages/auth/forgot-password')),
		exact: true,
		name: 'Forgot Password Page',
		path: '/forgot-password',
	},
	{
		component: React.lazy(() => import('./pages/auth/email-check')),
		exact: true,
		name: 'Check Email Page',
		path: '/email-check',
	},
	{
		component: React.lazy(() => import('./pages/auth/password-reset')),
		exact: true,
		name: 'Reset Password Page',
		path: '/reset-password',
	},
	{
		component: React.lazy(() =>
			import('./pages/auth/password-reset-success')
		),
		exact: true,
		name: 'Reset Password Success Page',
		path: '/reset-password-success',
	},
];

export default routes;
