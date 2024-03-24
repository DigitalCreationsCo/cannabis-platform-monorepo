import { selectUserState } from '@cd/core-lib';
import { Card, H2, Page, type LayoutContextProps } from '@cd/ui-lib';
import Head from 'next/head';
import router from 'next/router';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { twMerge } from 'tailwind-merge';
import ContinueSignUp from '../../components/form/ContinueSignUp';

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
				<Card className="bg-inverse-soft m-auto h-full space-y-2">
					<H2 id="verify-id-step-1" className="text-primary">
						Welcome to Gras
					</H2>
					<ContinueSignUp />
				</Card>
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
