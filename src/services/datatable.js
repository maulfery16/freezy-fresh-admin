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
				`Fail deleting ${url.replaceAll(
					'_',
					' '
				)}: ${super.generateErrorMessage(error)}`
			);
		}
	}

	async exportAsCSV(params, properties, url, specifiedProp) {
		try {
			let { data } = await this.getData(url, params);

			if (specifiedProp) data = data[specifiedProp]

			super.dowloadDataAsCSV(
				data,
				properties,
				`${url.replaceAll('_', ' ')}`
			);
		} catch (error) {
			console.error(error);
			throw new Error(
				`Exporting ${url.replaceAll(
					'_',
					' '
				)} as CSV: ${super.generateErrorMessage(error)}`
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
				`Getting list:${super.generateErrorMessage(error)}`
			);
		}
	}

	async importCSV(file, url) {
		try {
			super.sendPostMultipartRequest(`${this.baseUrl}/v1/${url}`, file);
		} catch (error) {
			console.error(error);
			throw new Error(
				`Importing ${url.replaceAll(
					'_',
					' '
				)} CSV: ${super.generateErrorMessage(error)}`
			);
		}
	}

	async updateActiveStatus(id, url, method) {
		try {
			if (method === "POST") {
				const { data } = await super.sendPostRequest(
					`${this.baseUrl}/v1/${url}/status-change/${id}`,
					{}
				);
				return data;
			} else if (method === "PATCH") {
				const { data } = await super.sendPatchRequest(
					`${this.baseUrl}/v1/${url}/status-change/${id}`,
					{}
				);
				return data;
			}else {
				const { data } = await super.sendPutRequest(
					`${this.baseUrl}/v1/${url}/status-change/${id}`,
					{}
				);
				return data;
			}
		} catch (error) {
			console.error(error);
			throw new Error(
				`Fail updating active status: ${super.generateErrorMessage(
					error
				)}`
			);
		}
	}

	async updateItemStatus(url, id, status) {
		try {
			const { data } = await super.sendPatchRequest(
				`${this.baseUrl}/v1/${url}/status/${id}/${status}`,
				{}
			);

			return data;
		} catch (error) {
			console.error(error);
			throw new Error(
				`Fail updating ${url} status: ${super.generateErrorMessage(
					error
				)}`
			);
		}
	}
}
