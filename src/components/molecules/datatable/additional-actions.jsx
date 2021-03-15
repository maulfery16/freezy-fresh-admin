import { message, Space, Upload } from 'antd';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import React, { useState } from 'react';

import AtomPrimaryButton from '../../atoms/button/primary-button';
import AtomSecondaryButton from '../../atoms/button/secondary-button';

import DatatableService from '../../../services/datatable';

const MoleculeDatatableAdditionalAction = (props) => {
	const [isExporting, setIsExporting] = useState(false);
	const [isImporting, setIsImporting] = useState(false);
	const datatableService = new DatatableService();

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

	const importCSV = async (_file, _fileList, event) => {
		setIsImporting(true);

		try {
			await datatableService.exportAsCSV(
				event.target.files[0],
				props.url
			);
		} catch (error) {
			message.error(error.message);
			console.error(error);
		} finally {
			setIsImporting(false);
		}
	};

	return (
		<Space>
			{props.withImport && (
				<Upload
					name="import"
					beforeUpload={() => false}
					onChange={importCSV}
				>
					<AtomSecondaryButton loading={isImporting} size="large">
						Import
					</AtomSecondaryButton>
				</Upload>
			)}

			<AtomSecondaryButton
				loading={isExporting}
				onClick={() => exportAsCSV()}
				size="large"
			>
				Export Excel
			</AtomSecondaryButton>

			{!props.withoutAddButton && (
				<Link to={`${props.route}/${props.isEdit ? 'edit' : 'add'}`}>
					<AtomPrimaryButton size="large">
						{`${props.isEdit ? 'Edit' : 'Tambah'} ${props.label}`}
					</AtomPrimaryButton>
				</Link>
			)}
		</Space>
	);
};

MoleculeDatatableAdditionalAction.propTypes = {
	getLimit: PropTypes.func.isRequired,
	isEdit: PropTypes.bool,
	label: PropTypes.string.isRequired,
	route: PropTypes.string.isRequired,
	withoutAddButton: PropTypes.bool,
};

export default MoleculeDatatableAdditionalAction;
