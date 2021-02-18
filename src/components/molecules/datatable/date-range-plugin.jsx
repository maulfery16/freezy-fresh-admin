import React from 'react';
import { DatePicker, Space, Typography } from 'antd';

const MoleculeDatatableDateRange = (props) => {
	const setDateRangeFilter = (selectedValue) => {
		if (selectedValue.length > 0) {
			props.addMultipleFilter([
				{
					name: props.name || 'created_at',
					value: selectedValue[0].format(),
					operator: props.operator,
				},
				{
					name: props.name || 'created_at',
					value: selectedValue[1].format(),
					operator: props.operator,
				},
			]);
		} else {
			props.removeFilter(props.filterName);
		}
	};

	let isValidToRender = props.name && props.operator ? true : false;
	return isValidToRender ? (
		<Space className="w-100" direction="vertical">
			<Typography.Text>
				<span className="moon-gray fw6">{props.label}</span>
			</Typography.Text>

			<DatePicker.RangePicker
				className="w-100"
				onChange={setDateRangeFilter}
				placeholder={['Dari tanggal', 'Hingga tanggal']}
			/>
		</Space>
	) : (
		<>Daterange plugin is invalid</>
	);
};

export default MoleculeDatatableDateRange;
