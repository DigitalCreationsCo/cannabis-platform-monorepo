import {
	FormCard,
	FormStepProvider,
	type LayoutContextProps,
	Page,
} from '@cd/ui-lib';
import Head from 'next/head';
import { twMerge } from 'tailwind-merge';

import {
	DispensaryCreate,
	DispensaryReview,
	DispensarySignUpComplete,
	DispensaryUserCreate,
	ProvideDispensaryCode,
	ProvideStripeAccountId,
} from '../../components/form';

const FormStepComponents = [
	ProvideDispensaryCode,
	DispensaryCreate,
	DispensaryUserCreate,
	ProvideStripeAccountId,
	DispensaryReview,
	DispensarySignUpComplete,
];

function DispensarySignUpStepForm() {
	return (
		<Page className={twMerge(styles.gradient, 'md:pt-16')}>
			<Head>
				<title>Grascannabis.org - Create a Dispensary Account</title>
				<meta name="Gras App" content="Built by Gras Cannabis Co." />
			</Head>

			<FormCard className={'bg-inverse-soft mx-auto'}>
				<FormStepProvider
					formId="dispensary-signup-form"
					FormStepComponents={FormStepComponents}
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
