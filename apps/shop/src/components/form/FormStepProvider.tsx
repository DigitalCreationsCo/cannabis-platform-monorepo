import { useHashNavigate } from '@cd/core-lib/hooks';
import { OrganizationCreateType, UserCreateType } from '@cd/data-access';
import { ErrorMessage, FlexBox } from '@cd/ui-lib';
import { createContext, PropsWithChildren, useContext, useEffect, useMemo, useState } from 'react';
import { useCookies } from 'react-cookie';

type FormDataProps = {
    organization?: OrganizationCreateType;
    newUser: UserCreateType
};

interface FormContextProps extends PropsWithChildren {
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
 * @prop FormStepComponents
 */

// CREATE STEPFORM PROVIDER COMPONENT, THAT CONTAINS FORM DATA CONTEXT,
// USES HASH NAVIGATION
// PERSISTS FORM DATA IN ENCRYPTED COOKIE
// AND ALLOWS NAVIGATION WITH BROWSER NEXT AND BACK BUTTONS.
function FormStepProvider ({ FormStepComponents }: FormStepProviderProps) {

    // const [formStep, setFormStep] = useState(0); 
    // const nextFormStep = () => setFormStep(formStep + 1)
    // const prevFormStep = () => setFormStep(formStep - 1);

    const {canProceed, setCanProceed, formstep, nextFormStep, prevFormStep } = useHashNavigate()
    
    // const [formData, setFormData] = useState<FormDataProps>({} as FormDataProps);
    const [cookies, setCookie, removeCookie] = useCookies(['form-data-context']);
    const [formData, setFormData] = useState<FormDataProps>({} as FormDataProps);
    
    console.log('formData', formData);
    
    useEffect(() => {
        setCookie('form-data-context', JSON.stringify(formData))
        console.info('form-data-context cookie set.')
    }, [formData])

    function resetFormValues () {
        setFormData({} as FormDataProps);
    };

    function setFormValues (values: Record<string, any>) {
        setFormData((previousValues: any) => {
            let mergedValues = previousValues;
            for (const [key, value] of Object.entries(values)) {
                // if (previousValues.hasOwnProperty(key)) {
                    mergedValues = {
                        ...previousValues,
                        [key]: {
                            ...previousValues[key],
                            ...value,
                        },
                    }
                // } else {
                //     mergedValues = {
                //         ...previousValues,
                //         [key]: value
                //     }
                // }
            }
            return { ...mergedValues }
        });
        // console.log('set form context values');
    };

    const
    currentStep = formstep,
    totalSteps = FormStepComponents.length,
    showStepNumber = currentStep !== undefined && totalSteps !== undefined 
    && `step ${currentStep + 1} of ${totalSteps}`
    
    const FormStepComponent = useMemo(() => FormStepComponents[formstep], [formstep]);

    if (!FormStepComponent) 
    return <ErrorMessage code={404} message="Page not found" />

    return <FormContext.Provider value={{ nextFormStep, prevFormStep, canProceed, setCanProceed, formData, setFormValues, resetFormValues }}>
        <FormStepComponent />
        <FlexBox className={styles.stepNumber}>
                {showStepNumber}
            </FlexBox>
        </FormContext.Provider>;
};

const useFormContext = () => useContext<FormContextProps>(FormContext);

export { useFormContext, FormStepProvider };
export type { FormContextProps, FormDataProps };

const styles = { 
    stepNumber: 'fixed bottom-0 right-0 p-12 cursor-default'
};