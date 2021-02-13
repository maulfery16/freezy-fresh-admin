import React from 'react';

const routes = [
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
		component: React.lazy(() => import('./pages/auth/login')),
		exact: true,
		name: 'Login Page',
		path: '/login',
	},
	{
		path: 'reset-password',
		children: [
			{
				component: React.lazy(() =>
					import('./pages/auth/password-reset')
				),
				exact: true,
				name: 'Reset Password Page',
				path: '/',
			},
			{
				component: React.lazy(() =>
					import('./pages/auth/password-reset-success')
				),
				exact: true,
				name: 'Reset Password Success Page',
				path: '/success',
			},
		],
	},
	{
		component: React.lazy(() => import('./pages/dasboard.jsx')),
		exact: true,
		guard: true,
		name: 'Dashboard Page',
		path: '/',
	},
	{
		path: '/admin',
		children: [
			{
				component: React.lazy(() => import('./pages/admin')),
				exact: true,
				guard: true,
				name: 'Admin Page',
				path: '/',
			},
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
				path: '/:id/detail',
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
		path: '/products',
		children: [
			{
				path: '/additional-category',
				children: [
					{
						component: React.lazy(() =>
							import('./pages/products/additional-category')
						),
						exact: true,
						guard: true,
						name: 'Additional Category Page',
						path: '/',
					},
					{
						component: React.lazy(() =>
							import(
								'./pages/products/additional-category/modify'
							)
						),
						exact: true,
						guard: true,
						name: 'Add Additional Category Page',
						path: '/add',
					},
					{
						component: React.lazy(() =>
							import(
								'./pages/products/additional-category/modify'
							)
						),
						exact: true,
						guard: true,
						name: 'Edit Additional Category Page',
						path: '/:id/edit',
					},
				],
			},
			{
				path: '/brand',
				children: [
					{
						component: React.lazy(() =>
							import('./pages/products/brand')
						),
						exact: true,
						guard: true,
						name: 'Brand Page',
						path: '/',
					},
					{
						component: React.lazy(() =>
							import('./pages/products/brand/modify')
						),
						exact: true,
						guard: true,
						name: 'Add Brand Page',
						path: '/add',
					},

					{
						component: React.lazy(() =>
							import('./pages/products/brand/modify')
						),
						exact: true,
						guard: true,
						name: 'Edit Brand Page',
						path: '/:id/edit',
					},
				],
			},
			{
				path: '/category',
				children: [
					{
						component: React.lazy(() =>
							import('./pages/products/category')
						),
						exact: true,
						guard: true,
						name: 'Category Page',
						path: '/',
					},
					{
						component: React.lazy(() =>
							import('./pages/products/category/modify')
						),
						exact: true,
						guard: true,
						name: 'Add Category Page',
						path: '/add',
					},

					{
						component: React.lazy(() =>
							import('./pages/products/category/modify')
						),
						exact: true,
						guard: true,
						name: 'Edit Category Page',
						path: '/:id/edit',
					},
				],
			},
			{
				path: '/colour',
				children: [
					{
						component: React.lazy(() =>
							import('./pages/products/colour')
						),
						exact: true,
						guard: true,
						name: 'Colour Page',
						path: '/',
					},
					{
						component: React.lazy(() =>
							import('./pages/products/colour/modify')
						),
						exact: true,
						guard: true,
						name: 'Add Colour Page',
						path: '/add',
					},
					{
						component: React.lazy(() =>
							import('./pages/products/colour/modify')
						),
						exact: true,
						guard: true,
						name: 'Edit Colour Page',
						path: '/:id/edit',
					},
				],
			},
		],
	},
];

export default routes;
