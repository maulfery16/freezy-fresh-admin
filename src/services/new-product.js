import RequestAdapterService from './request-adapter';

export default class NewProductService extends RequestAdapterService {
	async createNewProduct(newProduct) {
		try {
			const { data } = await super.sendPostMultipartRequest(
				`${this.baseUrl}/v1/new-products`,
				newProduct
			);

			return data;
		} catch (error) {
			console.error(error);
			throw new Error(
				`Fail creating new product: ${super.generateErrorMessage(
					error
				)}`
			);
		}
	}

	async editNewProduct(id, newProduct) {
		try {
			const { data } = await super.sendPostMultipartRequest(
				`${this.baseUrl}/v1/new-products/${id}?_method=PATCH`,
				newProduct
			);

			return data;
		} catch (error) {
			console.error(error);
			throw new Error(
				`Fail updating new product: ${super.generateErrorMessage(
					error
				)}`
			);
		}
	}

	async getNewProducts() {
		try {
			const data = await super.sendGetRequest(
				`${this.baseUrl}/v1/new-products`
			);

			return data;
		} catch (error) {
			console.error(error);
			throw new Error(
				`Fail getting new products: ${super.generateErrorMessage(
					error
				)}`
			);
		}
	}

	async getNewProductById(id) {
		try {
			const data = await super.sendGetRequest(
				`${this.baseUrl}/v1/new-products/${id}`
			);

			return data;
		} catch (error) {
			console.error(error);
			throw new Error(
				`Fail getting new product detail: ${super.generateErrorMessage(
					error
				)}`
			);
		}
	}
}
