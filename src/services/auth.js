import RequestAdapterService from './request-adapter';

import store from '../stores/store';
import {
	setAuthToken,
	setCurrentUser,
	setLoginStatus,
} from '../stores/auth/actions';

export default class AuthService extends RequestAdapterService {
	async login(credential) {
		try {
			const { access_token } = await super.sendPostRequest(
				`${this.baseUrl}/v1/clients/web/admin/login`,
				credential
			);

			store.dispatch(setAuthToken(access_token));
			store.dispatch(setLoginStatus(true));
		} catch (error) {
			throw new Error(`Login failed: ${error.response.data.message}`);
		}
	}

	logout() {
		store.dispatch(setAuthToken(null));
		store.dispatch(setCurrentUser(null));

		store.dispatch(setLoginStatus(false));
		super.overrideAuthToken(null);
	}
}
