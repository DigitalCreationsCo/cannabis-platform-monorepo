import {
	type ModalStateProps,
	modalActions,
	modalTypes,
	selectIsAddressAdded,
	selectUserState,
} from '@cd/core-lib';
import router from 'next/router';
import { useDispatch, useSelector } from 'react-redux';
import { twMerge } from 'tailwind-merge';
import Button from '../button/Button/Button';
import SignInButton from '../button/SignInButton';
import Center from '../Center';
import FlexBox from '../FlexBox';
import { H4, Paragraph } from '../Typography';
import Modal from './Modal';

interface CheckoutModalProps extends ModalStateProps {
	dispatchCloseModal: () => void;
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
		router.push('/signup/continue');
	}

	return (
		<Modal
			disableClickOutside
			className={twMerge(styles.responsive, 'flex flex-col')}
			modalVisible={modalVisible || false}
			onClose={dispatchCloseModal}
			{...props}
		>
			<Center className="w-3/4 m-auto pb-8">
				<H4>You haven't ordered with us before.</H4>
				{!user.isSignedIn && (
					<FlexBox className="space-y-8">
						<Paragraph>
							We'll need your contact info and address so our delivery person
							can get to you.{'\n'}
							<b>Sign In</b> with your account
						</Paragraph>
						<SignInButton size="lg" />
					</FlexBox>
				)}
				{user.isSignedIn && !isAddressAdded && (
					<FlexBox className="space-y-8">
						<Paragraph>
							We'll need your contact info and address so our delivery person
							can get to you.{'\n'}
							Hit <b>Next</b> to provide your info.
						</Paragraph>
						<Button onClick={completeSignUp} className="place-self-center">
							Next
						</Button>
					</FlexBox>
				)}
			</Center>
		</Modal>
	);

	function openLoginModal() {
		dispatch(
			modalActions.openModal({
				modalType: modalTypes.loginModal,
			})
		);
	}
}

export default CheckoutModal;

const styles = {
	responsive:
		'min-w-full min-h-screen sm:!rounded-none md:min-w-min md:min-h-min md:!rounded px-12 py-8',
};
