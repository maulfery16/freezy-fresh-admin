import RequestAdapterService from './request-adapter';

export default class CategoryService extends RequestAdapterService {
	async createCategory(category) {
		try {
			const { data } = await super.sendPostRequest(
				`${this.baseUrl}/v1/base_categories`,
				category
			);

			return data;
		} catch (error) {
			throw new Error(
				`Fail creating category: ${error.response.data.message} - ${
					error.response.data.errors
						? error.response.data.errors.code
						: 'Error'
				} `
			);
		}
	}

	async deleteCategory(id) {
		try {
			return await super.sendDeleteRequest(
				`${this.baseUrl}/v1/base_categories/${id}`,
				{ id }
			);
		} catch (error) {
			throw new Error(
				`Fail deleting admin: ${error.response.data.message} - ${
					error.response.data.errors
						? error.response.data.errors.code
						: 'Error'
				} `
			);
		}
	}

	async editCategory(id, category) {
		try {
			const { data } = await super.sendPutRequest(
				`${this.baseUrl}/v1/base_categories/${id}`,
				category
			);

			return data;
		} catch (error) {
			throw new Error(
				`Fail updating category: ${error.response.data.message} - ${
					error.response.data.errors
						? error.response.data.errors.code
						: 'Error'
				} `
			);
		}
	}

	async getCategoryById(id) {
		try {
			const data = await super.sendGetRequest(
				`${this.baseUrl}/v1/base_categories/${id}`
			);

			return data;
		} catch (error) {
			throw new Error(
				`Fail getting categiory detail: ${
					error.response.data.message
				} - ${
					error.response.data.errors
						? error.response.data.errors.code
						: 'Error'
				} `
			);
		}
	}

	async updateCategoryActiveStatus(id, status) {
		try {
			const { data } = await super.sendPutRequest(
				`${this.baseUrl}/v1/base_categories/${id}/status`,
				status
			);

			return data;
		} catch (error) {
			throw new Error(
				`Fail updating category status: ${
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
