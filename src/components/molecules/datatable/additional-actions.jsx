import { Button, message, Space } from 'antd';
import { Link } from 'react-router-dom';
import React, { useState } from 'react';

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
			<Button
				className="br2 denim b--denim"
				loading={isExporting}
				onClick={() => exportAsCSV()}
			>
				Export Excel
			</Button>
			<Link to={`${props.route}/add`}>
				<Button className="br2 bg-denim white">
					Tambah {props.label}
				</Button>
			</Link>
		</Space>
	);
};

export default MoleculeDatatableAdditionalAction;
