import RequestAdapterService from './request-adapter';

export default class BrandService extends RequestAdapterService {
	async createBrand(brand) {
		try {
			const { data } = await super.sendPostMultipartRequest(
				`${this.baseUrl}/v1/brands`,
				brand
			);

			return data;
		} catch (error) {
			console.error(error);
			throw new Error(
				`Fail creating brand:${super.generateErrorMessage(error)}`
			);
		}
	}

	async editBrand(id, brand) {
		try {
			const { data } = await super.sendPostMultipartRequest(
				`${this.baseUrl}/v1/brands/${id}?_method=PATCH`,
				brand
			);

			return data;
		} catch (error) {
			console.error(error);
			throw new Error(
				`Fail updating brand:${super.generateErrorMessage(error)}`
			);
		}
	}

	async getBrandById(id) {
		try {
			const { data } = await super.sendGetRequest(
				`${this.baseUrl}/v1/brands/${id}`
			);

			return data;
		} catch (error) {
			console.error(error);
			throw new Error(
				`Fail getting brand detail: ${${super.generateErrorMessage(error)}(
					error
				)}`
			);
		}
	}
}
