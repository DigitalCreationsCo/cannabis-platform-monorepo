import { ExtendedPageComponent, StepFormValuesProvider } from '@cd/shared-lib';
import { Center, FlexBox, LoadingDots } from '@cd/shared-ui';
import type { AppProps } from 'next/app';
import Head from 'next/head';
import { useEffect } from 'react';
import toast, { Toaster, useToasterStore } from 'react-hot-toast';
import { useStore } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import SuperTokensReact, { SuperTokensWrapper } from 'supertokens-auth-react';
import Session from 'supertokens-auth-react/recipe/session';
import { frontendConfig } from '../config/frontendConfig';
import { LayoutContainer, ModalProvider } from '../src/components';
import { wrapper } from '../src/redux/store';
import '../styles/globals.css';

type CustomAppProps = AppProps & {
    Component: ExtendedPageComponent;
};

function App({ Component, pageProps }: CustomAppProps) {
    let coordinates;

    if (typeof window !== 'undefined') SuperTokensReact.init(frontendConfig());

    // if (navigator.geolocation !== undefined) {
    //     navigator.geolocation.getCurrentPosition(
    //         (position) => {
    //             coordinates = [position.coords.latitude, position.coords.longitude];
    //         },
    //         () => console.log('Geolocation is not supported by this browser.')
    //     );
    // }

    const store = useStore();
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

    return (
        <>
            <Head>
                <title>Gras Cannabis Marketplace</title>
                <meta name="vendor experience application" content="Property of Gras Cannabis Co." />
            </Head>
            <SuperTokensWrapper>
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
                    <LayoutContainer {...getLayoutContext()}>
                        <ToasterProvider />
                        <StepFormValuesProvider>
                            <ModalProvider />
                            <Component {...pageProps} />
                        </StepFormValuesProvider>
                    </LayoutContainer>
                </PersistGate>
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
