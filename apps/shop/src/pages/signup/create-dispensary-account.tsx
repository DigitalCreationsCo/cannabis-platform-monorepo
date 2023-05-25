import { FormCard, LayoutContextProps, Page } from '@cd/ui-lib';
import Head from 'next/head';
import { twMerge } from 'tailwind-merge';
import {
    DispensaryCreate,
    DispensaryReview,
    DispensarySignUpComplete,
    DispensaryUserCreate,
    FormStepProvider,
    ProvideDispensaryKey,
    ProvideStripeAccountId
} from '../../components';

const 
FormStepComponents = [
    ProvideDispensaryKey,
    DispensaryCreate, 
    DispensaryUserCreate, 
    DispensaryReview, 
    ProvideStripeAccountId,
    DispensarySignUpComplete,
];

function DispensarySignUpStepForm() {
    return (
        <Page className={twMerge(styles.gradient, 'md:pt-16')}>
            <Head>
                <title>Create a Dispensary Account</title>
            </Head>
            <FormCard className={"bg-inverse-soft md:m-auto"}>
                <FormStepProvider FormStepComponents={FormStepComponents} />
            </FormCard>
        </Page>
    );
}

const styles = { gradient: ['bg-gradient-to-b', 'from-primary', 'to-secondary'] };

DispensarySignUpStepForm.getLayoutContext = (): LayoutContextProps => ({
    showHeader: false
});

export default DispensarySignUpStepForm;