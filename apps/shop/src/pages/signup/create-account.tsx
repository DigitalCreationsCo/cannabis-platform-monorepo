import {
    LayoutContextProps,
    Page
} from '@cd/ui-lib';
import Head from 'next/head';
import { twMerge } from 'tailwind-merge';
import ContinueSignUp from './continue';

function CreateUserAccount() {
    return (
        <Page className={twMerge(styles.gradient)}>
            <Head>
                <title>Grascannabis.org Create your account</title>
                <meta name="Gras App" content="Built by Gras Cannabis Co." />
            </Head>
            <ContinueSignUp />
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
