import { consumeCode, createCode, resendCode } from "supertokens-auth-react/recipe/passwordless";
import { PasswordlessResponseWithUserDetails } from "../reduxDir";
    
async function sendOTPEmail(email: string) {
    try {
        let response = await createCode({
            email
        });
    } catch (err: any) {
        console.error('send otp error: ', err.message)

        if (err.isSuperTokensGeneralError === true)
        throw new Error(err.message);
        
        else
        throw new Error("The Sign In server is not available. Please contact Gras team.");
    }
}


async function sendOTPPhone(phoneNumber: string) {
    try {
        let response = await createCode({
            phoneNumber
        });
    } catch (err: any) {
        console.error('send otp error: ', err.message)
        
        if (err.isSuperTokensGeneralError === true)
        throw new Error(err.message);
        
        else
        throw new Error("The Sign In server is not available. Please contact Gras team.");
    }
}

async function resendOTP() {
    try {
        let response = await resendCode();
        if (response.status === "RESTART_FLOW_ERROR") {
            // this can happen if the user has already successfully logged in into
            // another device whilst also trying to login to this one.
            throw new Error("Login failed. Please try again");
        }
    } catch (err: any) {
        if (err.isSuperTokensGeneralError === true) {
            // this may be a custom error message sent from the API by you.
            throw new Error(err.message);
        } else {
            throw new Error("Oops! Something went wrong.");
        }
    }
}


async function handleOTPInput(otp: string):PasswordlessResponseWithUserDetails {
    try {
        let response = await consumeCode({
            userInputCode: otp
        });

        if (response.status === "OK") {
            // if (response.createdNewUser) {
            //     // user sign up success : new user
                
            //     // navigate to form input for user and address, verify id
            //     Router.push("/create-account")
            //     return null
            // } else if (!response.createdNewUser) {
            //     // user sign in success : existing user
                // if (response.user) { 
                //     return response.user as unknown as UserWithDetails 
                // } else { throw new Error('User not found')}
                return response as unknown as PasswordlessResponseWithUserDetails
            // }
            // window.location.assign("/")
        } else if (response.status === "INCORRECT_USER_INPUT_CODE_ERROR") {
            // the user entered an invalid OTP
            
            throw new Error(`Wrong passcode. Please try again. 
            You have ${(response.maximumCodeInputAttempts - response.failedCodeInputAttemptCount)} attempts left.`);

        } else if (response.status === "EXPIRED_USER_INPUT_CODE_ERROR") {
            // it can come here if the entered OTP was correct, but has expired because
            // it was generated too long ago.

            // window.alert("Old OTP entered. Please regenerate a new one and try again");
            throw new Error("Your passcode is expired. Please sign in again.")

        } else {
            // this can happen if the user tried an incorrect OTP too many times.
            
            // window.alert("Login failed. Please try again");
            throw new Error("Login failed. Please try again")
            window.location.assign("/")
            
        }
    } catch (err: any) {
        if (err.isSuperTokensGeneralError === true) {
            // this may be a custom error message sent from the API by you.
            
            console.error(err)
            // window.alert(err.message);
            throw new Error(err.message)
        } else {

            console.error("OTP signin: something went wrong: ", err)
            // window.alert("Oops! Something went wrong.");
            throw new Error(err.message)
        }
    }
}

export { sendOTPEmail, sendOTPPhone, resendOTP, handleOTPInput };

