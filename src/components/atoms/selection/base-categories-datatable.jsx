import React from 'react';

import MoleculeDatatableFilter from '../../molecules/datatable/filter-plugin';

const AtomBaseCategoriesDatatableFilter = (props) => {
	return (
		<MoleculeDatatableFilter
			{...props}
			name="base-categories"
			operator=":"
			identifier="base-categories-filter"
			label="Kategori Dasar"
			key="base-categories-filter"
			placeholder="Semua Kategori Dasar"
			data={{
				url: 'base-categories',
				generateCustomOption: (item) => ({
					value: item.id,
					label: item.name.id,
				}),
			}}
		/>
	);
};

export default AtomBaseCategoriesDatatableFilter;
