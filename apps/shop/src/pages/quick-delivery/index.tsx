import { Card, LayoutContextProps, Page } from "@cd/ui-lib/src/components";
import { ConfirmOrder, ReviewOrder, SubmitAddress, UserName, VerifyPhotoId } from "components";
import Head from "next/head";
import { useState } from "react";
import { twMerge } from "tailwind-merge";

function QuickDelivery() {
    const [formStep, setFormStep] = useState(0);
    const nextFormStep = () => setFormStep((currentStep) => currentStep + 1);
    const prevFormStep = () => setFormStep((currentStep) => currentStep - 1);
    const FormStepComponents = [
        ConfirmOrder,
        VerifyPhotoId, 
        UserName,
        SubmitAddress,
        ReviewOrder
    ];    
    const styles = { gradient: ['bg-gradient-to-b', 'from-primary', 'to-secondary', 'p-0 lg:p-16 h-max'] };
    
    return (
        <Page className={twMerge(styles.gradient, "pb-0 md:pb-24")}>
            <Head>
                <title>Delivery by Gras</title>
            </Head>
            <Card className='m-auto'>
                {FormStepComponents.map((_fsc, index) => {
                    return (
                        formStep === index && <_fsc key={'form-step-component-' + index} nextFormStep={nextFormStep} prevFormStep={prevFormStep} />
                    );
                })}
            </Card>
        </Page>
    );
}

QuickDelivery.getLayoutContext = (): LayoutContextProps => ({
    showHeader: false
})

export default QuickDelivery