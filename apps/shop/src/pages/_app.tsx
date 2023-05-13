/// @ts-nocheck
import { LayoutContextProps, LoadingPage } from "@cd/ui-lib";
import type { AppProps } from 'next/app';
import Head from 'next/head';
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { Provider as ReduxProvider, useStore } from 'react-redux';
// import { Persistor } from 'redux-persist';
import withRedux from 'next-redux-wrapper';
import { useRouter } from "next/router";
import { PersistGate } from 'redux-persist/integration/react';
import SuperTokensReact, { SuperTokensWrapper } from 'supertokens-auth-react';
import Session, { SessionContextType } from 'supertokens-auth-react/recipe/session';
import { LayoutContainer, LocationProvider, ModalProvider, StepFormValuesProvider, ToastProvider } from '../components';
import { frontendConfig } from '../config/frontendConfig';
import reduxStore from '../redux/store';
import '../styles/globals.css';

if (typeof window !== 'undefined') {
    SuperTokensReact.init(frontendConfig());
}

type CustomAppProps = AppProps & {
    Component: ExtendedPageComponent;
};

function App({ Component, pageProps }: CustomAppProps) {

    const [routerLoading, setRouterLoading] = useState(true)
    const router = useRouter()
    useEffect(() => {
        router.isReady && setRouterLoading(false)
    }, [router]);

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

    const store = useStore()

    const getLayoutContext = Component.getLayoutContext || (() => ({}));

    return (
        <>
            <Head>
                <title>Gras Cannabis Marketplace</title>
                <meta name="Marketplace App" content="Property of Gras Cannabis Co." />
            </Head>
            <SuperTokensWrapper>
                <ReduxProvider store={store}>
                    <PersistGate
                        persistor={store._persistor}
                        loading={<LoadingPage />}
                        >
                        <LocationProvider />
                        <ModalProvider />
                        <ToastProvider />
                        <LayoutContainer {...getLayoutContext()}>
                            <StepFormValuesProvider>
                                { routerLoading ? <LoadingPage /> : <Component {...pageProps} />} 
                            </StepFormValuesProvider>
                        </LayoutContainer>
                    </PersistGate>
                </ReduxProvider>
            </SuperTokensWrapper>
        </>
    )
}

export default withRedux(reduxStore)(App);

export type ExtendedPageComponent = {
    signIn: (input: {
        formFields: {
            id: string;
            value: string;
        }[];
        options?: unknown;
        userContext?: unknown;
    }) => Promise<
    | {
          status: "OK";
          user: { id: string; email: string; timeJoined: number };
          fetchResponse: Response;
      }
    | {
          status: "FIELD_ERROR";
          formFields: {
              id: string;
              error: string;
          }[];
          fetchResponse: Response;
      }
    | {
          status: "WRONG_CREDENTIALS_ERROR";
          
            fetchResponse: Response;
      }
>;
    signOut: () => Promise<void>;
    signUp: (input: {
        formFields: {
            id: string;
            value: string;
        }[];
        options?: unknown;
        userContext?: unknown;
    }) => Promise<
    | {
          status: "OK";
          user: { id: string; email: string; timeJoined: number };
          fetchResponse: Response;
      }
    | {
          status: "FIELD_ERROR";
          formFields: {
              id: string;
              error: string;
          }[];
          fetchResponse: Response;
      }
>;
    getLayoutContext?: () => LayoutContextProps;
    isLoading: boolean;
    setIsLoading: Dispatch<SetStateAction<boolean>>;
    session: SessionContextType;
    doesSessionExist: boolean;
    fromSupertokens: string;
};