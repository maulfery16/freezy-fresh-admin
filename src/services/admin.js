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
				`Fail creating admin: ${super.generateErrorMessage(error)}`
			);
		}
	}

	async editAdmin(id, admin) {
		try {
			const { data } = await super.sendPostMultipartRequest(
				`${this.baseUrl}/v1/admins/${id}?_method=PATCH`,
				admin
			);

			return data;
		} catch (error) {
			console.error(error);
			throw new Error(
				`Fail updating admin:${super.generateErrorMessage(error)}`
			);
		}
	}

	async getAdminById(id) {
		try {
			const { data } = await super.sendGetRequest(
				`${this.baseUrl}/v1/admins/${id}`
			);

			return data;
		} catch (error) {
			console.error(error);
			throw new Error(
				`Fail getting admin detail: ${super.generateErrorMessage(
					error
				)}`
			);
		}
	}

	async getTotalAdmin() {
		try {
			const { data } = await super.sendGetRequest(
				`${this.baseUrl}/v1/admins/total`
			);

			return data;
		} catch (error) {
			console.error(error);
			throw new Error(
				`Fail getting total admin: ${super.generateErrorMessage(error)}`
			);
		}
	}

	translateGenderEnum(gender) {
		const GENDER_ENUM = {
			FEMALE: 'Perempuan',
			MALE: 'Laki-laki',
		};

		return GENDER_ENUM[gender];
	}
}
