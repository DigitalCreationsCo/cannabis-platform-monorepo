import { OrganizationCreateType, UserCreateType } from '@cd/data-access';
import { createContext, PropsWithChildren, useContext, useState } from 'react';

type FormDataProps = {
    organization?: OrganizationCreateType;
    newUser: UserCreateType
};

interface FormContextProps extends PropsWithChildren {
    formData: FormDataProps;
    setFormValues: (values: Record<string, unknown>) => void;
    resetFormValues: () => void;
}

const FormContext = createContext<FormContextProps>({} as FormContextProps);

// a data provider component that will be used to store the form values
// over multiple component pages, allowing to access the values over multiple pages
const StepFormValuesProvider = ({ children }: PropsWithChildren) => {
    const [formData, setFormData] = useState<FormDataProps>({} as FormDataProps);

    const setFormValues = (values: FormDataProps) => {
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

    const resetFormValues = () => {
        setFormData({} as FormDataProps);
    }

    return <FormContext.Provider value={{ formData, setFormValues, resetFormValues }}>{children}</FormContext.Provider>;
};

const useFormContext = () => useContext<FormContextProps>(FormContext);

export { useFormContext, StepFormValuesProvider };
export type { FormContextProps, FormDataProps };

