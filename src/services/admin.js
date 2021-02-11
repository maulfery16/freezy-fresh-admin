import RequestAdapterService from './request-adapter';

export default class AdminService extends RequestAdapterService {
	async createAdmin(admin) {
		try {
			const { data } = await super.sendPostMultipartRequest(
				`${this.baseUrl}/v1/admins`,
				admin
			);

			return data;
		} catch (error) {
			console.error(error);
			throw new Error(
				`Fail creating admin: ${error.response.data.message} - ${
					error.response.data.errors
						? error.response.data.errors.code
						: 'Error'
				} `
			);
		}
	}

	async deleteAdmin(id) {
		try {
			return await super.sendDeleteRequest(
				`${this.baseUrl}/v1/admins/${id}`,
				{ id }
			);
		} catch (error) {
			console.error(error);
			throw new Error(
				`Fail deleting admin: ${error.response.data.message} - ${
					error.response.data.errors
						? error.response.data.errors.code
						: 'Error'
				} `
			);
		}
	}

	async editAdmin(id, admin) {
		try {
			const { data } = await super.sendPutMultipartRequest(
				`${this.baseUrl}/v1/admins/${id}`,
				admin
			);

			return data;
		} catch (error) {
			console.error(error);
			throw new Error(
				`Fail updating admin: ${error.response.data.message} - ${
					error.response.data.errors
						? error.response.data.errors.code
						: 'Error'
				} `
			);
		}
	}

	async getAdminById(id) {
		try {
			const data = await super.sendGetRequest(
				`${this.baseUrl}/v1/admins/${id}`
			);

			return data;
		} catch (error) {
			console.error(error);
			throw new Error(
				`Fail getting admin detail: ${error.response.data.message} - ${
					error.response.data.errors
						? error.response.data.errors.code
						: 'Error'
				} `
			);
		}
	}

	async getTotalAdmin(params) {
		try {
			const data = await super.sendGetRequest(
				`${this.baseUrl}/v1/admins/count`,
				params
			);

			return data;
		} catch (error) {
			console.error(error);
			throw new Error(
				`Fail getting total admin: ${error.response.data.message} - ${
					error.response.data.errors
						? error.response.data.errors.code
						: 'Error'
				} `
			);
		}
	}
}
