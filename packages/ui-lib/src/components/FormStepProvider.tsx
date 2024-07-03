/* eslint-disable @typescript-eslint/no-empty-function */
import { useEncryptCookies, useHashNavigate } from '@cd/core-lib';
import { type User, type Dispensary } from '@cd/data-access';
import { createContext, useContext, useEffect, useMemo, useState } from 'react';
import { twMerge } from 'tailwind-merge';
import ErrorMessage from './ErrorMessage';
import FlexBox from './FlexBox';

interface FormValuesType {
	dispensary?: Partial<Dispensary>;
	user?: Partial<User & any>;
}

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
	FormStepComponents: (React.FC<FormComponentProps> | null)[];
	formId: string;
	isComplete?: () => void;
	loading?: boolean;
	setLoading?: (loading: boolean) => void;
	stepPosition?: 'top' | 'bottom';
}

function FormStepProvider({
	FormStepComponents,
	formId,
	isComplete,
	loading,
	setLoading,
	stepPosition = 'top',
}: FormStepProviderProps) {
	const formComponentProps: FormComponentProps = { loading, setLoading };

	const [cookies, setCookie] = useEncryptCookies(
		// [`form-data-context-${formId}`] || ({} as FormValuesType),
		[`form-data-context-${formId}`]
	);
	const [formValues, setFormData] = useState<FormValuesType>(
		cookies[`form-data-context-${formId}`] || {}
	);

	useEffect(() => {
		setCookie(`form-data-context-${formId}`, JSON.stringify(formValues));
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [formId, formValues]);

	const validFormSteps = FormStepComponents.filter(
		(component) => component !== null
	);

	const { canProceed, setCanProceed, formstep, nextFormStep, prevFormStep } =
		useHashNavigate(formId);

	const currentStep = formstep;
	const totalSteps = validFormSteps.length;
	const showStepNumber =
		(currentStep !== undefined &&
			totalSteps !== undefined &&
			`step ${currentStep + 1} of ${totalSteps}`) ||
		'';

	const FormStepComponent = useMemo(
		() => validFormSteps[formstep],
		[formstep, validFormSteps]
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
			{/* <div
				className={twMerge([
					stepPosition === 'bottom' && '!hidden',
					'relative bottom-0 flex p-8',
				])}
			>
				<ul className="steps mx-auto w-full">
					{validFormSteps.map((formStepComponent, index) => (
						<li
							key={`step-${index}`}
							className={twMerge(
								'step',
								currentStep >= index ? 'step-primary' : 'step-inverse',
							)}
						>
							{formStepComponent?.displayName}
						</li>
					))}
				</ul>
			</div> */}
			<FormStepComponent {...formComponentProps} />
			<div
				className={twMerge([
					stepPosition === 'top' && '!hidden',
					'relative bottom-0 flex justify-end p-5',
				])}
			>
				<FlexBox className={styles.stepNumber}>
					{/* {showStepNumber} */}
					{`${currentStep + 1} of ${totalSteps}`}
				</FlexBox>
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

export interface FormComponentProps {
	loading?: boolean;
	setLoading?: (loading: boolean) => void;
}
