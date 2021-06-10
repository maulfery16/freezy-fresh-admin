import RequestAdapterService from './request-adapter';

export default class RecommendationService extends RequestAdapterService {
	async createRecommendation(dataToSend) {
		try {
			const { data } = await super.sendPostMultipartRequest(
				`${this.baseUrl}/v1/recommendations`,
				dataToSend
			);

			return data;
		} catch (error) {
			console.error(error);
			throw new Error(
				`Fail creating product recommendation: ${super.generateErrorMessage(
					error
				)}`
			);
		}
	}

	async editRecommendation(id, dataToSend) {
		try {
			const { data } = await super.sendPostMultipartRequest(
				`${this.baseUrl}/v1/recommendations/${id}?_method=PATCH`,
				dataToSend
			);

			return data;
		} catch (error) {
			console.error(error);
			throw new Error(
				`Fail updating product recommendation: ${super.generateErrorMessage(
					error
				)}`
			);
		}
	}

	async getRecommendation() {
		try {
			const { data } = await super.sendGetRequest(
				`${this.baseUrl}/v1/recommendations`
			);

			return data;
		} catch (error) {
			console.error(error);
			throw new Error(
				`Fail getting product recommendation: ${super.generateErrorMessage(
					error
				)}`
			);
		}
	}

	async assignProduct(id, products) {
		try {
			const { data } = await super.sendPostRequest(
				`${this.baseUrl}/v1/recommendations/${id}/products`, products
			);

			return data;
		} catch (error) {
			console.error(error);
			throw new Error(
				`Fail assign products to product recommendation: ${super.generateErrorMessage(
					error
				)}`
			);
		}
	}
}
