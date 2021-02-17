import RequestAdapterService from './request-adapter';

export default class AuthService extends RequestAdapterService {
	async login(credential) {
		try {
			const { data } = await super.sendPostRequest(
				`${this.baseUrl}/v1/clients/web/admin/login`,
				credential
			);

			return data;
		} catch (error) {
			console.error(error);
			throw new Error(
				`Login failed: ${error.response.data.message} - ${
					error.response.data.errors
						? error.response.data.errors.code
						: 'Error'
				} `
			);
		}
	}

	async reqRefreshToken() {
		try {
			const { data } = await super.sendPostRefreshTokenRequest(
				`${this.baseUrl}/v1/clients/web/admin/refresh`
			);

			return data;
		} catch (error) {
			console.error(error);
			throw new Error(
				`Refresh Token failed: ${error.response.data.message} - ${error.response.status}`
			);
		}
	}

	async reqForgotPassword(credential) {
		try {
			const { data } = await super.sendPostForgotPasswordRequest(
				`${this.baseUrl}/v1/password/forgot`,
				credential
			);

			return data;
		} catch (error) {
			console.error(error);
			throw new Error(
				`Forgot Password failed: ${error.response.data.message} \n
				${error.response.status} - ${
					error.response.data.errors
						? error.response.data.errors.code
						: 'Error'
				} `
			);
		}
	}
}
