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
			throw new Error(
				`Fail creating brand: ${error.response.data.message} - ${error.response.data.errors.code} `
			);
		}
	}

	async deleteBrand(id) {
		try {
			return await super.sendDeleteRequest(
				`${this.baseUrl}/v1/brands/${id}`,
				{ id }
			);
		} catch (error) {
			throw new Error(
				`Fail deleting admin: ${error.response.data.message} - ${error.response.data.errors.code} `
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
			throw new Error(
				`Fail updating brand: ${error.response.data.message} - ${error.response.data.errors.code} `
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
			throw new Error(
				`Fail getting categiory detail: ${error.response.data.message} - ${error.response.data.errors.code} `
			);
		}
	}

	async updateBrandActiveStatus(id, status) {
		try {
			const { data } = await super.sendPutRequest(
				`${this.baseUrl}/v1/brands/${id}/status`,
				status
			);

			return data;
		} catch (error) {
			throw new Error(
				`Fail updating brand status: ${error.response.data.message} - ${error.response.data.errors.code} `
			);
		}
	}
}
