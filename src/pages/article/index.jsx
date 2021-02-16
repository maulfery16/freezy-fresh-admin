/* eslint-disable react/display-name */
import React, { useRef } from 'react';
import ReactMoment from 'react-moment';
import { Link } from 'react-router-dom';
import { Image, message, Popconfirm, Space } from 'antd';
import {
	DeleteFilled,
	EditFilled,
	EyeFilled,
	QuestionCircleFilled,
} from '@ant-design/icons';

import OrganismDatatable from '../../components/organisms/datatable';
import OrganismLayout from '../../components/organisms/layout';

import ArticleService from '../../services/article';
import MoleculeDatatableAdditionalAction from '../../components/molecules/datatable/additional-actions';
import MoleculeDatatableDateRange from '../../components/molecules/datatable/date-range-plugin';
import MoleculeDatatableFilter from '../../components/molecules/datatable/filter-plugin';
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
					<Link to={`/article/${id}/detail`}>
						<EyeFilled className="f4 blue" />
					</Link>

					<Link to={`/brand/${id}/edit`}>
						<EditFilled className="f4 orange" />
					</Link>

					<Popconfirm
						title="Are you sure"
						icon={<QuestionCircleFilled className="red" />}
						onConfirm={() => deleteArticle(id)}
					>
						<DeleteFilled className="f4 red" />
					</Popconfirm>
				</Space>
			),
		},
	];
	const articleTableRef = useRef();

	const deleteArticle = async (id) => {
		try {
			await articleService.deleteArticle(id);

			message.success('Berhasil menghapus article');
			articleTableRef.current.refetchData();
		} catch (error) {
			message.error(error.message);
			console.error(error);
		}
	};

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
			breadcumbs={[{ name: 'Artikel', link: '/article' }]}
			title="Article Page"
		>
			<OrganismDatatable
				additionalAction={renderAdditionalAction()}
				columns={column}
				dataSourceURL={`/v1/articles`}
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
