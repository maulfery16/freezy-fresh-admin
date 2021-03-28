import { Col, message, Modal, Row, Select, Typography } from 'antd';
import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';

// import DatatableService from '../../../services/datatable';
import AtomPrimaryButton from '../button/primary-button';
import AtomSecondaryButton from '../button/secondary-button';

const AtomStatusSelect = (props) => {
	const [isVisible, setIsVisible] = useState(false);
	const [options, setOptions] = useState(null);
	const [selectedOption, setSelectedOption] = useState(null);
	// const datatableService = new DatatableService();

	const cancelChangeStatus = () => {
		setIsVisible(false);
	};

	const changeActiveStatus = async () => {
		try {
			// await datatableService.updateActiveStatus(
			// 	props.id,
			// 	props.status,
			// 	props.url
			// );
			message.success('Berhasil memperbaharui status');
			props.tableRef.current.refetchData();
		} catch (error) {
			message.error(error.message);
			console.error(error);
		} finally {
			setIsVisible(false);
		}
	};

	useEffect(() => {
		setOptions(props.options);
	}, []);

	return (
		<>
			<AtomPrimaryButton block onClick={() => setIsVisible(true)}>
				Ubah Status
			</AtomPrimaryButton>

			<Modal
				footer={null}
				onCancel={() => setIsVisible(false)}
				visible={isVisible}
				width={360}
			>
				<Row className="pa3" justify="center" align="middle">
					<Col>
						<Typography.Text>Ubah status menjadi </Typography.Text>
						<Select
							defaultValue={props.active}
							style={{ width: 120 }}
							showSearch
							optionFilterProp="children"
							filterOption={(input, option) =>
								option.children
									.toLowerCase()
									.indexOf(input.toLowerCase()) >= 0
							}
							filterSort={(optionA, optionB) =>
								optionA.children
									.toLowerCase()
									.localeCompare(
										optionB.children.toLowerCase()
									)
							}
						>
							{options &&
								options.map((option, index) => (
									<Select.Option
										onChange={(value) =>
											setSelectedOption(value)
										}
										key={`${
											props.indentifier || ''
										}_input-select_${index}`}
										value={option.value}
									>
										{option.label}
									</Select.Option>
								))}
						</Select>
					</Col>

					<Col className="mt4" span={24}>
						<Row gutter={24} justify="center">
							<Col span={12}>
								<AtomSecondaryButton
									block
									onClick={() => cancelChangeStatus()}
									size="middle"
								>
									Cancel
								</AtomSecondaryButton>
							</Col>

							<Col span={12}>
								<AtomPrimaryButton
									block
									onClick={() =>
										changeActiveStatus(
											props.id,
											selectedOption,
											props.active
										)
									}
									size="middle"
								>
									Ubah
								</AtomPrimaryButton>
							</Col>
						</Row>
					</Col>
				</Row>
			</Modal>
		</>
	);
};

AtomStatusSelect.propTypes = {
	active: PropTypes.bool,
	id: PropTypes.string.isRequired,
	url: PropTypes.string.isRequired,
	options: PropTypes.array.isRequired,
	tableRef: PropTypes.oneOfType([
		PropTypes.func,
		PropTypes.shape({ current: PropTypes.any }),
	]).isRequired,
};

export default AtomStatusSelect;
