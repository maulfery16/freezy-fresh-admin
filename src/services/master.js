import RequestAdapterService from './request-adapter';

export default class MasterService extends RequestAdapterService {
	async getOptions(url, params) {
		try {
			const { data } = await super.sendGetRequest(
				`${this.baseUrl}/v1/${url}`,
				{
					...params,
				}
			);

			return data;
		} catch (error) {
			console.error(error);
			throw new Error(
				`Getting options:${super.generateErrorMessage(error)}`
			);
		}
	}

	async uploadImage(params) {
		try {
			const { data } = await super.sendPostMultipartRequest(
				`${this.baseUrl}/v1/medias`,
				params
			);

			return data.data.url;
		} catch (error) {
			console.error(error);
			throw new Error(
				`Uploading file: ${super.generateErrorMessage(error)}`
			);
		}
	}
}
