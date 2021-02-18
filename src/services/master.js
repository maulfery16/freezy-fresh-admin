import RequestAdapterService from './request-adapter';

export default class AdminService extends RequestAdapterService {
	async getOptions(url, params) {
		try {
			const { data } = await super.sendGetRequest(
				`${this.baseUrl}/v1/${url}`,
				params
			);

			return data;
		} catch (error) {
			console.error(error);
			throw new Error(
				`Getting options: ${error.response.data.message} - ${
					error.response.data.errors
						? error.response.data.errors.code
						: 'Error'
				} `
			);
		}
	}
}
