import { getShopSite, selectIsAddressAdded, selectUserState } from "@cd/core-lib";
import { Card, H2, LayoutContextProps, Page } from "@cd/ui-lib/src/components";
import Router from 'next/router';
import { useSelector } from "react-redux";
import { twMerge } from "tailwind-merge";
import { FormStepProvider, SubmitAddress, UserSignUpQuick, UserSignUpReview, VerifyPhotoId } from "../../components";

function ContinueSignUp() {
    
    const 
    { user } = useSelector(selectUserState),
    { isLegalAge, idVerified, isSignUpComplete } = user;

    const 
    isAddressAdded = useSelector(selectIsAddressAdded)

    if (!isLegalAge === false || (!isLegalAge && idVerified)) Router.push(getShopSite('/sorry-we-cant-serve-you'))
    
    // optional formstep components
    const FormStepComponents = [
        !idVerified ? VerifyPhotoId : null, 
        !isSignUpComplete ? UserSignUpQuick : null,
        !isAddressAdded ? SubmitAddress : null,
        UserSignUpReview
    ];
    
    return (
        <Page className={twMerge(styles.gradient, "pb-0 md:pb-24")}>
            <Card className='m-auto bg-inverse-soft space-y-2'>
                <H2 id='verify-id-step-1'>Welcome to Gras</H2>
                <FormStepProvider 
                FormStepComponents={FormStepComponents}
                formId='signup-form'
                />
            </Card>
        </Page>
    );
}

ContinueSignUp.getLayoutContext = (): LayoutContextProps => ({
    showHeader: false
})

export default ContinueSignUp
const styles = { gradient: ['bg-gradient-to-b', 'from-primary', 'to-secondary', 'p-0 lg:p-16 h-max'] };
