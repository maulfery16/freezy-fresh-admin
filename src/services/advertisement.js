import RequestAdapterService from './request-adapter';

export default class AdvertisementService extends RequestAdapterService {
	async editAdvertisement(ads) {
		try {
			const { data } = await super.sendPostMultipartRequest(
				`${this.baseUrl}/v1/advertisements`,
				ads
			);

			return data;
		} catch (error) {
			console.error(error);
			throw new Error(
				`Fail updating advertisement: ${super.generateErrorMessage(
					error
				)}`
			);
		}
	}

	async getAdvertisement() {
		try {
			const data = await super.sendGetRequest(
				`${this.baseUrl}/v1/advertisements`
			);

			return data;
		} catch (error) {
			console.error(error);
			throw new Error(
				`Fail getting advertisement: ${super.generateErrorMessage(
					error
				)}`
			);
		}
	}
}
