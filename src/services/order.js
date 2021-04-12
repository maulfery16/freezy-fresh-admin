import RequestAdapterService from './request-adapter';

export default class OrderService extends RequestAdapterService {
	translateOrderEnum(status) {
		const ORDER_STATUS_ENUM = {
			CANCELED: 'Batal',
			COMPLETED: 'Selesai',
			DELIVERED: 'Sampai',
			NEW_ORDER: 'Pesanan Baru',
			NEW_REFUND: 'Komplain Dibuat',
			PROCESSED: 'Di proses',
			REFUND_COMPLETED_BY_ADMIN: 'Komplain Selesai oleh Admin',
			REFUND_COMPLETED_BY_CUSTOMER: 'Komplain Selesai Oleh Pelanggan',
			REFUND_PROCESS: 'Komplain Diproses',
			REQUEST_PICKUP: 'Siap Dikirim',
			RETURN: 'Dikembalikan',
			SHIPPING: 'Dalam Pengiriman',
			WAITING_CONFIRMATION: 'Menunggu Pembayaran',
		};

		if (ORDER_STATUS_ENUM[status]) return ORDER_STATUS_ENUM[status];
		return '-';
	}
}
