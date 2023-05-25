import { OrganizationCreateType, UserCreateType } from '@cd/data-access';
import { FlexBox } from '@cd/ui-lib';
import { createContext, PropsWithChildren, useContext, useEffect, useMemo, useState } from 'react';
import { useCookies } from 'react-cookie';

type FormStepComponentProps = { 
    nextFormStep: () => void; 
    prevFormStep: () => void; 
}

type FormDataProps = {
    organization?: OrganizationCreateType;
    newUser: UserCreateType
};

interface FormContextProps extends PropsWithChildren {
    formData: FormDataProps;
    setFormValues: (values: Record<string, unknown>) => void;
    resetFormValues: () => void;
}

//  CREATE STEPFORM PROVIDER COMPONENT, THAT CONTAINS FORM DATA CONTEXT,
// USES HASH NAVIGATION
// PERSISTS FORM DATA IN ENCRYPTED COOKIE
// AND ALLOWS NAVIGATION WITH BROWSER NEXT AND BACK BUTTONS.

const FormContext = createContext<FormContextProps>({} as FormContextProps);

interface FormStepProviderProps {
    FormStepComponents: React.FC<FormStepComponentProps>[];
}

// a data provider component that will be used to store the form values
// over multiple component pages, allowing to access the values over multiple pages
const FormStepProvider = ({ FormStepComponents }: FormStepProviderProps) => {

    const [formStep, setFormStep] = useState(0);

    // const [formData, setFormData] = useState<FormDataProps>({} as FormDataProps);
    const [cookies, setCookie, removeCookie] = useCookies(['form-data-context']);
    const [formData, setFormData] = useState<FormDataProps>(JSON.parse(JSON.stringify(cookies["form-data-context"])));
    
    // const [cookies, _, removeCookie] = useCookies(['gras-cart-token'])
    // const simpleCart: SimpleCart = cookies["gras-cart-token"] && JSON.parse(JSON.stringify(cookies["gras-cart-token"]))

    console.log('formData', formData);

    const nextFormStep = () => setFormStep(formStep + 1)
    const prevFormStep = () => setFormStep(formStep - 1);
    
    const setFormValues = (values: Record<string, any>) => {
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
        console.log('set form context values');
    };

    useEffect(() => {
        setCookie('form-data-context', JSON.stringify(formData))
        console.info('form-data-context cookie set.')
    }, [formData])

    const resetFormValues = () => {
        setFormData({} as FormDataProps);
    }

    const FormStepComponent = useMemo(() => FormStepComponents[formStep], [formStep]);

    const
    currentStep = formStep,
    totalSteps = FormStepComponents.length,
    showStepNumber = currentStep !== undefined && totalSteps !== undefined 
    && `step ${currentStep + 1} of ${totalSteps}`

    return <FormContext.Provider value={{ formData, setFormValues, resetFormValues }}>
        <FormStepComponent 
        nextFormStep={nextFormStep}
        prevFormStep={prevFormStep}
        />
        <FlexBox className={styles.stepNumber}>
                {showStepNumber}
            </FlexBox>
        </FormContext.Provider>;
};

const useFormContext = () => useContext<FormContextProps>(FormContext);

export { useFormContext, FormStepProvider };
export type { FormContextProps, FormDataProps, FormStepComponentProps };

const styles = { 
    stepNumber: 'fixed bottom-0 right-0 p-12 cursor-default'
};