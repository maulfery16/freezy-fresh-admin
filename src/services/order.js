import RequestAdapterService from './request-adapter';

export default class OrderService extends RequestAdapterService {
	translateOrderEnum(status) {
		const ORDER_STATUS_ENUM = {
			status: '-',
		};

		if (ORDER_STATUS_ENUM[status]) return ORDER_STATUS_ENUM[status];
		return 'Status Pesanan';
	}
}
