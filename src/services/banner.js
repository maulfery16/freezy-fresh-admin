import RequestAdapterService from './request-adapter';

export default class BannerService extends RequestAdapterService {
	async createBanner(banner) {
		try {
			const { data } = await super.sendPostMultipartRequest(
				`${this.baseUrl}/v1/banners`,
				banner
			);

			return data;
		} catch (error) {
			console.error(error);
			throw new Error(
				`Fail creating banner:${super.generateErrorMessage(error)}`
			);
		}
	}

	async deleteBanner(id) {
		try {
			return await super.sendDeleteRequest(
				`${this.baseUrl}/v1/banners/${id}`,
				{ id }
			);
		} catch (error) {
			console.error(error);
			throw new Error(
				`Fail deleting banner:${super.generateErrorMessage(error)}`
			);
		}
	}

	async editBanner(id, banner) {
		try {
			const { data } = await super.sendPostMultipartRequest(
				`${this.baseUrl}/v1/banners/${id}?_method=PATCH`,
				banner
			);

			return data;
		} catch (error) {
			console.error(error);
			throw new Error(
				`Fail updating banner:${super.generateErrorMessage(error)}`
			);
		}
	}

	async exportAsCSV(params, properties) {
		try {
			const { data } = await this.getBanners(params);
			super.dowloadDataAsCSV(data, properties, 'Banner List');
		} catch (error) {
			console.error(error);
			throw new Error(
				`Exporting Banner as CSV:${super.generateErrorMessage(error)}`
			);
		}
	}

	async getBannerById(id) {
		try {
			const { data } = await super.sendGetRequest(
				`${this.baseUrl}/v1/banners/${id}`
			);

			return data;
		} catch (error) {
			console.error(error);
			throw new Error(
				`Fail getting banner detail: ${super.generateErrorMessage(
					error
				)}`
			);
		}
	}
}
