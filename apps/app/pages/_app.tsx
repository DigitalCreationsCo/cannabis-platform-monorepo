import '@cd/shared-config/index.css';
import { Center, LoadingDots, Page } from '@cd/shared-ui';
import '@cd/shared-ui/dist/style.css';
import axios from 'axios';
import { Layout, SessionControl } from 'components';
import { NextPage } from 'next';
import { AppProps } from 'next/app';
import { useEffect, useState } from 'react';
import { Toaster } from 'react-hot-toast';
import SuperTokens, { SuperTokensWrapper } from 'supertokens-auth-react';
import Session from 'supertokens-auth-react/recipe/session';
import * as SuperTokensConfig from '../config/frontendConfig';
import { urlBuilder } from '../src/utils';

if (typeof window !== 'undefined') {
    SuperTokens.init(SuperTokensConfig.frontendConfig());
}

// interface CustomAppProps extends Omit<AppProps, 'Component'> {
//     Component: AppProps['Component'] & { getLayout?: (page: ReactNode) => JSX.Element };
// }

export type NextPageWithLayout<P = Record<string, unknown>, IP = P> = NextPage<P, IP> & {
    getLayout?: (page: JSX.Element) => JSX.Element;
};

type CustomAppProps = AppProps & {
    Component: NextPageWithLayout;
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

    const [appStatus, setAppStatus] = useState<string | boolean>('loading');
    pageProps.setAppStatus = setAppStatus;

    useEffect(() => {
        async function healthcheck() {
            try {
                setAppStatus('loading');
                await axios(urlBuilder.main.healthCheck());
                setAppStatus(true);
            } catch (error) {
                console.log('healthcheck error: ', error.message);
                setAppStatus(false);
            }
        }
        healthcheck();
    }, []);

    if (pageProps.fromSupertokens === 'needs-refresh') {
        return <></>;
    }
    const getLayout = Component.getLayout || ((page) => <Layout>{page}</Layout>);
    return (
        <SuperTokensWrapper>
            <SessionControl>
                {appStatus === 'loading' ? (
                    <Page>
                        <Center>
                            <LoadingDots />
                        </Center>
                    </Page>
                ) : appStatus === true ? (
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
        </SuperTokensWrapper>
    );
}
