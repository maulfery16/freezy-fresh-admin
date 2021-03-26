import RequestAdapterService from './request-adapter';

export default class BranchService extends RequestAdapterService {
	async createBranch(branch) {
		try {
			const { data } = await super.sendPostMultipartRequest(
				`${this.baseUrl}/v1/branches`,
				branch
			);

			return data;
		} catch (error) {
			console.error(error);
			throw new Error(
				`Fail creating branch: ${super.generateErrorMessage(error)}`
			);
		}
	}

	async editBranch(id, branch) {
		try {
			const { data } = await super.sendPostMultipartRequest(
				`${this.baseUrl}/v1/branches/${id}?_method=PATCH`,
				branch
			);

			return data;
		} catch (error) {
			console.error(error);
			throw new Error(
				`Fail updating branch:${super.generateErrorMessage(error)}`
			);
		}
	}

	async getBranchById(id) {
		try {
			const { data } = await super.sendGetRequest(
				`${this.baseUrl}/v1/branches/${id}`
			);

			return data;
		} catch (error) {
			console.error(error);
			throw new Error(
				`Fail getting branch detail: ${super.generateErrorMessage(
					error
				)}`
			);
		}
	}
}
