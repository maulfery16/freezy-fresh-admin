/* eslint-disable react/display-name */
import React, { useRef } from 'react';
import { Link } from 'react-router-dom';
import { Space } from 'antd';
import { EditFilled, EyeFilled } from '@ant-design/icons';

import AtomImage from '../../components/atoms/image';
import MoleculeDatatableAdditionalAction from '../../components/molecules/datatable/additional-actions';
import MoleculeDatatableFilter from '../../components/molecules/datatable/filter-plugin';
import MoleculeDeleteConfirm from '../../components/molecules/delete-confirm';
import OrganismDatatable from '../../components/organisms/datatable';
import OrganismLayout from '../../components/organisms/layout';

const FeedPage = () => {
	const column = [
		{
			align: 'center',
			title: 'No',
			dataIndex: 'id',
			render: (id, _, index) => index + 1,
		},
		{
			title: 'Tipe Update',
			dataIndex: 'update_type',
			sorter: true,
		},
		{
			title: 'Tipe Konten',
			dataIndex: 'content_type',
			sorter: true,
		},
		{
			title: 'Title Story',
			dataIndex: 'title',
			render: (title) => title.id,
			csvRender: (item) => item.title.id,
			sorter: true,
		},
		{
			title: 'Gambar',
			dataIndex: 'story_image',
			render: (image) => <AtomImage src={image} />,
			csvRender: (item) => item.story_image,
		},
		{
			title: 'Title Video',
			dataIndex: 'video_title',
			render: (title) => title.id,
			csvRender: (item) => item.video_title.id,
			sorter: true,
		},
		{
			title: 'Link Video',
			dataIndex: 'video_link',
			render: (link) => <a href={link}>{link}</a>,
			sorter: true,
			width: 300,
		},
		{
			title: 'Jumlah Like',
			dataIndex: 'like_count',
			sorter: true,
		},
		{
			align: 'center',
			title: 'Aksi',
			dataIndex: 'id',
			render: (id, record) => (
				<Space size="middle">
					<Link to={`/feed/${id}/detail`}>
						<EyeFilled className="f4 blue" />
					</Link>

					<Link to={`/feed/${id}/edit`}>
						<EditFilled className="f4 orange" />
					</Link>

					{!record.is_active && (
						<MoleculeDeleteConfirm
							id={id}
							label="konten"
							tableRef={feedTableRef}
							url="feeds"
						/>
					)}
				</Space>
			),
			skipExport: true,
		},
	];
	const feedTableRef = useRef();

	const renderAdditionalAction = () => {
		return (
			<MoleculeDatatableAdditionalAction
				column={column}
				label="Feed"
				getLimit={() => feedTableRef.current.totalData}
				route="/feed"
				url="feeds"
				withoutExportButton
			/>
		);
	};

	const renderDatatableFilters = () => {
		return [
			<MoleculeDatatableFilter
				identifier="content-type-filter"
				key="content-type"
				label="Tipe Konten"
				name="content_type"
				operator=":"
				placeholder="Semua tipe konten"
				data={{
					options: [
						{
							value: 'STORY',
							label: 'Story',
						},
						{ value: 'VIDEO', label: 'Video' },
					],
				}}
			/>,
			<MoleculeDatatableFilter
				identifier="update-type-filter"
				key="update-type"
				label="Tipe Update"
				name="update_type"
				operator=":"
				placeholder="Semua tipe update"
				data={{
					options: [
						{
							value: 'MANUAL',
							label: 'Manual',
						},
						{ value: 'SYSTEM', label: 'Sistem' },
					],
				}}
			/>,
		];
	};

	return (
		<OrganismLayout
			breadcumbs={[{ name: 'Feed', link: '/feed' }]}
			title="Feed Page"
		>
			<OrganismDatatable
				additionalAction={renderAdditionalAction()}
				columns={column}
				dataSourceURL={`feeds`}
				filters={renderDatatableFilters()}
				ref={feedTableRef}
				scroll={1440}
				searchInput={true}
				title={`Feed`}
			/>
		</OrganismLayout>
	);
};

export default FeedPage;
