import { getShopSite, selectUserState } from '@gras/core';
import { FormStepProvider, type LayoutContextProps } from '@gras/ui';
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
		{ is_legal_age, id_verified, isSignUpComplete } = user;

	// const isAddressAdded = useSelector(selectIsAddressAdded);

	if (id_verified === true && is_legal_age === false)
		router.push(getShopSite('/sorry-we-cant-serve-you'));

	// Formstep components with null values will be ignored
	const FormStepComponents = [
		!id_verified ? VerifyPhotoId : null,
		!isSignUpComplete ? UserSignUpQuick : null,
		SubmitAddress,
		SubmitPaymentMethod,
		UserSignUpReview,
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
				formId="weed-text-signup-form"
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
