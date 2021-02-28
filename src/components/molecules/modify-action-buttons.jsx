import { Button, Space } from 'antd';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import React from 'react';

const MoleculeModifyActionButtons = (props) => {
	return (
		<Space>
			<Link to={props.backUrl}>
				<Button className="br3 denim b--denim" size="large">
					Kembali
				</Button>
			</Link>
			<Button
				className="br3 bg-denim white"
				htmlType="submit"
				loading={props.isSubmitting}
				size="large"
			>
				{`${props.isCreating ? 'Tambah' : 'Ubah'} ${props.label}`}
			</Button>
		</Space>
	);
};

MoleculeModifyActionButtons.propTypes = {
	isCreating: PropTypes.bool.isRequired,
	isSubmitting: PropTypes.bool.isRequired,
	label: PropTypes.string.isRequired,
};

export default MoleculeModifyActionButtons;
