import RequestAdapterService from './request-adapter';

export default class CategoryService extends RequestAdapterService {
	async createCategory(category) {
		try {
			const { data } = await super.sendPostMultipartRequest(
				`${this.baseUrl}/v1/base_categories`,
				category
			);

			return data;
		} catch (error) {
			console.error(error);
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
			console.error(error);
			throw new Error(
				`Fail deleting bank: ${error.response.data.message} - ${
					error.response.data.errors
						? error.response.data.errors.code
						: 'Error'
				} `
			);
		}
	}

	async editCategory(id, category) {
		try {
			const { data } = await super.sendPostMultipartRequest(
				`${this.baseUrl}/v1/base_categories/${id}?_method=PATCH`,
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

	async exportAsCSV(params, properties) {
		try {
			const { data } = await this.getCategories(params);

			super.dowloadDataAsCSV(data, properties, 'Base Category List');
		} catch (error) {
			console.error(error);
			throw new Error(
				`Exporting Category as CSV: ${error.response.data.message} - ${
					error.response.data.errors
						? error.response.data.errors.code
						: 'Error'
				} `
			);
		}
	}

	async getCategories(params) {
		try {
			const { data } = await super.sendGetRequest(
				`${this.baseUrl}/v1/base_categories`,
				params
			);

			return data;
		} catch (error) {
			console.error(error);
			throw new Error(
				`Getting category data: ${error.response.data.message} - ${
					error.response.data.errors
						? error.response.data.errors.code
						: 'Error'
				} `
			);
		}
	}

	async getCategoryById(id) {
		try {
			const { data } = await super.sendGetRequest(
				`${this.baseUrl}/v1/base_categories/${id}`
			);
			return data;
		} catch (error) {
			console.error(error);
			throw new Error(
				`Fail getting category detail: ${
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
			const { data } = await super.sendPostRequest(
				`${this.baseUrl}/v1/base_categories/${id}/${
					status ? 'deactivate' : 'activate'
				}`,
				{}
			);

			return data;
		} catch (error) {
			console.error(error);
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
