import React from 'react';
import { DatePicker, Space, Typography } from 'antd';

const MoleculeDatatableDateRange = (props) => {
	const setDateRangeFilter = (selectedValue) => {
		if (selectedValue.length > 0) {
			props.addMultipleFilter([
				{
					name: props.dataIndex || 'created_at',
					value: selectedValue[0].format(),
					operator: 'gte',
				},
				{
					name: props.dataIndex || 'created_at',
					value: selectedValue[1].format(),
					operator: 'lte',
				},
			]);
		} else {
			props.removeFilter(props.filterName);
		}
	};

	let isValidToRender = props.fiilterName && props.operator ? true : false;
	return isValidToRender ? (
		<Space direction="vertical">
			<Typography.Text>
				<span>{props.label}</span>
			</Typography.Text>

			<DatePicker
				onChange={setDateRangeFilter}
				placeholder={['Dari tanggal', 'Hingga tanggal']}
				size="large"
			/>
		</Space>
	) : (
		<>Daterange plugin is invalid</>
	);
};

export default MoleculeDatatableDateRange;
