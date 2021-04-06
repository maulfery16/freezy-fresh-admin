/* eslint-disable react/display-name */
import moment from 'moment';
import React, { useEffect, useRef, useState } from 'react';
import ReactMoment from 'react-moment';
import { message, Space } from 'antd';
import { EyeFilled } from '@ant-design/icons';
import { Link } from 'react-router-dom';

import AtomBaseCategoriesDatatableFilter from '../../components/atoms/selection/base-categories-datatable';
import AtomBranchDatatableFilter from '../../components/atoms/selection/branch-datatable';
import AtomNumberFormat from '../../components/atoms/number-format';
import AtomSecondaryButton from '../../components/atoms/button/secondary-button';
import MoleculeDatatableAdditionalAction from '../../components/molecules/datatable/additional-actions';
import MoleculeDatatableFilter from '../../components/molecules/datatable/filter-plugin';
import OrganismDatatable from '../../components/organisms/datatable';
import OrganismLayout from '../../components/organisms/layout';

import MasterService from '../../services/master';
import OrderService from '../../services/order';
import AtomPrimaryButton from '../../components/atoms/button/primary-button';

const OrderPage = () => {
	const [productOwners, setProductOwners] = useState([]);
	const masterService = new MasterService();
	const orderService = new OrderService();
	const orderTableRef = useRef();
	const baseColumn = [
		{
			title: 'No',
			dataIndex: 'id',
			render: (id, _, index) => index + 1,
		},
		{
			title: 'ID Pesanan',
			dataIndex: 'order_id',
			sorter: true,
		},
		{
			title: 'Cabang Freezy (ID)',
			dataIndex: 'branch',
			render: (_, record) =>
				record.branch.map((branch) => branch.id).join(', '),
			sorter: true,
		},
		{
			title: 'Tanggal Pemesanan',
			dataIndex: 'created_at',
			sorter: true,
			csvRender: (item) => moment(item.created_at).format('DD/MM/YYYY'),
			render: (date) => (
				<ReactMoment format="DD/MM/YY">{date}</ReactMoment>
			),
		},
		{
			title: 'Nama Pelanggan',
			dataIndex: `customer_name`,
			sorter: true,
		},
		{
			title: 'Nama Penerima',
			dataIndex: `receiver_name`,
			sorter: true,
		},
		{
			title: 'Jumlah Produk',
			dataIndex: 'product_count',
			sorter: true,
		},
		{
			title: 'Total Bayar',
			dataIndex: 'total_fee',
			sorter: true,
			render: (total) => <AtomNumberFormat prefix="Rp. " value={total} />,
		},
		{
			title: 'No Resi Pengiriman',
			dataIndex: 'receipt_number',
			sorter: true,
		},
		{
			title: 'Tipe Pengiriman',
			dataIndex: 'delivery_type',
			sorter: true,
		},
		{
			title: 'Click 2 Receive (Hour)',
			dataIndex: 'click_2_receive',
			sorter: true,
		},
		{
			title: 'Tipe Pembayaran',
			dataIndex: 'payment_type',
			sorter: true,
		},
		{
			title: 'Nama Bank',
			dataIndex: 'bank',
			sorter: true,
		},
		{
			title: 'Frekuensi Pesanan',
			dataIndex: 'order_frequency',
			sorter: true,
		},
		{
			title: 'Status Pesanan Pelanggan',
			dataIndex: 'customer_order_status',
			sorter: true,
		},
	];

	const getProductOwners = async () => {
		try {
			const { data } = await masterService.getOptions('product-owners');
			setProductOwners(data);
		} catch (error) {
			message.error(error.message);
		}
	};

	const renderAdditionalAction = () => {
		return (
			<MoleculeDatatableAdditionalAction
				column={column}
				getLimit={() => orderTableRef.current.totalData}
				label="Pesanan"
				route="/order"
				url="orders"
			/>
		);
	};

	const renderDatatableFilters = () => {
		return [
			<AtomBaseCategoriesDatatableFilter key="base-categories-filter" />,
			<MoleculeDatatableFilter
				name="additional-categories"
				operator=":"
				identifier="additional-categories-filter"
				label="Kategori Dasar"
				key="additional-categories-filter"
				placeholder="Semua Kategori Tambahan"
				data={{
					url: 'additional-categories',
					generateCustomOption: (item) => ({
						value: item.id,
						label: item.name.id,
					}),
				}}
			/>,
			<MoleculeDatatableFilter
				name="product-owner"
				operator=":"
				identifier="product-owner-filter"
				label="Perusahaan"
				key="product-owner-filter"
				placeholder="Semua Perusahaan"
				data={{
					url: 'product-owners',
				}}
			/>,
			<AtomBranchDatatableFilter key="branch-filter" />,
			<MoleculeDatatableFilter
				name="brand"
				operator=":"
				identifier="brand-filter"
				label="Brand"
				key="brand-filter"
				placeholder="Semua brand"
				data={{
					url: 'brands',
					generateCustomOption: (item) => ({
						value: item.id,
						label: item.name.id,
					}),
				}}
			/>,
			<MoleculeDatatableFilter
				name="freezy-pick"
				operator=":"
				identifier="freezy-pick-filter"
				label="Freezy Pick"
				key="freezy-pick-filter"
				placeholder="Semua freezy pick"
				data={{
					options: [
						{ id: true, label: 'Ya' },
						{ id: false, label: 'Tidak' },
					],
				}}
			/>,
		];
	};

	useEffect(() => {
		(async () => {
			await getProductOwners();
		})();
	}, []);

	const column = [
		...baseColumn,
		...productOwners.map((owner) => ({
			title: `Status Pesanan ${owner.name}`,
			dataIndex: `${owner.name?.toLowerCase()}_order_status`,
			sorter: true,
		})),
		...productOwners.map((owner) => ({
			align: 'center',
			title: `Pesanan ${owner.name}`,
			dataIndex: `${owner.name?.toLowerCase()}_order_status`,
			render: (status) => (
				<AtomSecondaryButton>
					{orderService.translateOrderEnum(status)}
				</AtomSecondaryButton>
			),
		})),
		{
			align: 'center',
			title: 'Aksi',
			dataIndex: 'id',
			render: (id) => (
				<Space size="middle">
					<Link to={`/order/${id}/detail`}>
						<EyeFilled className="f4 blue" />
					</Link>

					<AtomPrimaryButton>Ubah Status</AtomPrimaryButton>
				</Space>
			),
			skipExport: true,
		},
	];

	return (
		<OrganismLayout
			breadcumbs={[{ name: 'Pesanan', link: location.pathname }]}
			title="Order Page"
		>
			<OrganismDatatable
				additionalAction={renderAdditionalAction()}
				columns={column}
				dataSourceURL={`products`}
				filters={renderDatatableFilters()}
				limit={15}
				ref={orderTableRef}
				scroll={2880 + productOwners.length * 500}
				searchInput={true}
				title={`Pesanan`}
			/>
		</OrganismLayout>
	);
};

export default OrderPage;
