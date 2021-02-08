import RequestAdapterService from './request-adapter';

export default class BrandService extends RequestAdapterService {
	async createBrand(brand) {
		try {
			const { data } = await super.sendPostMultipartRequest(
				`${this.baseUrl}/brands`,
				brand
			);

			return data;
		} catch (error) {
			throw new Error(
				`Fail creating brand: ${error.response.data.message}`
			);
		}
	}

	async deleteBrand(id) {
		try {
			return await super.sendDeleteRequest(
				`${this.baseUrl}/products/brand/${id}`,
				{ id }
			);
		} catch (error) {
			throw new Error(
				`Fail deleting admin: ${error.response.data.message}`
			);
		}
	}

	async editBrand(id, brand) {
		try {
			const { data } = await super.sendPutMultipartRequest(
				`${this.baseUrl}/brands/${id}?_method=PATCH`,
				brand
			);

			return data;
		} catch (error) {
			throw new Error(
				`Fail updating brand: ${error.response.data.message}`
			);
		}
	}

	async getBrandById(id) {
		try {
			const { data } = await super.sendGetRequest(
				`${this.baseUrl}/brands/${id}`
			);

			return data;
		} catch (error) {
			throw new Error(
				`Fail getting categiory detail: ${error.response.data.message}`
			);
		}
	}

	async updateBrandActiveStatus(id, status) {
		try {
			const { data } = await super.sendPutRequest(
				`${this.baseUrl}/products/brand/${id}/status`,
				status
			);

			return data;
		} catch (error) {
			throw new Error(
				`Fail updating brand status: ${error.response.data.message}`
			);
		}
	}
}
