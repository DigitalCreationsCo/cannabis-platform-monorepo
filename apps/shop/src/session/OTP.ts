import { consumeCode, createCode, resendCode } from "supertokens-web-js/recipe/passwordless";
    
async function sendOTPEmail(email: string) {
    try {
        let response = await createCode({
            email
        });
        window.alert("Please check your email for the one time passcode.");
    } catch (err: any) {
        if (err.isSuperTokensGeneralError === true) {
            // this may be a custom error message sent from the API by you,
            // or if the input email / phone number is not valid.
            window.alert(err.message);
        } else {
            window.alert("Oops! Something went wrong.");
        }
    }
}


async function sendOTPPhone(phoneNumber: string) {
    try {
        let response = await createCode({
            phoneNumber
        });
        window.alert("Please check your mobile messages for the one time passcode.");
    } catch (err: any) {
        if (err.isSuperTokensGeneralError === true) {
            // this may be a custom error message sent from the API by you,
            // or if the input email / phone number is not valid.
            window.alert(err.message);
        } else {
            window.alert("Oops! Something went wrong.");
        }
    }
}

async function resendOTPEmail() {
    try {
        let response = await resendCode();

        if (response.status === "RESTART_FLOW_ERROR") {
            // this can happen if the user has already successfully logged in into
            // another device whilst also trying to login to this one.
            window.alert("Login failed. Please try again");
            window.location.assign("/auth")
        } else {
            // OTP resent successfully.
            window.alert("Please check your email for the one time passcode.");
        }
    } catch (err: any) {
        if (err.isSuperTokensGeneralError === true) {
            // this may be a custom error message sent from the API by you.
            window.alert(err.message);
        } else {
            window.alert("Oops! Something went wrong.");
        }
    }
}


async function handleOTPInput(otp: string) {
    try {
        let response = await consumeCode({
            userInputCode: otp
        });

        if (response.status === "OK") {
            if (response.createdNewUser) {
                // user sign up success
                // navigate to form input for user and address, verify id
            } else {
                // user sign in success
                // navigate to home
            }
            window.location.assign("/home")
        } else if (response.status === "INCORRECT_USER_INPUT_CODE_ERROR") {
            // the user entered an invalid OTP
            window.alert("Wrong OTP! Please try again. Number of attempts left: " + (response.maximumCodeInputAttempts - response.failedCodeInputAttemptCount));
        } else if (response.status === "EXPIRED_USER_INPUT_CODE_ERROR") {
            // it can come here if the entered OTP was correct, but has expired because
            // it was generated too long ago.
            window.alert("Old OTP entered. Please regenerate a new one and try again");
        } else {
            // this can happen if the user tried an incorrect OTP too many times.
            window.alert("Login failed. Please try again");
            window.location.assign("/auth")
        }
    } catch (err: any) {
        if (err.isSuperTokensGeneralError === true) {
            // this may be a custom error message sent from the API by you.
            window.alert(err.message);
        } else {
            window.alert("Oops! Something went wrong.");
        }
    }
}

export { sendOTPEmail, sendOTPPhone, resendOTPEmail, handleOTPInput };

