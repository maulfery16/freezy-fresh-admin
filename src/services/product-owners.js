import RequestAdapterService from './request-adapter';

export default class ProductOwnersService extends RequestAdapterService {
	async createProductOwner(productOwners) {
		try {
			const { data } = await super.sendPostMultipartRequest(
				`${this.baseUrl}/v1/product-owners`,
				productOwners
			);

			return data;
		} catch (error) {
			console.error(error);
			throw new Error(
				`Fail creating product owner: ${super.generateErrorMessage(
					error
				)}`
			);
		}
	}

	async editProductOwner(id, productOwners) {
		try {
			const { data } = await super.sendPostMultipartRequest(
				`${this.baseUrl}/v1/product-owners/${id}?_method=PATCH`,
				productOwners
			);

			return data;
		} catch (error) {
			throw new Error(
				`Fail updating product owner: ${super.generateErrorMessage(
					error
				)}`
			);
		}
	}

	async getProductOwnerById(id) {
		try {
			const { data } = await super.sendGetRequest(
				`${this.baseUrl}/v1/product-owners/${id}`
			);
			return data;
		} catch (error) {
			console.error(error);
			throw new Error(
				`Fail getting product owner detail: ${super.generateErrorMessage(
					error
				)}`
			);
		}
	}
}
