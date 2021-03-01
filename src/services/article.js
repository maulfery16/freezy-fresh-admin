import RequestAdapterService from './request-adapter';

export default class articleservice extends RequestAdapterService {
	async createArticle(article) {
		try {
			const { data } = await super.sendPostMultipartRequest(
				`${this.baseUrl}/v1/articles`,
				article
			);

			return data;
		} catch (error) {
			console.error(error);
			throw new Error(
				`Fail creating article:${super.generateErrorMessage(error)}`
			);
		}
	}

	async editArticle(id, article) {
		try {
			const { data } = await super.sendPostMultipartRequest(
				`${this.baseUrl}/v1/articles/${id}?_method=PATCH`,
				article
			);

			return data;
		} catch (error) {
			console.error(error);
			throw new Error(
				`Fail updating article:${super.generateErrorMessage(error)}`
			);
		}
	}

	async getArticleById(id) {
		try {
			const { data } = await super.sendGetRequest(
				`${this.baseUrl}/v1/articles/${id}`
			);

			return data;
		} catch (error) {
			console.error(error);
			throw new Error(
				`Fail getting article detail: ${super.generateErrorMessage(
					error
				)}`
			);
		}
	}

	async setArticleAsPrimary(id) {
		try {
			const {
				data,
			} = await super.sendPostRequest(
				`${this.baseUrl}/v1/articles/${id}/primary`,
				{ id }
			);

			return data;
		} catch (error) {
			console.error(error);
			throw new Error(
				`Setting article as primary: ${super.generateErrorMessage(
					error
				)}`
			);
		}
	}
}
