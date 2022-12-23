import '@cd/shared-ui/dist/style.css';
import '@cd/shared-config/index.css';
import React, { useEffect } from 'react';
import { Layout, SessionControl } from 'components';
import SuperTokensReact, { SuperTokensWrapper } from 'supertokens-auth-react';
import * as SuperTokensConfig from '../config/frontendConfig';
import Session from 'supertokens-auth-react/recipe/session';


if (typeof window !== 'undefined') {
    SuperTokensReact.init(SuperTokensConfig.frontendConfig());
}
// import type { AppProps } from 'next/app';
export default function App({ Component, pageProps }): JSX.Element{
    useEffect(() => {
        async function doRefresh() {
            if (pageProps.fromSupertokens === "needs-refresh") {
                if (await Session.attemptRefreshingSession()) {
                    location.reload();
                } else {
                    // user has been logged out
                    SuperTokensReact.redirectToAuth();
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
            </SessionControl>
        </SuperTokensWrapper>
    );
}
