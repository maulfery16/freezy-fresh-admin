export function translateFriendshipStatus(status) {
	return status
		? status === 'Requested'
			? 'Menunggu Konfirmasi'
			: 'Disetujui'
		: '';
}

export const getURLParams = (url) => {
	const searchParams = new URLSearchParams(url);
	const params = {};
	for (let param of searchParams) params[param[0]] = param[1];

	return params;
};

export function translateGenderEnum(gender) {
	const GENDER_ENUM = {
		FEMALE: 'Perempuan',
		MALE: 'Laki-laki',
	};

	return gender ? GENDER_ENUM[gender] : '-';
}

export function translateTransactionKind(kind) {
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
}

export function convertToRupiah(angka) {
	let rupiah = '';
	const angkarev = angka.toString().split('').reverse().join('');
	for (let i = 0; i < angkarev.length; i++)
		if (i % 3 === 0) rupiah += angkarev.substr(i, 3) + '.';

	return rupiah
		.split('', rupiah.length - 1)
		.reverse()
		.join('');
}
