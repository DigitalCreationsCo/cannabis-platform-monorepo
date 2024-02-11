import { selectDriverState, TextContent, useAppSelector } from '@cd/core-lib';
import {
	LoginHeader,
	FlexBox,
	H1,
	Page,
	type LayoutContextProps,
	Center,
	Paragraph,
	FormStepProvider,
	H3,
} from '@cd/ui-lib';
import LoginModal from '@cd/ui-lib/src/components/modal/LoginModal';
import EnterOTPForm from '@cd/ui-lib/src/components/modal/LoginModal/EnterPassCodeForm';
import { type LoginFormComponentProps } from '@cd/ui-lib/src/components/modal/LoginModal/LoginModal';
import SendOTPForm from '@cd/ui-lib/src/components/modal/LoginModal/SendPassCodeForm';
import { useState, useMemo } from 'react';

function DriveSignIn() {
	const { driver, isSignedIn } = useAppSelector(selectDriverState);

	const [formStep, setFormStep] = useState(0);

	const prevFormStep = () => setFormStep((currentStep) => currentStep - 1);
	const nextFormStep = () =>
		setFormStep((currentStep) =>
			currentStep <= 1 ? currentStep + 1 : currentStep,
		);

	const FormStepComponents: (({
		prevFormStep,
		nextFormStep,
	}: LoginFormComponentProps) => JSX.Element)[] = [SendOTPForm, EnterOTPForm];

	const FormStepComponent = useMemo(
		() => FormStepComponents[formStep],
		[formStep],
	);

	const [inputValue, setInputValue] = useState('');

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
				/>
				{!isSignedIn && 'Please sign in'}
				{isSignedIn && driver.email + ' is signed in as a driver'}
			</Center>
		</Page>
	);
}

DriveSignIn.getLayoutContext = (): LayoutContextProps => ({});
export default DriveSignIn;
