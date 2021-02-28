/* eslint-disable no-mixed-spaces-and-tabs */
/* eslint-disable react/display-name */
/* eslint-disable react-hooks/exhaustive-deps */
import PropTypes from 'prop-types';
import React, {
	forwardRef,
	useEffect,
	useImperativeHandle,
	useState,
} from 'react';
import {
	Col,
	Input,
	message,
	Modal,
	Row,
	Space,
	Table,
	Typography,
} from 'antd';

import AtomDatatableHeader from '../atoms/datatable/header';
import AtomPrimaryButton from '../atoms/button/primary-button';

import DatatableService from '../../services/datatable';
const datatableService = new DatatableService();

const OrganismDatatable = forwardRef((props, ref) => {
	const [data, setData] = useState(null);
	const [filters, setFilters] = useState([]);
	const [isFilterVisible, setIsFilterVisible] = useState(false);
	const [isGettingData, setIsGettingData] = useState(false);
	const [totalData, setTotalData] = useState(0);
	const [filterParams, setFilterParams] = useState({
		filter: '',
		search: '',
		limit: 5,
		orderBy: '',
		page: 1,
		sortedBy: '',
	});

	const getData = async () => {
		setIsGettingData(true);

		try {
			if (props.mock) {
				setData(props.mock.data);
				setTotalData(props.mock.meta.pagination.total);
			} else {
				const { data, meta } = await datatableService.getData(
					props.dataSourceURL,
					filterParams
				);

				setData(data);
				setTotalData(meta.pagination.total);
			}
		} catch (error) {
			message.error(error.message);
			console.error(error);
		} finally {
			setIsGettingData(false);
		}
	};

	const addFilter = (name, operator, value) => {
		const newFilter = { name, operator, value };
		const existingFilterIndex = filters.findIndex(
			(filter) => name === filter.name
		);

		const newFilters = [...filters];
		existingFilterIndex > -1
			? (newFilters[existingFilterIndex] = newFilter)
			: newFilters.push(newFilter);

		setFilters(newFilters);
	};

	const addMultipleFilter = (appliedFilters) => {
		const multipleFilters = [];
		const existingFilter = [...filters];

		appliedFilters.forEach((applFilter) => {
			const newFilter = { ...applFilter };
			const existingFilterIndex = filters.findIndex(
				(filter) =>
					newFilter.name === filter.name &&
					applFilter.name === filter.operator
			);

			if (existingFilterIndex > -1)
				existingFilter.splice(existingFilterIndex, 1);

			multipleFilters.push(newFilter);
		});

		setFilters([...existingFilter, ...multipleFilters]);
	};

	const removeFilter = (name) => {
		const filterIndex = filters.findIndex((filter) => name === filter.name);

		const newFilters = [...filters];
		newFilters.splice(filterIndex, 1);
		setFilters(newFilters);
	};

	const setFilter = () => {
		const keyword =
			filterParams.search.split(';')[0].includes(':') ||
			filterParams.search.split(';')[0].length === 0
				? ''
				: `${filterParams.search.split(';')[0]};`;

		const filterParameter = {
			...filterParams,
			search: `${keyword}${filters
				.map((query) => `${query.name}${query.operator}${query.value}`)
				.join(';')}`,
			page: 1,
		};

		setIsFilterVisible(false);
		setFilterParams(filterParameter);
	};

	const setKeyword = (search) => {
		const keyword = filterParams.search.split(';');

		if (keyword[0].length === 0 || !keyword[0].includes[':']) {
			setFilterParams({ ...filterParams, search });
		} else {
			keyword.unshift(search);
			setFilterParams({ ...filterParams, search: keyword.join(';') });
		}
	};

	const setPagination = (page, limit) => {
		setFilterParams({ ...filterParams, limit, page });
	};

	const setSort = (sortedBy, orderBy) => {
		setFilterParams({
			...filterParams,
			orderBy,
			page: 1,
			sortedBy,
		});
	};

	useEffect(() => {
		(async () => {
			await getData();
		})();
	}, []);

	useEffect(() => {
		(async () => {
			await getData();
		})();
	}, [filterParams]);

	useImperativeHandle(ref, () => ({
		async refetchData() {
			await getData();
		},
		totalData,
	}));

	return (
		<Row className="w-100">
			<Col span={24}>
				<Row align="middle" justify="space-between">
					<Space align="middle" size={50}>
						<Typography.Title level={props.titleSize || 4}>
							{props.title && props.title.toUpperCase()}
						</Typography.Title>
					</Space>

					{props.additionalAction}
				</Row>
			</Col>

			<Col className="mt4" span={24}>
				<Row align="bottom">
					<Col span={24}>
						<Row gutter={[12, 12]}>
							{props.additionalInformation &&
							props.additionalInformation instanceof Array
								? props.additionalInformation.map(
										(info, index) => (
											<Col
												key={`additional-info-${index}`}
												span={6}
											>
												{info}
											</Col>
										)
								  )
								: props.additionalInformation
								? props.additionalInformation
								: null}
						</Row>
					</Col>
				</Row>
			</Col>

			<Col className="mt1" span={24}>
				<Row gutter={12} align="middle">
					{props.searchInput && (
						<Col span={8}>
							<Input.Search
								placeholder={
									props.searchInput.placeholder || 'Cari'
								}
								onSearch={(value) => setKeyword(value)}
								size="large"
							/>
						</Col>
					)}

					{props.filters && (
						<Col span={4}>
							<AtomPrimaryButton
								className="w-100"
								onClick={() => setIsFilterVisible(true)}
							>
								Filter
							</AtomPrimaryButton>

							<Modal
								footer={null}
								title="Filter"
								visible={isFilterVisible}
								width={350}
								onCancel={() => setIsFilterVisible(false)}
							>
								<Space className="w-100" direction="vertical">
									<Row gutter={[0, 16]}>
										{props.filters.map((filter, index) => {
											const filterEl = React.cloneElement(
												filter,
												{
													addFilter,
													addMultipleFilter,
													removeFilter,
												}
											);

											return (
												<Col
													key={`dattable-filter-${index}`}
													span={24}
												>
													{filterEl}
												</Col>
											);
										})}
									</Row>
								</Space>

								<Row className="mt4" justify="center">
									<AtomPrimaryButton
										className="br3 w-30"
										onClick={setFilter}
										size="large"
									>
										Filter
									</AtomPrimaryButton>
								</Row>
							</Modal>
						</Col>
					)}
				</Row>
			</Col>

			<Col className="mt4" span={24}>
				<Table
					bordered={true}
					columns={props.columns.map((column) => ({
						...column,
						title: (
							<AtomDatatableHeader
								attr={column.dataIndex}
								activeSort={{
									orderBy: filterParams.orderBy,
									sortedBy: filterParams.sortedBy,
								}}
								setSort={column.sort ? setSort : false}
								title={column.title}
							/>
						),
					}))}
					className={props.className}
					dataSource={data}
					loading={isGettingData}
					pagination={{
						current: filterParams.page,
						itemRender: (_, type, originalEl) => {
							if (type === 'prev')
								return (
									<a className="bg-white pa2 br2 ba b--black-50">
										Sebelumnya
									</a>
								);
							if (type === 'next')
								return (
									<a className="bg-white pa2 br2 ba b--black-50">
										Selanjutnya
									</a>
								);
							return originalEl;
						},
						onChange: (page, pageSize) =>
							setPagination(page, pageSize),
						pageSize: filterParams.limit,
						responsive: true,
						total: totalData,
					}}
					rowKey={props.rowKey || 'id'}
					scroll={{ x: props.scroll || 1080 }}
					style={{ width: '100%' }}
				/>
			</Col>
		</Row>
	);
});

OrganismDatatable.propTypes = {
	additionalAction: PropTypes.node,
	additionalInformation: PropTypes.node,
	columns: PropTypes.array.isRequired,
	filters: PropTypes.arrayOf(PropTypes.node),
	scroll: PropTypes.number,
	title: PropTypes.string,
	titleSize: PropTypes.number,
	dataSourceURL: PropTypes.string.isRequired,
	searchInput: PropTypes.oneOfType([
		PropTypes.bool,
		PropTypes.shape({
			placeholder: PropTypes.string,
		}),
	]),
};

export default OrganismDatatable;
