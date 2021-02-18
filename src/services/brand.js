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
				`Fail creating brand: ${error.response.data.message} - ${
					error.response.data.errors
						? error.response.data.errors.code
						: 'Error'
				} `
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
				`Fail updating brand: ${error.response.data.message} - ${
					error.response.data.errors
						? error.response.data.errors.code
						: 'Error'
				} `
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
				`Fail getting brand detail: ${error.response.data.message} - ${
					error.response.data.errors
						? error.response.data.errors.code
						: 'Error'
				} `
			);
		}
	}
}
