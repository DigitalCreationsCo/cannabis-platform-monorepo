import '@cd/shared-ui/dist/style.css';
import '@cd/shared-config/index.css';
import { AppProps } from 'next/app';
import React, { useEffect } from 'react';
import { Layout, SessionControl } from 'components';
import SuperTokens, { SuperTokensWrapper } from 'supertokens-auth-react';
import Session from 'supertokens-auth-react/recipe/session';
import * as SuperTokensConfig from '../config/frontendConfig';
import { Toaster } from "react-hot-toast";

if (typeof window !== 'undefined') {
    SuperTokens.init(SuperTokensConfig.frontendConfig());
}
export default function App({ Component, pageProps }: AppProps): JSX.Element{
    useEffect(() => {
        async function doRefresh() {
            if (pageProps.fromSupertokens === "needs-refresh") {
                if (await Session.attemptRefreshingSession()) {
                    location.reload();
                } else {
                    // user has been logged out
                    SuperTokens.redirectToAuth();
                }
            }
        }
        doRefresh();
    }, [ pageProps.fromSupertokens ]);
    if (pageProps.fromSupertokens === "needs-refresh") {
        return <></>
    }

    const getLayout = Component.getLayout || ((page) => <Layout>{ page }</Layout>);
    return (
        <SuperTokensWrapper>
            <SessionControl>
            { getLayout(
                <Component { ...pageProps } />
            ) }
            <Toaster position="top-right" />
            </SessionControl>
        </SuperTokensWrapper>
    );
}
