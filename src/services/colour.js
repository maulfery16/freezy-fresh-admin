import RequestAdapterService from './request-adapter';

export default class ColourService extends RequestAdapterService {
	async createColour(colour) {
		try {
			const { data } = await super.sendPostRequest(
				`${this.baseUrl}/v1/colors`,
				colour
			);

			return data;
		} catch (error) {
			console.error(error);
			throw new Error(
				`Fail creating colour: ${error.response.data.message} - ${error.response.status} `
			);
		}
	}

	async editColour(id, colour) {
		try {
			const { data } = await super.sendPatchRequest(
				`${this.baseUrl}/v1/colors/${id}`,
				colour
			);

			return data;
		} catch (error) {
			console.error(error);
			throw new Error(
				`Fail updating colour: ${error.response.data.message} - ${error.response.status} `
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
				`Fail getting colour detail: ${error.response.data.message} - ${error.response.status} `
			);
		}
	}
}
