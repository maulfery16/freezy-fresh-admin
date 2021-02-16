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
				`Fail creating banner: ${error.response.data.message} - ${
					error.response.data.errors
						? error.response.data.errors.code
						: 'Error'
				} `
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
				`Fail deleting banner: ${error.response.data.message} - ${
					error.response.data.errors
						? error.response.data.errors.code
						: 'Error'
				} `
			);
		}
	}

	async editBanner(id, banner) {
		try {
			const { data } = await super.sendPutMultipartRequest(
				`${this.baseUrl}/v1/banners/${id}`,
				banner
			);

			return data;
		} catch (error) {
			console.error(error);
			throw new Error(
				`Fail updating banner: ${error.response.data.message} - ${
					error.response.data.errors
						? error.response.data.errors.code
						: 'Error'
				} `
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
				`Exporting Banner as CSV: ${error.response.data.message} - ${
					error.response.data.errors
						? error.response.data.errors.code
						: 'Error'
				} `
			);
		}
	}

	async getBannerById(id) {
		try {
			const data = await super.sendGetRequest(
				`${this.baseUrl}/v1/banners/${id}`
			);

			return data;
		} catch (error) {
			console.error(error);
			throw new Error(
				`Fail getting banner detail: ${error.response.data.message} - ${
					error.response.data.errors
						? error.response.data.errors.code
						: 'Error'
				} `
			);
		}
	}
}
