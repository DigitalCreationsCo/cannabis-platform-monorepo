import { selectUserState } from "@cd/core-lib/reduxDir";
import { Card, LayoutContextProps, Page } from "@cd/ui-lib/src/components";
import { ConfirmOrder, ReviewOrder, SubmitAddress, UserName, VerifyPhotoId } from "components";
import Head from "next/head";
import { useState } from "react";
import { useSelector } from "react-redux";
import { twMerge } from "tailwind-merge";

function QuickDelivery() {
    const user =useSelector(selectUserState)
    
    const [formStep, setFormStep] = useState(0);
    const nextFormStep = () => setFormStep((currentStep) => currentStep + 1);
    const prevFormStep = () => setFormStep((currentStep) => currentStep - 1);
    const FormStepComponents = [
        ConfirmOrder,
        user.user && VerifyPhotoId || null, // if there is no user, or user is over21, not age verified, then verify photo id
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
                {FormStepComponents.filter(_fsc => !!_fsc).map((_fsc, index) => {
                    if (_fsc === null) return null;
                    return (
                        formStep === index && <_fsc key={'form-step-component-' + index} nextFormStep={nextFormStep} prevFormStep={prevFormStep} />
                    );
                })}
                 {/* {...FormStepComponents.reduce((components: any[], component, index) => {
                    if (component !== null) components.push(formStep === index && <component />);
                    return components;
                }, []) */}
            </Card>
        </Page>
    );
}

QuickDelivery.getLayoutContext = (): LayoutContextProps => ({
    showHeader: false
})

export default QuickDelivery