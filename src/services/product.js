import RequestAdapterService from './request-adapter';

export default class ProductService extends RequestAdapterService {
	async getProductById(id) {
		try {
			const { data } = await super.sendGetRequest(
				`${this.baseUrl}/v1/products/${id}`
			);

			return data;
		} catch (error) {
			console.error(error);
			throw new Error(
				`Fail getting product detail: ${super.generateErrorMessage(
					error
				)}`
			);
		}
	}
}
