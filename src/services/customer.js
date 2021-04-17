import RequestAdapterService from './request-adapter';

export default class CustomerService extends RequestAdapterService {
	async createCustomer(customer) {
		try {
			const { data } = await super.sendPostMultipartRequest(
				`${this.baseUrl}/v1/admin/customers`,
				customer
			);

			return data;
		} catch (error) {
			console.error(error);
			throw new Error(
				`Fail creating customer: ${super.generateErrorMessage(error)}`
			);
		}
	}

	async editCustomer(id, customer) {
		try {
			const { data } = await super.sendPostMultipartRequest(
				`${this.baseUrl}/v1/admin/customers/${id}?_method=PATCH`,
				customer
			);

			return data;
		} catch (error) {
			console.error(error);
			throw new Error(
				`Fail updating customer:${super.generateErrorMessage(error)}`
			);
		}
	}

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

	async setAddressAsPrimary(customer_id, address_id) {
		try {
			const { data } = await super.sendPatchRequest(
				`${this.baseUrl}/v1/customers/${customer_id}/addresses/${address_id}/default`,
				{}
			);

			return data;
		} catch (error) {
			console.error(error);
			throw new Error(
				`Setting address as primary: ${super.generateErrorMessage(
					error
				)}`
			);
		}
	}

	async setLinkCardAsPrimary(id) {
		return id;
		// try {
		// 	const {
		// 		data,
		// 	} = await super.sendPostRequest(
		// 		`${this.baseUrl}/v1/customer/customers/link-card/${id}/primary`,
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
