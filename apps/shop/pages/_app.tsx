import { ExtendedPageComponent } from '@cd/shared-lib';
import { Layout } from '@cd/shared-ui';
import type { AppProps } from 'next/app';
import Head from 'next/head';
import { useEffect, useRef } from 'react';
import toast, { Toaster, useToasterStore } from 'react-hot-toast';
import SuperTokensReact, { SuperTokensWrapper } from 'supertokens-auth-react';
import Session, { signOut } from 'supertokens-auth-react/recipe/session';
import { frontendConfig } from '../config/frontendConfig';
import { TopBar } from '../src/components';
import '../styles/globals.css';

type CustomAppProps = AppProps & {
    Component: ExtendedPageComponent;
};

if (typeof window !== 'undefined') SuperTokensReact.init(frontendConfig());
export default function App({ Component, pageProps }: CustomAppProps) {
    const doesSessionExist = useRef(undefined);
    useEffect(() => {
        async function checkSession() {
            doesSessionExist.current = await Session.doesSessionExist();
        }
        checkSession();
    });

    const signedOut = async () => {
        signOut();
    };

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

    const getLayoutContext = Component.getLayoutContext || (() => ({}));

    return (
        <>
            <Head>
                <title>Gras Cannabis Marketplace</title>
                <meta name="vendor experience application" content="Property of Gras Cannabis Co." />
            </Head>
            <SuperTokensWrapper>
                <Toaster position="top-center" />
                <Layout
                    SideNavComponent={() => (
                        <>
                            <ul>
                                <li>Home</li>
                                <li>Flower</li>
                                <li>Edibles</li>
                            </ul>
                        </>
                    )}
                    TopBarComponent={TopBar}
                    signedOut={signedOut}
                    setModal={() => {
                        console.log('set Modal');
                    }}
                    doesSessionExist={doesSessionExist.current}
                    {...getLayoutContext()}
                >
                    <Component {...pageProps} />
                </Layout>
            </SuperTokensWrapper>
        </>
    );
}
