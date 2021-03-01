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
				`Fail creating category:${super.generateErrorMessage(error)}`
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
				`Fail updating category:${super.generateErrorMessage(error)}`
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
				`Fail getting category detail: ${super.generateErrorMessage(
					error
				)}`
			);
		}
	}
}
