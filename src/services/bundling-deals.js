import RequestAdapterService from './request-adapter';

export default class DailyDealsService extends RequestAdapterService {
	async updateBundlingDeals(bundling) {
		try {
			const { data } = await super.sendPostRequest(
				`${this.baseUrl}/v1/bundling-deals?_method=PATCH`,
				bundling
			);

			return data;
		} catch (error) {
			console.error(error);
			throw new Error(
				`Fail updating bundling deals: ${super.generateErrorMessage(
					error
				)}`
			);
		}
	}

	async getBundlingDeals() {
		try {
			const { data } = await super.sendGetRequest(
				`${this.baseUrl}/v1/bundling-deals`
			);

			return data;
		} catch (error) {
			console.error(error);
			throw new Error(
				`Fail getting bundling deals: ${super.generateErrorMessage(
					error
				)}`
			);
		}
	}
}
