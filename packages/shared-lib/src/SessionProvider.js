import { jsx as _jsx } from "react/jsx-runtime";
import { createContext, useContext, useEffect, useMemo } from 'react';
import { SuperTokensWrapper } from 'supertokens-auth-react';
import { signIn, signUp } from 'supertokens-auth-react/recipe/emailpassword';
import { doesSessionExist as STdoesSessionExist, signOut, useSessionContext } from 'supertokens-auth-react/recipe/session';
export const SessionContext = createContext({ signIn, signUp, signOut });
function SessionProvider({ children }) {
    const session = useSessionContext();
    let doesSessionExist;
    useEffect(() => {
        async function checkSession() {
            doesSessionExist = await STdoesSessionExist();
        }
        checkSession();
    }, [session, signIn, signUp, signOut]);
    const context = useMemo(() => ({ session, signIn, signUp, signOut, doesSessionExist }), [session]);
    return _jsx(SessionContext.Provider, { value: context, children: children({ session, signIn, signUp, signOut, doesSessionExist }) });
}
const useSession = () => useContext(SessionContext);
function SessionWrapper({ stInstance, children }) {
    return (_jsx(SuperTokensWrapper, { children: _jsx(SessionProvider, { children: children }) }));
}
export { useSession, SessionWrapper };
//# sourceMappingURL=SessionProvider.js.map