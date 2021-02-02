import RequestAdapterService from './request-adapter';

export default class AdminService extends RequestAdapterService {
	async getTotalAdmin(params) {
		try {
			const data = await super.sendGetRequest(
				`${this.baseUrl}/admin/count`,
				params
			);

			return data;
		} catch (error) {
			throw new Error(
				`Getting total admin: ${error.response.data.message}`
			);
		}
	}
}
