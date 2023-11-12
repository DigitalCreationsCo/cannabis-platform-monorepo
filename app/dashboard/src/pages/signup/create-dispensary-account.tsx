import {
	FormCard,
	FormStepProvider,
	Page,
	type LayoutContextProps,
} from '@cd/ui-lib';
import Head from 'next/head';
import { useState } from 'react';
import Confetti from 'react-confetti';
import { twMerge } from 'tailwind-merge';

import {
	DispensaryCreate,
	DispensaryReview,
	DispensarySignUpComplete,
	DispensaryUserCreate,
	ProvideDispensaryCode,
	ProvideStripeAccountId,
	ConnectIntegrations,
} from '../../components/form';

const FormStepComponents = [
	ProvideDispensaryCode,
	DispensaryCreate,
	DispensaryUserCreate,
	ConnectIntegrations,
	ProvideStripeAccountId,
	DispensaryReview,
	DispensarySignUpComplete,
];

function DispensarySignUpStepForm() {
	const [runConfetti, setRunConfetti] = useState(false);
	return (
		<Page className={twMerge(styles.gradient, 'pb-0', 'md:py-16')}>
			<Head>
				<title>Grascannabis.org - Create a Dispensary Account</title>
				<meta name="Gras App" content="Built by Gras Cannabis Co." />
			</Head>
			<Confetti
				className="h-full w-full"
				numberOfPieces={540}
				run={runConfetti}
				recycle={false}
			/>
			<FormCard className={'bg-inverse-soft mx-auto'}>
				<FormStepProvider
					formId="dispensary-signup-form"
					FormStepComponents={FormStepComponents}
					isComplete={() => setRunConfetti(true)}
				/>
			</FormCard>
		</Page>
	);
}

const styles = {
	gradient: ['bg-gradient-to-b', 'from-primary', 'to-secondary'],
};

DispensarySignUpStepForm.getLayoutContext = (): LayoutContextProps => ({
	showHeader: false,
	showSideNav: false,
});

export default DispensarySignUpStepForm;
