import { DatePicker, Space, Typography } from 'antd';
import PropTypes from 'prop-types';
import React from 'react';

const MoleculeDatatableDateRange = (props) => {
	const setDateRangeFilter = (selectedValue) => {
		if (!selectedValue) return;

		if (selectedValue.length > 0) {
			let params = [
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
			]
			if (props.customAddFilter) {
				params = [{
					name: props.name || 'created_at',
					value: `[${selectedValue[0].format('YYYY-MM-DD')},${selectedValue[1].format('YYYY-MM-DD')}]`,
					operator: props.operator,
				}]
			}
			props.addMultipleFilter(params);
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

MoleculeDatatableDateRange.propTypes = {
	addMultipleFilter: PropTypes.func,
	filterName: PropTypes.string,
	label: PropTypes.string,
	name: PropTypes.string,
	operator: PropTypes.string,
	removeFilter: PropTypes.func,
};

export default MoleculeDatatableDateRange;
