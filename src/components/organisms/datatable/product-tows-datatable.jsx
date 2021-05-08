/* eslint-disable react/display-name */
import React from 'react';
import { Col, Row, Table } from 'antd';

import AtomCard from '../../atoms/card';
import AtomCustomSelect from '../../atoms/input/select';

const OrganismProductTOWSDatatable = (props) => {
	const towsColumns = [
		{
			title: 'Cabang Freezy',
			dataIndex: 'branch',
			key: 'branch',
		},
		{
			title: 'Cabang TOWS',
			dataIndex: 'branch_id',
			key: 'branch_id',
			render: (id, record) =>
				!props.isReadOnly ? (
					<AtomCustomSelect
						placeholder={`Pilih cabang ${record.branch}`}
						data={{
							url: `branches/${id}`,
							options: [
								{ label: 'Cabang Paling Jauh', value: 'FAR' },
								{ label: 'Cabang Paling Dekat', value: 'NEAR' },
							],
							onChange: (val) => setBranchTOWS(val, id),
						}}
					/>
				) : (
					record.branch?.tows?.name
				),
		},
	];

	const setBranchTOWS = (val, id) => {
		const newBranchesList = props.branches.map((branch) => {
			if (id === branch.id) branch.tows = val;
			return branch;
		});

		props.setBranches(newBranchesList);
	};

	return (
		<AtomCard title="Pengaturan TOWS">
			<Row className="mt3">
				<Col span={12}>
					<Table columns={towsColumns} dataSource={props.branches} />
				</Col>
			</Row>
		</AtomCard>
	);
};

export default OrganismProductTOWSDatatable;
