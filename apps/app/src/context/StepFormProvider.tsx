import { OrganizationCreateType } from '@cd/data-access/dist';
import { createContext, PropsWithChildren, useContext, useState } from 'react';

interface FormContextProps extends PropsWithChildren {
    formData: {
        organization: OrganizationCreateType;
        newUser: any;
    }
    setFormValues: (values: Record<string, unknown>) => void;
}
export const FormContext = createContext<FormContextProps>(null);

const StepFormValuesProvider = ({ children }) => {
    const [formData, setFormData] = useState<Record<string, unknown>>();

    const setFormValues = (values: Record<string, unknown>) => {
        setFormData((prevValues) => ({
            ...prevValues,
            ...values
        }));
    };

    return <FormContext.Provider value={{ formData, setFormValues }}>{children}</FormContext.Provider>;
};

export default StepFormValuesProvider;
export const useFormContext = () => useContext<FormContextProps>(FormContext);
