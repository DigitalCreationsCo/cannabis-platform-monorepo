/* eslint-disable no-constant-condition */
import {
	getOTPCodeEmailAPI,
	getOTPCodePhoneAPI,
	TextContent,
} from '@cd/core-lib';
import { useRouter } from 'expo-router';
import { useFormik } from 'formik';
import { useEffect, useState } from 'react';
import { Image } from 'react-native';
import * as yup from 'yup';
import {
	Screen,
	Text,
	Container,
	Row,
	TextField,
	Button,
	Center,
	FlexBox,
	Padding,
} from '@components';
import { spacing } from '@constants';
import { styles } from '@styles';
import leaf from '../../assets/images/leaf.gif';

const DriverLoginScreen = () => {
	const router = useRouter();

	const [isInputPhone, setIsInputPhone] = useState(false);
	const [loading, setLoading] = useState(false);

	const {
		values,
		errors,
		touched,
		handleBlur,
		handleChange,
		handleSubmit,
		validateForm,
		setFieldValue,
		setFieldError,
	} = useFormik({
		initialValues: { emailOrPhone: '' },
		onSubmit: getOTPCode,
		validationSchema: () =>
			isInputPhone ? phoneValidationSchema : emailValidationSchema,
	});

	useEffect(() => {
		const switchInputEmailOrPhone = () => {
			values.emailOrPhone.match(/^\+?\d+$/g)
				? setIsInputPhone(true)
				: setIsInputPhone(false);
		};
		switchInputEmailOrPhone();
	}, [values.emailOrPhone]);

	useEffect(() => {
		if (isInputPhone && values.emailOrPhone.length === 1) {
			if (values.emailOrPhone === '1') setFieldValue('emailOrPhone', '+1');
			else setFieldValue('emailOrPhone', '+1' + values.emailOrPhone);
		} else setFieldValue('emailOrPhone', values.emailOrPhone);
	}, [isInputPhone]);

	async function getOTPCode() {
		try {
			if (!loading) {
				setLoading(true);
				let response: Awaited<ReturnType<typeof getOTPCodeEmailAPI>>;
				if (isInputPhone) {
					response = await getOTPCodePhoneAPI(values.emailOrPhone);
				} else {
					response = await getOTPCodeEmailAPI(values.emailOrPhone);
				}
				router.push({
					pathname: '/login/driver-signin-handle-otp',
					params: {
						otp: encodeURIComponent(
							JSON.stringify({
								...response,
								emailOrPhone: values.emailOrPhone,
								_invalidChars: 'asd+asd+++asd///;;;[[[]]]{{{}}}',
							}),
						),
					},
				});
			}
		} catch (error: any) {
			setLoading(false);
			setFieldError('emailOrPhone', error.message);
		}
	}

	return (
		<Container style={{ paddingBottom: spacing.sm }}>
			<Row>
				<Center>
					<Text style={styles.text.h}>{TextContent.info.DELIVER_FOR_GRAS}</Text>
				</Center>
			</Row>

			<FlexBox>
				<Center>
					<Image
						source={leaf}
						style={{
							width: 240,
							height: 240,
						}}
					/>
				</Center>
			</FlexBox>

			<Padding>
				<Center>
					<Text style={styles.text.error}>
						{!!touched.emailOrPhone && errors.emailOrPhone}
					</Text>
				</Center>
				<TextField
					autoComplete="off"
					maxLength={isInputPhone ? 12 : 35}
					value={values.emailOrPhone}
					onBlur={handleBlur('emailOrPhone')}
					onChangeText={handleChange('emailOrPhone')}
					placeholder={'enter your email or phone'}
				/>
				<Button
					disabled={loading}
					onPress={() => {
						validateForm();
						handleSubmit();
					}}
				>
					{loading ? 'Rolling...' : 'Continue'}
				</Button>
			</Padding>
		</Container>
	);
};

export default Screen(DriverLoginScreen);

const emailValidationSchema = yup.object().shape({
	emailOrPhone: yup
		.string()
		.email('Not a valid email.')
		.required('enter your email or phone'),
});

const phoneValidationSchema = yup.object().shape({
	emailOrPhone: yup
		.string()
		.length(12, 'Phone number must be 11 digits')
		.required('enter your email or phone'),
});
