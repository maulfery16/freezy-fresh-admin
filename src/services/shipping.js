import RequestAdapterService from './request-adapter';

export default class ShippingService extends RequestAdapterService {
	async getShippingById(id) {
		try {
			const { data } = await super.sendGetRequest(
				`${this.baseUrl}/v1/shipping-types/${id}`
			);

			return data;
		} catch (error) {
			console.error(error);
			throw new Error(
				`Fail getting shipping type detail: ${super.generateErrorMessage(
					error
				)}`
			);
		}
	}
}
