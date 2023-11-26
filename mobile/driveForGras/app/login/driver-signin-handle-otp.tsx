import { handleDriverAppOTPCodeAPI } from '@cd/core-lib/src/auth/OTP';
import { TextContent } from '@cd/core-lib/src/constants';
import { driverActions } from '@cd/core-lib/src/reducer/driver.reducer';
import { useAppDispatch } from '@cd/core-lib/src/types';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { useFormik } from 'formik';
import { useState } from 'react';
import * as yup from 'yup';
import {
	Button,
	Center,
	Container,
	FlexBox,
	Screen,
	Text,
	TextField,
	View,
} from '@components';
import { styles } from '@styles';

const DriverSignInHandlePassCode = () => {
	const router = useRouter();
	const dispatch = useAppDispatch();

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
	const {
		status,
		deviceId,
		preAuthSessionId,
		flowType,
		fetchResponse,
		message,
		emailOrPhone,
	} = params;

	async function handleOTPCodeAndSignIn() {
		try {
			if (!loading) {
				setLoading(true);
				if (status === 'OK' && flowType === 'USER_INPUT_CODE') {
					const payload: any = {
						userInputCode: values.userInputCode,
						preAuthSessionId,
						deviceId,
						status,
						flowType,
						userContext: {
							appUser: 'DRIVER',
						},
						appUser: 'DRIVER',
					};
					const response = await handleDriverAppOTPCodeAPI(payload);
					console.info('response ', response);
					dispatch(driverActions.signinDriverSync(response.user));
				}
			}
		} catch (error: any) {
			setLoading(false);
			if (error.message === "Sorry, we couldn't find you. Please try again.")
				router.replace('/login/not-registered-to-drive');
			setFieldError('userInputCode', error.message);
		}
	}

	return (
		<Container>
			<Text>HANDLE OTP CODE</Text>
			<Text>
				{`status ${status} \n deviceId ${deviceId} \n preAuthSessionId ${preAuthSessionId} \n flowType ${flowType} \n fetchResponse ${fetchResponse} \n message ${message}`}
				{'userinputcode: ' + values.userInputCode}
			</Text>

			<FlexBox>
				<Center>
					<Text style={styles.text.p}>
						{`Your one-time passcode was sent to ${emailOrPhone}.`}
					</Text>
				</Center>
			</FlexBox>

			<View>
				<Center>
					<Text style={styles.text.error}>
						{!!touched.userInputCode && errors.userInputCode}
					</Text>
				</Center>
				<TextField
					autoComplete="off"
					value={values.userInputCode}
					onBlur={handleBlur('userInputCode')}
					onChangeText={handleChange('userInputCode')}
					placeholder={'enter your one-time passcode'}
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
