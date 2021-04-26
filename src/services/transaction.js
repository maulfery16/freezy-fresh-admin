import RequestAdapterService from './request-adapter';

export default class TransactionService extends RequestAdapterService {}

export const translateTransactionKind = (kind) => {
	const TRASN_FOR_ENUM = {
		ADJUSTMENT_CREDIT: 'Adjustment Credit',
		ADJUSTMENT_DEBIT: 'Adjustment Debit',
		CASHBACK: 'Cashback',
		PAYMENT: 'Pembayaran',
		REFUND: 'Pengembalian Dana',
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
