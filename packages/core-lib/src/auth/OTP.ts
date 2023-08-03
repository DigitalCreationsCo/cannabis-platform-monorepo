import axios from 'axios';
import { urlBuilder } from '../utils/urlBuilder';
import { PasswordlessResponseWithUserDetails } from './authTypes';

async function sendOTPEmailRaw(email: string) {
	try {
		let response = await axios.post(urlBuilder.main.getOTP(), { email });

		return response;
	} catch (err: any) {
		console.info('send otp error: ', err);
		if (err.isSuperTokensGeneralError === true) throw new Error(err.message);
		else
			throw new Error(
				'The Sign In server is not available. Please contact Gras team.'
			);
	}
}

async function handleOTPInputRaw(
	otp: string
): Promise<PasswordlessResponseWithUserDetails> {
	try {
		let response = await axios.post(urlBuilder.main.submitOTP(), {
			userInputCode: otp,
		});

		console.info('handle otp input response: ', response);
		return response.data;
	} catch (err: any) {
		if (err.isSuperTokensGeneralError === true) {
			console.error(err);
			throw new Error(err.message);
		} else {
			console.error('OTP signin: something went wrong: ', err);
			throw new Error(err.message);
		}
	}
}

export type { PasswordlessResponseWithUserDetails };
export { sendOTPEmailRaw, handleOTPInputRaw };
