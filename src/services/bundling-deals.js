import RequestAdapterService from './request-adapter';

export default class DailyDealsService extends RequestAdapterService {
	async updateBundlingDeals(id, bundling) {
		try {
			const { data } = await super.sendPostMultipartRequest(
				`${this.baseUrl}/v1/bundling-deals/${id}`,
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

	async getPackageById(id) {
		try {
			const { data } = await super.sendGetRequest(
				`${this.baseUrl}/v1/bundling-deals/${id}`
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
