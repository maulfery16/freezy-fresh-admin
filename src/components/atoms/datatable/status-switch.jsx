import { message, Switch } from 'antd';
import PropTypes from 'prop-types';
import React from 'react';

import DatatableService from '../../../services/datatable';
const datatableService = new DatatableService();

const AtomStatusSwitch = (props) => {
	const changeActiveStatus = async () => {
		try {
			await datatableService.updateActiveStatus(props.id, props.url);
			message.success('Berhasil memperbaharui status aktif kategori');
			props.tableRef.current.refetchData();
		} catch (error) {
			message.error(error.message);
			console.error(error);
		}
	};

	return (
		<Switch
			defaultChecked={props.active}
			onChange={() => changeActiveStatus(props.id, props.active)}
		/>
	);
};

AtomStatusSwitch.propTypes = {
	active: PropTypes.bool,
	id: PropTypes.string.isRequired,
	url: PropTypes.string.isRequired,
	tableRef: PropTypes.oneOfType([
		PropTypes.func,
		PropTypes.shape({ current: PropTypes.any }),
	]).isRequired,
};

export default AtomStatusSwitch;
