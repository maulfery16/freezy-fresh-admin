export const translateTransactionKind = (kind) => {
	switch (kind) {
		case 'adjustment_credit':
			return 'Adjustment Credit';
		case 'adjustment_debt':
			return 'Adjustment Debit';
		case 'cashback':
			return 'Cashback';
		case 'payment':
			return 'Pembayaran';
		case 'refund':
			return 'Pengembalian Dana';
		case 'top_up':
			return 'Top Up';
		default:
			'';
	}
};

export const translateTransactionStatus = (status) => {
	switch (status) {
		case 'success':
			return 'Berhasil';
		case 'pending':
			return 'Pending';
		case 'failed':
			return 'Gagal';
		default:
			'';
	}
};
