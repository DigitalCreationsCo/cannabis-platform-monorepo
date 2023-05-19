import { FormCard, LayoutContextProps, Page } from '@cd/ui-lib';
import Head from 'next/head';
import { useState } from 'react';
import { twMerge } from 'tailwind-merge';
import {
    DispensaryCreate,
    DispensaryReview,
    DispensarySignUpComplete,
    DispensaryUserCreate,
    ProvideDispensaryKey
} from '../../components';

type FormStepComponentProps = { 
    nextFormStep: () => void; 
    prevFormStep: () => void; 
}

function DispensarySignUpStepForm() {

    const [formStep, setFormStep] = useState(0);

    const nextFormStep = () => setFormStep(formStep + 1)
    const prevFormStep = () => setFormStep(formStep - 1);

    const FormStepComponents = [
        ProvideDispensaryKey,
        DispensaryCreate, 
        DispensaryUserCreate, 
        DispensaryReview, 
        DispensarySignUpComplete
        // ProvideStripeAccountId,
    ];

    const styles = { gradient: ['bg-gradient-to-b', 'from-primary', 'to-secondary', ''] };
    return (
        <Page className={twMerge(styles.gradient, 'md:pt-16')}>
            <Head>
                <title>Create a Dispensary Account</title>
            </Head>
            <FormCard className={"bg-inverse-soft flex justify-center m-auto items-center"}
            currentStep={formStep}
            totalSteps={FormStepComponents.length}
            >
                {FormStepComponents.map((_fsc, index) => {
                    return (
                        formStep === index && 
                        <_fsc key={'form-step-component-' + index} 
                        nextFormStep={nextFormStep} 
                        prevFormStep={prevFormStep}
                        />
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
