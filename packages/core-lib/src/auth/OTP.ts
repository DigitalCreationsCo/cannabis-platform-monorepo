import { axios } from '../axiosInstance';
import {
	type PasswordlessResponseWithDriverDetails,
	type PasswordlessResponseWithUserDetails,
} from '../types';
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
			{ email },
		);
		if (response.data.status !== 'OK') throw new Error(response.data.message);
		return response.data;
	} catch (err: any) {
		console.info('getOTPCodeEmailAPI error: ', err);
		if (err.isSuperTokensGeneralError === true) throw new Error(err.message);
		else throw new Error('Service is not available.');
	}
}

async function getOTPCodePhoneAPI(
	phoneNumber: string,
): Promise<CreateCodeResponse> {
	try {
		const response = await axios.post<CreateCodeResponse>(
			urlBuilder.main.getOTP(),
			{
				phoneNumber,
			},
		);
		if (response.data.status !== 'OK') throw new Error(response.data.message);
		return response.data;
	} catch (err: any) {
		console.info('phone ', phoneNumber);
		console.info('getOTPCodePhoneAPI error: ', err);
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
}): Promise<PasswordlessResponseWithUserDetails> {
	try {
		const response = await axios.post(urlBuilder.main.submitOTP(), {
			...input,
		});
		if (response.data.status !== 'OK') throw new Error(response.data.message);
		return response.data;
	} catch (err: any) {
		console.error('handleOTPCodeAPI: ', err);
		throw new Error(err.message);
	}
}

async function handleDriverAppOTPCodeAPI(input: {
	userInputCode: string;
	preAuthSessionId: string;
	deviceId: string;
	status: 'OK';
	flowType: 'USER_INPUT_CODE';
}): Promise<PasswordlessResponseWithDriverDetails> {
	try {
		const response = await axios.post(urlBuilder.main.submitOTP(), {
			...input,
		});
		if (response.data.status !== 'OK') throw new Error(response.data.message);
		return response.data;
	} catch (err: any) {
		console.error('handleDriverAppOTPCodeAPI: ', err);
		throw new Error(err.message);
	}
}

export {
	getOTPCodeEmailAPI,
	getOTPCodePhoneAPI,
	handleOTPCodeAPI,
	handleDriverAppOTPCodeAPI,
};
