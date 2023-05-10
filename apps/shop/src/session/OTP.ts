import Router from "next/router";
import { toast } from "react-hot-toast";
import { consumeCode, createCode, resendCode } from "supertokens-auth-react/recipe/passwordless";
    
async function sendOTPEmail(email: string) {
    try {
        let response = await createCode({
            email
        });
        toast.success("Please check your email for the one time passcode.");
    } catch (err: any) {
        if (err.isSuperTokensGeneralError === true) {
            // this may be a custom error message sent from the API by you,
            // or if the input email / phone number is not valid.
            toast.error(err.message);
        } else {
            toast.error("Oops! Something went wrong.");
        }
    }
}


async function sendOTPPhone(phoneNumber: string) {
    try {
        let response = await createCode({
            phoneNumber
        });
        toast.success("Please check your mobile messages for the one time passcode.");
    } catch (err: any) {
        if (err.isSuperTokensGeneralError === true) {
            console.error(err)
            // this may be a custom error message sent from the API by you,
            // or if the input email / phone number is not valid.
            toast.error(err.message);
        } else {
            console.error(err)
            toast.error("Oops! Something went wrong.");
        }
    }
}

async function resendOTPEmail() {
    try {
        let response = await resendCode();

        if (response.status === "RESTART_FLOW_ERROR") {
            // this can happen if the user has already successfully logged in into
            // another device whilst also trying to login to this one.
            toast.error("Login failed. Please try again");
            window.location.assign("/auth")
        } else {
            // OTP resent successfully.
            toast.success("Please check your email for the one time passcode.");
        }
    } catch (err: any) {
        if (err.isSuperTokensGeneralError === true) {
            // this may be a custom error message sent from the API by you.
            toast.error(err.message);
        } else {
            toast.error("Oops! Something went wrong.");
        }
    }
}


async function handleOTPInput(otp: string) {
    try {
        let response = await consumeCode({
            userInputCode: otp
        });

        console.log('response', response)
        if (response.status === "OK") {
            if (response.createdNewUser) {
                // user sign up success
                
                // navigate to form input for user and address, verify id
                Router.push("/create-account")
                return null
                
            } else {
                // user sign in success

                // return user context
                let user = response.user || null
                console.log('handle OTP response: ', response)
                return user
            }
            window.location.assign("/")
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
            
            // window.alert(err.message);
            toast.error(err.message)
            throw new Error(err.message)
        } else {

            console.error("OTP signin: something went wrong: ", err)
            // window.alert("Oops! Something went wrong.");
            throw new Error(err.message)
        }
    }
}

export { sendOTPEmail, sendOTPPhone, resendOTPEmail, handleOTPInput };

