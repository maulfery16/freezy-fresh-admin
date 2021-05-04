import RequestAdapterService from './request-adapter';

export default class FeedService extends RequestAdapterService {
	async createFeed(feed) {
		try {
			const { data } = await super.sendPostMultipartRequest(
				`${this.baseUrl}/v1/feeds`,
				feed
			);

			return data;
		} catch (error) {
			console.error(error);
			throw new Error(
				`Fail creating feed: ${super.generateErrorMessage(error)}`
			);
		}
	}

	async editFeed(id, feed) {
		try {
			const { data } = await super.sendPostMultipartRequest(
				`${this.baseUrl}/v1/feeds/${id}?_method=PATCH`,
				feed
			);

			return data;
		} catch (error) {
			console.error(error);
			throw new Error(
				`Fail updating feed:${super.generateErrorMessage(error)}`
			);
		}
	}

	async getFeedById(id) {
		try {
			const { data } = await super.sendGetRequest(
				`${this.baseUrl}/v1/feeds/${id}`
			);

			return data;
		} catch (error) {
			console.error(error);
			throw new Error(
				`Fail getting feed detail: ${super.generateErrorMessage(error)}`
			);
		}
	}
}
