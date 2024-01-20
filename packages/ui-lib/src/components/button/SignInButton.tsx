import { modalActions, modalTypes } from '@cd/core-lib';
import { useDispatch } from 'react-redux';
import { Paragraph } from '../Typography';
import Button, { type ButtonProps } from './Button/Button';

type SignInButtonProps = ButtonProps;

function SignInButton(props: SignInButtonProps) {
	const dispatch = useDispatch();
	function openLoginModal() {
		dispatch(
			modalActions.openModal({
				modalType: modalTypes.loginModal,
			}),
		);
	}

	return (
		<Button
			bg={'secondary-light'}
			hover={'primary-light'}
			{...props}
			className="place-self-center mb-4"
			onClick={openLoginModal}
		>
			<Paragraph>Sign In</Paragraph>
		</Button>
	);
}

export default SignInButton;
