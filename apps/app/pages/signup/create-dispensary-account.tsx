import { FlexBox, Grid, Page } from '@cd/shared-ui';
import Head from 'next/head';
import { useState } from 'react';
import { twMerge } from 'tailwind-merge';
import { FormCard } from '../../src/components/form';
import { useFormContext } from '../../src/context/StepFormProvider';

function DispensarySignUpStepForm() {
    const { formData, setFormValues } = useFormContext();
    const [formStep, setFormStep] = useState(0);
    const nextFormStep = () => setFormStep((currentStep) => currentStep + 1);
    const prevFormStep = () => setFormStep((currentStep) => currentStep - 1);

    // const formStepList = [
    //     <DispensarySignup nextFormStep={nextFormStep} />,
    //     <DispensaryUserSignup nextFormStep={nextFormStep} />,
    //     <CreateDispensary nextFormStep={nextFormStep} />,
    //     <CreateDispensaryComplete nextFormStep={nextFormStep} />
    // ];

    const formStepList = [
        <div>
            Step 1<button onClick={nextFormStep}>go to next step</button>
        </div>,
        <div>Step 2</div>,
        <div>Step 3</div>,
        <div>Step 4</div>
    ];
    const styles = { gradient: ['bg-gradient-to-b', 'from-primary', 'to-secondary'] };
    return (
        <Page className="h-screen">
            <Head>
                <title>Create a Dispensary Account</title>
            </Head>
            <Grid>
                <FlexBox className={twMerge(styles.gradient)}>
                    <FormCard
                        currentStep={formStep}
                        totalSteps={formStepList.length}
                        // prevFormStep={ prevFormStep }
                    >
                        <>
                            {formStepList.map((formStepComponent, index) => {
                                return formStep === index && formStepComponent;
                            })}
                        </>
                    </FormCard>
                </FlexBox>
            </Grid>
        </Page>
    );
}

export default DispensarySignUpStepForm;
