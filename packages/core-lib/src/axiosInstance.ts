import axios, { type AxiosError, type AxiosRequestConfig } from 'axios';

const MAX_RETRIES = 5;
// three seconds
const WAIT_RETRY = 3 * 1000;

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
	timeout: 3000,
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
			// set a retry count parameter
			const retryCount = (error.config.retryCount || 0) + 1;
			error.config.retryCount = retryCount;
			if (retryCount <= MAX_RETRIES) {
				return new Promise((resolve, _) => {
					setTimeout(() => {
						resolve(axios(error.config));
					}, 2 * retryCount * WAIT_RETRY);
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
		if (error.code === 'ECONNREFUSED')
			return Promise.reject({
				...error,
				success: false,
				message: 'The server is not available. Please try again later.',
			});

		return Promise.reject(error);
	},
);

const applicationHeaders = {
	Accept: 'application/json',
	'Content-Type': 'application/json',
};

export { instance as axios, applicationHeaders };
