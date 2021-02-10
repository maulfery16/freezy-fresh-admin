/* eslint-disable no-mixed-spaces-and-tabs */
/* eslint-disable react/display-name */
/* eslint-disable react-hooks/exhaustive-deps */
import React, {
	forwardRef,
	useEffect,
	useImperativeHandle,
	useState,
} from 'react';
import {
	Button,
	Col,
	Input,
	message,
	Modal,
	Row,
	Skeleton,
	Space,
	Table,
	Typography,
} from 'antd';

import AtomDatatableHeader from '../atoms/datatable/header';

import DatatableService from '../../services/datatable';
const datatableService = new DatatableService();

const OrganismDatatable = forwardRef((props, ref) => {
	const [data, setData] = useState(null);
	const [isFilterVisible, setIsFilterVisible] = useState(false);
	const [isGettingData, setIsGettingData] = useState(false);
	const [totalData, setTotalData] = useState(0);

	let filterParameter = {
		filter: '',
		filters: [],
		search: '',
		limit: 5,
		orderBy: '',
		page: 1,
		sortedBy: '',
	};

	const getData = async () => {
		setIsGettingData(true);

		try {
			if (props.mock) {
				setData(props.mock.data);
				setTotalData(props.mock.meta.pagination.total);
			} else {
				const { data, meta } = await datatableService.getData(
					props.dataSourceURL,
					filterParameter
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

	useImperativeHandle(ref, () => ({
		async refetchData() {
			await getData();
		},
	}));

	const addFilter = (name, operator, value) => {
		const newFilter = { name, operator, value };
		const existingFilterIndex = filterParameter.filters.findIndex(
			(filter) => name === filter.name
		);

		existingFilterIndex > -1
			? (filterParameter.filters[existingFilterIndex] = newFilter)
			: filterParameter.filter.push;
	};

	const addMultipleFilter = (appliedFilters) => {
		appliedFilters.forEach((applFilter) => {
			const existingFilterIndex = filterParameter.filters.findIndex(
				(filter) =>
					newFilter.name === filter.name &&
					applFilter.name === filter.operator
			);
			const newFilter = { ...applFilter };

			existingFilterIndex > -1
				? (filterParameter.filters[existingFilterIndex] = newFilter)
				: filterParameter.filter.push;
		});
	};

	const removeFilter = (name) => {
		const filterIndex = filterParameter.filters.findIndex(
			(filter) => name === filter.name
		);

		filterParameter.filters.splice(filterIndex, 1);
	};

	const setFilter = () => {
		filterParameter = {
			...filterParameter,
			filter: filterParameter.filters.map(
				(query, index) =>
					`${index > 0 ? 'and' : ''} ${query.name} ${
						query.operator
					} ${query.value} `
			),
			page: 1,
		};
		setIsFilterVisible(false);
		getData();
	};

	const setKeyword = (search) => {
		filterParameter = { ...filterParameter, search };
		getData();
	};

	const setLimit = (limit) => {
		filterParameter = { ...filterParameter, limit };
		getData();
	};

	const setPagination = (page) => {
		filterParameter = { ...filterParameter, page };
		getData();
	};

	const setSort = (orderBy, sortedBy) => {
		filterParameter = {
			...filterParameter,
			orderBy,
			page: 1,
			sortedBy,
		};
		getData();
	};

	useEffect(() => {
		(async () => {
			await getData();
		})();
	}, []);

	return (
		<Row className="w-100">
			<Col span={24}>
				<Row align="middle" justify="space-between">
					<Space align="middle" size={50}>
						<Typography.Title level={props.titleSize || 4}>
							{props.title.toUpperCase() || ''}
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

			<Col className="mt4" span={24}>
				<Row gutter={12}>
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
							<Button
								className="bg-denim white br2 w-100"
								onClick={() => setIsFilterVisible(true)}
							>
								Filter
							</Button>

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

								<Row className="mt5" justify="center">
									<Button
										className="bg-denim white br3 w-30"
										onClick={setFilter}
										size="large"
									>
										Filter
									</Button>
								</Row>
							</Modal>
						</Col>
					)}
				</Row>
			</Col>

			<Col className="mt4" span={24}>
				{isGettingData ? (
					<Skeleton active />
				) : (
					<Table
						bordered={true}
						columns={props.columns.map((column) => ({
							...column,
							title: (
								<AtomDatatableHeader
									attr={column.dataIndex}
									activeSort={{
										orderBy: filterParameter.orderBy,
										sortedBy: filterParameter.sortedBy,
									}}
									setSort={column.sort ? setSort : false}
									title={column.title}
								/>
							),
						}))}
						className={props.className}
						dataSource={data}
						pagination={{
							current: filterParameter.page,
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
											Seleanjutnya
										</a>
									);
								return originalEl;
							},
							onChange: (page) => setPagination(page),
							onShowSizeChange: (limit) => setLimit(limit),
							pageSize: filterParameter.limit,
							responsive: true,
							total: totalData,
						}}
						rowKey={props.rowKey || 'id'}
						scroll={{ x: props.scroll || 1080 }}
						style={{ width: '100%' }}
					/>
				)}
			</Col>
		</Row>
	);
});

export default OrganismDatatable;
