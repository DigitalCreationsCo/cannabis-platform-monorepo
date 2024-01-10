import { getShopSite, selectUserState } from '@cd/core-lib';
import { FormStepProvider, type LayoutContextProps } from '@cd/ui-lib';
import router from 'next/router';
import { useState } from 'react';
import Confetti from 'react-confetti';
import { useSelector } from 'react-redux';
import {
	SubmitAddress,
	UserSignUpQuick,
	UserSignUpReview,
	VerifyPhotoId,
	SubmitPaymentMethod,
} from '..';

function ContinueSignUp() {
	const { user } = useSelector(selectUserState),
		{ isLegalAge, idVerified, isSignUpComplete } = user;

	// const isAddressAdded = useSelector(selectIsAddressAdded);

	if (idVerified === true && isLegalAge === false)
		router.push(getShopSite('/sorry-we-cant-serve-you'));

	// Formstep components with null values will be ignored
	const FormStepComponents = [
		// !idVerified ? VerifyPhotoId : null,
		// !isSignUpComplete ? UserSignUpQuick : null,
		// SubmitAddress,
		SubmitPaymentMethod,
		// UserSignUpReview,
	];
	const [runConfetti, setRunConfetti] = useState(false);

	return (
		<div className="px-2">
			<Confetti
				className="h-full w-full"
				numberOfPieces={540}
				run={runConfetti}
				recycle={false}
			/>

			<FormStepProvider
				FormStepComponents={FormStepComponents}
				formId="signup-form"
				isComplete={() => setRunConfetti(true)}
				stepPosition={'top'}
			/>
		</div>
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
