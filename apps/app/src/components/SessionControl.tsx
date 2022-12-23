import SuperTokensReact, { SuperTokensWrapper } from 'supertokens-auth-react';
import { UserRoleClaim } from 'supertokens-auth-react/recipe/userroles';
import Session, { useSessionContext } from 'supertokens-auth-react/recipe/session';
import { Page, Center, LoadingDots } from '@cd/shared-ui';
import { PropsWithChildren, useState } from 'react';
import Layout from './Layout';
import { useEffect } from 'react';
import dynamic from 'next/dynamic';
import SuperTokens from 'supertokens-auth-react';
import { useRouter } from 'next/router';

const SuperTokensComponentNoSSR = dynamic(new Promise((res) => res(SuperTokens.getRoutingComponent)), { ssr: false });

function ProtectedComponent() {
    let claimValue = Session.useClaimValue(UserRoleClaim);
    if (claimValue.loading || !claimValue.doesSessionExist) {
        return (
            <Layout>
                <Page className="flex border">
                    <Center>Please login to view this!</Center>
                    <button onClick={() => SuperTokensReact.redirectToAuth({ show: 'signin' })}>sign in</button>
                </Page>
            </Layout>
        );
    }
    let roles = claimValue.value;
    if (roles !== undefined && roles.includes('admin')) {
        // User is an admin
        return <>Hello admin user</>;
    } else {
        // User doesn't have any roles, or is not an admin..
        return <>Hello, you are not an admin user</>;
    }
}

export const SessionControl = ({ Component, children, ...pageProps }) => {
    const { pathname } = useRouter();
    const session = useSessionContext();

    // useEffect(() => {
    //     if (SuperTokens.canHandleRoute()) {
    //         SuperTokens.redirectToAuth({
    //             redirectBack: false,
    //         });
    //     }
    // }, []);

    if (session.loading === true) {
        return <LoadingDots />;
    }

    if (pathname.includes('auth')) {
        return SuperTokens.getRoutingComponent();
    }

    if (!session.doesSessionExist) {
        return (
            <Layout>
                <Page className="flex border">
                    <Center>
                        Please login to view this!
                        <button onClick={async () => await SuperTokensReact.redirectToAuth({ show: 'signin' })}>
                            sign in
                        </button>
                    </Center>
                </Page>
            </Layout>
        );
    }

    return (
        <Session.SessionAuth>
            <>{children}</>
        </Session.SessionAuth>
    );
};
