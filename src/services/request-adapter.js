/* eslint-disable no-mixed-spaces-and-tabs */
import axios from 'axios';
import moment from 'moment';
import { saveAs } from 'file-saver';

import { setAuthToken, setLoginStatus } from '../stores/auth/actions';
import { store } from '../stores/store';
import config from '../config';

export default class RequestAdapterService {
	constructor() {
		let {
			auth: { token },
			refreshToken,
		} = store.getState();

		this.refreshToken = refreshToken;

		this.baseUrl = config.API_URL;
		let headers = {
			'Content-Type': 'application/json',
		};

		if (token !== null) headers['Authorization'] = `Bearer ${token}`;

		this.reqClient = axios.create({ headers });
		this.reqClient.interceptors.response.use(
			(response) => response,
			(error) => {
				if (error.response)
					if (error.response.status === 401) {
						store.dispatch(setAuthToken(null));
						store.dispatch(setLoginStatus(false));

						window.location = '/login';
					}

				throw error;
			}
		);
	}

	dowloadDataAsCSV(data, properties, filename) {
		let csv = '';

		const headers = properties.map((property) =>
			property.skipExport ? '' : property.title
		);
		csv = `"${headers.join(`","`)}"`;
		csv += `\r\n`;

		data.forEach((item) => {
			const row = [];

			properties.forEach((property, index) => {
				if (property.skipExport) {
					row.push('');
				} else if (property.render) {
					const value = property.csvRender
						? property.csvRender(item)
						: property.render(
								item[property.dataIndex],
								item,
								index
						  );

					row.push(value);
				} else {
					row.push(item[property.dataIndex]);
				}
			});

			csv += `"${row.join(`","`)}"`;
			csv += `\r\n`;
		});

		const blob = new Blob([csv], {
			type: 'text/csv;charset=utf-8',
		});
		saveAs(
			blob,
			`${filename} - ${moment(new Date()).format('DD-MM-YYYY')}.csv`
		);
	}

	overrideAuthToken(token) {
		this.reqClient.defaults.headers.common[
			'Authorization'
		] = `Bearer ${token}`;
		return true;
	}

	sendDeleteRequest(URL, requestBody) {
		return this.reqClient.delete(URL, requestBody);
	}

	sendGetRequest(URL, params) {
		return this.reqClient.get(URL, { params });
	}

	sendPostRefreshTokenRequest(URL) {
		return this.reqClient.post(URL, {
			headers: {
				Cookie: `refreshToken=${this.refreshToken}`,
			},
		});
	}

	sendPostMultipartRequest(URL, formData) {
		return this.reqClient.post(URL, formData, {
			headers: {
				'Content-Type': 'multipart/form-data',
			},
		});
	}

	sendPostRequest(URL, requestBody) {
		return this.reqClient.post(URL, requestBody);
	}

	sendPutRequest(URL, requestBody) {
		return this.reqClient.put(URL, requestBody);
	}

	sendPutMultipartRequest(URL, formData) {
		return this.reqClient.put(URL, formData, {
			headers: {
				'Content-Type': 'multipart/form-data',
			},
		});
	}

	static convertImageURLtoFile = async (url) => {
		const response = await fetch(url);
		const contentType = response.headers.get('content-type');
		const blob = await response.blob();
		return new File([blob], 'Image', { contentType });
	};

	static getURLParams = (url) => {
		const searchParams = new URLSearchParams(url);
		const params = {};
		for (let param of searchParams) params[param[0]] = param[1];

		return params;
	};
}
