import {
    FormCard,
    LayoutContextProps,
    Page
} from '@cd/ui-lib';
import { UserSignUp } from 'components';
import Head from 'next/head';
import { twMerge } from 'tailwind-merge';

function CreateUserAccount() {
    const styles = { gradient: ['bg-gradient-to-b', 'from-primary', 'to-secondary', 'p-0 lg:p-16 h-max'] };
    return (
        <Page className={twMerge(styles.gradient)}>
            <Head>
                <title>Create an account</title>
            </Head>
            <FormCard>
                <UserSignUp />
            </FormCard>
        </Page>
    );
}

CreateUserAccount.getLayoutContext = (): LayoutContextProps => ({
    showHeader: false,
    showTopBar: false
});
export default CreateUserAccount;
