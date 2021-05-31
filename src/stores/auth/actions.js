import AuthTypes from './types';

const setAuthToken = (payload) => ({
	type: AuthTypes.SET_AUTH_TOKEN,
	payload,
});
const setCurrentRole = (payload) => ({
	type: AuthTypes.SET_CURRENT_ROLE,
	payload,
});
const setCurrentUser = (payload) => ({
	type: AuthTypes.SET_CURRENT_USER,
	payload,
});
const setLoginStatus = (payload) => ({
	type: AuthTypes.SET_LOGIN_STATUS,
	payload,
});
const setRefreshToken = (payload) => ({
	type: AuthTypes.SET_REFRESH_TOKEN,
	payload,
});
const setRememberMeStatus = (payload) => ({
	type: AuthTypes.SET_REMEMBER_ME_STATUS,
	payload,
});

export {
	setAuthToken,
	setCurrentRole,
	setCurrentUser,
	setLoginStatus,
	setRefreshToken,
	setRememberMeStatus,
};
