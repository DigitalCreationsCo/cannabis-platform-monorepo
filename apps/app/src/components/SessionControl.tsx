import { useSessionContext } from 'supertokens-auth-react/recipe/session';
import { PropsWithChildren, useEffect } from 'react';
import SuperTokens from 'supertokens-auth-react';
import { useRouter } from 'next/router';

export const SessionControl = ({ children }: PropsWithChildren) => {
    const { pathname } = useRouter();

    useEffect(() => {
        if (pathname.includes('auth')) {
            SuperTokens.getRoutingComponent();
        }

        if (SuperTokens.canHandleRoute()) {
            SuperTokens.redirectToAuth({
                redirectBack: false,
            });
        }
    }, []);

    return <>{children}</>;
};
