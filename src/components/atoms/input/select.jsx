/* eslint-disable react/display-name */
import PropTypes from 'prop-types';
import React, {
	forwardRef,
	useEffect,
	useImperativeHandle,
	useState,
} from 'react';
import { Select, Skeleton } from 'antd';

import MasterService from '../../../services/master';
const masterService = new MasterService();

const AtomCustomSelect = forwardRef((props, ref) => {
	const [options, setOptions] = useState(null);

	const generateOption = (item) => {
		if (props.data.generateCustomOption)
			return props.data.generateCustomOption(item);

		return {
			label: item.name,
			value: item.id,
		};
	};

	const getOptions = async () => {
		setOptions(null);

		if (props.data.options) {
			setOptions(props.data.options);
		} else {
			const { data } = await masterService.getOptions(props.data.url);

			const options = data.map((item) => generateOption(item));
			options.unshift({ label: 'Semua', value: '', disabled: true });

			setOptions(options);
		}
	};

	useEffect(() => {
		(async () => {
			await getOptions();
		})();
	}, []);

	useImperativeHandle(ref, () => ({
		async refetchData() {
			await getOptions();
		},
	}));

	const optionalProps = { ...props };
	if (props.data.onChange)
		optionalProps.onChange = (value) => props.data.onChange(value);
	if (optionalProps.optionsRef) delete optionalProps.optionsRef;

	return options ? (
		<Select
			{...optionalProps}
			showSearch
			optionFilterProp="children"
			filterOption={(input, option) =>
				option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
			}
			filterSort={(optionA, optionB) =>
				optionA.children
					.toLowerCase()
					.localeCompare(optionB.children.toLowerCase())
			}
		>
			{options.map((option, index) => (
				<Select.Option
					disabled={option.disabled}
					key={`${props.indentifier || ''}_input-select_${index}`}
					value={option.value}
				>
					{option.label}
				</Select.Option>
			))}
		</Select>
	) : (
		<Skeleton active title={{ width: '100%' }} paragraph={{ rows: 0 }} />
	);
});

AtomCustomSelect.propTypes = {
	indentifier: PropTypes.string,
	data: PropTypes.shape({
		generateCustomOption: PropTypes.func,
		options: PropTypes.array,
		url: PropTypes.string,
	}),
};

export default AtomCustomSelect;
