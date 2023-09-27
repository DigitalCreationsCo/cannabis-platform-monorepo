import axios, { type AxiosError, type AxiosRequestConfig } from 'axios';
import { TextContent } from './constants';

const MAX_RETRIES = 2;
// const TIMEOUT = 12 * 1000;
const TIMEOUT = 99 * 1000;

interface AxiosConfig extends AxiosRequestConfig {
	retryCount?: number;
}

interface AxiosConfigCustom extends AxiosConfig {
	retryCount: number;
}
interface AxiosErrorCustom extends AxiosError {
	config: AxiosConfigCustom;
}

const instance = axios.create({
	timeout: TIMEOUT,
	// validateStatus: (status: number) => (status >= 200 && status < 300) || status === 404
	validateStatus: () => true,
});

axios.interceptors.response.use(
	(response) => {
		return response;
	},
	(error: AxiosErrorCustom) => {
		/**
		 * Retry 429 requests with backoff
		 * 429 => TOO MANY REQUESTS
		 * 503 => SERVICE UNAVAILABLE
		 * https://cloud.google.com/apis/design/errors
		 */
		if (
			error.response?.status == 429 ||
			error.response?.status === 503 ||
			error.response?.status === 500
		) {
			const retryCount = (error.config.retryCount || 0) + 1;
			error.config.retryCount = retryCount;
			if (retryCount <= MAX_RETRIES) {
				return new Promise((resolve, _) => {
					setTimeout(() => {
						resolve(axios(error.config));
					}, 2 * retryCount * TIMEOUT);
					// increase subsequent timeout length by 2
				});
			}
			return Promise.reject(error);
		} else {
			return Promise.reject(error);
		}
	},
);

// handle ECONNREFUSED error code
instance.interceptors.response.use(
	(success: any) => {
		return Promise.resolve(success);
	},
	(error: any) => {
		if (error.code === 'ECONNREFUSED') {
			console.error('AXIOS ECONNREFUSED');
			return Promise.reject({
				...error,
				success: 'false',
				message: TextContent.error.SERVER_NOT_AVAILABLE,
			});
		}

		return Promise.reject(error);
	},
);

const applicationHeaders = {
	'Content-Type': 'application/json',
	Accept: 'application/json',
};

export { instance as axios, applicationHeaders };
