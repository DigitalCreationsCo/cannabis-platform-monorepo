import { getShopSite, selectUserState } from '@cd/core-lib';
import {
	Card,
	FormStepProvider,
	H2,
	Page,
	type LayoutContextProps,
} from '@cd/ui-lib/src/components';
import router from 'next/router';
import { useSelector } from 'react-redux';
import { twMerge } from 'tailwind-merge';
import {
	SubmitAddress,
	UserSignUpQuick,
	UserSignUpReview,
	VerifyPhotoId,
} from '../../components';

function ContinueSignUp() {
	const { user } = useSelector(selectUserState),
		{ isLegalAge, idVerified, isSignUpComplete } = user;

	// const isAddressAdded = useSelector(selectIsAddressAdded);

	if (!isLegalAge === false || (!isLegalAge && idVerified))
		router.push(getShopSite('/sorry-we-cant-serve-you'));

	// optional formstep components
	const FormStepComponents = [
		!idVerified ? VerifyPhotoId : null,
		!isSignUpComplete ? UserSignUpQuick : null,
		SubmitAddress,
		UserSignUpReview,
	];

	return (
		<Page className={twMerge(styles.gradient, 'pb-0 md:pb-24')}>
			<Card className="bg-inverse-soft m-auto h-full space-y-2">
				<H2 id="verify-id-step-1">Welcome to Gras</H2>
				<FormStepProvider
					FormStepComponents={FormStepComponents}
					formId="signup-form"
				/>
			</Card>
		</Page>
	);
}

ContinueSignUp.getLayoutContext = (): LayoutContextProps => ({
	showHeader: false,
});

export default ContinueSignUp;
const styles = {
	gradient: [
		'bg-gradient-to-b',
		'from-primary',
		'to-secondary',
		'p-0 lg:p-16 h-max',
	],
};
