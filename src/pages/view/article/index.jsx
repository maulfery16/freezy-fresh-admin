/* eslint-disable react/display-name */
import { Image, message, Space } from 'antd';
import { EditFilled, EyeFilled, CheckOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';

import moment from 'moment';
import React, { useRef } from 'react';
import ReactMoment from 'react-moment';

import AtomColorInfoGroup from '../../../components/atoms/color-info-group';
import AtomPrimaryButton from '../../../components/atoms/button/primary-button';
import AtomSecondaryButton from '../../../components/atoms/button/secondary-button';
import AtomStatusSwitch from '../../../components/atoms/datatable/status-switch';
import MoleculeDatatableAdditionalAction from '../../../components/molecules/datatable/additional-actions';
import MoleculeDatatableDateRange from '../../../components/molecules/datatable/date-range-plugin';
import MoleculeDatatableFilter from '../../../components/molecules/datatable/filter-plugin';
import MoleculeDeleteConfirm from '../../../components/molecules/delete-confirm';
import OrganismDatatable from '../../../components/organisms/datatable';
import OrganismLayout from '../../../components/organisms/layout';

import ArticleService from '../../../services/article';
const articleService = new ArticleService();

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
			align: 'center',
			title: 'Foto Artikel Mobile',
			dataIndex: 'mobile_image',
			render: (image) => (
				<Image preview src={image} height={60} width={70} />
			),
			csvRender: (item) => item.mobile_image,
		},
		{
			align: 'center',
			title: 'Foto Artikel Dekstop',
			dataIndex: 'dekstop_image',
			render: (image) => (
				<Image preview src={image} height={60} width={70} />
			),
			csvRender: (item) => item.dekstop_image,
		},
		{
			title: 'Kategori Artikel',
			dataIndex: `article_categories['id']`,
			sorter: true,
			render: (_, record) => {
				return Array.isArray(record.article_categories) ? null : (
					<AtomColorInfoGroup
						hexa={record.article_categories.hexa_code}
						label={`
						${record.article_categories.name.id} / ${record.article_categories.name.en}
					`}
					/>
				);
			},
			width: 250,
		},
		{
			title: 'Dibuat Oleh',
			dataIndex: 'created_by',
			sorter: true,
		},
		{
			title: 'Tgl. Dibuat',
			dataIndex: 'created_at',
			sorter: true,
			render: (date) => (
				<ReactMoment format="DD/MM/YY">{date}</ReactMoment>
			),
			csvRender: (item) =>
				moment(new Date(item.date)).format('DD-MM-YYYY'),
		},
		{
			align: 'center',
			title: 'Set as Prirmary',
			dataIndex: `is_primary`,
			render: (is_primary, record) => {
				const PrimaryButton = is_primary
					? AtomPrimaryButton
					: AtomSecondaryButton;

				return (
					<PrimaryButton
						disabled={is_primary}
						onClick={() => setAsPrimary(record.id)}
						shape="circle"
					>
						<CheckOutlined />
					</PrimaryButton>
				);
			},
			skipExport: true,
		},
		{
			align: 'center',
			title: 'Aktif',
			dataIndex: 'is_active',
			render: (active, record) => (
				<AtomStatusSwitch
					active={active}
					id={record.id}
					tableRef={articleTableRef}
					url="banners"
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
					<Link to={`/view/article/${id}/detail`}>
						<EyeFilled className="f4 blue" />
					</Link>

					<Link to={`/view/article/${id}/edit`}>
						<EditFilled className="f4 orange" />
					</Link>

					{!record.is_active && (
						<MoleculeDeleteConfirm
							id={id}
							label="Artikel"
							tableRef={articleTableRef}
							url="articles"
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
				label="Artikel"
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
				operator=":"
				identifier="category-filter"
				label="Kategori Artikel"
				key="category-filter"
				placeholder="Semua kategori"
				data={{
					url: 'article-categories',
					generateCustomOption: (item) => ({
						value: item.id,
						label: `${item.name.id} / ${item.name.en}`,
					}),
				}}
			/>,
			<MoleculeDatatableDateRange
				name="created_at"
				operator=":"
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
			breadcumbs={[
				{ name: 'Tampilan', link: location.pathname },
				{ name: 'Artikel', link: '/view/article' },
			]}
			title="Article Page"
		>
			<OrganismDatatable
				additionalAction={renderAdditionalAction()}
				columns={column}
				dataSourceURL={`articles`}
				filters={renderDatatableFilters()}
				ref={articleTableRef}
				scroll={1360}
				searchInput={true}
				title={`Artikel`}
			/>
		</OrganismLayout>
	);
};

export default ArticlePage;
