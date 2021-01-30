import React from 'react';

const routes = [
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
		component: React.lazy(() => import('./pages/authentication/authentication')),
		exact: true,
		name: 'Authentication Pages',
		path: '/authentication',
	},
];

export default routes;
