/// @ts-nocheck
import { LayoutContextProps, LoadingPage, ModalProvider, ToastProvider } from "@cd/ui-lib";
import withRedux from 'next-redux-wrapper';
import type { AppProps } from 'next/app';
import Head from 'next/head';
import { useRouter } from "next/router";
import { Dispatch, SetStateAction, useEffect, useState } from 'react';
import { Provider as ReduxProvider, useStore } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import SuperTokensReact, { SuperTokensWrapper } from 'supertokens-auth-react';
import Session, { SessionContextType } from 'supertokens-auth-react/recipe/session';
import { LayoutContainer } from '../components';
import { frontendConfig } from '../config/frontendConfig';
import reduxStore from '../redux/store';

if (typeof window !== 'undefined') {
    SuperTokensReact.init(frontendConfig());
}

type CustomAppProps = AppProps & {
    Component: ExtendedPageComponent;
};

function App({ Component, pageProps }: CustomAppProps) {

    const 
    store = useStore();

    const 
    [routerLoading, setRouterLoading] = useState(true),
    router = useRouter();

    useEffect(() => {
        router.isReady && setRouterLoading(false)
    }, [router]);

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
                <title>Grascannabis.org Dashboard</title>
                <meta name="Dispensary Experience App" content="Built by Gras Cannabis Co." />
            </Head>
            <SuperTokensWrapper>
                <ReduxProvider store={store}>
                    <PersistGate
                        persistor={store._persistor}
                        loading={<LoadingPage />}
                        >
                        <ModalProvider />
                        <ToastProvider />
                        <LayoutContainer {...getLayoutContext()}>
                            { routerLoading ? <LoadingPage /> : <Component {...pageProps} />} 
                        </LayoutContainer>
                    </PersistGate>
                </ReduxProvider>
            </SuperTokensWrapper>
        </>
    );
}

export default withRedux(reduxStore)(App)

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
