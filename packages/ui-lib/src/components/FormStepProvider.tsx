import { useEncryptCookies, useHashNavigate } from '@cd/core-lib';
import { OrganizationCreateType, UserCreateType } from '@cd/data-access';
import { createContext, useContext, useEffect, useMemo, useState } from 'react';
import ErrorMessage from './ErrorMessage';
import FlexBox from './FlexBox';

type FormValuesType = {
	organization?: OrganizationCreateType;
	newUser?: UserCreateType;
};

interface FormContextProps {
	formValues: FormValuesType;
	setFormValues: (values: Record<string, unknown>) => void;
	resetFormValues: () => void;
	canProceed: boolean;
	setCanProceed: (canProceed: boolean) => void;
	nextFormStep: () => void;
	prevFormStep: () => void;
}

const FormContext = createContext<FormContextProps>({
	formValues: {},
	setFormValues: () => {},
	resetFormValues: () => {},
	canProceed: false,
	setCanProceed: () => {},
	nextFormStep: () => {},
	prevFormStep: () => {},
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
}

function FormStepProvider({
	FormStepComponents,
	formId,
}: FormStepProviderProps) {
	const [cookies, setCookie, removeCookie] = useEncryptCookies(
		[`form-data-context-${formId}`] || ({} as FormValuesType),
	);
	const [formValues, setFormData] = useState<FormValuesType>(
		cookies[`form-data-context-${formId}`] || {},
	);

	useEffect(() => {
		setCookie(`form-data-context-${formId}`, JSON.stringify(formValues));
	}, [formValues]);

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

	const FormStepComponent = useMemo(() => validFormSteps[formstep], [formstep]);
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
			}}
		>
			<FormStepComponent />
			<div className="relative right-0 pt-4">
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
	stepNumber: 'absolute bottom-0 right-0 pr-8 cursor-default',
};

export { useFormContext, FormStepProvider };
export type { FormContextProps, FormValuesType };
