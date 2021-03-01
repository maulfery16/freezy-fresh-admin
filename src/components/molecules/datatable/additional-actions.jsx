import { message, Space } from 'antd';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import React, { useState } from 'react';

import AtomPrimaryButton from '../../atoms/button/primary-button';
import AtomSecondaryButton from '../../atoms/button/secondary-button';

import DatatableService from '../../../services/datatable';
const datatableService = new DatatableService();

const MoleculeDatatableAdditionalAction = (props) => {
	const [isExporting, setIsExporting] = useState(false);

	const exportAsCSV = async () => {
		setIsExporting(true);

		try {
			const params = {
				page: 1,
				limit: props.getLimit(),
			};
			await datatableService.exportAsCSV(params, props.column, props.url);
		} catch (error) {
			message.error(error.message);
			console.error(error);
		} finally {
			setIsExporting(false);
		}
	};

	return (
		<Space>
			<AtomSecondaryButton
				loading={isExporting}
				onClick={() => exportAsCSV()}
			>
				Export Excel
			</AtomSecondaryButton>
			{!props.withoutAddButton && (
				<Link to={`${props.route}/${props.isEdit ? 'edit' : 'add'}`}>
					<AtomPrimaryButton>{`${props.isEdit ? 'Edit' : 'Tambah'} ${
						props.label
					}`}</AtomPrimaryButton>
				</Link>
			)}
		</Space>
	);
};

MoleculeDatatableAdditionalAction.propTypes = {
	getLimit: PropTypes.func.isRequired,
	label: PropTypes.string.isRequired,
	route: PropTypes.string.isRequired,
	withoutAddButton: PropTypes.bool,
	isEdit: PropTypes.bool,
};

export default MoleculeDatatableAdditionalAction;
