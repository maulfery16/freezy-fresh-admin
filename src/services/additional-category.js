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
				`Fail creating additional category: ${error.response.data.message} - ${error.response.status} `
			);
		}
	}

	async deleteAdditionalCategory(id) {
		try {
			return await super.sendDeleteRequest(
				`${this.baseUrl}/v1/additional_categories/${id}`,
				{ id }
			);
		} catch (error) {
			console.error(error);
			throw new Error(
				`Fail deleting additional category:  ${error.response.data.message} - ${error.response.status} `
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
				`Fail updating additional category:  ${error.response.data.message} - ${error.response.status} `
			);
		}
	}

	async exportAsCSV(params, properties) {
		try {
			const { data } = await this.getAdditionalCategories(params);
			super.dowloadDataAsCSV(
				data,
				properties,
				'Additional Category List'
			);
		} catch (error) {
			console.error(error);
			throw new Error(
				`Exporting Additional Category as CSV: ${error.response.data.message} - ${error.response.status} `
			);
		}
	}

	async getAdditionalCategories(params) {
		try {
			const { data } = await super.sendGetRequest(
				`${this.baseUrl}/v1/additional_categories`,
				params
			);

			return data;
		} catch (error) {
			console.error(error);
			throw new Error(
				`Getting additional category data: ${error.response.data.message} - ${error.response.status} 
				} `
			);
		}
	}

	async getAdditionalCategoryById(id) {
		try {
			const data = await super.sendGetRequest(
				`${this.baseUrl}/v1/additional_categories/${id}`
			);

			return data;
		} catch (error) {
			console.error(error);
			throw new Error(
				`Fail getting additional category detail: ${error.response.data.message} - ${error.response.status} `
			);
		}
	}
}
