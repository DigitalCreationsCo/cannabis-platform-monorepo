import '@cd/shared-config/index.css';
import { Center, LoadingDots, Padding } from '@cd/shared-ui';
import '@cd/shared-ui/dist/style.css';
import { Layout } from 'components';
import { NextPage } from 'next';
import { AppProps } from 'next/app';
import Head from 'next/head';
import { Dispatch, SetStateAction, useEffect } from 'react';
import { Toaster } from 'react-hot-toast';
import SuperTokensReact, { SuperTokensWrapper } from 'supertokens-auth-react';
import Session from 'supertokens-auth-react/recipe/session';
import { frontendConfig } from '../config/frontendConfig';
import AppStateProvider from '../src/context/AppProvider';
import ModalProvider from '../src/context/ModalProvider';
import SessionProvider from '../src/context/SessionProvider';
import StepFormValuesProvider from '../src/context/StepFormProvider';

export type ExtendedPageComponent<P = Record<string, unknown>, IP = P> = NextPage<P, IP> & {
    getLayout?: (page: JSX.Element) => JSX.Element;
    isLoading: boolean;
    setIsLoading: Dispatch<SetStateAction<boolean>>;
};

type CustomAppProps = AppProps & {
    Component: ExtendedPageComponent;
};

if (typeof window !== 'undefined') {
    SuperTokensReact.init(frontendConfig());
}

export default function App({ Component, pageProps }: CustomAppProps): JSX.Element {
    useEffect(() => {
        async function doRefresh() {
            if (pageProps.fromSupertokens === 'needs-refresh') {
                if (await Session.attemptRefreshingSession()) {
                    location.reload();
                } else {
                    // user has been logged out
                    SuperTokensReact.redirectToAuth();
                }
            }
        }
        doRefresh();
    }, [pageProps.fromSupertokens]);
    if (pageProps.fromSupertokens === 'needs-refresh') {
        return null;
    }

    const getLayout = Component.getLayout || ((page) => <Layout>{page}</Layout>);
    return (
        <>
            <Head>
                <title>Gras Cannabis Marketplace</title>
                <meta name="vendor experience application" content="Property of Gras Cannabis Co." />
            </Head>
            <SuperTokensWrapper>
                <SessionProvider>
                    <ModalProvider>
                        <Toaster position="top-right" />
                        <StepFormValuesProvider>
                            <AppStateProvider>
                                {({ isLoading, setIsLoading }) => {
                                    // Router.events.on('routeChangeStart', () => setIsLoading(true));
                                    // Router.events.on('routeChangeComplete', () => setIsLoading(false));
                                    // Router.events.on('routeChangeError', () => setIsLoading(false));

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
                </SessionProvider>
            </SuperTokensWrapper>
        </>
    );
}
