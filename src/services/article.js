import RequestAdapterService from './request-adapter';

export default class ArticleService extends RequestAdapterService {
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
				`Fail creating article: ${error.response.data.message} - ${
					error.response.data.errors
						? error.response.data.errors.code
						: 'Error'
				} `
			);
		}
	}

	async deleteArticle(id) {
		try {
			return await super.sendDeleteRequest(
				`${this.baseUrl}/v1/articles/${id}`,
				{ id }
			);
		} catch (error) {
			console.error(error);
			throw new Error(
				`Fail deleting admin: ${error.response.data.message} - ${
					error.response.data.errors
						? error.response.data.errors.code
						: 'Error'
				} `
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
				`Fail updating article: ${error.response.data.message} - ${
					error.response.data.errors
						? error.response.data.errors.code
						: 'Error'
				} `
			);
		}
	}

	async exportAsCSV(params, properties) {
		try {
			const { data } = await this.getArticles(params);
			super.dowloadDataAsCSV(data, properties, 'Article List');
		} catch (error) {
			console.error(error);
			throw new Error(
				`Exporting Article as CSV: ${error.response.data.message} - ${
					error.response.data.errors
						? error.response.data.errors.code
						: 'Error'
				} `
			);
		}
	}

	async getArticles(params) {
		try {
			const { data } = await super.sendGetRequest(
				`${this.baseUrl}/v1/articles`,
				params
			);

			return data;
		} catch (error) {
			console.error(error);
			throw new Error(
				`Getting article data: ${error.response.data.message} - ${
					error.response.data.errors
						? error.response.data.errors.code
						: 'Error'
				} `
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
				`Fail getting article detail: ${
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
