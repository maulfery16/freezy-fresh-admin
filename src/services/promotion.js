import RequestAdapterService from './request-adapter';

export default class PromotionService extends RequestAdapterService {
	async updateStatusByID(id) {
		try {
			const { data } = await super.sendPatchRequest(
				`${this.baseUrl}/v1/promotions/status-change/${id}`
			);

			return data;
		} catch (error) {
			console.error(error);
			throw new Error(
				`Fail updating status promotion: ${super.generateErrorMessage(
					error
				)}`
			);
		}
	}

	async createPromotion(promotion) {
		try {
			const { data } = await super.sendPostMultipartRequest(
				`${this.baseUrl}/v1/promotions`,
				promotion
			);

			return data;
		} catch (error) {
			console.error(error);
			throw new Error(
				`Fail creating promotion:${super.generateErrorMessage(error)}`
			);
		}
	}

	async editPromotion(id, promotion) {
		try {
			const { data } = await super.sendPostMultipartRequest(
				`${this.baseUrl}/v1/promotions/${id}?_method=PATCH`,
				promotion
			);

			return data;
		} catch (error) {
			console.error(error);
			throw new Error(
				`Fail updating promotion:${super.generateErrorMessage(error)}`
			);
		}
	}

	async getPromotionById(id) {
		try {
			const { data } = await super.sendGetRequest(
				`${this.baseUrl}/v1/promotions/${id}`
			);

			return data;
		} catch (error) {
			console.error(error);
			throw new Error(
				`Fail getting promotion detail: ${super.generateErrorMessage(
					error
				)}`
			);
		}
	}

	async addProductsToPromotion(id, products) {
		try {
			const { data } = await super.sendPostRequest(
				`${this.baseUrl}/v1/promotions/${id}/product/create`,
				products
			);

			return data;
		} catch (error) {
			console.error(error);
			throw new Error(
				`Fail adding products to promotion: ${super.generateErrorMessage(
					error
				)}`
			);
		}
	}

	async getProductsInPromotion(id) {
		try {
			const { data } = await super.sendGetRequest(
				`${this.baseUrl}/v1/promotions/${id}/product/fetch`
			);

			return data;
		} catch (error) {
			console.error(error);
			throw new Error(
				`Fail getting promotion products: ${super.generateErrorMessage(
					error
				)}`
			);
		}
	}
}
