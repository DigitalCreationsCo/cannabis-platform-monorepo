import { createContext, useContext, useEffect, useMemo } from 'react';
import { SuperTokensWrapper } from 'supertokens-auth-react';
import { signIn, signUp } from 'supertokens-auth-react/recipe/emailpassword';
import { doesSessionExist as STdoesSessionExist, SessionContextType, signOut, useSessionContext } from 'supertokens-auth-react/recipe/session';

export const SessionContext = createContext({ signIn, signUp, signOut });

interface SessionProviderProps {
    children: ({session, signIn, signUp, signOut, doesSessionExist }:{
        session: SessionContextType;
         signIn: unknown;
         signUp: unknown; 
         signOut: unknown;
         doesSessionExist: boolean;
    }) => JSX.Element;
}

function SessionProvider({ children }: SessionProviderProps): React.ReactElement {
    const session = useSessionContext();
    let doesSessionExist: boolean = false

    useEffect(() => {
        async function checkSession() {
            doesSessionExist = await STdoesSessionExist();
        }
        checkSession();
    }, [session, signIn, signUp, signOut]);

    const context = useMemo(() => ({ session, signIn, signUp, signOut, doesSessionExist }), [session]);
    return <SessionContext.Provider value={context}>{children({session, signIn, signUp, signOut, doesSessionExist})}</SessionContext.Provider>;
}
const useSession = () => useContext(SessionContext)

function SessionWrapper ({ children }: SessionProviderProps) {
    return (
        <SuperTokensWrapper>
            <SessionProvider>{children}</SessionProvider>
        </SuperTokensWrapper>
    );
}

export { useSession, SessionWrapper };
