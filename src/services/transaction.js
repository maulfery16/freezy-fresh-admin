import RequestAdapterService from './request-adapter';

export default class TransactionService extends RequestAdapterService {
	async createTransaction(transaction) {
		try {
			const { data } = await super.sendPostMultipartRequest(
				`${this.baseUrl}/v1/transactions`,
				transaction
			);

			return data;
		} catch (error) {
			console.error(error);
			throw new Error(
				`Fail creating transaction: ${super.generateErrorMessage(
					error
				)}`
			);
		}
	}

	async getTransactionById(id) {
		try {
			const { data } = await super.sendGetRequest(
				`${this.baseUrl}/v1/transactions/${id}`
			);

			return data;
		} catch (error) {
			console.error(error);
			throw new Error(
				`Fail getting transaction detail: ${super.generateErrorMessage(
					error
				)}`
			);
		}
	}
}

export const translateTransactionKind = (kind) => {
	const TRASN_FOR_ENUM = {
		ADJUSTMENT_CREDIT: 'Adjustment Credit',
		ADJUSTMENT_DEBIT: 'Adjustment Debit',
		CASHBACK: 'Cashback',
		PAYMENT: 'Pembayaran',
		BALANCE_REFUND: 'Pengembalian Dana',
		TOP_UP: 'Top Up',
	};

	return kind ? TRASN_FOR_ENUM[kind] : '-';
};

export const translateTransactionStatus = (status) => {
	const TRASN_STATUS = {
		SUCCESS: 'Berhasil',
		PENDING: 'Pending',
		FAILED: 'Gagal',
	};

	return status ? TRASN_STATUS[status] : '-';
};
