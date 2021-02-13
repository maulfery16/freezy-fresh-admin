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

	async deleteColour(id) {
		try {
			return await super.sendDeleteRequest(
				`${this.baseUrl}/v1/colors/${id}`,
				{ id }
			);
		} catch (error) {
			console.error(error);
			throw new Error(
				`Fail deleting colour: ${error.response.data.message} - ${error.response.status} `
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

	async exportAsCSV(params, properties) {
		try {
			const { data } = await this.getColours(params);
			super.dowloadDataAsCSV(data, properties, 'Colour List');
		} catch (error) {
			console.error(error);
			throw new Error(
				`Exporting Colour as CSV: ${error.response.data.message} - ${error.response.status} `
			);
		}
	}

	async getColours(params) {
		try {
			const { data } = await super.sendGetRequest(
				`${this.baseUrl}/v1/colors`,
				params
			);

			return data;
		} catch (error) {
			console.error(error);
			throw new Error(
				`Getting colour data: ${error.response.data.message} - ${error.response.status} `
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
