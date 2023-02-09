import '@cd/shared-config/index.css';
import { Center, LoadingDots, Padding } from '@cd/shared-ui';
import '@cd/shared-ui/dist/style.css';
import { Layout, SessionControl } from 'components';
import { NextPage } from 'next';
import { AppProps } from 'next/app';
import { Dispatch, SetStateAction, useEffect } from 'react';
import { Toaster } from 'react-hot-toast';
import SuperTokens, { SuperTokensWrapper } from 'supertokens-auth-react';
import Session from 'supertokens-auth-react/recipe/session';
import * as SuperTokensConfig from '../config/frontendConfig';
import AppStateProvider from '../src/context/AppProvider';

if (typeof window !== 'undefined') {
    SuperTokens.init(SuperTokensConfig.frontendConfig());
}

// interface CustomAppProps extends Omit<AppProps, 'Component'> {
//     Component: AppProps['Component'] & { getLayout?: (page: ReactNode) => JSX.Element };
// }

export type ExtendedPageComponent<P = Record<string, unknown>, IP = P> = NextPage<P, IP> & {
    getLayout?: (page: JSX.Element) => JSX.Element;
    isLoading: boolean;
    setIsLoading: Dispatch<SetStateAction<boolean>>;
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

    if (pageProps.fromSupertokens === 'needs-refresh') {
        return <></>;
    }

    const getLayout = Component.getLayout || ((page) => <Layout>{page}</Layout>);
    return (
        <SuperTokensWrapper>
            <SessionControl>
                <Toaster position="top-right" />
                <AppStateProvider>
                    {({ isLoading, setIsLoading }) => {
                        // Router.events.on('routeChangeStart', () => setIsLoading(true));
                        // Router.events.on('routeChangeComplete', () => setIsLoading(false));
                        // Router.events.on('routeChangeError', () => setIsLoading(false));

                        return isLoading
                            ? getLayout(
                                  <Center>
                                      <Padding>
                                          <LoadingDots />
                                      </Padding>
                                  </Center>
                              )
                            : getLayout(<Component {...pageProps} />);
                    }}
                </AppStateProvider>
            </SessionControl>
        </SuperTokensWrapper>
    );
}
