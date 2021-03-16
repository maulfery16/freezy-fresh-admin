import RequestAdapterService from './request-adapter';

export default class FriendListService extends RequestAdapterService {
	async getFriendProfileById(id, params) {
		try {
			const { data } = await super.sendGetRequest(
				`${this.baseUrl}/v1/admin/customers/${id}`,
				params
			);
			return data;
		} catch (error) {
			console.error(error);
			throw new Error(
				`Fail getting friend profile detail: ${super.generateErrorMessage(
					error
				)}`
			);
		}
	}
}
