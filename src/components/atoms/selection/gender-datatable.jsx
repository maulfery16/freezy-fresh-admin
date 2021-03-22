import React from 'react';

import MoleculeDatatableFilter from '../../molecules/datatable/filter-plugin';

const AtomGenderDatatableFilter = (props) => {
	return (
		<MoleculeDatatableFilter
			{...props}
			name="gender"
			operator=":"
			identifier="gender-filter"
			label="Jenis Kelamin"
			key="gender-filter"
			placeholder="Semua"
			data={{
				mock: [
					{
						value: 'FEMALE',
						label: 'Perempuan',
					},
					{
						value: 'MALE',
						label: 'Laki-laki',
					},
				],
			}}
		/>
	);
};

export default AtomGenderDatatableFilter;
