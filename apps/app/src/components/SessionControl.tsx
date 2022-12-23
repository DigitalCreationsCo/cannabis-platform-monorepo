import { useSessionContext } from 'supertokens-auth-react/recipe/session';
import { PropsWithChildren } from 'react';
import SuperTokens from 'supertokens-auth-react';
import { useRouter } from 'next/router';
import { useEffect } from 'react';

export const SessionControl = ({ children }: PropsWithChildren) => {
    const { pathname } = useRouter();

    useEffect(() => {
    if (pathname.includes('auth')) {
        SuperTokens.getRoutingComponent()
    }
        
        if (SuperTokens.canHandleRoute()) {
            SuperTokens.redirectToAuth({
                redirectBack: false,
            });
        }
    }, []);

    return <>{children}</>;
};
