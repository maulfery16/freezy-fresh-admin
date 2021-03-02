import RequestAdapterService from './request-adapter';

export default class ArticleCategoryService extends RequestAdapterService {
	async createArticleCategory(category) {
		try {
			const { data } = await super.sendPostMultipartRequest(
				`${this.baseUrl}/v1/article-categories`,
				category
			);

			return data;
		} catch (error) {
			console.error(error);
			throw new Error(
				`Fail creating article category: ${super.generateErrorMessage(
					error
				)}`
			);
		}
	}

	async editArticleCategory(id, category) {
		try {
			const { data } = await super.sendPatchRequest(
				`${this.baseUrl}/v1/article-categories/${id}`,
				category
			);

			return data;
		} catch (error) {
			throw new Error(
				`Fail updating article category: ${super.generateErrorMessage(
					error
				)}`
			);
		}
	}

	async getArticleCategoryById(id) {
		try {
			const { data } = await super.sendGetRequest(
				`${this.baseUrl}/v1/article-categories/${id}`
			);
			return data;
		} catch (error) {
			console.error(error);
			throw new Error(
				`Fail getting article category detail: ${super.generateErrorMessage(
					error
				)}`
			);
		}
	}
}
