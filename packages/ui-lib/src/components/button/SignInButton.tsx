import { modalActions } from '@cd/core-lib/reducer';
import { modalTypes } from '@cd/core-lib/types';
import Link from 'next/link';
import { useDispatch } from 'react-redux';
import Button, { type ButtonProps } from './Button/Button';

type SignInButtonProps = ButtonProps;

function SignInButton(props: SignInButtonProps) {
	const dispatch = useDispatch();
	function openLoginModal() {
		dispatch(
			modalActions.openModal({
				modalType: modalTypes.loginModal,
			})
		);
	}

	return (
		<Link href="/auth/login">
			<Button
				bg={'secondary-light'}
				hover={'primary-light'}
				className="place-self-center mb-4"
				{...props}
			>
				Sign In
			</Button>
		</Link>
	);
}

export default SignInButton;
