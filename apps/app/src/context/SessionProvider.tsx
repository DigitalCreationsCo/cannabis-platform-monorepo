import { createContext, useContext, useMemo, useState } from 'react';

const SessionContext = createContext(null);

export default function SessionProvider({ children }): React.ReactElement {
    const [session, setSession] = useState(null);
    const user = session?.user;

    const context = useMemo(() => ({ session, setSession, user }), [session, user]);
    return <SessionContext.Provider value={context}>{children}</SessionContext.Provider>;
}

export const useSession = () => useContext(SessionContext);
