import RequestAdapterService from './request-adapter';

export default class AdditionalCategoryService extends RequestAdapterService {
	async createAdditionalCategory(additionalCategory) {
		try {
			const { data } = await super.sendPostRequest(
				`${this.baseUrl}/products/additional-category`,
				additionalCategory
			);

			return data;
		} catch (error) {
			console.error(error);
			throw new Error(
				`Fail creating additional category: ${
					error.response.data.message
				} - ${
					error.response.data.errors
						? error.response.data.errors.code
						: 'Error'
				} `
			);
		}
	}

	async deleteAdditionalCategory(id) {
		try {
			return await super.sendDeleteRequest(
				`${this.baseUrl}/products/additional-category/${id}`,
				{ id }
			);
		} catch (error) {
			console.error(error);
			throw new Error(
				`Fail deleting additional category: ${
					error.response.data.message
				} - ${
					error.response.data.errors
						? error.response.data.errors.code
						: 'Error'
				} `
			);
		}
	}

	async editAdditionalCategory(id, additionalCategory) {
		try {
			const { data } = await super.sendPutRequest(
				`${this.baseUrl}/products/additional-category/${id}`,
				additionalCategory
			);

			return data;
		} catch (error) {
			console.error(error);
			throw new Error(
				`Fail updating additional category: ${
					error.response.data.message
				} - ${
					error.response.data.errors
						? error.response.data.errors.code
						: 'Error'
				} `
			);
		}
	}

	async getAdditionalCategoryById(id) {
		try {
			const data = await super.sendGetRequest(
				`${this.baseUrl}/products/additional-category/${id}`
			);

			return data;
		} catch (error) {
			console.error(error);
			throw new Error(
				`Fail getting additional category detail: ${
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
