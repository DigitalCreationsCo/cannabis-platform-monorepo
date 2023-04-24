import { Page } from "@cd/ui-lib/components";
import { SubmitAddress, UserName } from "components";
import VerifyPhotoId from "components/VerifyPhotoId";
import Head from "next/head";
import { useState } from "react";

function QuickDelivery() {
    const [formStep, setFormStep] = useState(0);
    const nextFormStep = () => setFormStep((currentStep) => currentStep + 1);
    // const prevFormStep = () => setFormStep((currentStep) => currentStep - 1);
    const FormStepComponents = [
        VerifyPhotoId, 
        UserName,
        SubmitAddress
    ];    
    const styles = { gradient: ['bg-gradient-to-b', 'from-primary', 'to-secondary', 'p-0 lg:p-16 h-max'] };
    
    return (
        <Page className="pb-0 md:pb-24">
            <Head>
                <title>Delivery by Gras</title>
            </Head>
                {FormStepComponents.map((_fsc, index) => {
                    return (
                        formStep === index && <_fsc key={'form-step-component-' + index} nextFormStep={nextFormStep} />
                    );
                })}
        </Page>
    );
}

export default QuickDelivery