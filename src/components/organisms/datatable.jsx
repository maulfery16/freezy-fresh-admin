/* eslint-disable react/display-name */
/* eslint-disable react-hooks/exhaustive-deps */
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
	const [isGettingData, setIsGettingData] = useState(false);
	const [data, setData] = useState(null);
	const [totalData, setTotalData] = useState(0);

	let filterParameter = {
		filter: '',
		keyword: '',
		limit: 5,
		page: 1,
		sort: '',
	};

	const getData = async () => {
		setIsGettingData(true);

		try {
			if (props.mock) {
				setData(props.mock.data);
				setTotalData(props.mock.meta.total_data);
			} else {
				const { data, meta } = await datatableService.getData(
					props.dataSourceURL,
					filterParameter
				);

				setData(data);
				setTotalData(meta.total_data);
			}
		} catch (error) {
			message.error(error.message);
		} finally {
			setIsGettingData(false);
		}
	};

	useImperativeHandle(ref, () => ({
		async refetchData() {
			await getData();
		},
	}));

	const setKeyword = (value) => {
		filterParameter = { ...filterParameter, keyword: value };
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

	const setSort = (order, attr) => {
		filterParameter = { ...filterParameter, sort: `${order}${attr}` };
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

						{props.withSearchFilter && (
							<Input.Search
								placeholder={props.inputPlaceHolder || 'Cari'}
								onSearch={(value) => setKeyword(value)}
								style={{ width: 300 }}
							/>
						)}
					</Space>

					{props.additionalAction}
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
						scroll={{ x: props.scroll || 1920 }}
						style={{ width: '100%' }}
					/>
				)}
			</Col>
		</Row>
	);
});

export default OrganismDatatable;
