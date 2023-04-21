import { Button, Center, FlexBox, H3, Page } from "@cd/ui-lib/components";
import VerifyPhotoId from "components/VerifyPhotoId";
import Head from "next/head";
import Link from "next/link";
import { useState } from "react";

function QuickDelivery() {
    const [formStep, setFormStep] = useState(0);
    const nextFormStep = () => setFormStep((currentStep) => currentStep + 1);
    // const prevFormStep = () => setFormStep((currentStep) => currentStep - 1);
    const FormStepComponents = [Age, VerifyPhotoId];    
    const styles = { gradient: ['bg-gradient-to-b', 'from-primary', 'to-secondary', 'p-0 lg:p-16 h-max'] };
    
    return (
        <Page>
            <Head>
                <title>Gras Cannabis - Delivery by Gras</title>
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

const Age = ({ nextFormStep }: { nextFormStep: () => void }) => (
    <Center>
        <H3>Are you 21 years or older?</H3>
        <FlexBox className="flex-row p-4 space-x-4">
            <Button className="p-4"
            onClick={nextFormStep}>Yes</Button>
            <Link href="/sorry-we-cant-serve-you"><Button className="p-4">No</Button></Link>
        </FlexBox>
    </Center>
)