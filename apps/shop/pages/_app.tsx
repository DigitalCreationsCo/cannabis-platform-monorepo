import { ExtendedPageComponent, StepFormValuesProvider } from '@cd/shared-lib';
import { Center, FlexBox, LoadingDots } from '@cd/shared-ui';
import type { AppProps } from 'next/app';
import Head from 'next/head';
import { useEffect } from 'react';
import toast, { Toaster, useToasterStore } from 'react-hot-toast';
import { Provider as ReduxProvider, useStore } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import SuperTokensReact, { SuperTokensWrapper } from 'supertokens-auth-react';
import Session from 'supertokens-auth-react/recipe/session';
import { frontendConfig } from '../config/frontendConfig';
import { LayoutContainer, LocationProvider, ModalProvider } from '../src/components';
import { PersistedStore, wrapper } from '../src/redux/store';
import '../styles/globals.css';

type CustomAppProps = AppProps & {
    Component: ExtendedPageComponent;
};

function App({ Component, pageProps }: CustomAppProps) {
    if (typeof window !== 'undefined') {
        SuperTokensReact.init(frontendConfig());
    }

    const store: PersistedStore = useStore((state) => state);

    useEffect(() => {
        async function doRefresh() {
            if (pageProps.fromSupertokens === 'needs-refresh') {
                console.log('needs refresh');
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

    return typeof window !== undefined ? (
        <>
            <Head>
                <title>Gras Cannabis Marketplace</title>
                <meta name="vendor experience application" content="Property of Gras Cannabis Co." />
            </Head>
            <SuperTokensWrapper>
                <ReduxProvider store={store}>
                    <PersistGate
                        persistor={store._persistor}
                        loading={
                            <FlexBox className="grow items-center min-h-screen">
                                <Center>
                                    <LoadingDots />
                                </Center>
                            </FlexBox>
                        }
                    >
                        <LocationProvider>
                            <LayoutContainer {...getLayoutContext()}>
                                <ToasterProvider />
                                <StepFormValuesProvider>
                                    <ModalProvider />
                                    <Component {...pageProps} />
                                </StepFormValuesProvider>
                            </LayoutContainer>
                        </LocationProvider>
                    </PersistGate>
                </ReduxProvider>
            </SuperTokensWrapper>
        </>
    ) : (
        <>
            <Head>
                <title>Gras Cannabis Marketplace</title>
                <meta name="vendor experience application" content="Property of Gras Cannabis Co." />
            </Head>
            <SuperTokensWrapper>
                <ReduxProvider store={store}>
                    <PersistGate
                        persistor={store}
                        loading={
                            <FlexBox className="grow items-center min-h-screen">
                                <Center>
                                    <LoadingDots />
                                </Center>
                            </FlexBox>
                        }
                    >
                        <LocationProvider>
                            <LayoutContainer {...getLayoutContext()}>
                                <ToasterProvider />
                                <StepFormValuesProvider>
                                    <ModalProvider />
                                    <Component {...pageProps} />
                                </StepFormValuesProvider>
                            </LayoutContainer>
                        </LocationProvider>
                    </PersistGate>
                </ReduxProvider>
            </SuperTokensWrapper>
        </>
    );
}

const ToasterProvider = () => {
    const TOAST_LIMIT = 2;
    const { toasts } = useToasterStore();
    useEffect(() => {
        toasts
            .filter((t) => t.visible)
            .filter((_, i) => i >= TOAST_LIMIT)
            .forEach((t) => toast.dismiss(t.id));
    }, [toasts]);

    return <Toaster position="top-center" />;
};

export default wrapper.withRedux(App);
