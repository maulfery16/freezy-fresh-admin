import RequestAdapterService from './request-adapter';

export default class HolidayService extends RequestAdapterService {
	async createHoliday(holiday) {
		try {
			const { data } = await super.sendPostMultipartRequest(
				`${this.baseUrl}/v1/holidays`,
				holiday
			);

			return data;
		} catch (error) {
			console.error(error);
			throw new Error(
				`Fail creating holiday: ${super.generateErrorMessage(
					error
				)}`
			);
		}
	}

	async editHoliday(id, holiday) {
		try {
			const { data } = await super.sendPostMultipartRequest(
				`${this.baseUrl}/v1/holidays/${id}?_method=PATCH`,
				holiday
			);

			return data;
		} catch (error) {
			console.error(error);
			throw new Error(
				`Fail updating holiday: ${super.generateErrorMessage(
					error
				)}`
			);
		}
	}

	async getHoliday() {
		try {
			const { data } = await super.sendGetRequest(
				`${this.baseUrl}/v1/holidays`
			);

			return data;
		} catch (error) {
			console.error(error);
			throw new Error(
				`Fail getting holiday: ${super.generateErrorMessage(
					error
				)}`
			);
		}
	}

	async assignProduct(id, products) {
		try {
			const { data } = await super.sendPostRequest(
				`${this.baseUrl}/v1/holidays/${id}/products`, products
			);

			return data;
		} catch (error) {
			console.error(error);
			throw new Error(
				`Fail assign products to holiday: ${super.generateErrorMessage(
					error
				)}`
			);
		}
	}
}
