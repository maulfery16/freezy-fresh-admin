/* eslint-disable react/display-name */
import React, { useRef } from 'react';
import ReactMoment from 'react-moment';
import { Link } from 'react-router-dom';
import { Space } from 'antd';
import { EditFilled, EyeFilled } from '@ant-design/icons';

import AtomGenderDatatableFilter from '../../../components/atoms/selection/gender-datatable';
import AtomImage from '../../../components/atoms/image';
import AtomStatusSwitch from '../../../components/atoms/datatable/status-switch';
import MoleculeDatatableAdditionalAction from '../../../components/molecules/datatable/additional-actions';
import MoleculeDatatableDateRange from '../../../components/molecules/datatable/date-range-plugin';
import MoleculeDeleteConfirm from '../../../components/molecules/delete-confirm';
import OrganismDatatable from '../../../components/organisms/datatable';
import OrganismLayout from '../../../components/organisms/layout';

import { translateGenderEnum } from '../../../utils/helpers';

const CustomerPage = () => {
	const column = [
		{
			align: 'center',
			title: 'No',
			dataIndex: 'id',
			render: (id, _, index) => index + 1,
		},
		{
			title: 'Kode Pelanggan',
			dataIndex: 'code',
			render: (_, record) => record.code || '-',
			sorter: true,
		},
		{
			title: 'Nama Depan',
			dataIndex: `first_name`,
			render: (_, record) => `${record.first_name || '-'}`,
			sorter: true,
		},
		{
			title: 'Nama Belakang',
			dataIndex: `last_name`,
			render: (_, record) => `${record.last_name || ''}`,
			sorter: true,
		},
		{
			align: 'center',
			title: 'Foto Profile',
			dataIndex: `social_avatar`,
			render: (_, record) => <AtomImage src={record.social_avatar} />,
			csvRender: (item) => item.social_avatar,
		},
		{
			title: 'Tgl. Lahir',
			dataIndex: `birth`,
			render: (date) =>
				date ? (
					<ReactMoment format="DD/MM/YY">{date}</ReactMoment>
				) : (
					'-'
				),
			csvRender: (item) => (item.birth ? item.birth : '-'),
			sorter: true,
		},
		{
			title: 'Jenis Kelamin',
			dataIndex: `gender`,
			render: (_, record) => translateGenderEnum(record.gender || ''),
			sorter: true,
		},
		{
			title: 'Status Perkawinan',
			dataIndex: 'marital_status',
			render: (_, record) => record.marital_status || '-',
			sorter: true,
		},
		{
			title: 'Frekuensi Belanja (per bulan)',
			dataIndex: `frequency_groceries_one_month`,
			render: (_, record) => record.frequency_groceries_one_month || 0,
			sorter: true,
			csvRender: (item) => item.frequency_groceries_one_month || 0,
		},
		{
			title: 'Email',
			dataIndex: `email`,
			render: (_, record) => record.email || '-',
			sorter: true,
		},
		{
			title: 'No. Hp',
			dataIndex: `phone_number`,
			render: (_, record) => record.phone_number || '-',
			sorter: true,
		},
		{
			align: 'center',
			title: 'Foto KTP',
			dataIndex: `id_card_image`,
			render: (_, record) => <AtomImage src={record.id_card_image} />,
			csvRender: (item) => item.id_card_image,
		},
		{
			align: 'center',
			title: 'Aktif',
			dataIndex: 'is_active',
			render: (active, record) => (
				<AtomStatusSwitch
					active={active}
					id={record.id}
					tableRef={customerTableRef}
					url="admin/customers"
				/>
			),
			csvRender: (item) => (item.is_active ? 'Aktif' : 'Tidak Aktif'),
		},
		{
			align: 'center',
			title: 'Aksi',
			dataIndex: 'id',
			render: (id, record) => (
				<Space size="middle">
					<Link to={`/customer/${id}/detail`}>
						<EyeFilled className="f4 blue" />
					</Link>

					<Link to={`/view/customer/${id}/edit`}>
						<EditFilled className="f4 orange" />
					</Link>

					{!record.is_active && (
						<MoleculeDeleteConfirm
							id={id}
							label="Pelanggan"
							tableRef={customerTableRef}
							url="cutomers"
						/>
					)}
				</Space>
			),
			skipExport: true,
		},
	];
	const customerTableRef = useRef();

	const renderDatatableFilters = () => {
		return [
			<AtomGenderDatatableFilter key="gender-filter" />,
			<MoleculeDatatableDateRange
				name="birth"
				operator=":"
				identifier="daterangefilter"
				key="daterange"
				label="Tanggal Lahir"
				placeholder="Filter tanggal lahir"
			/>,
		];
	};

	const renderAdditionalAction = () => {
		return (
			<MoleculeDatatableAdditionalAction
				column={column}
				label="Pelanggan"
				getLimit={() => customerTableRef.current.totalData}
				route="/customer"
				url="admin/customers"
			/>
		);
	};

	return (
		<OrganismLayout
			breadcumbs={[{ name: 'Pelanggan', link: location.pathname }]}
			title="Pelanggan Page"
		>
			<OrganismDatatable
				additionalAction={renderAdditionalAction()}
				columns={column}
				dataSourceURL={`admin/customers`}
				filters={renderDatatableFilters()}
				ref={customerTableRef}
				scroll={1920}
				searchInput={true}
				title={`Pelanggan`}
			/>
		</OrganismLayout>
	);
};

export default CustomerPage;
