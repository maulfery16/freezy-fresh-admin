import RequestAdapterService from './request-adapter';

export default class MemberGetMemberService extends RequestAdapterService {
	async editMemberGetMember(memberGetMember) {
		try {
			const { data } = await super.sendPostRequest(
				`${this.baseUrl}/v1/mgms/settings`,
				memberGetMember
			);

			return data;
		} catch (error) {
			console.error(error);
			throw new Error(
				`Fail updating member get member: ${super.generateErrorMessage(
					error
				)}`
			);
		}
	}

	async getMemberGetMember() {
		try {
			const data = await super.sendGetRequest(
				`${this.baseUrl}/v1/mgms/settings`
			);

			return data;
		} catch (error) {
			console.error(error);
			throw new Error(
				`Fail getting member get member: ${super.generateErrorMessage(
					error
				)}`
			);
		}
	}
}
