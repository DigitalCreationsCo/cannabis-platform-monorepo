/// @ts-nocheck
import { LayoutContextProps, LoadingPage, ModalProvider, ToastProvider } from "@cd/ui-lib";
import type { AppProps } from 'next/app';
import Head from 'next/head';
import { useRouter } from "next/router";
import { Dispatch, SetStateAction, useEffect, useState } from 'react';
import { Provider as ReduxProvider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import SuperTokensReact, { SuperTokensWrapper } from 'supertokens-auth-react';
import Session, { SessionContextType } from 'supertokens-auth-react/recipe/session';
import { LayoutContainer } from '../components';
import { frontendConfig } from '../config/frontendConfig';
import { wrapper } from '../redux/store';

if (typeof window !== 'undefined') {
    SuperTokensReact.init(frontendConfig());
}

type CustomAppProps = AppProps & {
    Component: ExtendedPageComponent;
};

function App({ Component, ...rest }: CustomAppProps) {

    const 
    { store, props } = wrapper.useWrappedStore(rest);

    const 
    [routerLoading, setRouterLoading] = useState(true),
    router = useRouter();

    useEffect(() => {
        router.isReady && setRouterLoading(false)
    }, [router]);

    useEffect(() => {
        async function doRefresh() {
            if (props.pageProps.fromSupertokens === 'needs-refresh') {
                if (await Session.attemptRefreshingSession()) {
                    location.reload();
                } else {
                    // user has been logged out
                    window.location.href = '/';
                }
            }
        }
        doRefresh();
    }, [props.pageProps.fromSupertokens]);
    
    if (props.pageProps.fromSupertokens === 'needs-refresh') {
        return null;
    }

    const getLayoutContext = Component.getLayoutContext || (() => ({}));

    return (
        <>
            <Head>
                <title>app.grascannabis.org Dashboard</title>
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
                            { routerLoading ? <LoadingPage /> : <Component { ...props.pageProps } />} 
                        </LayoutContainer>
                    </PersistGate>
                </ReduxProvider>
            </SuperTokensWrapper>
        </>
    );
}

export default wrapper.withRedux(App)

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
