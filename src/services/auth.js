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
			console.log(error);
			throw new Error(`Login failed: ${error.response.data.message}`);
		}
	}
}
