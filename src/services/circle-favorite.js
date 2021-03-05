import RequestAdapterService from './request-adapter';

export default class CircleFavoriteService extends RequestAdapterService {
	async createCircleFavorite(circleFavorite) {
		try {
			const { data } = await super.sendPostMultipartRequest(
				`${this.baseUrl}/v1/circle-favorites`,
				circleFavorite
			);

			return data;
		} catch (error) {
			console.error(error);
			throw new Error(
				`Fail creating circle favorite: ${super.generateErrorMessage(
					error
				)}`
			);
		}
	}

	async editCircleFavorite(id, circleFavorite) {
		try {
			const { data } = await super.sendPostMultipartRequest(
				`${this.baseUrl}/v1/circle-favorites/${id}?_method=PATCH`,
				circleFavorite
			);

			return data;
		} catch (error) {
			console.error(error);
			throw new Error(
				`Fail updating circle favorite: ${super.generateErrorMessage(
					error
				)}`
			);
		}
	}

	async getCircleFavorites() {
		try {
			const data = await super.sendGetRequest(
				`${this.baseUrl}/v1/circle-favorites`
			);

			return data;
		} catch (error) {
			console.error(error);
			throw new Error(
				`Fail getting circle favorites: ${super.generateErrorMessage(
					error
				)}`
			);
		}
	}

	async getCircleFavoriteById(id) {
		try {
			const data = await super.sendGetRequest(
				`${this.baseUrl}/v1/circle-favorites/${id}`
			);

			return data;
		} catch (error) {
			console.error(error);
			throw new Error(
				`Fail getting circle favorite detail: ${super.generateErrorMessage(
					error
				)}`
			);
		}
	}
}
