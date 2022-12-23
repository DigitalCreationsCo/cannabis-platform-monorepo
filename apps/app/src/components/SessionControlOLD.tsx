import SessionReact, { useSessionContext } from 'supertokens-auth-react/recipe/session';
import SuperTokensReact, { SuperTokensWrapper } from 'supertokens-auth-react';
import Session from 'supertokens-auth-react/recipe/session';
import { Page, Center, LoadingDots } from '@cd/shared-ui';
import { PropsWithChildren, useState } from 'react';
import Layout from './Layout';
import { useEffect } from 'react';
import dynamic from 'next/dynamic';
import SuperTokens from 'supertokens-auth-react';
import { useRouter } from 'next/router';

const SuperTokensComponentNoSSR = dynamic(new Promise((res) => res(SuperTokens.getRoutingComponent)), { ssr: false });

export const SessionControl = ({ Component, children, ...pageProps }) => {
    const { pathname } = useRouter();
    useEffect(() => {
        async function doRefresh() {
            if (pageProps.fromSupertokens === 'needs-refresh') {
                if (await Session.attemptRefreshingSession()) {
                    location.reload();
                } else {
                    // user has been logged out
                    // SuperTokensReact.redirectToAuth();
                }
            }
        }
        doRefresh();
    }, [pageProps.fromSupertokens]);
    if (pageProps.fromSupertokens === 'needs-refresh') {
        return <>hello</>;
    }

    // const session = useSessionContext();

    // // export this from session control context
    // async function logoutClicked() {
    //     await SessionReact.signOut();
    //     SuperTokensReact.redirectToAuth();
    // }

    // async function fetchUserData() {
    //     const res = await fetch('/api/user');
    //     if (res.status === 200) {
    //         const json = await res.json();
    //         // add user to app state here
    //         alert(JSON.stringify(json));
    //     }
    // }

    // if (session.loading === true) {
    //     return <LoadingDots />
    // }

    // if (!session.doesSessionExist) {
    //     return (
    //         <Layout><Page className="flex border">
    //             <Center>Please login to view this!</Center>
    //             <button onClick={async () => await SuperTokensReact.redirectToAuth({ show: 'signin' })}>sign in</button>
    //         </Page></Layout>
    //     )
    // }

    // if (pathname.includes('auth')) {
    //     return SuperTokens.getRoutingComponent();
    // }
    return (
        <Session.SessionAuth>
            <main>
                {/* <SuperTokensComponentNoSSR /> */}
                {children}
            </main>
        </Session.SessionAuth>
        // <SuperTokensWrapper>
        //     {/* {SuperTokensReact.getRoutingComponent()} */}
        //     {/* {/* { getLayout( */}
        //     <SessionReact.SessionAuth>
        //         <Component {...pageProps} />
        //     </SessionReact.SessionAuth>
        //     {/* ) } */}
        // </SuperTokensWrapper>
    );
};
