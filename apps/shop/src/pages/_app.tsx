/// @ts-nocheck
import { LayoutContextProps, LoadingPage, ModalProvider, ToastProvider } from "@cd/ui-lib";
import type { AppProps } from 'next/app';
import Head from 'next/head';
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { Provider as ReduxProvider } from 'react-redux';
// import { Persistor } from 'redux-persist';
import { shopActions } from "@cd/core-lib/src/reduxDir";
import { useRouter } from "next/router";
import { PersistGate } from 'redux-persist/integration/react';
import SuperTokensReact, { SuperTokensWrapper } from 'supertokens-auth-react';
import Session, { SessionContextType } from 'supertokens-auth-react/recipe/session';
import { LayoutContainer, LocationProvider } from '../components';
import { frontendConfig } from '../config/frontendConfig';
import { AppThunk, wrapper } from '../redux/store';

if (typeof window !== 'undefined') {
    SuperTokensReact.init(frontendConfig())
}

type CustomAppProps = AppProps & {
    Component: ExtendedPageComponent;
};

function App({ Component, ...rest }: CustomAppProps) {

    const 
    { store, props } = wrapper.useWrappedStore(rest)

    const [routerLoading, setRouterLoading] = useState(true)
    const router = useRouter()
    useEffect(() => {
        router.isReady && setRouterLoading(false)
    }, [router]);

    useEffect(() => {
        async function doRefresh() {
            if (props.pageProps.fromSupertokens === 'needs-refresh') {
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
    }, [props.pageProps.fromSupertokens]);

    if (props.pageProps.fromSupertokens === 'needs-refresh') {
        return null;
    }

    const getLayoutContext = Component.getLayoutContext || (() => ({}));

    useEffect(() => {
        store.getState().shop.dispensaries.length === 0 && store.dispatch(shopActions.getInitialDispensaries() as AppThunk);
        console.log('get initial dispensaries')
    }, [])
    return (
        <>
            <Head>
                <title>Gras Cannabis Marketplace</title>
                <meta name="Marketplace App" content="Built by Gras Cannabis Co." />
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
                            { routerLoading ? <LoadingPage /> : <Component {...props.pageProps} />} 
                        </LayoutContainer>
                    </PersistGate>
                </ReduxProvider>
            </SuperTokensWrapper>
        </>
    )
}

export default wrapper.withRedux(App);

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