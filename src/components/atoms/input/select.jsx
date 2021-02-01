import React, { useEffect, useState } from 'react';
import { Select, Skeleton } from 'antd';

import MasterService from '../../../services/master';
const masterService = new MasterService();

const AtomCustomSelect = (props) => {
	const [options, setOptions] = useState(null);

	const getOptions = async () => {
		if (props.data.mock) {
			setOptions(props.data.mock);
		} else {
			const { data } = await masterService(props.url);
			const options = data.map((item) => ({
				label: props.data.labelIndex
					? item[props.data.labelIndex]
					: item.name,
				value: props.data.valueIndex
					? item[props.data.valueIndex]
					: item.id,
			}));
			if (props.addblankoption)
				options.unshift({ label: 'Semua', value: '' });

			setOptions(options);
		}
	};

	useEffect(() => {
		(async () => {
			await getOptions();
		})();
	}, []);

	return options ? (
		<Select {...props}>
			{options.map((option, index) => (
				<Select.Option
					key={`${props.indentifier || ''}_input-select_${index}`}
					value={option.value}
				>
					{option.label}
				</Select.Option>
			))}
		</Select>
	) : (
		<Skeleton active />
	);
};

export default AtomCustomSelect;
