import axios from 'axios';
import {
  consumeCode,
  createCode,
  resendCode,
} from 'supertokens-auth-react/recipe/passwordless';
import { urlBuilder } from '../utils/urlBuilder';
import { PasswordlessResponseWithUserDetails } from './authTypes';

async function sendOTPEmail(email: string) {
  try {
    let response = await createCode({
      email,
    });
    console.log('send OTP email response: ', response);
  } catch (err: any) {
    console.info('send otp error: ', err);
    if (err.isSuperTokensGeneralError === true) throw new Error(err.message);
    else
      throw new Error(
        'The Sign In server is not available. Please contact Gras team.'
      );
  }
}

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

async function sendOTPPhone(phoneNumber: string) {
  try {
    let response = await createCode({
      phoneNumber,
    });
  } catch (err: any) {
    console.error('send otp error: ', err.message);
    if (err.isSuperTokensGeneralError === true) throw new Error(err.message);
    else
      throw new Error(
        'The Sign In server is not available. Please contact Gras team.'
      );
  }
}

async function resendOTP() {
  try {
    let response = await resendCode();

    if (response.status === 'RESTART_FLOW_ERROR') {
      throw new Error('Login failed. Please try again');
    }
  } catch (err: any) {
    if (err.isSuperTokensGeneralError === true) {
      throw new Error(err.message);
    } else {
      throw new Error('Oops! Something went wrong.');
    }
  }
}

async function handleOTPInput(
  otp: string
): Promise<PasswordlessResponseWithUserDetails> {
  try {
    let response = await consumeCode({
      userInputCode: otp,
    });

    console.info('handle otp input response: ', response);

    if (response.status === 'OK') {
      return response as unknown as PasswordlessResponseWithUserDetails;
    } else if (response.status === 'INCORRECT_USER_INPUT_CODE_ERROR') {
      throw new Error(`Wrong passcode. Please try again. 
            You have ${
              response.maximumCodeInputAttempts -
              response.failedCodeInputAttemptCount
            } attempts left.`);
    } else if (response.status === 'EXPIRED_USER_INPUT_CODE_ERROR') {
      throw new Error('Your passcode is expired. Please sign in again.');
    } else {
      throw new Error('Login failed. Please try again');
      window.location.assign('/');
    }
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
export {
  sendOTPEmail,
  sendOTPEmailRaw,
  sendOTPPhone,
  resendOTP,
  handleOTPInput,
  handleOTPInputRaw,
};
