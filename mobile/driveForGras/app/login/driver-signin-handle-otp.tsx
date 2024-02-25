import {
	handleDriverAppOTPCodeAPI,
} from '@cd/core-lib/src/auth/OTP';
import TextContent from '@cd/core-lib/src/constants/text.constant';
import { driverActions } from '@cd/core-lib/src/reducer/driver.reducer';
import { type DriverWithSessionJoin } from '@cd/data-access';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { useFormik } from 'formik';
import { useState } from 'react';
import * as React from 'react';
import * as yup from 'yup';
import {
	Button,
	Center,
	Container,
	FlexBox,
	Padding,
	Screen,
	Text,
	TextField,
	View,
} from '@components';
import { styles } from '@styles';
import { useDispatch } from 'react-redux';

const DriverSignInHandlePassCode = () => {
	const router = useRouter();
	const dispatch = useDispatch();

	const [loading, setLoading] = useState(false);

	const {
		values,
		errors,
		touched,
		handleBlur,
		handleChange,
		handleSubmit,
		validateForm,
		setFieldError,
	} = useFormik({
		initialValues: { userInputCode: '' },
		onSubmit: handleOTPCodeAndSignIn,
		validationSchema: passcodeValidationSchema,
	});

	const params = useLocalSearchParams();
	const otpParams = decodeURIComponent(params.otp as string);

	console.log('otpParams', JSON.parse(otpParams));
	const payload: {
		status: any;
		deviceId: string;
		preAuthSessionId: string;
		flowType: 'USER_INPUT_CODE';
		fetchResponse: string;
		message: string;
		emailOrPhone: string;
		userInputCode: string;
		userContext: {
			// appUser: AppUser;
			emailOrPhone: string;
		};
		// appUser: AppUser;
	} = {
		// what's necessary here??
		...JSON.parse(otpParams),
		userInputCode: values.userInputCode,
		userContext: {
			// appUser: 'DRIVER_USER',
			...JSON.parse(otpParams),
		},
		// appUser: 'DRIVER_USER',
	};

	async function handleOTPCodeAndSignIn() {
		try {
			if (!loading) {
				setLoading(true);
				if (payload.status === 'OK' && payload.flowType === 'USER_INPUT_CODE') {
					const response = await handleDriverAppOTPCodeAPI(payload);
					const user = response.userFromDb.user,
						token = response.userFromDb.token;
					dispatch(
						driverActions.signinDriverSync({
							token,
							user: user as DriverWithSessionJoin,
						}),
					);
					router.replace('(tabs)');
				}
			}
		} catch (error: any) {
			setLoading(false);
			if (error.message === "Sorry, we couldn't find you. Please try again.")
				router.replace('/login/not-registered-to-drive');
			// setFieldError('userInputCode', error.message);
			setFieldError('userInputCode', 'An error occurred. Please try again.');
		}
	}

	return (
		<Container>
			{/* <Text>HANDLE OTP CODE</Text>
			<Text>
				{`status ${status} \n deviceId ${deviceId} \n preAuthSessionId ${preAuthSessionId} \n flowType ${flowType} \n fetchResponse ${fetchResponse} \n message ${message}`}
				{'userinputcode: ' + values.userInputCode}
			</Text> */}

			<FlexBox>
				<Center>
					<Text style={styles.text.p}>
						{`Your one-time passcode was sent to ${payload.emailOrPhone}.`}
					</Text>
				</Center>
			</FlexBox>

			<View>
				<Center>
					<Text style={[(errors.userInputCode && styles.text.error) || null]}>
						{(!!touched.userInputCode && errors.userInputCode) ||
							'enter your one-time passcode'}
					</Text>
				</Center>
				<TextField
					autoComplete="off"
					value={values.userInputCode}
					onBlur={handleBlur('userInputCode')}
					onChangeText={handleChange('userInputCode')}
					// placeholder={'enter your one-time passcode'}
				/>
			</View>

			<Button
				disabled={loading}
				onPress={() => {
					validateForm();
					handleSubmit();
				}}
			>
				{loading ? 'Lighting up...' : TextContent.account.SIGNIN}
			</Button>
			<Padding/>
		</Container>
	);
};

export default Screen(DriverSignInHandlePassCode);

const passcodeValidationSchema = yup.object().shape({
	userInputCode: yup
		.string()
		.required('enter your one-time passcode')
		.length(6, 'Invalid passcode.'),
});
