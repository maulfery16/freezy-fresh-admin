import RequestAdapterService from './request-adapter';

export default class CustomerService extends RequestAdapterService {
	async getCustomerById(id, params) {
		try {
			const { data } = await super.sendGetRequest(
				`${this.baseUrl}/v1/admin/customers/${id}`,
				params
			);
			return data;
		} catch (error) {
			console.error(error);
			throw new Error(
				`Fail getting customer detail: ${super.generateErrorMessage(
					error
				)}`
			);
		}
	}

	async setAddressAsPrimary(id) {
		return id;
		// try {
		// 	const {
		// 		data,
		// 	} = await super.sendPostRequest(
		// 		`${this.baseUrl}/v1/admin/customers/address/${id}/primary`,
		// 		{ id }
		// 	);

		// 	return data;
		// } catch (error) {
		// 	console.error(error);
		// 	throw new Error(
		// 		`Setting address as primary: ${super.generateErrorMessage(
		// 			error
		// 		)}`
		// 	);
		// }
	}

	async setLinkCardAsPrimary(id) {
		return id;
		// try {
		// 	const {
		// 		data,
		// 	} = await super.sendPostRequest(
		// 		`${this.baseUrl}/v1/admin/customers/link-card/${id}/primary`,
		// 		{ id }
		// 	);

		// 	return data;
		// } catch (error) {
		// 	console.error(error);
		// 	throw new Error(
		// 		`Setting link card as primary: ${super.generateErrorMessage(
		// 			error
		// 		)}`
		// 	);
		// }
	}
}

export function translateAddressType(type) {
	return type ? (type === 'office' ? 'Kantor' : 'Rumah') : '';
}
