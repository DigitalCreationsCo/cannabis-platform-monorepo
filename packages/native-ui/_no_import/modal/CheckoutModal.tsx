import { modalActions } from '@cd/core-lib/src/reducer/modal.reducer';
import {
	selectUserState,
	selectIsAddressAdded,
} from '@cd/core-lib/src/reducer/user.reducer';
import { modalTypes } from '@cd/core-lib/src/types/modal.types';
import { useDispatch, useSelector } from 'react-redux';
import { Text } from '@themed';
import Center from '../atomic/Center';
import Button from '../button/Button';
import FlexBox from '../FlexBox';
import Modal from './Modal';

interface CheckoutModalProps {
	dispatchCloseModal: () => void;
	modalVisible: boolean;
}

function CheckoutModal({
	dispatchCloseModal,
	modalVisible,
	...props
}: CheckoutModalProps) {
	const dispatch = useDispatch();

	const user = useSelector(selectUserState);
	const isAddressAdded = useSelector(selectIsAddressAdded);

	const closeModalAndReset = () => {
		dispatchCloseModal();
	};

	function completeSignUp() {
		closeModalAndReset();
		// this branch will likely never happen,
		// because automatic redirect for new users is handled in the signin flow.

		// router.push("/signup/continue");
	}

	return (
		<Modal
			disableClickOutside
			modalVisible={modalVisible}
			onClose={dispatchCloseModal}
			{...props}
		>
			<Center className="space-y-8 w-3/4 m-auto pb-8">
				<Text>It looks like you haven't ordered with us before.</Text>

				{!user.isSignedIn && (
					<>
						<Text>
							We'll need your contact info and address so our delivery person
							can get to you.{'\n'}
							Sign In with your account
						</Text>
						<FlexBox className="space-y-8">
							<Button className="place-self-center" onPress={openLoginModal}>
								Sign In
							</Button>
						</FlexBox>
					</>
				)}

				{user.isSignedIn && !isAddressAdded && (
					<>
						<Text>
							We'll need your contact info and address so our delivery person
							can get to you.{'\n'}
							Hit <b>Next</b> to provide your info.
						</Text>
						<FlexBox className="space-y-8">
							<Button onPress={completeSignUp} className="place-self-center">
								Next
							</Button>
						</FlexBox>
					</>
				)}
			</Center>
		</Modal>
	);

	function openLoginModal() {
		dispatch(
			modalActions.openModal({
				modalType: modalTypes.loginModal,
			}),
		);
	}
}

export default CheckoutModal;
