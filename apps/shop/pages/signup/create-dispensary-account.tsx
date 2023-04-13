import { FormCard, LayoutContextProps, Page } from '@cd/shared-ui';
import Head from 'next/head';
import { useState } from 'react';
import { twMerge } from 'tailwind-merge';
import {
    DispensaryCreate,
    DispensaryReview,
    DispensarySignUpComplete,
    DispensaryUserCreate
} from '../../src/components';

function DispensarySignUpStepForm() {
    const [formStep, setFormStep] = useState(0);
    const nextFormStep = () => setFormStep((currentStep) => currentStep + 1);
    // const prevFormStep = () => setFormStep((currentStep) => currentStep - 1);
    const FormStepComponents = [DispensaryCreate, DispensaryUserCreate, DispensaryReview, DispensarySignUpComplete];
    const styles = { gradient: ['bg-gradient-to-b', 'from-primary', 'to-secondary', 'p-0 lg:p-16 h-max'] };
    return (
        <Page className={twMerge(styles.gradient)}>
            <Head>
                <title>Create a Dispensary Account</title>
            </Head>
            <FormCard currentStep={formStep} totalSteps={FormStepComponents.length}>
                {FormStepComponents.map((_fsc, index) => {
                    return (
                        formStep === index && <_fsc key={'form-step-component-' + index} nextFormStep={nextFormStep} />
                    );
                })}
            </FormCard>
        </Page>
    );
}

DispensarySignUpStepForm.getLayoutContext = (): LayoutContextProps => ({
    showHeader: false
});
export default DispensarySignUpStepForm;
