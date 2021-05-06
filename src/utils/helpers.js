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

export function generateFormFailedError(errors) {
	if (errors) {
		console.error(errors.errorFields);

		let detail = [];
		errors.errorFields.map((item) => {
			detail.push(item.errors);
		});

		return detail.join(',\n');
	} else return null;
}
