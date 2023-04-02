import { ExtendedPageComponent, StepFormValuesProvider, ToastProvider } from '@cd/shared-lib';
import { Center, FlexBox, LoadingDots } from '@cd/shared-ui';
import type { AppProps } from 'next/app';
import Head from 'next/head';
import { useEffect } from 'react';
import { Provider as ReduxProvider, useStore } from 'react-redux';
import { Persistor } from 'redux-persist';
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

    const store: PersistedStore = useStore();

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
                <meta name="Marketplace App" content="Property of Gras Cannabis Co." />
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
                                <ToastProvider />
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
                        persistor={store as PersistedStore & Persistor}
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
                                <ToastProvider />
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

export default wrapper.withRedux(App);
