import { AppStateProvider, ExtendedPageComponent, ModalProvider, SessionWrapper } from '@cd/shared-lib';
import { Center, Layout, LoadingDots, Padding } from '@cd/shared-ui';
import { AppProps } from 'next/app';
import Head from 'next/head';
import Router from 'next/router';
import { useEffect } from 'react';
import toast, { Toaster, useToasterStore } from 'react-hot-toast';
import SuperTokensReact from 'supertokens-auth-react';
import Session from 'supertokens-auth-react/recipe/session';
import { frontendConfig } from '../config/frontendConfig';
import { AdminDashboardNavigation, TopBar } from '../src/components';
import StepFormValuesProvider from '../src/context/StepFormProvider';
import '../styles/globals.css';

type CustomAppProps = AppProps & {
    Component: ExtendedPageComponent;
};

if (typeof window !== 'undefined') SuperTokensReact.init(frontendConfig());
export default function App({ Component, pageProps }: CustomAppProps): JSX.Element {
    // const session = useSessionContext();
    // Component.signIn = signIn;
    // Component.signOut = signOut;
    // Component.signUp = signUp;
    // Component.session = session;
    // const doesSessionExist = useRef(undefined);
    // check fro null
    // const { setModalOpen } = useModal();

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

    const getLayoutContext = Component.getLayoutContext || (() => ({}));
    return (
        <>
            <Head>
                <title>Gras Cannabis Marketplace</title>
                <meta name="vendor experience application" content="Property of Gras Cannabis Co." />
            </Head>
            <SessionWrapper>
                {(sessionContext) => (
                    <ModalProvider>
                        <Toaster position="top-center" />
                        <StepFormValuesProvider>
                            <AppStateProvider>
                                {({ isLoading, setIsLoading }) => {
                                    Router.events.on('routeChangeStart', () => setIsLoading(true));
                                    Router.events.on('routeChangeComplete', () => setIsLoading(false));
                                    Router.events.on('routeChangeError', () => setIsLoading(false));
                                    return (
                                        <Layout
                                            SideNavComponent={AdminDashboardNavigation}
                                            TopBarComponent={TopBar}
                                            signedOut={sessionContext.signOut}
                                            setModal={() => {
                                                console.log('set Modal');
                                            }}
                                            doesSessionExist={sessionContext.doesSessionExist}
                                            {...getLayoutContext()}
                                        >
                                            {isLoading ? (
                                                <Center>
                                                    <Padding>
                                                        <LoadingDots />
                                                    </Padding>
                                                </Center>
                                            ) : (
                                                <Component {...sessionContext} {...pageProps} />
                                            )}
                                        </Layout>
                                    );
                                }}
                            </AppStateProvider>
                        </StepFormValuesProvider>
                    </ModalProvider>
                )}
            </SessionWrapper>
        </>
    );
}
