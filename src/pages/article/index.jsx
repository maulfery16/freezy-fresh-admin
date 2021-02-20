/* eslint-disable react/display-name */
import { Button, Image, message, Space } from 'antd';
import { EditFilled, EyeFilled, CheckOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';

import React, { useRef } from 'react';
import ReactMoment from 'react-moment';

import AtomColorInfoGroup from '../../components/atoms/color-info-group';
import MoleculeDatatableAdditionalAction from '../../components/molecules/datatable/additional-actions';
import MoleculeDatatableDateRange from '../../components/molecules/datatable/date-range-plugin';
import MoleculeDatatableFilter from '../../components/molecules/datatable/filter-plugin';
import MoleculeDeleteConfirm from '../../components/molecules/delete-confirm';
import OrganismDatatable from '../../components/organisms/datatable';
import OrganismLayout from '../../components/organisms/layout';

import ArticleService from '../../services/article';
const articleService = new ArticleService();

const mock = {
	data: [
		{
			id: 1,
			title: {
				id: 'Indonesian title',
				en: 'English title',
			},
			category: {
				color: {
					hex_code: '#000000',
					name: 'Black',
				},
				name: 'Kategori 1',
			},
			created_at: new Date(),
			created_by: 'Boramiyu',
			dekstop_image: '',
			mobile_image: '',
		},
	],
	meta: {
		pagination: { totalData: 1 },
	},
};

const ArticlePage = () => {
	const column = [
		{
			title: 'No',
			dataIndex: 'id',
			render: (id, _, index) => index + 1,
		},

		{
			title: 'Judul Artikel (ID)',
			dataIndex: `title['id']`,
			render: (_, record) => record.title.id,
		},
		{
			title: 'Judul Artikel (EN)',
			dataIndex: `title['en']`,
			render: (_, record) => record.title.en,
		},
		{
			title: 'Foto Artikel Mobile',
			dataIndex: 'mobile_image',
			render: (image) => (
				<Image preview src={image} height={60} width={70} />
			),
			csvRender: (item) => item.mobile_image,
		},
		{
			title: 'Foto Artikel Dekstop',
			dataIndex: 'dekstop_image',
			render: (image) => (
				<Image preview src={image} height={60} width={70} />
			),
			csvRender: (item) => item.dekstop_image,
		},
		{
			title: 'Kategori Artikel',
			dataIndex: 'category',
			render: (_, record) => (
				<AtomColorInfoGroup
					hexa={record.category.color.hexa_code}
					label={record.category.name}
				/>
			),
		},
		{
			title: 'Dibuat Oleh',
			dataIndex: 'created_by',
		},
		{
			title: 'Tgl. Dibuat',
			dataIndex: 'created_at',
			render: (date) => (
				<ReactMoment format="DD/MM/YY">{date}</ReactMoment>
			),
		},
		{
			align: 'center',
			title: 'Set as Prirmary',
			dataIndex: `is_primary`,
			render: (is_primary, record) => (
				<Button
					className={`${
						is_primary ? 'bg-denim white' : 'denim b--denim'
					}`}
					disabled={is_primary}
					onClick={() => setAsPrimary(record.id)}
					shape="circle"
				>
					<CheckOutlined />
				</Button>
			),
			skipExport: true,
		},
		{
			title: 'Aksi',
			dataIndex: 'id',
			render: (id, record) => (
				<Space size="middle">
					<Link to={`/view/article/${id}/detail`}>
						<EyeFilled className="f4 blue" />
					</Link>

					<Link to={`/brand/${id}/edit`}>
						<EditFilled className="f4 orange" />
					</Link>

					{!record.is_active && (
						<MoleculeDeleteConfirm
							id={id}
							label="Kategori Dasar"
							tableRef={articleTableRef}
							url="base_categories"
						/>
					)}
				</Space>
			),
			skipExport: true,
		},
	];
	const articleTableRef = useRef();

	const renderAdditionalAction = () => {
		return (
			<MoleculeDatatableAdditionalAction
				column={column}
				label="Kategori Dasar"
				getLimit={() => articleTableRef.current.totalData}
				route="/view/article"
				url="articles"
			/>
		);
	};

	const renderDatatableFilters = () => {
		return [
			<MoleculeDatatableFilter
				name="category"
				operator="eq"
				identifier="category-filter"
				label="Kategori"
				key="category-filter"
				placeholder="Semua kategori"
				data={{
					url: '/cateory',
					mock: [
						{
							label: 'Bandung',
							value: 'Bandung',
						},
						{
							label: 'Garut',
							value: 'Garut',
						},
					],
				}}
			/>,
			<MoleculeDatatableDateRange
				name="created_at"
				operator="eq"
				identifier="daterangefilter"
				key="daterange"
				label="Tanggal Dibuat"
				placeholder="Filter tanggal register"
			/>,
		];
	};

	const setAsPrimary = async (id) => {
		try {
			await articleService.setArticleAsPrimary(id);
			message.success('Berhasil mengatur artikel menjadi artikel utama');
		} catch (error) {
			console.error(error.message);
			message.error(error.message);
		}
	};

	return (
		<OrganismLayout
			breadcumbs={[{ name: 'Artikel', link: '/view/article' }]}
			title="Article Page"
		>
			<OrganismDatatable
				additionalAction={renderAdditionalAction()}
				columns={column}
				dataSourceURL={`articles`}
				filters={renderDatatableFilters()}
				ref={articleTableRef}
				mock={mock}
				scroll={1360}
				searchInput={true}
				title={`Artikel`}
			/>
		</OrganismLayout>
	);
};

export default ArticlePage;
