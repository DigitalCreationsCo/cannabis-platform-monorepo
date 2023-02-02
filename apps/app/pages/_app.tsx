import '@cd/shared-config/index.css';
import { Center, LoadingDots, Page } from '@cd/shared-ui';
import '@cd/shared-ui/dist/style.css';
import { Layout, SessionControl } from 'components';
import { NextPage } from 'next';
import { AppProps } from 'next/app';
import { Dispatch, SetStateAction, useEffect, useState } from 'react';
import { Toaster } from 'react-hot-toast';
import SuperTokens, { SuperTokensWrapper } from 'supertokens-auth-react';
import Session from 'supertokens-auth-react/recipe/session';
import * as SuperTokensConfig from '../config/frontendConfig';
import ErrorHandler from '../src/context/ErrorHandler';

if (typeof window !== 'undefined') {
    SuperTokens.init(SuperTokensConfig.frontendConfig());
}

// interface CustomAppProps extends Omit<AppProps, 'Component'> {
//     Component: AppProps['Component'] & { getLayout?: (page: ReactNode) => JSX.Element };
// }

export type ExtendedPageComponent<P = Record<string, unknown>, IP = P> = NextPage<P, IP> & {
    getLayout?: (page: JSX.Element) => JSX.Element;
    appReady: string | boolean;
    setAppReady: Dispatch<SetStateAction<string | boolean>>;
};

type CustomAppProps = AppProps & {
    Component: ExtendedPageComponent;
};

export default function App({ Component, pageProps }: CustomAppProps): JSX.Element {
    useEffect(() => {
        async function doRefresh() {
            if (pageProps.fromSupertokens === 'needs-refresh') {
                if (await Session.attemptRefreshingSession()) {
                    location.reload();
                } else {
                    // user has been logged out
                    SuperTokens.redirectToAuth();
                }
            }
        }
        doRefresh();
    }, [pageProps.fromSupertokens]);

    const [appReady, setAppReady] = useState<string | boolean>(true);
    pageProps.appReady = appReady;
    pageProps.setAppReady = setAppReady;

    if (pageProps.fromSupertokens === 'needs-refresh') {
        return <></>;
    }
    const getLayout = Component.getLayout || ((page) => <Layout>{page}</Layout>);
    return (
        <SuperTokensWrapper>
            <ErrorHandler>
                <SessionControl>
                    {appReady === 'loading' ? (
                        <Page>
                            <Center>
                                <LoadingDots />
                            </Center>
                        </Page>
                    ) : appReady === true ? (
                        getLayout(<Component {...pageProps} />)
                    ) : (
                        getLayout(
                            <Page>
                                <Center>Services are not available now. Please try later.</Center>
                            </Page>
                        )
                    )}
                    <Toaster position="top-right" />
                </SessionControl>
            </ErrorHandler>
        </SuperTokensWrapper>
    );
}
