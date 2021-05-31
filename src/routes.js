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
		path: '/order',
		children: [
			{
				component: React.lazy(() => import('./pages/order/index')),
				exact: true,
				guard: true,
				name: 'Order Page',
				path: '/',
			},
			{
				component: React.lazy(() => import('./pages/order/add')),
				exact: true,
				// guard: true,
				name: 'Add Order Page',
				path: '/add',
			},
			{
				component: React.lazy(() => import('./pages/order/detail')),
				exact: true,
				// guard: true,
				name: 'Order Page Detail',
				path: '/:id/detail',
			},
			{
				path: '/complain',
				children: [
					{
						component: React.lazy(() =>
							import('./pages/order/complain/index')
						),
						exact: true,
						guard: true,
						name: 'Order Complained Page',
						path: '/',
					},
					{
						path: '/:id/detail',
						children: [
							{
								component: React.lazy(() =>
									import('./pages/order/complain/detail')
								),
								exact: true,
								guard: true,
								name: 'Order Complain Detail Page',
								path: '/',
							},
							{
								component: React.lazy(() =>
									import(
										'./pages/order/complain/order-detail.jsx'
									)
								),
								exact: true,
								guard: true,
								name: 'Order Complain Order Detail Page',
								path: '/orders',
							},
						],
					},
					{
						component: React.lazy(() =>
							import('./pages/order/complain/modify')
						),
						exact: true,
						guard: true,
						name: 'Order Complain Add Page',
						path: '/add',
					},
				],
			},
			{
				path: '/review',
				children: [
					{
						component: React.lazy(() =>
							import('./pages/order/review')
						),
						exact: true,
						guard: true,
						name: 'Order Review List Page',
						path: '/',
					},
					{
						component: React.lazy(() =>
							import('./pages/order/review/detail')
						),
						exact: true,
						guard: true,
						name: 'Order Review Page Detail',
						path: '/:id/detail',
					},
				],
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
				component: React.lazy(() =>
					import('./pages/products/product/detail')
				),
				exact: true,
				guard: true,
				name: 'Product Detail Page',
				path: '/:id/detail',
			},
			{
				component: React.lazy(() =>
					import('./pages/products/product/modify')
				),
				exact: true,
				guard: true,
				name: 'Add Product Page',
				path: '/add',
			},
			{
				component: React.lazy(() =>
					import('./pages/products/product/modify')
				),
				exact: true,
				guard: true,
				name: 'Edit Product Page',
				path: '/:id/edit',
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
				path: '/ads',
				children: [
					{
						component: React.lazy(() => import('./pages/view/ads')),
						exact: true,
						guard: true,
						name: 'Advertisement Page',
						path: '/',
					},
					{
						component: React.lazy(() =>
							import('./pages/view/ads/modify')
						),
						exact: true,
						guard: true,
						name: 'Edit Advertisement Page',
						path: '/edit',
					},
				],
			},
			{
				path: '/special-benefit',
				children: [
					{
						component: React.lazy(() =>
							import('./pages/view/special-benefit')
						),
						exact: true,
						guard: true,
						name: 'Special Benefit Page',
						path: '/',
					},
					{
						component: React.lazy(() =>
							import('./pages/view/special-benefit/modify')
						),
						exact: true,
						guard: true,
						name: 'Edit Special Benefit Page',
						path: '/edit',
					},
				],
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
				path: '/daily-deals',
				children: [
					{
						component: React.lazy(() =>
							import('./pages/view/daily-deals')
						),
						exact: true,
						guard: true,
						name: 'Daily Deals Page',
						path: '/',
					},
					{
						component: React.lazy(() =>
							import('./pages/view/daily-deals/modify')
						),
						exact: true,
						guard: true,
						name: 'Edit Daily Deals Page',
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
		path: '/customer',
		children: [
			{
				component: React.lazy(() =>
					import('./pages/customers/customer')
				),
				exact: true,
				guard: true,
				name: 'Customer Page',
				path: '/',
			},
			{
				component: React.lazy(() =>
					import('./pages/customers/customer/modify')
				),
				exact: true,
				guard: true,
				name: 'Customer Page Add',
				path: '/add',
			},
			{
				path: '/:id',
				children: [
					{
						component: React.lazy(() =>
							import('./pages/customers/customer/modify')
						),
						exact: true,
						guard: true,
						name: 'Customer Page Edit',
						path: '/edit',
					},
					{
						path: '/detail',
						children: [
							{
								component: React.lazy(() =>
									import('./pages/customers/customer/detail')
								),
								exact: true,
								guard: true,
								name: 'Customer Page Detail',
								path: '/',
							},
							{
								path: '/address',
								children: [
									{
										component: React.lazy(() =>
											import(
												'./pages/customers/customer/address/modify'
											)
										),
										exact: true,
										guard: true,
										name: 'Customer Address Page Add',
										path: '/add',
									},
									{
										path: '/:address_id',
										children: [
											{
												component: React.lazy(() =>
													import(
														'./pages/customers/customer/address/detail'
													)
												),
												exact: true,
												guard: true,
												name:
													'Customer Address Page Detail',
												path: '/detail',
											},
											{
												component: React.lazy(() =>
													import(
														'./pages/customers/customer/address/modify'
													)
												),
												exact: true,
												guard: true,
												name:
													'Customer Address Page Edit',
												path: '/edit',
											},
										],
									},
								],
							},
						],
					},
				],
			},
			{
				path: '/friend-list',
				children: [
					{
						component: React.lazy(() =>
							import('./pages/customers/friend-list')
						),
						exact: true,
						guard: true,
						name: 'Customer List Page',
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
			{
				path: '/member-get-member',
				children: [
					{
						component: React.lazy(() =>
							import('./pages/customers/member-get-member')
						),
						exact: true,
						guard: true,
						name: 'Member Get Member List Page',
						path: '/',
					},
					{
						component: React.lazy(() =>
							import('./pages/customers/member-get-member/edit')
						),
						exact: true,
						guard: true,
						name: 'Edit Member Get Member Page',
						path: '/edit',
					},
				],
			},
		],
	},
	{
		path: '/voucher',
		children: [
			{
				component: React.lazy(() => import('./pages/voucher')),
				exact: true,
				guard: true,
				name: 'Voucher Page',
				path: '/',
			},
			{
				component: React.lazy(() => import('./pages/voucher/modify')),
				exact: true,
				guard: true,
				name: 'Add Voucher Page',
				path: '/add',
			},
			{
				component: React.lazy(() => import('./pages/voucher/detail')),
				exact: true,
				guard: true,
				name: 'Voucher Detail Page',
				path: '/:id/detail',
			},
			{
				component: React.lazy(() => import('./pages/voucher/modify')),
				exact: true,
				guard: true,
				name: 'Edit Voucher Page',
				path: '/:id/edit',
			},
		],
	},
	{
		path: '/transaction',
		children: [
			{
				component: React.lazy(() => import('./pages/transaction')),
				exact: true,
				guard: true,
				name: 'Transaction Page',
				path: '/',
			},
			{
				component: React.lazy(() => import('./pages/transaction/add')),
				exact: true,
				guard: true,
				name: 'Add Transaction Page',
				path: '/add',
			},
			{
				component: React.lazy(() =>
					import('./pages/transaction/detail')
				),
				exact: true,
				guard: true,
				name: 'Detail Transaction Page',
				path: '/:id/detail',
			},
		],
	},
	{
		path: '/branch',
		children: [
			{
				component: React.lazy(() => import('./pages/branch/')),
				exact: true,
				guard: true,
				name: 'Cabang Page',
				path: '/',
			},
			{
				component: React.lazy(() => import('./pages/branch/detail')),
				exact: true,
				guard: true,
				name: 'Detail Cabang Page',
				path: '/:id/detail',
			},
			{
				component: React.lazy(() => import('./pages/branch/modify')),
				exact: true,
				guard: true,
				name: 'Edit Cabang Page',
				path: '/:id/edit',
			},
			{
				component: React.lazy(() => import('./pages/branch/modify')),
				exact: true,
				guard: true,
				name: 'Add Cabang Page',
				path: '/add',
			},
		],
	},
	{
		path: '/feed',
		children: [
			{
				component: React.lazy(() => import('./pages/feed/')),
				exact: true,
				guard: true,
				name: 'Feed Page',
				path: '/',
			},
			{
				component: React.lazy(() => import('./pages/feed/detail')),
				exact: true,
				guard: true,
				name: 'Detail Feed Page',
				path: '/:id/detail',
			},
			{
				component: React.lazy(() => import('./pages/feed/modify')),
				exact: true,
				guard: true,
				name: 'Edit Feed Page',
				path: '/:id/edit',
			},
			{
				component: React.lazy(() => import('./pages/feed/modify')),
				exact: true,
				guard: true,
				name: 'Add Feed Page',
				path: '/add',
			},
		],
	},
];

export default routes;
