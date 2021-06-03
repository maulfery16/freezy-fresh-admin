
import RequestAdapterService from './request-adapter';

export default class FlashSalesService extends RequestAdapterService {
	async createFlashSales(flashSales) {
		try {
			const { data } = await super.sendPostMultipartRequest(
				`${this.baseUrl}/v1/flash-sales`,
				flashSales
			);

			return data;
		} catch (error) {
			console.error(error);
			throw new Error(
				`Fail creating flash sales: ${super.generateErrorMessage(
					error
				)}`
			);
		}
	}

	async editFlashSales(id, flashSales) {
		try {
			const { data } = await super.sendPostMultipartRequest(
				`${this.baseUrl}/v1/flash-sales/${id}?_method=PATCH`,
				flashSales
			);

			return data;
		} catch (error) {
			console.error(error);
			throw new Error(
				`Fail updating flash sales: ${super.generateErrorMessage(
					error
				)}`
			);
		}
	}

	async getFlashSales() {
		try {
			const { data } = await super.sendGetRequest(
				`${this.baseUrl}/v1/flash-sales`
			);

			return data;
		} catch (error) {
			console.error(error);
			throw new Error(
				`Fail getting flash sales: ${super.generateErrorMessage(
					error
				)}`
			);
		}
	}

	async assignProduct(id, products) {
		try {
			const { data } = await super.sendPostRequest(
				`${this.baseUrl}/v1/flash-sales/${id}/products`, products
			);

			return data;
		} catch (error) {
			console.error(error);
			throw new Error(
				`Fail assign products to flash sales: ${super.generateErrorMessage(
					error
				)}`
			);
		}
	}
}
