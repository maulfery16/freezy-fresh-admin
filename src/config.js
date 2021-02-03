/* eslint-disable no-undef */
let config = {
	API_URL: 'https://api.freezyfresh.abcwork.id',
};

if (['development', 'staging'].includes(process.env.NODE_ENV)) {
	config['API_URL'] = 'https://api.freezyfresh.abcwork.id';
} else if (['production'].includes(process.env.NODE_ENV)) {
	config['API_URL'] = 'https://api.freezyfresh.abcwork.id';
}

export default config;
