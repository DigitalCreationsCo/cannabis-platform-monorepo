import { jsx as _jsx } from "react/jsx-runtime";
import { createContext, useContext, useState } from 'react';
const FormContext = createContext(null);
const StepFormValuesProvider = ({ children }) => {
    const [formData, setFormData] = useState();
    const setFormValues = (values) => {
        setFormData((prevValues) => ({
            ...prevValues,
            ...values
        }));
    };
    return _jsx(FormContext.Provider, { value: { formData, setFormValues }, children: children });
};
const useFormContext = () => useContext(FormContext);
export { useFormContext, StepFormValuesProvider };
//# sourceMappingURL=StepFormProvider.js.map