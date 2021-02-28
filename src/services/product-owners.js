import RequestAdapterService from './request-adapter';

export default class ProductOwnersService extends RequestAdapterService {
	async createProductOwner(productOwners) {
		try {
			const { data } = await super.sendPostMultipartRequest(
				`${this.baseUrl}/v1/product_owners`,
				productOwners
			);

			return data;
		} catch (error) {
			console.error(error);
			throw new Error(
				`Fail creating product owner: ${
					error.response.data.message
				} - ${
					error.response.data.errors
						? error.response.data.errors.code
						: 'Error'
				} `
			);
		}
	}

	async editProductOwner(id, productOwners) {
		try {
			const { data } = await super.sendPostMultipartRequest(
				`${this.baseUrl}/v1/product_owners/${id}?_method=PATCH`,
				productOwners
			);

			return data;
		} catch (error) {
			throw new Error(
				`Fail updating product owner: ${
					error.response.data.message
				} - ${
					error.response.data.errors
						? error.response.data.errors.code
						: 'Error'
				} `
			);
		}
	}

	async getProductOwnerById(id) {
		try {
			const { data } = await super.sendGetRequest(
				`${this.baseUrl}/v1/product_owners/${id}`
			);
			return data;
		} catch (error) {
			console.error(error);
			throw new Error(
				`Fail getting product owner detail: ${
					error.response.data.message
				} - ${
					error.response.data.errors
						? error.response.data.errors.code
						: 'Error'
				} `
			);
		}
	}
}
