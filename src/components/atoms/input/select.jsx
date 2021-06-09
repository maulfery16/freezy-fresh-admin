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
	const [options, setOptions] = useState([]);
	const [nextPage, setNextPage] = useState(1);

	const generateOption = (item) => {
		if (props.data.generateCustomOption)
			return props.data.generateCustomOption(item);

		return {
			label: item.name,
			value: item.id,
		};
	};

	const getOptions = async (page) => {
		if (props.data.options) {
			setOptions(props.data.options);
		} else {
			const response = await masterService.getOptions(props.data.url, {page, limit: props.data.limit ?? 10});
			const nextURL = response?.meta?.pagination?.links?.next;
			if (response.data && response.data.length > 0) {
				let tmpOptions = page === 1 ? [] : options;

				response.data.map((item) => tmpOptions.push(generateOption(item)));
				options.unshift({ label: 'Semua', value: '', disabled: true });
	
				setOptions(tmpOptions);
			}
			if (nextURL) {
				const url = new URL(nextURL);
				const page = url.searchParams.get('page');
				setNextPage(page);
			} else {
				setNextPage(null);
			}
		}
	};

	useEffect(() => {
		(async () => {
			setOptions(null);
			await getOptions(1);
		})();
	}, []);

	useImperativeHandle(ref, () => ({
		async refetchData() {
			setOptions(null);
			await getOptions(1);
		},
	}));

	const optionalProps = { ...props };
	if (props.data.onChange)
		optionalProps.onChange = (value, options) =>
			props.data.onChange(value, options);
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
			onPopupScroll={(e) => {
				e.persist();
				let target = e.target;
				if (target.scrollTop + target.offsetHeight === target.scrollHeight) {
					if (nextPage) {
						getOptions(nextPage);
					}
				}
			}}
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
