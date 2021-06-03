import RequestAdapterService from './request-adapter';

export default class AdditionalSectionService extends RequestAdapterService {
	async createAdditionalSection(sectionData) {
		try {
			const { data } = await super.sendPostMultipartRequest(
				`${this.baseUrl}/v1/additional-home-sections`,
				sectionData
			);

			return data;
		} catch (error) {
			console.error(error);
			throw new Error(
				`Fail creating additional home sections: ${super.generateErrorMessage(
					error
				)}`
			);
		}
	}

	async editAdditionalSection(id, dataToEdit) {
		try {
			const { data } = await super.sendPostMultipartRequest(
				`${this.baseUrl}/v1/additional-home-sections/${id}?_method=PATCH`,
				dataToEdit
			);

			return data;
		} catch (error) {
			console.error(error);
			throw new Error(
				`Fail updating additional home sections: ${super.generateErrorMessage(
					error
				)}`
			);
		}
	}

	async getAllSections() {
		try {
			const { data } = await super.sendGetRequest(
				`${this.baseUrl}/v1/additional-home-sections`
			);

			return data;
		} catch (error) {
			console.error(error);
			throw new Error(
				`Fail getting additional home sections: ${super.generateErrorMessage(
					error
				)}`
			);
		}
	}

	async findSectionById(id) {
		try {
			const { data } = await super.sendGetRequest(
				`${this.baseUrl}/v1/additional-home-sections/${id}`
			);

			return data;
		} catch (error) {
			console.error(error);
			throw new Error(
				`Fail getting additional home sections: ${super.generateErrorMessage(
					error
				)}`
			);
		}
	}

	async assignProduct(id, products) {
		try {
			const { data } = await super.sendPostRequest(
				`${this.baseUrl}/v1/additional-home-sections/${id}/products`, products
			);

			return data;
		} catch (error) {
			console.error(error);
			throw new Error(
				`Fail assign products to additional home sections: ${super.generateErrorMessage(
					error
				)}`
			);
		}
	}
}
