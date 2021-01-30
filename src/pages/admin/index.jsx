import React from 'react';
import OrganismDatatable from '../../components/organisms/datatable';
import OrganismLayout from '../../components/organisms/layout';

const ExamplePages = () => {
	const column = [
		{
			title: 'Nama',
			dataIndex: 'name',
		},
		{
			title: 'Umur',
			dataIndex: 'age',
		},
	];

	return (
		<OrganismLayout title="Admin Page">
			<OrganismDatatable
				additionalAction={
					<div className="flex items-center justify-center bg-moonraker br-100 pointer">
						Another Action
					</div>
				}
				columns={column}
				dataSourceURL={`/url/to/api`}
				title={`Table Example`}
			/>
		</OrganismLayout>
	);
};

export default ExamplePages;
