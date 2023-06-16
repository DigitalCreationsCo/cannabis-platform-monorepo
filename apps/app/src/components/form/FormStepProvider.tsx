import { useEncryptCookies, useHashNavigate } from '@cd/core-lib';
import { OrganizationCreateType, UserCreateType } from '@cd/data-access';
import { ErrorMessage, FlexBox } from '@cd/ui-lib';
import { createContext, useContext, useEffect, useMemo, useState } from 'react';

type FormDataProps = {
    organization?: OrganizationCreateType;
    newUser: UserCreateType
};

interface FormContextProps {
    formData: FormDataProps;
    setFormValues: (values: Record<string, unknown>) => void;
    resetFormValues: () => void;
    canProceed: boolean;
    setCanProceed: (canProceed:boolean) => void;
    nextFormStep: () => void; 
    prevFormStep: () => void; 
}

const FormContext = createContext<FormContextProps>({} as FormContextProps);

interface FormStepProviderProps {
    FormStepComponents: React.FC[];
}

/**
 * A data provider component that can persist form values
 * over multiple components, allowing to access the values over multistepped forms.
 * - uses hash navigation
 * - persist form data in encrypted cookie
 * - allows navigation with browser next and back buttons
 * @prop FormStepComponents
 */
function FormStepProvider ({ FormStepComponents }: FormStepProviderProps) {

    const {canProceed, setCanProceed, formstep, nextFormStep, prevFormStep } = useHashNavigate()
    
    const [cookies, setCookie, removeCookie] = useEncryptCookies(['form-data-context']);

    const [formData, setFormData] = useState<FormDataProps>((cookies['form-data-context']) || {} as FormDataProps);
    
    useEffect(() => {
        setCookie('form-data-context', JSON.stringify(formData))
    }, [formData])

    function resetFormValues () {
        setFormData({} as FormDataProps);
    };

    function setFormValues (values: Record<string, any>) {
        setFormData((previousValues: any) => {
            let mergedValues = previousValues;
            for (const [key, value] of Object.entries(values)) {
                mergedValues = {
                    ...previousValues,
                    [key]: {
                        ...previousValues[key],
                        ...value,
                    },
                }
            }
            return { ...mergedValues }
        });
    };

    const
    currentStep = formstep,
    totalSteps = FormStepComponents.length,
    showStepNumber = currentStep !== undefined && totalSteps !== undefined 
    && `step ${currentStep + 1} of ${totalSteps}`
    
    const FormStepComponent = useMemo(() => FormStepComponents[formstep], [formstep]);

    if (!FormStepComponent) 
    return <ErrorMessage code={404} message="Page not found" />

    return (<FormContext.Provider value={{ nextFormStep, prevFormStep, canProceed, setCanProceed, formData, setFormValues, resetFormValues }}>
            <FormStepComponent />
            <FlexBox className={styles.stepNumber}>
                {showStepNumber}
            </FlexBox>
        </FormContext.Provider>);
};

const useFormContext = () => useContext<FormContextProps>(FormContext);

export { useFormContext, FormStepProvider };
export type { FormContextProps, FormDataProps };

const styles = { 
    stepNumber: 'fixed bottom-0 right-0 p-12 cursor-default'
};