import RequestAdapterService from './request-adapter';

export default class MasterService extends RequestAdapterService {
	async getOptions(url, params) {
		try {
			const { data } = await super.sendGetRequest(
				`${this.baseUrl}/v1/${url}`,
				{
					...params,
					limit: 300,
				}
			);

			return data;
		} catch (error) {
			console.error(error);
			throw new Error(
				`Getting options:${super.generateErrorMessage(error)}`
			);
		}
	}
}
