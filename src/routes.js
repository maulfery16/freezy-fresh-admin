import React from 'react';

const routes = [
	{
		component: React.lazy(() => import('./pages/example')),
		exact: true,
		name: 'Example Pages',
		path: '/example',
	},
	{
		component: React.lazy(() => import('./pages/authentication/authentication')),
		exact: true,
		name: 'Authentication Pages',
		path: '/authentication',
	},
];

export default routes;
