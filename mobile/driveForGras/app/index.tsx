/* eslint-disable no-constant-condition */
import TextContent from '@cd/core-lib/src/constants/text.constant';
import { useForm } from 'react-hook-form';
import { Image } from 'react-native';
import {
	Screen,
	Text,
	Container,
	Row,
	View,
	TextField,
	Button,
	Center,
} from '@components';
import Icons from '../icons';
import { styles } from '../styles';

const DriverLoginScreen = () => {
	const {
		control,
		handleSubmit,
		formState: { errors },
	} = useForm();

	const onSubmit = (data: any) => {
		console.info('onSubmit ', data);
		// dispatch(userActions.clearErrorMessage());
		// dispatch(userActions.loginUser(data));
	};

	return (
		<Container>
			<Row>
				<Text style={styles.text.h}>{TextContent.info.DELIVER_FOR_GRAS}</Text>
				<Icons.Flower />
			</Row>

			<Image
				source={require('../assets/images/leaf.gif')}
				style={{
					alignSelf: 'center',
					width: 170,
					height: 170,
				}}
			/>

			<View>
				<Center>
					<Text style={styles.text.p}>
						{(errors.email || errors.password) &&
							'Please enter the empty fields'}
					</Text>
				</Center>
				<TextField name={'email'} control={control} />
				<TextField name={'password'} control={control} />
			</View>

			<Button>
				{false ? TextContent.account.SIGNING_IN : TextContent.account.SIGNIN}
			</Button>

			{/* <Button>{TextContent.account.CREATE_AN_ACCOUNT}</Button> */}

			<Button secondary>{TextContent.account.FORGOT_YOUR_PASSWORD}</Button>
		</Container>
	);
};

export default Screen(DriverLoginScreen);
