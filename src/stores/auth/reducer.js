import AuthTypes from './types';

const INITIAL_STATE = {
	isLoggedIn: false,
	isRememberMe: false,
	token: '',
	refreshToken: '',
	user: {
		id: null,
		first_name: 'John',
		last_name: 'Doe',
		role: 'Administrator',
		created_at: new Date(),
		branches: ['Jakarta Pusat', 'Jakarta Barat', 'Bandung'],
	},
};

const authReducer = (state = INITIAL_STATE, action) => {
	switch (action.type) {
		case AuthTypes.SET_AUTH_TOKEN:
			return {
				...state,
				token: action.payload,
			};
		case AuthTypes.SET_CURRENT_USER:
			return {
				...state,
				user: action.payload,
			};
		case AuthTypes.SET_LOGIN_STATUS:
			return {
				...state,
				isLoggedIn: action.payload,
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
