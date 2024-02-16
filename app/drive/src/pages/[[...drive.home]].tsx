import { driverActions, selectDriverState, useAppSelector } from '@cd/core-lib';
import {
	LoginHeader,
	Page,
	type LayoutContextProps,
	Center,
	H3,
	SendPassCodeForm,
	EnterPassCodeForm,
	Paragraph,
} from '@cd/ui-lib';
import { type LoginFormComponentProps } from '@cd/ui-lib/src/components/modal/LoginModal/LoginModal';
import { default as Router } from 'next/router';
import { useState, useMemo } from 'react';

function DriveSignIn() {
	const { driver, isSignedIn, isError, errorMessage } =
		useAppSelector(selectDriverState);

	const [formStep, setFormStep] = useState(0);

	const prevFormStep = () => setFormStep((currentStep) => currentStep - 1);
	const nextFormStep = () =>
		setFormStep((currentStep) =>
			currentStep <= 1 ? currentStep + 1 : currentStep,
		);

	const FormStepComponents: (({
		prevFormStep,
		nextFormStep,
	}: LoginFormComponentProps) => JSX.Element)[] = [
		SendPassCodeForm,
		EnterPassCodeForm,
	];

	const FormStepComponent = useMemo(
		() => FormStepComponents[formStep],
		[formStep],
	);

	const [inputValue, setInputValue] = useState('');

	if (isSignedIn) {
		Router.push('/drive');
	}

	return (
		<Page className="bg-secondary text-light p-0 sm:p-0 md:p-0 lg:p-0">
			<Center className="space-y-6 m-auto">
				<LoginHeader />
				<H3>DRIVER HUB</H3>
				<FormStepComponent
					prevFormStep={prevFormStep}
					nextFormStep={nextFormStep}
					inputValue={inputValue}
					setInputValue={setInputValue}
					dispatchCloseModal={() => null}
					signInSyncAction={driverActions.signinDriverSync}
				/>
				<Paragraph className="text-red-400 font-semibold">
					{isError ? 'Error: ' + errorMessage : ''}
				</Paragraph>
			</Center>
		</Page>
	);
}

DriveSignIn.getLayoutContext = (): LayoutContextProps => ({});
export default DriveSignIn;
