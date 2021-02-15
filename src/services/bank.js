import RequestAdapterService from './request-adapter';

export default class BankService extends RequestAdapterService {
	async createBank(bank) {
		try {
			const { data } = await super.sendPostMultipartRequest(
				`${this.baseUrl}/v1/banks`,
				bank
			);

			return data;
		} catch (error) {
			console.error(error);
			throw new Error(
				`Fail creating bank: ${error.response.data.message} - ${
					error.response.data.errors
						? error.response.data.errors.code
						: 'Error'
				} `
			);
		}
	}

	async deleteBank(id) {
		try {
			return await super.sendDeleteRequest(
				`${this.baseUrl}/v1/banks/${id}`,
				{ id }
			);
		} catch (error) {
			console.error(error);
			throw new Error(
				`Fail deleting admin: ${error.response.data.message} - ${
					error.response.data.errors
						? error.response.data.errors.code
						: 'Error'
				} `
			);
		}
	}

	async editBank(id, bank) {
		try {
			const { data } = await super.sendPostMultipartRequest(
				`${this.baseUrl}/v1/banks/${id}?_method=PATCH`,
				bank
			);

			return data;
		} catch (error) {
			console.error(error);
			throw new Error(
				`Fail updating bank: ${error.response.data.message} - ${
					error.response.data.errors
						? error.response.data.errors.code
						: 'Error'
				} `
			);
		}
	}

	async exportAsCSV(params, properties) {
		try {
			const { data } = await this.getBanks(params);
			super.dowloadDataAsCSV(data, properties, 'Bank List');
		} catch (error) {
			console.error(error);
			throw new Error(
				`Exporting Bank as CSV: ${error.response.data.message} - ${
					error.response.data.errors
						? error.response.data.errors.code
						: 'Error'
				} `
			);
		}
	}

	async getBanks(params) {
		try {
			const { data } = await super.sendGetRequest(
				`${this.baseUrl}/v1/banks`,
				params
			);

			return data;
		} catch (error) {
			console.error(error);
			throw new Error(
				`Getting bank data: ${error.response.data.message} - ${
					error.response.data.errors
						? error.response.data.errors.code
						: 'Error'
				} `
			);
		}
	}

	async getBankById(id) {
		try {
			const { data } = await super.sendGetRequest(
				`${this.baseUrl}/v1/banks/${id}`
			);

			return data;
		} catch (error) {
			console.error(error);
			throw new Error(
				`Fail getting bank detail: ${error.response.data.message} - ${
					error.response.data.errors
						? error.response.data.errors.code
						: 'Error'
				} `
			);
		}
	}
}
