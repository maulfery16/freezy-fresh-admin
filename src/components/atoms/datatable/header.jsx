import React, { useState } from 'react';
import { Space, Typography } from 'antd';

import { CaretDownFilled, CaretUpFilled } from '@ant-design/icons';

const AtomDatatableHeader = (props) => {
	const [order, setOrder] = useState(
		props.attr === props.activeSort.sortedBy
			? props.activeSort.orderBy
			: null
	);

	const switchSort = () => {
		if (order === null) setOrder('asc');
		if (order === 'asc') setOrder('desc');
		if (order === 'desc') setOrder(null);

		props.setSort(!order ? '' : order, !order ? '' : props.attr);
	};

	return (
		<Space>
			<Typography.Text strong>
				<span>{props.title}</span>
			</Typography.Text>

			{props.setSort && (
				<Space
					className="pointer"
					direction="vertical"
					onClick={switchSort}
					size={-14}
				>
					<CaretUpFilled
						className={`${order === 'asc' && 'turbo'}`}
					/>
					<CaretDownFilled
						className={`${order === 'desc' && 'turbo'}`}
					/>
				</Space>
			)}
		</Space>
	);
};

export default AtomDatatableHeader;
