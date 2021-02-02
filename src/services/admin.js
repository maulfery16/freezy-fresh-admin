import RequestAdapterService from './request-adapter';

export default class AdminService extends RequestAdapterService {
	async createAdmin(admin) {
		try {
			const { data } = await super.sendPostRequest(
				`${this.baseUrl}/admin`,
				admin
			);

			return data;
		} catch (error) {
			throw new Error(
				`Fail creating admin: ${error.response.data.message}`
			);
		}
	}

	async deleteAdmin(id) {
		try {
			return await super.sendDeleteRequest(
				`${this.baseUrl}/admin/${id}`,
				{ id }
			);
		} catch (error) {
			throw new Error(
				`Fail deleting admin: ${error.response.data.message}`
			);
		}
	}

	async editAdmin(admin, id) {
		try {
			const { data } = await super.sendPutRequest(
				`${this.baseUrl}/admin/${id}`,
				admin
			);

			return data;
		} catch (error) {
			throw new Error(
				`Fail updating admin: ${error.response.data.message}`
			);
		}
	}

	async getAdmin(id) {
		try {
			const data = await super.sendGetRequest(
				`${this.baseUrl}/admin/${id}`
			);

			return data;
		} catch (error) {
			throw new Error(
				`Fail getting admin detail: ${error.response.data.message}`
			);
		}
	}

	async getTotalAdmin(params) {
		try {
			const data = await super.sendGetRequest(
				`${this.baseUrl}/admin/count`,
				params
			);

			return data;
		} catch (error) {
			throw new Error(
				`Fail getting total admin: ${error.response.data.message}`
			);
		}
	}
}
