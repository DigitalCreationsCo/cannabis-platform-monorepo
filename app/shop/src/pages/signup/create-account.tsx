import { selectUserState } from '@cd/core-lib';
import { Page, type LayoutContextProps } from '@cd/ui-lib';
import Head from 'next/head';
import router from 'next/router';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { twMerge } from 'tailwind-merge';
import ContinueSignUp from './continue';

function CreateUserAccount() {
	const userState = useSelector(selectUserState);
	if (!userState.isSignedIn) router.push('/');
	useEffect(() => {
		if (userState.user.isSignUpComplete) router.push('/');
	}, []);
	if (userState.isSignedIn)
		return (
			<Page className={twMerge(styles.gradient)}>
				<Head>
					<meta name="Gras App" content="Built by Gras Cannabis Co." />
				</Head>
				<ContinueSignUp />
			</Page>
		);
}

CreateUserAccount.getLayoutContext = (): LayoutContextProps => ({
	showHeader: false,
	showTopBar: true,
});
export default CreateUserAccount;

const styles = {
	gradient: [
		'bg-gradient-to-b',
		'from-primary',
		'to-secondary',
		'p-0 lg:p-16 h-max',
	],
};
