import RequestAdapterService from './request-adapter';

export default class ZoneService extends RequestAdapterService {
	async createZone(zone) {
		try {
			const { data } = await super.sendPostMultipartRequest(
				`${this.baseUrl}/v1/zones`,
				zone
			);

			return data;
		} catch (error) {
			console.error(error);
			throw new Error(
				`Fail creating zone: ${super.generateErrorMessage(error)}`
			);
		}
	}

	async editZone(id, zone) {
		try {
			const { data } = await super.sendPostMultipartRequest(
				`${this.baseUrl}/v1/zones/${id}?_method=PUT`,
				zone
			);

			return data;
		} catch (error) {
			console.error(error);
			throw new Error(
				`Fail updating zone:  ${super.generateErrorMessage(error)}`
			);
		}
	}

	async getZoneById(id) {
		try {
			const { data } = await super.sendGetRequest(
				`${this.baseUrl}/v1/zones/${id}`
			);

			return data;
		} catch (error) {
			console.error(error);
			throw new Error(
				`Fail getting zone detail: ${super.generateErrorMessage(error)}`
			);
		}
	}
}
