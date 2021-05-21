/* eslint-disable react/display-name */
import moment from 'moment';
import React, { useEffect, useRef, useState } from 'react';
import ReactMoment from 'react-moment';
import { Col, Form, message, Modal, Row, Space } from 'antd';
import { EyeFilled } from '@ant-design/icons';
import { Link } from 'react-router-dom';

import AtomBranchDatatableFilter from '../../components/atoms/selection/branch-datatable';
import AtomNumberFormat from '../../components/atoms/number-format';
import AtomPrimaryButton from '../../components/atoms/button/primary-button';
import AtomSecondaryButton from '../../components/atoms/button/secondary-button';
import MoleculeDatatableAdditionalAction from '../../components/molecules/datatable/additional-actions';
import MoleculeDatatableDateRange from '../../components/molecules/datatable/date-range-plugin';
import MoleculeDatatableFilter from '../../components/molecules/datatable/filter-plugin';
import MoleculeSelectInputGroup from '../../components/molecules/input-group/select-input';
import OrganismDatatable from '../../components/organisms/datatable';
import OrganismLayout from '../../components/organisms/layout';

import OrderService from '../../services/order';

const OrderPage = () => {
	const [pickedProductOwner, setPickedProductOwner] = useState(null);
	const [productOwners, setProductOwners] = useState([]);
	const orderService = new OrderService();
	const orderTableRef = useRef();
	const baseColumn = [
		{
			title: 'No',
			dataIndex: 'id',
			render: (id, _, index) => index + 1,
			skipExport: true,
		},
		{
			title: 'ID Pesanan',
			dataIndex: 'id',
			sorter: true,
		},
		{
			title: 'Cabang Freezy (ID)',
			dataIndex: 'branch',
			render: (branch) => branch.id,
			csvRender: (item) => item.branch.id,
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
			dataIndex: `customer_info`,
			sorter: true,
		},
		{
			title: 'Nama Penerima',
			dataIndex: `delivery_info`,
			sorter: true,
		},
		{
			title: 'Jumlah Produk',
			dataIndex: 'total_product',
			sorter: true,
		},
		{
			title: 'Total Bayar',
			dataIndex: 'sub_total',
			sorter: true,
			render: (total) => <AtomNumberFormat prefix="Rp. " value={total} />,
			csvRender: (item) => (
				<AtomNumberFormat prefix="Rp. " value={item.sub_total} />
			),
		},
		{
			title: 'No Resi Pengiriman',
			dataIndex: 'code',
			sorter: true,
		},
		{
			title: 'Tipe Pengiriman',
			dataIndex: 'delivery_info',
			sorter: true,
		},
		{
			title: 'Click 2 Receive (Hour)',
			dataIndex: 'click_2_receive_hours',
			sorter: true,
			csvRender: (item) =>
				`${moment(item.created_at).format('HH')} jam ${moment(
					item.created_at
				).format('mm')} menit`,
			render: (date) => (
				<>
					<ReactMoment format="HH">{date}</ReactMoment> jam{' '}
					<ReactMoment format="mm">{date}</ReactMoment> menit
				</>
			),
		},
		{
			title: 'Tipe Pembayaran',
			dataIndex: 'payment_method',
			sorter: true,
			render: (status) => orderService.transaltePaymentEnum(status),
			csvRender: (item) =>
				orderService.transaltePaymentEnum(item.admin_status),
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
			dataIndex: 'admin_status',
			sorter: status,
			render: (status) => orderService.translateOrderEnum(status),
			csvRender: (item) =>
				orderService.translateOrderEnum(item.admin_status),
		},
	];
	const [isChangeStatusModalVisible, setIsChangeStatusModalVisible] =
		useState(false);

	const changeStatus = async (values) => {
		try {
			let request = [];

			for (const [key, value] of Object.entries(values)) {
				if (key) {
					request.push(
						await orderService.updateOrderStatus(
							pickedProductOwner.id,
							{
								product_owner_id: key,
								status: value,
							}
						)
					);
				}
			}

			await Promise.all(request);
			message.success('Berhasil memperbaharui status');
			orderTableRef.current.refetchData();
		} catch (error) {
			message.error(error.message);
		}
	};

	const getProductOwners = async () => {
		try {
			const response = await orderService.getOrders();
			setProductOwners(response.data[0].status);
		} catch (error) {
			message.error(error.message);
		}
	};

	const openChangeStatusModal = (index) => {
		setPickedProductOwner({ ...orderTableRef.current.data[index] });
		setIsChangeStatusModalVisible(true);
	};

	const renderAdditionalAction = () => {
		return (
			<MoleculeDatatableAdditionalAction
				column={column}
				exportUrl="https://api.freezyfresh.abcwork.id/storage/exports/orders/order.xlsx"
				getLimit={() => orderTableRef.current.totalData}
				label="Pesanan"
				route="/order"
				url="orders"
			/>
		);
	};

	const renderDatatableFilters = () => {
		const filters = [
			<MoleculeDatatableDateRange
				name="created_at"
				operator=":"
				identifier="daterangefilter"
				key="daterange"
				label="Tanggal Pemesanan"
				placeholder="Filter tanggal pemesanan"
			/>,
			<AtomBranchDatatableFilter
				key="branch-filter"
				label="Cabang Freezy (ID)"
			/>,
			<MoleculeDatatableFilter
				name="delivery-type"
				operator=":"
				identifier="delivery-type-filter"
				label="Tipe Pengiriman"
				key="delivery-type-filter"
				placeholder="Semua Tipe Pengiriman"
				data={{
					url: 'develivery/types',
					generateCustomOption: (item) => ({
						value: item.value,
						label: item.name.id,
					}),
				}}
			/>,
			<MoleculeDatatableFilter
				name="payment-type"
				operator=":"
				identifier="payment-type-filter"
				label="Tipe Pembayaran"
				key="payment-type-filter"
				placeholder="Semua Tipe Pembayaran"
				data={{
					options: [
						{
							label: 'Freezy Cash',
							value: 'FREEZY_CASH',
						},
						{
							label: 'Freezy Point',
							value: 'FREEZY_POINT',
						},
					],
				}}
			/>,
			<MoleculeDatatableFilter
				name="bank"
				operator=":"
				identifier="bank-filter"
				label="Nama Bank"
				key="bank-filter"
				placeholder="Semua Bank"
				data={{
					url: 'banks',
				}}
			/>,
			<MoleculeDatatableFilter
				name="admin_status"
				operator=":"
				identifier="admn-stts-flter"
				label="Status Pesanan Pelanggan"
				key="admin-stts-filter"
				placeholder="Semua status pesanan"
				data={{
					url: `orders/parameter/status`,
					generateCustomOption: (item) => ({
						label: orderService.translateOrderEnum(item.value),
						value: item.value,
					}),
				}}
			/>,
		];

		return [
			...filters,
			...productOwners.map((owner) => (
				<MoleculeDatatableFilter
					name={`${owner.product_owner_id}`}
					operator=":"
					identifier={`${owner.product_owner_id}-fiter`}
					label={`Status Pesanan ${owner.product_owner_name}`}
					key={owner.product_owner_id}
					placeholder="Semua status pesanan"
					data={{
						url: `orders/parameter/status`,
						generateCustomOption: (item) => ({
							label: orderService.translateOrderEnum(item.value),
							value: item.value,
						}),
					}}
				/>
			)),
			<MoleculeDatatableFilter
				name="customer"
				operator=":"
				identifier="customer-filter"
				label="Nama Pelanggan"
				key="customer"
				placeholder="Semua nama pelanggan"
				data={{
					url: 'admin/customers',
					generateCustomOption: (item) => ({
						value: item.id,
						label: `${item.first_name} ${item.last_name}`,
					}),
				}}
			/>,
		];
	};

	const setChangeStatusInitialValues = () => {
		let initialValues = {};

		productOwners.forEach((owner) => {
			initialValues[`${owner?.product_owner_id}`] =
				pickedProductOwner[`${owner?.product_owner_id}`];
		});

		return initialValues;
	};

	const updateOrderStatus = async (id, orderStatus) => {
		try {
			await orderService.updateOrderStatus(id, orderStatus);
			message.success('Berhasil memperbaharui status order');
			orderTableRef.current.refetchData();
		} catch (error) {
			message.error(error.message);
		}
	};

	useEffect(() => {
		(async () => {
			await getProductOwners();
		})();
	}, []);

	const column = [
		...baseColumn,
		...productOwners.map((owner, index) => ({
			title: `Status Pesanan ${owner.product_owner_name || ''}`,
			dataIndex: `status`,
			sorter: true,
			render: (_, record) =>
				orderService.translateOrderEnum(record.status[index].status),
			csvRender: (item) =>
				orderService.translateOrderEnum(item.status[index].status),
		})),
		...productOwners.map((owner, index) => ({
			align: 'center',
			title: `Pesanan ${owner.product_owner_name || ''}`,
			dataIndex: `status`,
			skipExport: true,
			render: (_, record) =>
				record.status[index].status && (
					<AtomSecondaryButton
						onClick={() => updateOrderStatus(record.id, owner)}
					>
						{orderService.translateOrderEnum(
							record.status[index].status
						)}
					</AtomSecondaryButton>
				),
		})),
		{
			align: 'center',
			title: 'Aksi',
			dataIndex: 'id',
			render: (id, _, index) => (
				<Space size="middle">
					<Link to={`/order/${id}/detail`}>
						<EyeFilled className="f4 blue" />
					</Link>

					<AtomPrimaryButton
						onClick={() => openChangeStatusModal(index)}
					>
						Ubah Status
					</AtomPrimaryButton>
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
				dataSourceURL={`orders`}
				filters={renderDatatableFilters()}
				filterModalWidth={720}
				limit={15}
				ref={orderTableRef}
				scroll={2880 + productOwners.length * 500}
				searchInput={true}
				title={`Pesanan`}
			/>

			{isChangeStatusModalVisible && (
				<Modal
					footer={null}
					title="Ubah Status"
					visible={true}
					width={720}
					onCancel={() => setIsChangeStatusModalVisible(false)}
				>
					<Form
						className="w-100 mt4"
						name="modify_admin"
						onFinish={changeStatus}
						initialValues={setChangeStatusInitialValues()}
						onFinishFailed={(error) => {
							message.error(`Failed: ${error}`);
							console.error(error);
						}}
					>
						<Space className="w-100" direction="vertical">
							<Row gutter={[12, 16]}>
								{productOwners.map((owner, index) => {
									return (
										<Col
											key={`chge-stts-owner-${index}`}
											span={12}
										>
											<MoleculeSelectInputGroup
												label={`${
													owner?.product_owner_name ||
													''
												} status`}
												name={`${owner?.product_owner_id}`}
												placeholder={`${
													owner?.product_owner_name ||
													''
												} status`}
												required
												data={{
													url: `orders/parameter/status`,
													generateCustomOption: (
														item
													) => ({
														label: orderService.translateOrderEnum(
															item.value
														),
														value: item.value,
													}),
												}}
											/>
										</Col>
									);
								})}
							</Row>
						</Space>

						<Row className="mt4" justify="center">
							<AtomPrimaryButton
								className="br3 w-50"
								size="large"
								htmlType="submit"
							>
								Ubah
							</AtomPrimaryButton>
						</Row>
					</Form>
				</Modal>
			)}
		</OrganismLayout>
	);
};

export default OrderPage;
