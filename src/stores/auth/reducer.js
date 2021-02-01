import AuthTypes from './types';

const INITIAL_STATE = {
	isLoggedIn: false,
	token: '',
	user: {
		id: null,
		name: 'John Doe',
		role: 'Administrator',
		joined_at: new Date(),
		domiciles: ['Jakarta Pusat', 'Jakarta Barat', 'Bandung'],
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
