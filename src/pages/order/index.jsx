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
import OrganismDatatable from '../../components/organisms/datatable';
import OrganismLayout from '../../components/organisms/layout';

import MasterService from '../../services/master';
import OrderService from '../../services/order';
import MoleculeSelectInputGroup from '../../components/molecules/input-group/select-input';

const OrderPage = () => {
	const [pickedProductOwner, setPickedProductOwner] = useState(null);
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
	const [
		isChangeStatusModalVisible,
		setIsChangeStatusModalVisible,
	] = useState(false);

	const changeStatus = () => {};

	const getProductOwners = async () => {
		try {
			const { data } = await masterService.getOptions('product-owners');
			setProductOwners(data);
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
			<AtomBranchDatatableFilter key="branch-filter" />,
			<MoleculeDatatableFilter
				name="delivery-type"
				operator=":"
				identifier="delivery-type-filter"
				label="Tipe Pengiriman"
				key="delivery-type-filter"
				placeholder="Semua Tipe Pengiriman"
				data={{
					// url: 'delivery-types',
					options: [
						{
							label: 'Marukana.. Udon?',
							value: 'Marukana.. Udon?',
						},
					],
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
					// url: 'delivery-types',
					options: [
						{
							label: 'Marukana.. Udon?',
							value: 'Marukana.. Udon?',
						},
					],
				}}
			/>,
			<MoleculeDatatableFilter
				name="bank"
				operator=":"
				identifier="bank-filter"
				label="Bank"
				key="bank-filter"
				placeholder="Semua Bank"
				data={{
					url: 'banks',
				}}
			/>,
			<MoleculeDatatableFilter
				name="customer"
				operator=":"
				identifier="customer-filter"
				label="Nama Pelanggan"
				key="customer"
				placeholder="Semua nama pelanggan"
				data={{
					// url: 'customers',
					options: [
						{
							label: 'Marukana.. Udon?',
							value: 'Marukana.. Udon?',
						},
					],
				}}
			/>,
		];

		return [
			...filters,
			...productOwners.map((owner) => (
				<MoleculeDatatableFilter
					name={`${owner.name.toLowerCase()}-order-status`}
					operator=":"
					identifier={`${owner.name.toLowerCase()}-order-status-fiter`}
					label={`Status Pesanan ${owner.name}`}
					key={owner.name}
					placeholder="Semua status pesanan"
					data={{
						// url: 'customers',
						options: [
							{
								label: 'Marukana.. Udon?',
								value: 'Marukana.. Udon?',
							},
						],
					}}
				/>
			)),
		];
	};

	const setChangeStatusInitialValues = () => {
		let initialValues = {};

		productOwners.forEach((owner) => {
			initialValues[`${owner.name?.toLowerCase()}_order_status`] =
				pickedProductOwner[`${owner.name?.toLowerCase()}_order_status`];
		});

		return initialValues;
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
												label={`${owner.name} status`}
												name={`${owner.name?.toLowerCase()}_order_status`}
												placeholder={`${owner.name} status`}
												required
												data={{
													options: [
														{
															label:
																'Marukana.. Udon?',
															value:
																'Marukana.. Udon?',
														},
													],
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
