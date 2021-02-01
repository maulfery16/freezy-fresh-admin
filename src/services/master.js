import RequestAdapterService from './request-adapter';

export default class AdminService extends RequestAdapterService {
	async getBranches(params) {
		try {
			const data = await super.sendGetRequest(
				`${this.baseUrl}/master/branches`,
				params
			);

			return data;
		} catch (error) {
			throw new Error(`Getting branches: ${error.response.data.message}`);
		}
	}
}
