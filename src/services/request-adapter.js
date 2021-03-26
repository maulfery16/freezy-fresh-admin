/* eslint-disable no-mixed-spaces-and-tabs */
import axios from 'axios';
import moment from 'moment';
import { saveAs } from 'file-saver';

import { setAuthToken, setLoginStatus } from '../stores/auth/actions';
import { store } from '../stores/store';
import config from '../config';

export default class RequestAdapterService {
	constructor() {
		const { auth } = store.getState();
		const { refreshToken, token } = auth;

		this.baseUrl = config.API_URL;
		this.refreshToken = refreshToken;
		let headers = {
			'Access-Control-Allow-Origin': '*',
			'Content-Type': 'application/json',
			'Content-Language': 'EN',
		};

		if (token !== null) headers['Authorization'] = `Bearer ${token}`;
		if (refreshToken !== null) headers['Cookie'] = `refreshToken=${refreshToken}`;

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

		data.forEach((item, dataIdx) => {
			const row = [];

			properties.forEach((property) => {
				if (property.skipExport) {
					row.push('');
				} else if (property.render) {
					const value = property.csvRender
						? property.csvRender(item)
						: property.render(
								item[property.dataIndex],
								item,
								dataIdx
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

	overrideAuthToken(token, refreshToken) {
		this.reqClient.defaults.headers.common[
			'Authorization'
		] = `Bearer ${token}`;
		this.reqClient.defaults.headers.common[
			'Cookie'
		] = `refreshToken=${refreshToken}`;

		return true;
	}

	sendDeleteRequest(URL, requestBody) {
		return this.reqClient.delete(URL, requestBody);
	}

	sendGetRequest(URL, params) {
		return this.reqClient.get(URL, { params });
	}

	sendPostMultipartRequest(URL, formData) {
		return this.reqClient.post(URL, formData, {
			headers: {
				'Content-Type': 'multipart/form-data',
			},
		});
	}

	sendPatchRequest(URL, formData) {
		return this.reqClient.patch(URL, formData);
	}

	sendPostRequest(URL, requestBody) {
		return this.reqClient.post(URL, requestBody);
	}

	sendPutMultipartRequest(URL, formData) {
		return this.reqClient.put(URL, formData, {
			headers: {
				'Content-Type': 'multipart/form-data',
			},
		});
	}

	sendPutRequest(URL, requestBody) {
		return this.reqClient.put(URL, requestBody);
	}

	static getURLParams = (url) => {
		const searchParams = new URLSearchParams(url);
		const params = {};
		for (let param of searchParams) params[param[0]] = param[1];

		return params;
	};

	generateErrorMessage(error) {
		console.error(error);

		const message = error.response.data.message;
		let detail;

		if (error.response.data.errors) {
			const errors = error.response.data.errors;

			if (typeof errors === 'object') {
				detail = [];
				Object.keys(errors).forEach((key) => {
					errors[key].forEach((err) => detail.push(`${key}: ${err}`));
				});

				detail = detail.join(', ');
			} else if (typeof errors === 'string') {
				detail = errors;
			}
		} else {
			detail = 'error';
		}

		return `${message} - ${detail}`;
	}
}
