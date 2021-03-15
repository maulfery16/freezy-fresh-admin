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
		path: '/reset-password',
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
		path: '/bank',
		children: [
			{
				component: React.lazy(() => import('./pages/bank')),
				exact: true,
				guard: true,
				name: 'Bank Page',
				path: '/',
			},
			{
				component: React.lazy(() => import('./pages/bank/modify')),
				exact: true,
				guard: true,
				name: 'Add Bank Page',
				path: '/add',
			},
			{
				component: React.lazy(() => import('./pages/bank/modify')),
				exact: true,
				guard: true,
				name: 'Edit Bank Page',
				path: '/:id/edit',
			},
		],
	},
	{
		path: '/perusahaan',
		children: [
			{
				component: React.lazy(() => import('./pages/product-owners')),
				exact: true,
				guard: true,
				name: 'Perusahaan Page',
				path: '/',
			},
			{
				component: React.lazy(() =>
					import('./pages/product-owners/modify')
				),
				exact: true,
				guard: true,
				name: 'Add Perusahaan Page',
				path: '/add',
			},

			{
				component: React.lazy(() =>
					import('./pages/product-owners/modify')
				),
				exact: true,
				guard: true,
				name: 'Edit Perusahaan Page',
				path: '/:id/edit',
			},
		],
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
				component: React.lazy(() => import('./pages/products/product')),
				exact: true,
				guard: true,
				name: 'Product Page',
				path: '/',
			},
			{
				component: React.lazy(() =>
					import('./pages/products/product/import')
				),
				exact: true,
				guard: true,
				name: 'Product Import Page',
				path: '/import',
			},
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
			{
				component: React.lazy(() =>
					import('./pages/products/wishlist')
				),
				exact: true,
				guard: true,
				name: 'Wishlist Page',
				path: '/wishlist',
			},
			{
				path: '/zone',
				children: [
					{
						component: React.lazy(() =>
							import('./pages/products/zone')
						),
						exact: true,
						guard: true,
						name: 'Zone Page',
						path: '/',
					},
					{
						component: React.lazy(() =>
							import('./pages/products/zone/modify')
						),
						exact: true,
						guard: true,
						name: 'Add Zone Page',
						path: '/add',
					},
					{
						component: React.lazy(() =>
							import('./pages/products/zone/modify')
						),
						exact: true,
						guard: true,
						name: 'Edit Zone Page',
						path: '/:id/edit',
					},
				],
			},
		],
	},
	{
		path: '/view',
		children: [
			{
				component: React.lazy(() => import('./pages/view/')),
				exact: true,
				guard: true,
				name: 'Tampilan Page',
				path: '/',
			},
			{
				component: React.lazy(() => import('./pages/view/detail')),
				exact: true,
				guard: true,
				name: 'Tampilan Page Detail',
				path: '/:id/detail',
			},
			{
				path: '/banner',
				children: [
					{
						component: React.lazy(() =>
							import('./pages/view/banner')
						),
						exact: true,
						guard: true,
						name: 'Banner Page',
						path: '/',
					},
					{
						component: React.lazy(() =>
							import('./pages/view/banner/modify')
						),
						exact: true,
						guard: true,
						name: 'Add Banner Page',
						path: '/add',
					},
					{
						component: React.lazy(() =>
							import('./pages/view/banner/detail')
						),
						exact: true,
						guard: true,
						name: 'Banner Detail Page',
						path: '/:id/detail',
					},
					{
						component: React.lazy(() =>
							import('./pages/view/banner/modify')
						),
						exact: true,
						guard: true,
						name: 'Edit Banner Page',
						path: '/:id/edit',
					},
				],
			},
			{
				path: '/holiday',
				children: [
					{
						component: React.lazy(() =>
							import('./pages/view/holiday')
						),
						exact: true,
						guard: true,
						name: 'Holiday Page',
						path: '/',
					},
					{
						component: React.lazy(() =>
							import('./pages/view/holiday/modify')
						),
						exact: true,
						guard: true,
						name: 'Edit Holiday Page',
						path: '/edit',
					},
				],
			},
			{
				path: '/new-product',
				children: [
					{
						component: React.lazy(() =>
							import('./pages/view/new-product')
						),
						exact: true,
						guard: true,
						name: 'New Product Page',
						path: '/',
					},
					{
						component: React.lazy(() =>
							import('./pages/view/new-product/modify')
						),
						exact: true,
						guard: true,
						name: 'Edit New Product Page',
						path: '/edit',
					},
				],
			},
			{
				path: '/circle-favorite',
				children: [
					{
						component: React.lazy(() =>
							import('./pages/view/circle-favorite')
						),
						exact: true,
						guard: true,
						name: 'Circle Favorite Page',
						path: '/',
					},
					{
						component: React.lazy(() =>
							import('./pages/view/circle-favorite/modify')
						),
						exact: true,
						guard: true,
						name: 'Edit Circle Favorite Page',
						path: '/edit',
					},
				],
			},
			{
				path: '/article',
				children: [
					{
						component: React.lazy(() =>
							import('./pages/view/article')
						),
						exact: true,
						guard: true,
						name: 'Article Page',
						path: '/',
					},
					{
						component: React.lazy(() =>
							import('./pages/view/article/modify')
						),
						exact: true,
						guard: true,
						name: 'Add Article Page',
						path: '/add',
					},
					{
						component: React.lazy(() =>
							import('./pages/view/article/detail')
						),
						exact: true,
						guard: true,
						name: 'Article Detail Page',
						path: '/:id/detail',
					},
					{
						component: React.lazy(() =>
							import('./pages/view/article/modify')
						),
						exact: true,
						guard: true,
						name: 'Edit Article Page',
						path: '/:id/edit',
					},
				],
			},
			{
				path: '/article-category',
				children: [
					{
						component: React.lazy(() =>
							import('./pages/view/article-category')
						),
						exact: true,
						guard: true,
						name: 'Article Category Page',
						path: '/',
					},
					{
						component: React.lazy(() =>
							import('./pages/view/article-category/modify')
						),
						exact: true,
						guard: true,
						name: 'Add Article Category Page',
						path: '/add',
					},
					{
						component: React.lazy(() =>
							import('./pages/view/article-category/modify')
						),
						exact: true,
						guard: true,
						name: 'Edit Article Category Page',
						path: '/:id/edit',
					},
				],
			},
			{
				path: '/promotion',
				children: [
					{
						component: React.lazy(() =>
							import('./pages/view/promotion')
						),
						exact: true,
						guard: true,
						name: 'Promotion Page',
						path: '/',
					},
					{
						component: React.lazy(() =>
							import('./pages/view/promotion/modify')
						),
						exact: true,
						guard: true,
						name: 'Add Promotion Page',
						path: '/add',
					},
					{
						component: React.lazy(() =>
							import('./pages/view/promotion/detail')
						),
						exact: true,
						guard: true,
						name: 'Detail Promotion Page',
						path: '/:id/detail',
					},
					{
						component: React.lazy(() =>
							import('./pages/view/promotion/modify')
						),
						exact: true,
						guard: true,
						name: 'Edit Promotion Page',
						path: '/:id/edit',
					},
				],
			},
		],
	},
	{
		path: '/customers',
		children: [
			{
				path: '/friend-list',
				children: [
					{
						component: React.lazy(() =>
							import('./pages/customers/friend-list')
						),
						exact: true,
						guard: true,
						name: 'Customer Page',
						path: '/',
					},
					{
						path: '/:id',
						children: [
							{
								component: React.lazy(() =>
									import('./pages/customers/friend-list/list')
								),
								exact: true,
								guard: true,
								name: 'Customer Friend List Page',
								path: '/',
							},
							{
								component: React.lazy(() =>
									import(
										'./pages/customers/friend-list/detail'
									)
								),
								exact: true,
								guard: true,
								name: 'Customer Friend Detail Page',
								path: '/detail/:friend_id',
							},
						],
					},
				],
			},
		],
	},
];

export default routes;
