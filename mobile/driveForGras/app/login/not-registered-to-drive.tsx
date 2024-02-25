import { Link, useRouter } from 'expo-router';
import { Screen, Text, Container, Button, Center, FlexBox } from '@components';
import { spacing } from '@constants';
import { styles } from '@styles';

const NotRegisteredToDrive = () => {
	const router = useRouter();

	return (
		<Container>
			<FlexBox>
				<Center>
					<Text style={styles.text.p}>You're not ready for this app yet.</Text>
					<Link
						href={'https://grascannabis.org'}
						style={[
							styles.text.h,
							{
								textAlign: 'center',
								paddingVertical: spacing[4],
								textDecorationLine: 'underline',
								color: '#14a33d',
							},
						]}
					>
						Sign up to deliver for Gras at grascannabis.org 🌿
					</Link>
				</Center>
				<Button onPress={() => router.push('/login/driver-signin')}>
					go back
				</Button>
			</FlexBox>
		</Container>
	);
};

export default Screen(NotRegisteredToDrive);
