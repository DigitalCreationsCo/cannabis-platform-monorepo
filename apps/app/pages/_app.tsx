import '@cd/shared-ui/dist/style.css';
import '@cd/shared-config/index.css';
import { AppProps } from 'next/app';
import React, { useEffect, useState } from 'react';
import { Layout, SessionControl } from 'components';
import SuperTokens, { SuperTokensWrapper } from 'supertokens-auth-react';
import Session from 'supertokens-auth-react/recipe/session';
import * as SuperTokensConfig from '../config/frontendConfig';
import { Toaster } from "react-hot-toast";
import axios from 'axios';
import { urlBuilder } from '../src/utils';
import { Page } from '@cd/shared-ui';

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

    const [ appStatus, setStatus ] = useState<string | boolean>("loading")
    useEffect(() => {
        async function healthcheck() {
            try {
                await axios(urlBuilder.main.healthCheck())
                setStatus(true)
            } catch (error) {
                setStatus(false)
                console.log('error!: ', error.toJSON());
            };
        }
        healthcheck();
    }, []);

    if (pageProps.fromSupertokens === "needs-refresh") {
        return <></>
    }

    const getLayout = Component.getLayout || ((page) => <Layout>{ page }</Layout>);
    return (
        <SuperTokensWrapper>
            <SessionControl>
                    { appStatus ?
                        getLayout(<Component { ...pageProps } />) :
                        getLayout(<Page>Services are not available now. Please try later.</Page>)
                        }
            <Toaster position="top-right" />
            </SessionControl>
        </SuperTokensWrapper>
    );
}
