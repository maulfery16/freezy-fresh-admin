import RequestAdapterService from './request-adapter';

export default class DatatableService extends RequestAdapterService {
	async getData(url, params) {
		try {
			const { data } = await super.sendGetRequest(
				`${this.baseUrl}${url}`,
				params
			);

			return data;
		} catch (error) {
			throw new Error(
				`Getting list: ${error.response.data.message} - ${
					error.response.data.errors
						? error.response.data.errors.code
						: 'Error'
				} `
			);
		}
	}
}
