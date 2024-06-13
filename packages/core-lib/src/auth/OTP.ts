/* eslint-disable @typescript-eslint/naming-convention */
import { axios } from '../axiosInstance';
import { type ConsumeCodeResponse, type AppUser } from '../types';
import { urlBuilder } from '../utils/urlBuilder';

type CreateCodeResponse = {
	status: 'OK';
	deviceId: string;
	preAuthSessionId: string;
	flowType: 'USER_INPUT_CODE' | 'MAGIC_LINK' | 'USER_INPUT_CODE_AND_MAGIC_LINK';
	fetchResponse: Response;
	message?: string;
};

async function getOTPCodeEmailAPI(email: string): Promise<CreateCodeResponse> {
	try {
		const response = await axios.post<CreateCodeResponse>(
			urlBuilder.main.getOTP(),
			{ email }
		);

		if (response.data.status !== 'OK') throw new Error(response.data.message);

		return response.data;
	} catch (err: any) {
		console.info('getOTPCodeEmailAPI error: ', err.message);
		if (err.isSuperTokensGeneralError === true) throw new Error(err.message);
		else throw new Error('Service is not available.');
	}
}

async function getOTPCodePhoneAPI(
	phoneNumber: string
): Promise<CreateCodeResponse> {
	try {
		const response = await axios.post<CreateCodeResponse>(
			urlBuilder.main.getOTP(),
			{
				phoneNumber,
			}
		);

		if (response.data.status !== 'OK') throw new Error(response.data.message);

		return response.data;
	} catch (err: any) {
		console.info('phone ', phoneNumber);
		console.info('getOTPCodePhoneAPI error: ', err.message);
		if (err.isSuperTokensGeneralError === true) throw new Error(err.message);
		else throw new Error('Service is not available.');
	}
}

async function handleOTPCodeAPI(input: {
	userInputCode: string;
	preAuthSessionId: string;
	deviceId: string;
	status: 'OK';
	flowType: 'USER_INPUT_CODE';
}): Promise<ConsumeCodeResponse> {
	try {
		const response = await axios.post<
			ConsumeCodeResponse | { status: 0; message: string }
		>(urlBuilder.main.submitOTP(), input);

		if (response.data.status !== 'OK') throw new Error(response.data.message);

		return response.data;
	} catch (err: any) {
		console.error('handleOTPCodeAPI: ', err.message);
		throw new Error(err.message);
	}
}

async function handleDriverAppOTPCodeAPI(input: {
	userInputCode: string;
	preAuthSessionId: string;
	deviceId: string;
	status: 'OK';
	flowType: 'USER_INPUT_CODE';
}): Promise<ConsumeCodeResponse> {
	try {
		const appUser: AppUser = 'DRIVER_USER';

		const response = await axios.post<
			ConsumeCodeResponse | { status: 0; message: string }
		>(urlBuilder.main.submitOTP(), input, {
			headers: {
				'app-user': appUser,
			},
		});

		if (response.data.status !== 'OK') throw new Error(response.data.message);

		return response.data;
	} catch (err: any) {
		console.error('handleDriverAppOTPCodeAPI: ', err.message);
		throw new Error(err.message);
	}
}

export {
	getOTPCodeEmailAPI,
	getOTPCodePhoneAPI,
	handleOTPCodeAPI,
	handleDriverAppOTPCodeAPI,
};
