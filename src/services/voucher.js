import RequestAdapterService from './request-adapter';

export default class VoucherService extends RequestAdapterService {
	async createVoucher(voucher) {
		try {
			const { data } = await super.sendPostMultipartRequest(
				`${this.baseUrl}/v1/vouchers`,
				voucher
			);

			return data;
		} catch (error) {
			console.error(error);
			throw new Error(
				`Fail creating voucher: ${super.generateErrorMessage(error)}`
			);
		}
	}

	async editVoucher(id, voucher) {
		try {
			const { data } = await super.sendPostMultipartRequest(
				`${this.baseUrl}/v1/vouchers/${id}?_method=PATCH`,
				voucher
			);

			return data;
		} catch (error) {
			console.error(error);
			throw new Error(
				`Fail updating voucher: ${super.generateErrorMessage(error)}`
			);
		}
	}

	async getVoucherByCode(code) {
		try {
			const { data } = await super.sendGetRequest(
				`${this.baseUrl}/v1/vouchers/code/${code}`
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

export const translateVoucherStatusEnum = (status) => {
	const STATUS_ENUM = {
		ACTIVE: 'Aktif',
		UPCOMING: 'Mendatang',
		NOT_ACTIVE: 'Tidak Aktif',
	};

	return status ? STATUS_ENUM[status] : '-';
};

export const translateVoucherTargetEnum = (target) => {
	const TARGET_ENUM = {
		LIMITED: 'Terbatas',
		PUBLIC: 'Publik',
	};

	return target ? TARGET_ENUM[target] : '-';
};
