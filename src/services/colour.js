import RequestAdapterService from './request-adapter';

export default class ColourService extends RequestAdapterService {
	async createColour(colour) {
		try {
			const { data } = await super.sendPostMultipartRequest(
				`${this.baseUrl}/v1/colors`,
				colour
			);

			return data;
		} catch (error) {
			console.error(error);
			throw new Error(
				`Fail creating colour: ${super.generateErrorMessage(error)}`
			);
		}
	}

	async editColour(id, colour) {
		try {
			const { data } = await super.sendPostMultipartRequest(
				`${this.baseUrl}/v1/colors/${id}?_method=PATCH`,
				colour
			);

			return data;
		} catch (error) {
			console.error(error);
			throw new Error(
				`Fail updating colour: ${super.generateErrorMessage(error)}`
			);
		}
	}

	async getColourById(id) {
		try {
			const data = await super.sendGetRequest(
				`${this.baseUrl}/v1/colors/${id}`
			);

			return data;
		} catch (error) {
			console.error(error);
			throw new Error(
				`Fail getting colour detail: ${super.generateErrorMessage(
					error
				)}`
			);
		}
	}
}
