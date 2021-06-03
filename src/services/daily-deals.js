import RequestAdapterService from './request-adapter';

export default class DailyDealsService extends RequestAdapterService {
	async createDailyDeals(dailyDeals) {
		try {
			const { data } = await super.sendPostMultipartRequest(
				`${this.baseUrl}/v1/daily-deals`,
				dailyDeals
			);

			return data;
		} catch (error) {
			console.error(error);
			throw new Error(
				`Fail creating daily deals: ${super.generateErrorMessage(
					error
				)}`
			);
		}
	}

	async editDailyDeals(id, dailyDeals) {
		try {
			const { data } = await super.sendPostMultipartRequest(
				`${this.baseUrl}/v1/daily-deals/${id}?_method=PATCH`,
				dailyDeals
			);

			return data;
		} catch (error) {
			console.error(error);
			throw new Error(
				`Fail updating daily deals: ${super.generateErrorMessage(
					error
				)}`
			);
		}
	}

	async getDailyDeals() {
		try {
			const { data } = await super.sendGetRequest(
				`${this.baseUrl}/v1/daily-deals`
			);

			return data;
		} catch (error) {
			console.error(error);
			throw new Error(
				`Fail getting daily deals: ${super.generateErrorMessage(
					error
				)}`
			);
		}
	}

	async assignProduct(id, products) {
		try {
			const { data } = await super.sendPostRequest(
				`${this.baseUrl}/v1/daily-deals/${id}/products`, products
			);

			return data;
		} catch (error) {
			console.error(error);
			throw new Error(
				`Fail assign products to daily deals: ${super.generateErrorMessage(
					error
				)}`
			);
		}
	}
}
