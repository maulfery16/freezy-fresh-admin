import React from 'react';

import MoleculeDatatableFilter from '../../molecules/datatable/filter-plugin';

const AtomBranchDatatableFilter = (props) => {
	return (
		<MoleculeDatatableFilter
			{...props}
			identifier="branch-filter"
			label="Cabang"
			name="branch"
			operator=":"
			placeholder="Semua cabang"
			data={{
				url: 'branches',
				generateCustomOption: (item) => ({
					value: item.id,
					label: item.name.id,
				}),
			}}
		/>
	);
};

export default AtomBranchDatatableFilter;
