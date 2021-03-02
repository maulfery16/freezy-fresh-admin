import RequestAdapterService from './request-adapter';

export default class AdditionalCategoryService extends RequestAdapterService {
	async createAdditionalCategory(additionalCategory) {
		try {
			const { data } = await super.sendPostRequest(
				`${this.baseUrl}/v1/additional_categories`,
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
			const { data } = await super.sendPatchRequest(
				`${this.baseUrl}/v1/additional_categories/${id}`,
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
				`${this.baseUrl}/v1/additional_categories/${id}`
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
