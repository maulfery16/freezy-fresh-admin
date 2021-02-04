import React, { useEffect, useState } from 'react';
import { Select, Skeleton } from 'antd';

import MasterService from '../../../services/master';
const masterService = new MasterService();

const AtomCustomSelect = (props) => {
	const [options, setOptions] = useState(null);

	const generateOption = (item) => {
		if (props.generateCustomOption) return props.generateCustomOption(item);

		return {
			label: item.label,
			value: item.id,
		};
	};

	const getOptions = async () => {
		if (props.data.mock) {
			setOptions(props.data.mock);
		} else {
			const { data } = await masterService(props.url);
			const options = data.map((item) => generateOption(item));

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
