import RequestAdapterService from './request-adapter';

export default class VoucherService extends RequestAdapterService {
	async getVoucherById(id) {
		try {
			const { data } = await super.sendGetRequest(
				`${this.baseUrl}/v1/vouchers/${id}`
			);

			return data;
		} catch (error) {
			console.error(error);
			throw new Error(
				`Fail getting voucher detail: ${super.generateErrorMessage(
					error
				)}`
			);
		}
	}
}
