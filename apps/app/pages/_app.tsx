import { ExtendedPageComponent, ModalProvider } from '@cd/shared-lib';
import { Center, LoadingDots, Padding } from '@cd/shared-ui';
import { Layout } from 'components';
import { AppProps } from 'next/app';
import Head from 'next/head';
import Router from 'next/router';
import { useEffect } from 'react';
import toast, { Toaster, useToasterStore } from 'react-hot-toast';
import SuperTokensReact, { SuperTokensWrapper } from 'supertokens-auth-react';
import Session from 'supertokens-auth-react/recipe/session';
import { frontendConfig } from '../config/frontendConfig';
import AppStateProvider from '../src/context/AppProvider';
import StepFormValuesProvider from '../src/context/StepFormProvider';
import '../styles/globals.css';

type CustomAppProps = AppProps & {
    Component: ExtendedPageComponent;
};

if (typeof window !== 'undefined') SuperTokensReact.init(frontendConfig());
export default function App({ Component, pageProps }: CustomAppProps): JSX.Element {
    const getLayout = Component.getLayout || ((page) => <Layout>{page}</Layout>);

    const TOAST_LIMIT = 2;
    const { toasts } = useToasterStore();
    useEffect(() => {
        toasts
            .filter((t) => t.visible)
            .filter((_, i) => i >= TOAST_LIMIT)
            .forEach((t) => toast.dismiss(t.id));
    }, [toasts]);

    useEffect(() => {
        async function doRefresh() {
            if (pageProps.fromSupertokens === 'needs-refresh') {
                if (await Session.attemptRefreshingSession()) {
                    location.reload();
                } else {
                    // user has been logged out
                    window.location.href = '/';
                }
            }
        }
        doRefresh();
    }, [pageProps.fromSupertokens]);
    if (pageProps.fromSupertokens === 'needs-refresh') {
        return null;
    }
    return (
        <>
            <Head>
                <title>Gras Cannabis Marketplace</title>
                <meta name="vendor experience application" content="Property of Gras Cannabis Co." />
            </Head>
            <SuperTokensWrapper>
                {/* <SessionProvider> */}
                <ModalProvider>
                    <Toaster position="top-center" />
                    <StepFormValuesProvider>
                        <AppStateProvider>
                            {({ isLoading, setIsLoading }) => {
                                Router.events.on('routeChangeStart', () => setIsLoading(true));
                                Router.events.on('routeChangeComplete', () => setIsLoading(false));
                                Router.events.on('routeChangeError', () => setIsLoading(false));

                                return getLayout(
                                    isLoading ? (
                                        <Center>
                                            <Padding>
                                                <LoadingDots />
                                            </Padding>
                                        </Center>
                                    ) : (
                                        <Component {...pageProps} />
                                    )
                                );
                            }}
                        </AppStateProvider>
                    </StepFormValuesProvider>
                </ModalProvider>
                {/* </SessionProvider> */}
            </SuperTokensWrapper>
        </>
    );
}
