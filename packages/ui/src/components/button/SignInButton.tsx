"use client"
import { modalTypes } from '../../../../core/src/types';
import Link from 'next/link';
import Button, { type ButtonProps } from './Button/Button';

type SignInButtonProps = ButtonProps;

function SignInButton(props: SignInButtonProps) {
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
