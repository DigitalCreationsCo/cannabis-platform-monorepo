import { OrganizationCreateType } from '@cd/data-access';
import { PropsWithChildren } from 'react';
type FormDataProps = {
    organization: OrganizationCreateType;
    newUser: any;
};
interface FormContextProps extends PropsWithChildren {
    formData: FormDataProps;
    setFormValues: (values: Record<string, unknown>) => void;
}
declare const StepFormValuesProvider: ({ children }: {
    children: any;
}) => JSX.Element;
declare const useFormContext: () => FormContextProps;
export { useFormContext, StepFormValuesProvider };
export type { FormContextProps, FormDataProps };
