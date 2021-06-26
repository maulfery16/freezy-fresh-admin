import { Col, message, Modal, Row, Switch, Typography } from 'antd';
import PropTypes from 'prop-types';
import React, { useRef, useState } from 'react';

import DatatableService from '../../../services/datatable';
import AtomPrimaryButton from '../button/primary-button';
import AtomSecondaryButton from '../button/secondary-button';

const AtomStatusSwitch = (props) => {
	const [isVisible, setIsVisible] = useState(false);
	const datatableService = new DatatableService();
	const switchRef = useRef();

	const cancelChangeStatus = () => {
		switchRef.current.click();
		setIsVisible(false);
	};

	const changeActiveStatus = async () => {
		try {
			
			if (props.statusChangeAction) {
				await props.statusChangeAction();
			} else {
				await datatableService.updateActiveStatus(props.id, props.url, props.method);
			}
			message.success(`Berhasil memperbaharui status aktif ${props.label ?? 'kategori'}`);
		} catch (error) {
			message.error(error.message);
			console.error(error);
		} finally {
			setIsVisible(false);
			if (props.afterSuccessUpdate) {
				props.afterSuccessUpdate();
			} else {
				props.tableRef.current.refetchData();
			}
		}
	};

	return (
		<>
			<div className="pointer" onClick={() => setIsVisible(true)}>
				<Switch defaultChecked={props.active} ref={switchRef} />
			</div>

			<Modal
				footer={null}
				onCancel={() => cancelChangeStatus()}
				visible={isVisible}
				width={360}
			>
				<Row className="pa3" justify="center" align="middle">
					<Col>
						<Typography.Text>
							Apakah anda yakin akan me
							{props.active ? 'non' : 'ng'}aktifkan data ini?
						</Typography.Text>
					</Col>

					<Col className="mt4" span={24}>
						<Row gutter={24} justify="center">
							<Col span={12}>
								<AtomSecondaryButton
									block
									onClick={() => cancelChangeStatus()}
									size="middle"
								>
									Tidak
								</AtomSecondaryButton>
							</Col>

							<Col span={12}>
								<AtomPrimaryButton
									block
									onClick={() =>
										changeActiveStatus(
											props.id,
											props.active
										)
									}
									size="middle"
								>
									Ya
								</AtomPrimaryButton>
							</Col>
						</Row>
					</Col>
				</Row>
			</Modal>
		</>
	);
};

AtomStatusSwitch.propTypes = {
	active: PropTypes.bool,
	id: PropTypes.string.isRequired,
	url: PropTypes.string.isRequired,
	tableRef: PropTypes.oneOfType([
		PropTypes.func,
		PropTypes.shape({ current: PropTypes.any }),
	]).isRequired,
};

export default AtomStatusSwitch;
