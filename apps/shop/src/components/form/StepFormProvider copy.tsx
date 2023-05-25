import { OrganizationCreateType, UserCreateType } from '@cd/data-access';
import { createContext, PropsWithChildren, useContext, useEffect, useState } from 'react';
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

// a data provider component that will be used to store the form values
// over multiple component pages, allowing to access the values over multiple pages
const StepFormValuesProvider = ({ children }: PropsWithChildren) => {
    // const [formData, setFormData] = useState<FormDataProps>({} as FormDataProps);
    const [cookies, setCookie, removeCookie] = useCookies(['form-data-context']);
    const [formData, setFormData] = useState<FormDataProps>(JSON.parse(JSON.stringify(cookies["form-data-context"])));
    
    // const [cookies, _, removeCookie] = useCookies(['gras-cart-token'])
    // const simpleCart: SimpleCart = cookies["gras-cart-token"] && JSON.parse(JSON.stringify(cookies["gras-cart-token"]))

    console.log('formData', formData);
    
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
    };

    useEffect(() => {
        setCookie('form-data-context', JSON.stringify(formData))
        console.info('form-data-context cookie set.')
    }, [formData])

    const resetFormValues = () => {
        setFormData({} as FormDataProps);
    }

    return <FormContext.Provider value={{ formData, setFormValues, resetFormValues }}>{children}</FormContext.Provider>;
};

const useFormContext = () => useContext<FormContextProps>(FormContext);

export { useFormContext, StepFormValuesProvider };
export type { FormContextProps, FormDataProps, FormStepComponentProps };

