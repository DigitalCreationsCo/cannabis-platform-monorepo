import { NextPage } from 'next';
import dynamic from 'next/dynamic';
import Head from 'next/head';
import { ReactNode, useEffect } from 'react';
import SuperTokens from 'supertokens-auth-react';

const SuperTokensComponentNoSSR = dynamic(new Promise((res) => res(SuperTokens.getRoutingComponent)) as unknown, {
    ssr: false,
});

export default function Auth(): JSX.Element {
    useEffect(() => {
        if (SuperTokens.canHandleRoute()) {
            SuperTokens.redirectToAuth({
                redirectBack: false,
            });
        }
    }, []);

    return (
        <div>
            <Head>
                <title>SuperTokens Auth 💫</title>
                <link rel="icon" href="/favicon.ico" />
            </Head>

            <main>
                <SuperTokensComponentNoSSR />
            </main>
        </div>
    );
}

Auth.getLayout = function (page: NextPage & ReactNode) {
    return page;
};
