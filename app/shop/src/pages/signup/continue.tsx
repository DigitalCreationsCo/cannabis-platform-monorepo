import { getShopSite, selectUserState } from '@cd/core-lib';
import {
	Card,
	FormStepProvider,
	H2,
	Page,
	type LayoutContextProps,
} from '@cd/ui-lib';
import router from 'next/router';
import { useState } from 'react';
import Confetti from 'react-confetti';
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

	if (idVerified === true && isLegalAge === false)
		router.push(getShopSite('/sorry-we-cant-serve-you'));

	// Formstep components with null values will be ignored
	const FormStepComponents = [
		!idVerified ? VerifyPhotoId : null,
		!isSignUpComplete ? UserSignUpQuick : null,
		SubmitAddress,
		UserSignUpReview,
	];
	const [runConfetti, setRunConfetti] = useState(false);

	return (
		<Page className={twMerge(styles.gradient, 'pb-0 md:pb-24')}>
			<Confetti
				className="h-full w-full"
				numberOfPieces={540}
				run={runConfetti}
				recycle={false}
			/>
			<Card className="bg-inverse-soft m-auto h-full space-y-2">
				<H2 id="verify-id-step-1" className="text-primary">
					Welcome to Gras
				</H2>
				<FormStepProvider
					FormStepComponents={FormStepComponents}
					formId="signup-form"
					isComplete={() => setRunConfetti(true)}
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
