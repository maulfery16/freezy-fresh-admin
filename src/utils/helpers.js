export function convertFriendshipStatus(status) {
	return status
		? status === 'Requested'
			? 'Menunggu Konfirmasi'
			: 'Disetujui'
		: '';
}

export function translateGenderEnum(gender) {
	const GENDER_ENUM = {
		FEMALE: 'Perempuan',
		MALE: 'Laki-laki',
	};

	return GENDER_ENUM[gender];
}
