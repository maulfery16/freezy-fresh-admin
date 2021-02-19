import RequestAdapterService from './request-adapter';

export default class DatatableService extends RequestAdapterService {
	async deleteData(id, url) {
		try {
			return await super.sendDeleteRequest(
				`${this.baseUrl}/v1/${url}/${id}`,
				{ id }
			);
		} catch (error) {
			console.error(error);
			throw new Error(
				`Fail deleting ${url.replaceAll('_', ' ')}: ${
					error.response.data.message
				} - ${
					error.response.data.errors
						? error.response.data.errors.code
						: 'Error'
				} `
			);
		}
	}

	async exportAsCSV(params, properties, url) {
		try {
			const { data } = await this.getData(url, params);

			super.dowloadDataAsCSV(
				data,
				properties,
				`${url.replaceAll('_', ' ')}`
			);
		} catch (error) {
			console.error(error);
			throw new Error(
				`Exporting ${url.replaceAll('_', ' ')} as CSV: ${
					error.response.data.message
				} - ${
					error.response.data.errors
						? error.response.data.errors.code
						: 'Error'
				} `
			);
		}
	}

	async getData(url, params) {
		try {
			const { data } = await super.sendGetRequest(
				`${this.baseUrl}/v1/${url}`,
				params
			);

			return data;
		} catch (error) {
			console.error(error);
			throw new Error(
				`Getting list: ${error.response.data.message} - ${
					error.response.data.errors
						? error.response.data.errors.code
						: 'Error'
				} `
			);
		}
	}

	async updateActiveStatus(id, url) {
		try {
			const { data } = await super.sendPatchRequest(
				`${this.baseUrl}/v1/${url}/status-change/${id}`,
				{}
			);

			return data;
		} catch (error) {
			console.error(error);
			throw new Error(
				`Fail updating active status: ${
					error.response.data.message
				} - ${
					error.response.data.errors
						? error.response.data.errors.code
						: 'Error'
				} `
			);
		}
	}
}
