import RequestAdapterService from './request-adapter';

export default class AdditionalCategoryService extends RequestAdapterService {
	async createAdditionalCategory(additionalCategory) {
		try {
			const { data } = await super.sendPostMultipartRequest(
				`${this.baseUrl}/v1/additional-categories`,
				additionalCategory
			);

			return data;
		} catch (error) {
			console.error(error);
			throw new Error(
				`Fail creating additional category: ${super.generateErrorMessage(
					error
				)}`
			);
		}
	}

	async editAdditionalCategory(id, additionalCategory) {
		try {
			const { data } = await super.sendPostMultipartRequest(
				`${this.baseUrl}/v1/additional-categories/${id}?_method=PATCH`,
				additionalCategory
			);

			return data;
		} catch (error) {
			console.error(error);
			throw new Error(
				`Fail updating additional category:  ${super.generateErrorMessage(
					error
				)}`
			);
		}
	}

	async getAdditionalCategoryById(id) {
		try {
			const { data } = await super.sendGetRequest(
				`${this.baseUrl}/v1/additional-categories/${id}`
			);

			return data;
		} catch (error) {
			console.error(error);
			throw new Error(
				`Fail getting additional category detail: ${super.generateErrorMessage(
					error
				)}`
			);
		}
	}
}
