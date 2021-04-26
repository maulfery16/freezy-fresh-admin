import { Space } from 'antd';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import React from 'react';

import AtomPrimaryButton from '../atoms/button/primary-button';
import AtomSecondaryButton from '../atoms/button/secondary-button';

const MoleculeModifyActionButtons = (props) => {
	return (
		<Space>
			<Link to={props.backUrl}>
				<AtomSecondaryButton size="large">Kembali</AtomSecondaryButton>
			</Link>
			<AtomPrimaryButton
				htmlType={props.onClick ? 'button' : 'submit'}
				loading={props.isSubmitting}
				onClick={props.onClick ? () => props.onClick() : () => {}}
				size="large"
			>
				{`${props.isCreating ? 'Tambah' : 'Ubah'} ${props.label}`}
			</AtomPrimaryButton>
		</Space>
	);
};

MoleculeModifyActionButtons.propTypes = {
	submit: PropTypes.func,
	isCreating: PropTypes.bool.isRequired,
	isSubmitting: PropTypes.bool.isRequired,
	label: PropTypes.string.isRequired,
};

export default MoleculeModifyActionButtons;
