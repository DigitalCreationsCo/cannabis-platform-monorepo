import { createContext, useContext, useMemo, useState } from 'react';

const SessionContext = createContext(null);

function SessionProvider({ children }): React.ReactElement {
    const [session, setSession] = useState(null);
    const user = session?.user;

    const context = useMemo(() => ({ session, setSession, user }), [session, user]);
    return <SessionContext.Provider value={context}>{children}</SessionContext.Provider>;
}

 const useSession = () => useContext(SessionContext);

export { useSession, SessionProvider };
