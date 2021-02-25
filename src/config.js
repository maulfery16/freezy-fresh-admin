/* eslint-disable no-undef */
let config = {
	API_URL: 'https://api.freezyfresh.abcwork.id',
	STORAGE_URL: 'https://api.freezyfresh.abcwork.id/storage',
};

if (['development', 'staging'].includes(process.env.NODE_ENV)) {
	config['API_URL'] = 'https://api.freezyfresh.abcwork.id';
	config['STORAGE_URL'] = 'https://api.freezyfresh.abcwork.id/storage';
} else if (['production'].includes(process.env.NODE_ENV)) {
	config['API_URL'] = 'https://api.freezyfresh.abcwork.id';
}

export default config;
