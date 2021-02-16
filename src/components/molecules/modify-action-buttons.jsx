import { Button, Space } from 'antd';
import React from 'react';
import { Link } from 'react-router-dom';

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

export default MoleculeModifyActionButtons;
