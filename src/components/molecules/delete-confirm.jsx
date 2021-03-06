import { Col, message, Modal, Row, Typography } from 'antd';
import { DeleteFilled } from '@ant-design/icons';
import PropTypes from 'prop-types';
import React, { useState } from 'react';

import AtomPrimaryButton from '../atoms/button/primary-button';
import AtomSecondaryButton from '../atoms/button/secondary-button';

import DatatableService from '../../services/datatable';
const datatableService = new DatatableService();

const MoleculeDeleteConfirm = (props) => {
	const [isVisible, setIsVisible] = useState(false);

	const deleteItem = async () => {
		try {
			await datatableService.deleteData(props.id, props.url);

			message.success(`Berhasil menghapus ${props.label}`);
			setIsVisible(false);
			props.tableRef.current.refetchData();
			if (props.afterSuccessDelete) props.afterSuccessDelete();
		} catch (error) {
			message.error(error.message);
			console.error(error);
		}
	};

	return (
		<>
			<DeleteFilled
				className="f4 red"
				onClick={() => setIsVisible(true)}
			/>

			<Modal
				footer={null}
				onCancel={() => setIsVisible(false)}
				visible={isVisible}
				width={360}
			>
				<Row className="pa3" justify="center" align="middle">
					<Col>
						<Typography.Text>
							Apakah anda yakin akan menghapus {props.label} ini?
						</Typography.Text>
					</Col>

					<Col className="mt4" span={24}>
						<Row gutter={24} justify="center">
							<Col span={12}>
								<AtomSecondaryButton
									block
									onClick={() => setIsVisible(false)}
									size="middle"
								>
									Kembali
								</AtomSecondaryButton>
							</Col>

							<Col span={12}>
								<AtomPrimaryButton
									block
									onClick={() => deleteItem()}
									size="middle"
								>
									Hapus
								</AtomPrimaryButton>
							</Col>
						</Row>
					</Col>
				</Row>
			</Modal>
		</>
	);
};

MoleculeDeleteConfirm.propTypes = {
	id: PropTypes.string.isRequired,
	label: PropTypes.string,
	url: PropTypes.string.isRequired,
	tableRef: PropTypes.oneOfType([
		PropTypes.func,
		PropTypes.shape({ current: PropTypes.any }),
	]).isRequired,
};

export default MoleculeDeleteConfirm;
