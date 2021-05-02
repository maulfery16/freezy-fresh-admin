import RequestAdapterService from './request-adapter';

export default class OrderService extends RequestAdapterService {
	async calculateCashback(payload) {
		try {
			const { data } = await super.sendPostRequest(
				`${this.baseUrl}/v1/cashback-calculators`,
				payload
			);

			return data;
		} catch (error) {
			console.error(error);
			throw new Error(
				`Fail getting cashback calculation: ${super.generateErrorMessage(
					error
				)}`
			);
		}
	}

	async createOrder(payload) {
		try {
			const { data } = await super.sendPostRequest(
				`${this.baseUrl}/v1/orders`,
				payload
			);

			return data;
		} catch (error) {
			console.error(error);
			throw new Error(
				`Fail creating order: ${super.generateErrorMessage(error)}`
			);
		}
	}

	async getOrderById(id) {
		try {
			const { data } = await super.sendGetRequest(
				`${this.baseUrl}/v1/orders/${id}`
			);

			return data;
		} catch (error) {
			console.error(error);
			throw new Error(
				`Fail getting order detail: ${super.generateErrorMessage(
					error
				)}`
			);
		}
	}

	async getOrders() {
		try {
			const { data } = await super.sendGetRequest(
				`${this.baseUrl}/v1/orders`
			);

			return data;
		} catch (error) {
			console.error(error);
			throw new Error(
				`Fail getting order list: ${super.generateErrorMessage(error)}`
			);
		}
	}

	async getOrderByPickUpCode(code) {
		try {
			const { data } = await super.sendGetRequest(
				`${this.baseUrl}/v1/order/${code}`
			);

			return data;
		} catch (error) {
			console.error(error);
			throw new Error(
				`Fail getting order by pickup code: ${super.generateErrorMessage(
					error
				)}`
			);
		}
	}

	async getOrderStatuses() {
		try {
			const { data } = await super.sendGetRequest(
				`${this.baseUrl}/v1/orders/parameter/status`
			);

			return data;
		} catch (error) {
			console.error(error);
			throw new Error(
				`Fail getting order status list: ${super.generateErrorMessage(
					error
				)}`
			);
		}
	}

	async updateOrderStatus(id, status) {
		try {
			let newStatus = '';
			const { data: statuses } = await this.getOrderStatuses();

			const currentStatusIdx = Object.values(statuses).findIndex(
				(stat) => stat.value === status.status
			);

			newStatus = statuses[currentStatusIdx + 1].value;

			const { data } = await super.sendPatchRequest(
				`${this.baseUrl}/v1/orders/status/${id}`,
				{
					product_owner_id: status.product_owner_id,
					status: newStatus,
				}
			);

			return data;
		} catch (error) {
			console.error(error);
			throw new Error(
				`Fail updating order status: ${super.generateErrorMessage(
					error
				)}`
			);
		}
	}

	translateBankEnum(status) {
		const ORDER_BANK_ENUM = {
			FREEZY_PAY: 'Freezy Pay',
		};

		if (ORDER_BANK_ENUM[status]) return ORDER_BANK_ENUM[status];
		return '-';
	}

	translateOrderEnum(status) {
		const ORDER_STATUS_ENUM = {
			CANCELED: 'Batal',
			COMPLETED: 'Selesai',
			DELIVERED: 'Sampai',
			NEW_ORDER: 'Pesanan Baru',
			NEW_REFUND: 'Komplain Dibuat',
			PROCESSED: 'Di proses',
			READY_TO_PICKUP: 'Siap Dikirim',
			REFUND_COMPLETED_BY_ADMIN: 'Komplain Selesai oleh Admin',
			REFUND_COMPLETED_BY_CUSTOMER: 'Komplain Selesai Oleh Pelanggan',
			REFUND_PROCESS: 'Komplain Diproses',
			REQUEST_SHUTTLE: 'Paket Diproses',
			RETURN: 'Dikembalikan',
			SHIPPING: 'Dalam Pengiriman',
			SHUTTLE_RECEIVE: 'Paket diterima',
			WAITING_CONFIRMATION: 'Menunggu Pembayaran',
		};

		if (ORDER_STATUS_ENUM[status]) return ORDER_STATUS_ENUM[status];
		return '-';
	}

	transaltePaymentEnum(status) {
		const ORDER_PAYMENT_ENUM = {
			FREEZY_CASH: 'Freezy Cash',
			FREEZY_POINT: 'Freezy Point',
		};

		if (ORDER_PAYMENT_ENUM[status]) return ORDER_PAYMENT_ENUM[status];
		return '-';
	}
}
