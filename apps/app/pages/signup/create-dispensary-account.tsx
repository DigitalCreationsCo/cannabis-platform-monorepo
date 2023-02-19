import { FlexBox, Page } from '@cd/shared-ui';
import {
    DispensaryCreate,
    DispensaryReview,
    DispensarySignUpComplete,
    DispensaryUserCreate,
    FormCard
} from 'components';
import Head from 'next/head';
import { useState } from 'react';
import { twMerge } from 'tailwind-merge';

function DispensarySignUpStepForm() {
    const [formStep, setFormStep] = useState(0);
    const nextFormStep = () => setFormStep((currentStep) => currentStep + 1);
    const prevFormStep = () => setFormStep((currentStep) => currentStep - 1);
    const FormStepComponents = [DispensaryCreate, DispensaryUserCreate, DispensaryReview, DispensarySignUpComplete];
    const styles = { gradient: ['bg-gradient-to-b', 'from-primary', 'to-secondary'] };
    return (
        <Page>
            <Head>
                <title>Create a Dispensary Account</title>
            </Head>
            <FlexBox className={twMerge(styles.gradient)}>
                <FormCard currentStep={formStep} totalSteps={FormStepComponents.length}>
                    {FormStepComponents.map((_fsc, index) => {
                        return (
                            formStep === index && (
                                <_fsc key={'form-step-component-' + index} nextFormStep={nextFormStep} />
                            )
                        );
                    })}
                </FormCard>
            </FlexBox>
        </Page>
    );
}

export default DispensarySignUpStepForm;
