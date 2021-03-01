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

	async getAuthenticatedUser() {
		try {
			const { data } = await super.sendGetRequest(
				`${this.baseUrl}/v1/user/profile`,
				{}
			);

			return data;
		} catch (error) {
			console.error(error);
			throw new Error(
				`Get authenticated user failed: ${
					error.response.data.message
				} - ${
					error.response.data.errors
						? error.response.data.errors.code
						: 'Error'
				} `
			);
		}
	}

	async reqOverrideAuthToken() {
		return await super.overrideAuthToken();
	}

	async reqRefreshToken() {
		try {
			const { data } = await super.sendPostRequest(
				`${this.baseUrl}/v1/clients/web/admin/refresh`,
				{}
			);

			return data;
		} catch (error) {
			console.error(error);
			throw new Error(
				`Refresh Token failed: ${error.response.data.message} - ${error.response.status}`
			);
		}
	}

	async reqForgotPassword(email) {
		try {
			const { data } = await super.sendPostRequest(
				`${this.baseUrl}/v1/password/forgot`,
				email
			);

			return data;
		} catch (error) {
			console.error(error);
			throw new Error(
				`Forgot Password failed: ${
					error.response.status === 404
						? 'Your account is not registered'
						: error.response.data.message +
						  // eslint-disable-next-line no-mixed-spaces-and-tabs
						  ' ' +
						  // eslint-disable-next-line no-mixed-spaces-and-tabs
						  error.response.status +
						  // eslint-disable-next-line no-mixed-spaces-and-tabs
						  ' ' +
						  // eslint-disable-next-line no-mixed-spaces-and-tabs
						  error.response.data.errors
						? error.response.data.errors.code
						: 'Error'
				}`
			);
		}
	}

	async reqResetPassword(credential) {
		try {
			const { data } = await super.sendPostRequest(
				`${this.baseUrl}/v1/password/reset`,
				credential
			);

			return data;
		} catch (error) {
			console.error(error);
			throw new Error(
				`Reset Password failed: ${error.response.data.message} \n
				${error.response.status} - ${
					error.response.data.errors
						? error.response.data.errors.code
						: 'Error'
				} `
			);
		}
	}
}
