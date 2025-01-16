import TextContent from '@gras/core/src/constants/text.constant';
import { selectDriverState } from '@gras/core/src/reducer/driver.reducer';
import { router } from 'expo-router';
import { useDispatch, useSelector } from 'react-redux';
import {
	Container,
	GoBackButton,
	LoadingDots,
	Padding,
	Price,
	Screen,
	Text,
	View,
} from '@components';
import { styles } from '@styles';

function DriverBilling() {
	const dispatch = useDispatch();
	const { driver } = useSelector(selectDriverState);

	const isLoading = false,
		isSuccess = true;
	const paymentandBillingsMetadata = {
		earnings: {
			month: 15370,
			day: 2466,
		},
	};
	return (
		<Container>
			<Padding
				style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}
			>
				<GoBackButton />
				<Text style={styles.text.h}>Billing</Text>
			</Padding>

			{isLoading ? (
				<Padding>
					<Text>....</Text>
				</Padding>
			) : (
				<View>
					<Padding>
						<Text>Your earnings today</Text>
						<Price
							textStyle={styles.text.h}
							basePrice={paymentandBillingsMetadata.earnings.day}
						/>
					</Padding>

					<Padding>
						<Text>Your earnings this month</Text>
						<Price
							textStyle={styles.text.h}
							basePrice={paymentandBillingsMetadata.earnings.month}
						/>
					</Padding>
				</View>
			)}
		</Container>
	);
}

export default Screen(DriverBilling);
