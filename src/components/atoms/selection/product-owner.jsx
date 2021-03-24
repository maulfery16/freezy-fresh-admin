import React from 'react';
import PropTypes from 'prop-types';

import MoleculeSelectInputGroup from '../../molecules/input-group/select-input';

const AtomProductOwnerSelect = (props) => {
	return (
		<MoleculeSelectInputGroup
			{...props}
			allowClear
			label="Perusahaan"
			name="company"
			placeholder="Perusahaan"
			data={{
				url: 'product-owners',
			}}
		/>
	);
};

AtomProductOwnerSelect.propTypes = {
	onChange: PropTypes.func,
	required: PropTypes.bool,
};

export default AtomProductOwnerSelect;
