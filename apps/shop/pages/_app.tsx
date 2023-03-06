import type { AppProps } from 'next/app';
import Head from 'next/head';
import { useEffect } from 'react';
import toast, { Toaster, useToasterStore } from 'react-hot-toast';
import SuperTokensReact, { SuperTokensWrapper } from 'supertokens-auth-react';
import Session from 'supertokens-auth-react/recipe/session';
import { frontendConfig } from '../config/frontendConfig';

// must go to shared-lib
// import ModalProvider from '../src/context/ModalProvider';

import '../styles/globals.css';

if (typeof window !== 'undefined') SuperTokensReact.init(frontendConfig());

export default function App({ Component, pageProps }: AppProps) {
    const getLayout = Component.getLayout || ((page) => <p>Page Layout{page}</p>);

    const TOAST_LIMIT = 2;
    const { toasts } = useToasterStore();
    useEffect(() => {
        toasts
            .filter((t) => t.visible)
            .filter((_, i) => i >= TOAST_LIMIT)
            .forEach((t) => toast.dismiss(t.id));
    }, [toasts]);

    useEffect(() => {
        async function doRefresh() {
            if (pageProps.fromSupertokens === 'needs-refresh') {
                if (await Session.attemptRefreshingSession()) {
                    location.reload();
                } else {
                    // user has been logged out
                    window.location.href = '/';
                }
            }
        }
        doRefresh();
    }, [pageProps.fromSupertokens]);
    if (pageProps.fromSupertokens === 'needs-refresh') {
        return null;
    }
    return (
        <>
            <Head>
                <title>Gras Cannabis Marketplace</title>
                <meta name="vendor experience application" content="Property of Gras Cannabis Co." />
            </Head>
            <SuperTokensWrapper>
                <Toaster position="top-center" />
                {getLayout(<Component {...pageProps} />)}
            </SuperTokensWrapper>
        </>
    );
}
