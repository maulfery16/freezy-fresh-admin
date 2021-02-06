import React from 'react';

const routes = [
	{
		component: React.lazy(() => import('./pages/admin')),
		exact: true,
		guard: true,
		name: 'Admin Page',
		path: '/admin',
		children: [
			{
				component: React.lazy(() => import('./pages/admin/modify')),
				exact: true,
				guard: true,
				name: 'Add Admin Page',
				path: '/add',
			},
			{
				component: React.lazy(() => import('./pages/admin/detail')),
				exact: true,
				guard: true,
				name: 'Admin Detail Page',
				path: '/:id',
			},
			{
				component: React.lazy(() => import('./pages/admin/modify')),
				exact: true,
				guard: true,
				name: 'Edit Admin Page',
				path: '/:id/edit',
			},
		],
	},
	{
		component: React.lazy(() => import('./pages/auth/email-check')),
		exact: true,
		name: 'Check Email Page',
		path: '/email-check',
	},
	{
		component: React.lazy(() => import('./pages/auth/forgot-password')),
		exact: true,
		name: 'Forgot Password Page',
		path: '/forgot-password',
	},
	{
		component: React.lazy(() => import('./pages/dasboard.jsx')),
		exact: true,
		guard: true,
		name: 'Hallo from dashbord',
		path: '/',
	},
	{
		skipRenderParent: true,
		name: 'Product Page',
		guard: true,
		path: '/products',
		children: [
			{
				component: React.lazy(() =>
					import('./pages/products/additional-category')
				),
				exact: true,
				guard: true,
				name: 'Additional Category Page',
				path: '/additional-category',
			},
			{
				component: React.lazy(() =>
					import('./pages/products/additional-category/add')
				),
				exact: true,
				guard: true,
				name: 'Add Additional Category Page',
				path: '/additional-category/new',
			},
			{
				component: React.lazy(() =>
					import('./pages/products/brand/modify')
				),
				exact: true,
				guard: true,
				name: 'Add Brand Page',
				path: '/brand/add',
			},
			{
				component: React.lazy(() => import('./pages/products/brand')),
				exact: true,
				guard: true,
				name: 'Brand Page',
				path: '/brand',
			},
			{
				component: React.lazy(() =>
					import('./pages/products/brand/modify')
				),
				exact: true,
				guard: true,
				name: 'Edit Brand Page',
				path: '/brand/:id/edit',
			},
			{
				component: React.lazy(() =>
					import('./pages/products/category/modify')
				),
				exact: true,
				guard: true,
				name: 'Add Category Page',
				path: '/category/add',
			},
			{
				component: React.lazy(() =>
					import('./pages/products/category')
				),
				exact: true,
				guard: true,
				name: 'Category Page',
				path: '/category',
			},
			{
				component: React.lazy(() =>
					import('./pages/products/category/modify')
				),
				exact: true,
				guard: true,
				name: 'Edit Category Page',
				path: '/category/:id/edit',
			},
			{
				component: React.lazy(() => import('./pages/products/colour')),
				exact: true,
				guard: true,
				name: 'Colour Page',
				path: '/colour',
			},
			{
				component: React.lazy(() =>
					import('./pages/products/colour/add')
				),
				exact: true,
				guard: true,
				name: 'Add Colour Page',
				path: '/colour/add',
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
