import AuthTypes from './types';

const INITIAL_STATE = {
	isLoggedIn: false,
	isRememberMe: false,
	token: '',
	refreshToken: '',
	user: {
		domicile: 'Bandung',
		id: null,
		name: 'John Doe',
		role: 'Administrator',
		joined_at: new Date(),
		branches: ['Jakarta Pusat', 'Jakarta Barat', 'Bandung'],
	},
};

const authReducer = (state = INITIAL_STATE, action) => {
	switch (action.type) {
		case AuthTypes.SET_AUTH_TOKEN:
			return {
				...state,
				token:
					'eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJhdWQiOiIyIiwianRpIjoiZjRmMDg0NGMxZDBmYWUyNTc0OTVhZGNhYWY2YjUwMzM3NDc3ODFjZDg2ZDE5NjYxYTUyMGUxNTg0NmU4ZjhhZjMxZjdkOWM3OTQzOWJjNTkiLCJpYXQiOiIxNjEzNDYyMjE3LjA1ODAzNCIsIm5iZiI6IjE2MTM0NjIyMTcuMDU4MDM3IiwiZXhwIjoiMTYxMzU0ODYxNy4wNDE1NTAiLCJzdWIiOiIxIiwic2NvcGVzIjpbXX0.GvNFpvGpq7ZauQF49fZqEPEfM8vgyW6gDl3gi3JrUXtXCPImJ9rfZ-N0xw6TGGNpfULd-E7PNqWcnQeM3Q5kkwjivlZADSX1Na9avFhsruV08vfMvkYg-D6rKebvpz_oGC5-JyFL-AZojN3nA55FIi1fThnTwVGkIQNUvB2vMv2sDDazOap0tTD_RnAJTttLUhh8KAJ9bH_aWy2dpojGnpKC_Vg9jnG1wOxKfIYHVc4wGwWS8ruuB2eNFY3buvovFyEFwHI5QEvOpdQvsTWmZnpLWzyEUZtMRE3nDP2HIyv-vAQVVmTZvwchXqFelTkYyusfpaskHVeB2GPXdC6sVDfs_9mOd60fi7QKx2SnEDVjemGpO5OFpLHpNWgFGPq_6obhCuE2c1iCEKjPzNTLWdR-QgDwc8B0sqQ-sZ9966BoFQC7qAxAmQPUV8uONHC2Sn_8EQf6BHsk4kEKEn1tAnY1LDe6AE0NXcIeYnJZguPvEB-MAgm4DyUWGz81UGlowBEqVlI8cqtuAHq5famZEnfLvkWRWgoAl8o6PGRteAD6w4yUFwfl3nnqvTknmPNG1BWBP47RygnCeADB_4dM4N04sjtCa7n3xPNDpesH_qgdZtF-bf6wDseXzia4Rq8pvgjCG-qNdCb8O9F9oKB557P9zPe25H5bpa3U1gMgyFE',
				// token: action.payload,
			};
		case AuthTypes.SET_CURRENT_USER:
			return {
				...state,
				user: action.payload,
			};
		case AuthTypes.SET_LOGIN_STATUS:
			return {
				...state,
				// isLoggedIn: action.payload,
				isLoggedIn: true,
			};
		case AuthTypes.SET_REFRESH_TOKEN:
			return {
				...state,
				refreshToken: action.payload,
			};
		case AuthTypes.SET_REMEMBER_ME_STATUS:
			return {
				...state,
				isRememberMe: action.payload,
			};
		case AuthTypes.SET_SIDER_VISIBILITY:
			return {
				...state,
				isSiderVisible: action.payload,
			};
		default:
			return state;
	}
};

export default authReducer;
