export function convertFriendshipStatus(status) {
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

	return GENDER_ENUM[gender];
}
