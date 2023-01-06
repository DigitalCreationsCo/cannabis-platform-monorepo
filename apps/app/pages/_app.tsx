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
import { Page, LoadingDots, Center } from '@cd/shared-ui';

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

    const [ appStatus, setAppStatus ] = useState<string | boolean>("loading")
    pageProps.setAppStatus = setAppStatus
    
    useEffect(() => {
        async function healthcheck() {
            try {
                setAppStatus("loading")
                await axios(urlBuilder.main.healthCheck())
                setAppStatus(true)
            } catch (error) {
                console.log('error: ', error.message);
                setAppStatus(false)
            };
        }
        healthcheck();
    }, []);

    if (pageProps.fromSupertokens === "needs-refresh") {
        return <></>
    }
    const getLayout = Component.getLayout || ((page) => <Layout setAppStatus={setAppStatus}>{ page }</Layout>);
    return (
        <SuperTokensWrapper>
            <SessionControl>
                {
                    appStatus === "loading" ? <Page><Center><LoadingDots /></Center></Page> :
                    appStatus === true ?
                        getLayout(<Component { ...pageProps } />) :
                        getLayout(<Page>Services are not available now. Please try later.</Page>)
                        }
            <Toaster position="top-right" />
            </SessionControl>
        </SuperTokensWrapper>
    );
}
