import {
    LayoutContextProps,
    Page
} from '@cd/ui-lib';
import { UserSignUp } from 'components';
import Head from 'next/head';
import { twMerge } from 'tailwind-merge';

function CreateUserAccount() {
    return (
        <Page className={twMerge(styles.gradient)}>
            <Head>
                <title>Create your account</title>
            </Head>
            <UserSignUp />
        </Page>
    );
}

CreateUserAccount.getLayoutContext = (): LayoutContextProps => ({
    showHeader: false,
    showTopBar: true
});
export default CreateUserAccount;

const styles = { 
    gradient: ['bg-gradient-to-b', 'from-primary', 'to-secondary', 'p-0 lg:p-16 h-max'] 
};
