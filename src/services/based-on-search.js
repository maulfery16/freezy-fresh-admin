import RequestAdapterService from './request-adapter';

export default class BasedOnSearchService extends RequestAdapterService {
	async createBasedOnSearch(basedOnSearch) {
		try {
			const { data } = await super.sendPostMultipartRequest(
				`${this.baseUrl}/v1/based-on-your-searches`,
				basedOnSearch
			);

			return data;
		} catch (error) {
			console.error(error);
			throw new Error(
				`Fail creating based on search: ${super.generateErrorMessage(
					error
				)}`
			);
		}
	}

	async editBasedOnSearch(id, basedOnSearch) {
		try {
			const { data } = await super.sendPostMultipartRequest(
				`${this.baseUrl}/v1/based-on-your-searches/${id}?_method=PATCH`,
				basedOnSearch
			);

			return data;
		} catch (error) {
			console.error(error);
			throw new Error(
				`Fail updating based on search: ${super.generateErrorMessage(
					error
				)}`
			);
		}
	}

	async getBasedOnSearch() {
		try {
			const { data } = await super.sendGetRequest(
				`${this.baseUrl}/v1/based-on-your-searches`
			);

			return data;
		} catch (error) {
			console.error(error);
			throw new Error(
				`Fail getting based on search: ${super.generateErrorMessage(
					error
				)}`
			);
		}
	}

	async assignProduct(id, products) {
		try {
			const { data } = await super.sendPostRequest(
				`${this.baseUrl}/v1/based-on-your-searches/${id}/products`, products
			);

			return data;
		} catch (error) {
			console.error(error);
			throw new Error(
				`Fail assign products to based on search: ${super.generateErrorMessage(
					error
				)}`
			);
		}
	}
}
