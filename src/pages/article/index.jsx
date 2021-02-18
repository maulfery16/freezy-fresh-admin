/* eslint-disable react/display-name */
import React, { useRef } from 'react';
import ReactMoment from 'react-moment';
import { Link } from 'react-router-dom';
import { Image, Space } from 'antd';
import { EditFilled, EyeFilled } from '@ant-design/icons';

import OrganismDatatable from '../../components/organisms/datatable';
import OrganismLayout from '../../components/organisms/layout';

import ArticleService from '../../services/article';
import MoleculeDatatableAdditionalAction from '../../components/molecules/datatable/additional-actions';
import MoleculeDatatableDateRange from '../../components/molecules/datatable/date-range-plugin';
import MoleculeDatatableFilter from '../../components/molecules/datatable/filter-plugin';
import MoleculeDeleteConfirm from '../../components/molecules/delete-confirm';
const articleService = new ArticleService();

const ArticlePage = () => {
	const column = [
		{
			title: 'No',
			dataIndex: 'id',
			render: (id, _, index) => index + 1,
		},
		{
			title: 'Judul Artikel',
			dataIndex: 'title',
		},
		{
			title: 'Foto Artikel',
			dataIndex: 'image',
			render: (image) => (
				<Image preview src={image} height={60} width={70} />
			),
		},
		{
			title: 'Kategori Artikel',
			dataIndex: 'category',
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
			title: 'Aksi',
			dataIndex: 'id',
			render: (id) => (
				<Space size="middle">
					<Link to={`/view/article/${id}/detail`}>
						<EyeFilled className="f4 blue" />
					</Link>

					<Link to={`/brand/${id}/edit`}>
						<EditFilled className="f4 orange" />
					</Link>

					<MoleculeDeleteConfirm
						deleteService={() => articleService.deleteArticle(id)}
						label="banner"
						tableRef={articleTableRef}
					/>
				</Space>
			),
		},
	];
	const articleTableRef = useRef();

	const renderAdditionalAction = () => {
		return (
			<MoleculeDatatableAdditionalAction
				column={column}
				label="Artikel"
				getLimit={() => articleTableRef.current.totalData}
				service={articleService}
				url="article"
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
				scroll={1360}
				searchInput={true}
				title={`Artikel`}
			/>
		</OrganismLayout>
	);
};

export default ArticlePage;
