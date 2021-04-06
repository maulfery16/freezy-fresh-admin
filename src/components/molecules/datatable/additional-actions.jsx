/* eslint-disable no-mixed-spaces-and-tabs */
import { message, Space } from 'antd';
import { Link, useHistory } from 'react-router-dom';
import PropTypes from 'prop-types';
import React, { useState } from 'react';

import AtomPrimaryButton from '../../atoms/button/primary-button';
import AtomSecondaryButton from '../../atoms/button/secondary-button';

import DatatableService from '../../../services/datatable';
import { getURLParams } from '../../../utils/helpers';

const MoleculeDatatableAdditionalAction = (props) => {
	const [isExporting, setIsExporting] = useState(false);
	const datatableService = new DatatableService();
	const history = useHistory();

	const exportAsCSV = async () => {
		setIsExporting(true);

		try {
			const params = {
				page: 1,
				limit: props.getLimit(),
			};

			if (props.requiredParams) {
				if (!history.location.search.includes(props.requiredParams)) {
					message.warning(
						`Pilih filter ${props.requiredParamsLabel} terlebih dahulu`
					);
					return;
				}
			}

			if (history.location.search !== '') {
				const { q, ...queryParams } = getURLParams(
					history.location.search
				);

				params.search =
					`${q};` +
					`${Object.keys(queryParams)
						.map((key) => `${key}:${queryParams[key]}`)
						.join(';')}`;
			}

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
			{props.importRoute && (
				<AtomSecondaryButton
					onClick={() => history.push(props.importRoute)}
					size="large"
				>
					Import
				</AtomSecondaryButton>
			)}

			{!props.withoutExportButton && (
				<AtomSecondaryButton
					loading={isExporting}
					onClick={() => exportAsCSV()}
					size="large"
				>
					Export Excel
				</AtomSecondaryButton>
			)}

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
	importRoute: PropTypes.string,
	isEdit: PropTypes.bool,
	label: PropTypes.string.isRequired,
	requiredParams: PropTypes.string,
	requiredParamsLabel: PropTypes.string,
	route: PropTypes.string.isRequired,
	withoutAddButton: PropTypes.bool,
	withoutExportButton: PropTypes.bool,
};

export default MoleculeDatatableAdditionalAction;
