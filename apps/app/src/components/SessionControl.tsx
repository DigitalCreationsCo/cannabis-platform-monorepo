import SessionReact, { useSessionContext } from "supertokens-auth-react/recipe/session";
import SuperTokensReact from "supertokens-auth-react";
import { Page, Center, LoadingDots } from '@cd/shared-ui';
import { PropsWithChildren, useState } from 'react';
import Layout from './Layout';

export const SessionControl = ({ children }:PropsWithChildren):JSX.Element => {
    const session = useSessionContext()

    // export this from session control context
    async function logoutClicked() {
        await SessionReact.signOut();
        SuperTokensReact.redirectToAuth();
    }

     async function fetchUserData() {
        const res = await fetch("/api/user");
        if (res.status === 200) {
            const json = await res.json();
            // add user to app state here
            alert(JSON.stringify(json));
        }
     }
    
    if (session.loading === true) {
        return <LoadingDots />
    }

    if (!session.doesSessionExist) {
        return  <Layout><Page className="flex border"><Center>Please login to view this page</Center></Page></Layout>
    }

    return (
        <SessionReact.SessionAuth>
            {children}
        </SessionReact.SessionAuth>
    );
};