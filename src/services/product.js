import RequestAdapterService from './request-adapter';

export default class ProductService extends RequestAdapterService {
	async createProduct(product) {
		try {
			const { data } = await super.sendPostRequest(
				`${this.baseUrl}/v1/products`,
				product
			);

			return data;
		} catch (error) {
			console.error(error);
			throw new Error(
				`Fail creating product: ${super.generateErrorMessage(error)}`
			);
		}
	}

	async editProduct(id, product) {
		try {
			const { data } = await super.sendPutRequest(
				`${this.baseUrl}/v1/products/${id}?_method=PATCH`,
				product
			);

			return data;
		} catch (error) {
			console.error(error);
			throw new Error(
				`Fail updating product:${super.generateErrorMessage(error)}`
			);
		}
	}

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

	async getTenantProduct(tenant) {
		try {
			const { data } = await super.sendGetRequest(
				`${this.baseUrl}/v1/products/fresh-factory/${tenant}`
			);

			return data;
		} catch (error) {
			console.error(error);
			throw new Error(
				`Fail getting ${tenant} products: ${super.generateErrorMessage(
					error
				)}`
			);
		}
	}

	async getProductDetailByIdAndBranch(id, params) {
		try {
			const { data } = await super.sendGetRequest(
				`${this.baseUrl}/v1/products/${id}/details`,
				params
			);

			return data;
		} catch (error) {
			console.error(error);
			throw new Error(
				`Fail getting product detail by ID and branch: ${super.generateErrorMessage(
					error
				)}`
			);
		}
	}

	async getProductVariantByProductDetaiId(id) {
		try {
			const { data } = await super.sendGetRequest(
				`${this.baseUrl}/v1/products/variant/find/${id}`
			);

			return data;
		} catch (error) {
			console.error(error);
			throw new Error(
				`Fail getting produc variant detail: ${super.generateErrorMessage(
					error
				)}`
			);
		}
	}

	async getNotDiscountProducts() {
		try {
			const { data } = await super.sendGetRequest(
				`${this.baseUrl}/v1/products/not/discounted`
			);

			return data;
		} catch (error) {
			console.error(error);
			throw new Error(
				`Fail getting not discount product: ${super.generateErrorMessage(
					error
				)}`
			);
		}
	}

	async uploadProduct(file) {
		try {
			const { data } = await super.sendPostMultipartRequest(
				`${this.baseUrl}/v1/products/import/excel`,
				file
			);

			return data;
		} catch (error) {
			console.error(error);
			throw new Error(
				`Fail uploading product: ${super.generateErrorMessage(error)}`
			);
		}
	}
}
