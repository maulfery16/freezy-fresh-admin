import RequestAdapterService from './request-adapter';

export default class SpecialBenefitService extends RequestAdapterService {
	async editSpecialBenefit(specialBenefit) {
		try {
			const { data } = await super.sendPostMultipartRequest(
				`${this.baseUrl}/v1/special-benefits`,
				specialBenefit
			);

			return data;
		} catch (error) {
			console.error(error);
			throw new Error(
				`Fail updating special benefit: ${super.generateErrorMessage(
					error
				)}`
			);
		}
	}

	async getSpecialBenefit() {
		try {
			const data = await super.sendGetRequest(
				`${this.baseUrl}/v1/special-benefits`
			);

			return data;
		} catch (error) {
			console.error(error);
			throw new Error(
				`Fail getting special benefit: ${super.generateErrorMessage(
					error
				)}`
			);
		}
	}
}
