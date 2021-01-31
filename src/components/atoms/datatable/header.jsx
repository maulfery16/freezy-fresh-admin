import React, { useState } from 'react';
import { Space, Typography } from 'antd';

import { CaretDownFilled, CaretUpFilled } from '@ant-design/icons';

const AtomDatatableHeader = (props) => {
	const [order, setOrder] = useState(null);

	const switchSort = () => {
		if (order === null) setOrder('');
		if (order === '') setOrder('-');
		if (order === '-') setOrder(null);

		props.setSort(order, props.attr);
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
					<CaretUpFilled className={`${order === '' && 'denim'}`} />
					<CaretDownFilled
						className={`${order === '-' && 'denim'}`}
					/>
				</Space>
			)}
		</Space>
	);
};

export default AtomDatatableHeader;
