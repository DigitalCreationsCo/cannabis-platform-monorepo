/* eslint-disable @typescript-eslint/no-empty-function */
import { useEncryptCookies, useHashNavigate } from '@cd/core-lib';
import {
	type OrganizationCreateType,
	type UserCreateType,
} from '@cd/data-access';
import { createContext, useContext, useEffect, useMemo, useState } from 'react';
import ErrorMessage from './ErrorMessage';
import FlexBox from './FlexBox';

type FormValuesType = {
	organization?: Partial<OrganizationCreateType>;
	newUser?: Partial<UserCreateType>;
};

interface FormContextProps {
	formValues: FormValuesType;
	setFormValues: (values: FormValuesType) => void;
	resetFormValues: () => void;
	canProceed: boolean;
	setCanProceed: (canProceed: boolean) => void;
	nextFormStep: () => void;
	prevFormStep: () => void;
	isComplete?: () => void;
}

const FormContext = createContext<FormContextProps>({
	formValues: {},
	setFormValues: () => {},
	resetFormValues: () => {},
	canProceed: false,
	setCanProceed: () => {},
	nextFormStep: () => {},
	prevFormStep: () => {},
	isComplete: () => {},
});

const useFormContext = () => useContext(FormContext);

/**
 * FormStepProvider
 * A data provider component that can persist form values
 * over multiple components, allowing to access the values over multistepped forms.
 * - uses hash navigation
 * - persist form data in encrypted cookie for when user leaves and returns to form
 * - allows navigation with browser next and back buttons
 * @property formId is used to generate a unique cookie key
 * @property FormStepComponents accepts a list of components, or expressions that evaluate to components or null, and filters out null values
 */
interface FormStepProviderProps {
	FormStepComponents: (React.FC | null)[];
	formId: string;
	isComplete?: () => void;
}

function FormStepProvider({
	FormStepComponents,
	formId,
	isComplete,
}: FormStepProviderProps) {
	const [cookies, setCookie] = useEncryptCookies(
		[`form-data-context-${formId}`] || ({} as FormValuesType),
	);
	const [formValues, setFormData] = useState<FormValuesType>(
		cookies[`form-data-context-${formId}`] || {},
	);

	useEffect(() => {
		setCookie(`form-data-context-${formId}`, JSON.stringify(formValues));
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [formId, formValues]);

	const validFormSteps = FormStepComponents.filter(
		(component) => component !== null,
	);

	const { canProceed, setCanProceed, formstep, nextFormStep, prevFormStep } =
		useHashNavigate(formId);

	const currentStep = formstep,
		totalSteps = validFormSteps.length,
		showStepNumber =
			currentStep !== undefined &&
			totalSteps !== undefined &&
			`step ${currentStep + 1} of ${totalSteps}`;

	const FormStepComponent = useMemo(
		() => validFormSteps[formstep],
		[formstep, validFormSteps],
	);
	if (!FormStepComponent)
		return <ErrorMessage code={404} message="Page not found" />;

	return (
		<FormContext.Provider
			value={{
				nextFormStep,
				prevFormStep,
				canProceed,
				setCanProceed,
				formValues,
				setFormValues,
				resetFormValues,
				isComplete,
			}}
		>
			<FormStepComponent />
			<div className="relative bottom-0 flex justify-end p-5">
				<FlexBox className={styles.stepNumber}>{showStepNumber}</FlexBox>
			</div>
		</FormContext.Provider>
	);

	function resetFormValues() {
		setFormData({} as FormValuesType);
	}

	function setFormValues(values: Record<string, any>) {
		setFormData((previousValues: any) => {
			let mergedValues = previousValues;
			for (const [key, value] of Object.entries(values)) {
				mergedValues = {
					...previousValues,
					[key]: {
						...previousValues[key],
						...value,
					},
				};
			}
			return { ...mergedValues };
		});
	}
}

const styles = {
	stepNumber: 'text-gray-400 absolute cursor-default',
};

export { useFormContext, FormStepProvider };
export type { FormContextProps, FormValuesType };
