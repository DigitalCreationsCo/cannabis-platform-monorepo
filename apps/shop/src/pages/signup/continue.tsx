import { selectIsAddressAdded, selectUserState } from "@cd/core-lib";
import { Card, H2, LayoutContextProps, Page } from "@cd/ui-lib/src/components";
import { QuickSignUpUserForm, SubmitAddress, VerifyPhotoId } from "components";
import Head from "next/head";
import Router from 'next/router';
import { useState } from "react";
import { useSelector } from "react-redux";
import { twMerge } from "tailwind-merge";

function ContinueSignUp() {
    const user = useSelector(selectUserState)
    const isAddressAdded = useSelector(selectIsAddressAdded)
    
    const { isLegalAge, idVerified } = user?.user

    if (!isLegalAge === false || (!isLegalAge && idVerified)) Router.push('/sorry-we-cant-serve-you')
    
    const [formStep, setFormStep] = useState(0);
    const nextFormStep = () => setFormStep((currentStep) => currentStep + 1);
    const prevFormStep = () => setFormStep((currentStep) => currentStep - 1);

    const FormStepComponents = [
        !idVerified && VerifyPhotoId || isLegalAge && idVerified && null, // if there is no user, or user is over21, not age verified, then verify photo id
        !user.isSignedIn && QuickSignUpUserForm || null,
        !isAddressAdded || !user.isSignedIn && SubmitAddress || null,
    ];
    
    return (
        <Page className={twMerge(styles.gradient, "pb-0 md:pb-24")}>
            <Head>
                <title>Welcome to Delivery by Gras</title>
            </Head>
            <Card className='m-auto bg-inverse-soft space-y-2'>
                <H2>Welcome to Gras</H2>
                {FormStepComponents
                .filter(_fsc => _fsc !== null)
                .map((Fsc: any, index) => {
                    if (Fsc === null) return null;
                    return formStep === index && <Fsc key={'form-step-component-' + index} nextFormStep={nextFormStep} prevFormStep={prevFormStep} />
                })}
            </Card>
        </Page>
    );
}

ContinueSignUp.getLayoutContext = (): LayoutContextProps => ({
    showHeader: false
})

export default ContinueSignUp
const styles = { gradient: ['bg-gradient-to-b', 'from-primary', 'to-secondary', 'p-0 lg:p-16 h-max'] };
