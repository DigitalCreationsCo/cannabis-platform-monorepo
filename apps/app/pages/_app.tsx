import '@cd/shared-config/index.css';
import { Center, LoadingDots } from '@cd/shared-ui';
import '@cd/shared-ui/dist/style.css';
import { Layout, SessionControl } from 'components';
import { NextPage } from 'next';
import { AppProps } from 'next/app';
import Router from 'next/router';
import { Dispatch, SetStateAction, useEffect, useState } from 'react';
import { Toaster } from 'react-hot-toast';
import SuperTokens, { SuperTokensWrapper } from 'supertokens-auth-react';
import Session from 'supertokens-auth-react/recipe/session';
import * as SuperTokensConfig from '../config/frontendConfig';

if (typeof window !== 'undefined') {
    SuperTokens.init(SuperTokensConfig.frontendConfig());
}

// interface CustomAppProps extends Omit<AppProps, 'Component'> {
//     Component: AppProps['Component'] & { getLayout?: (page: ReactNode) => JSX.Element };
// }

export type ExtendedPageComponent<P = Record<string, unknown>, IP = P> = NextPage<P, IP> & {
    getLayout?: (page: JSX.Element) => JSX.Element;
    isLoading: boolean;
    setIsLoading: Dispatch<SetStateAction<string | boolean>>;
};

type CustomAppProps = AppProps & {
    Component: ExtendedPageComponent;
};

export default function App({ Component, pageProps }: CustomAppProps): JSX.Element {
    console.log('app root');
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

    const [isLoading, setIsLoading] = useState<string | boolean>(false);
    pageProps.isLoading = isLoading;
    pageProps.setIsLoading = setIsLoading;
    if (pageProps.fromSupertokens === 'needs-refresh') {
        return <></>;
    }

    Router.events.on('routeChangeStart', () => setIsLoading(true));
    // Router.events.on('routeChangeComplete', () => setIsLoading(false));
    // Leave the page to handle the loading state
    // Router.events.on('routeChangeError', () => setIsLoading(false));

    const getLayout = Component.getLayout || ((page) => <Layout>{page}</Layout>);
    return (
        <SuperTokensWrapper>
            <SessionControl>
                <Toaster position="top-right" />
                {isLoading
                    ? getLayout(
                          <Center className="p-12">
                              <LoadingDots />
                          </Center>
                      )
                    : getLayout(<Component {...pageProps} />)}
            </SessionControl>
        </SuperTokensWrapper>
    );
}
