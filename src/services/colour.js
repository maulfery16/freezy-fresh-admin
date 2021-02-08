import RequestAdapterService from './request-adapter';

export default class ColourService extends RequestAdapterService {
	async createColour(colour) {
		try {
			const { data } = await super.sendPostRequest(
				`${this.baseUrl}/colour`,
				colour
			);

			return data;
		} catch (error) {
			throw new Error(
				`Fail creating colour: ${error.response.data.message}`
			);
		}
	}

	async deleteColour(id) {
		try {
			return await super.sendDeleteRequest(
				`${this.baseUrl}/colors/${id}`,
				{ id }
			);
		} catch (error) {
			throw new Error(
				`Fail deleting admin: ${error.response.data.message}`
			);
		}
	}

	async editColour(id, colour) {
		try {
			const { data } = await super.sendPutRequest(
				`${this.baseUrl}/colors/${id}`,
				colour
			);

			return data;
		} catch (error) {
			throw new Error(
				`Fail updating colour: ${error.response.data.message}`
			);
		}
	}

	async getColourById(id) {
		try {
			const data = await super.sendGetRequest(
				`${this.baseUrl}/colors/${id}`
			);

			return data;
		} catch (error) {
			throw new Error(
				`Fail getting colour detail: ${error.response.data.message}`
			);
		}
	}
}
