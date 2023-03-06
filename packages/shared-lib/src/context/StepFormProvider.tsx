import { OrganizationCreateType } from '@cd/data-access';
import { createContext, PropsWithChildren, useContext, useState } from 'react';

type FormDataProps = {
    organization: OrganizationCreateType;
    newUser: any;
};

interface FormContextProps extends PropsWithChildren {
    formData: FormDataProps;
    setFormValues: (values: Record<string, unknown>) => void;
}

const FormContext = createContext<FormContextProps>(null);

const StepFormValuesProvider = ({ children }) => {
    const [formData, setFormData] = useState<FormDataProps>();

    const setFormValues = (values: Record<string, unknown>) => {
        setFormData((prevValues) => ({
            ...prevValues,
            ...values
        }));
    };

    return <FormContext.Provider value={{ formData, setFormValues }}>{children}</FormContext.Provider>;
};

const useFormContext = () => useContext<FormContextProps>(FormContext);

export { useFormContext, StepFormValuesProvider, FormContextProps, FormDataProps };
