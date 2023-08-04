import { modalActions } from '@cd/core-lib/src/reduxDir';
import { modalTypes } from '@cd/core-lib/src/utils';
import { useDispatch } from 'react-redux';
import Button, { type ButtonProps } from './Button';

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
			Sign In
		</Button>
	);
}

export default SignInButton;
