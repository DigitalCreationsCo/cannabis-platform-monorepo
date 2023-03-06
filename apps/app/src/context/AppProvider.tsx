import React from 'react';

interface AppContextProps {
    children: ({
        isLoading,
        setIsLoading
    }: {
        isLoading: boolean;
        setIsLoading: React.Dispatch<React.SetStateAction<boolean>>;
    }) => JSX.Element;
}
const AppContext = React.createContext(null);

export default function AppStateProvider({ children }: AppContextProps) {
    const [isLoading, setIsLoading] = React.useState(false);

    const context = React.useMemo(() => ({ isLoading, setIsLoading }), [isLoading, setIsLoading]);
    return <AppContext.Provider value={context}>{children({ isLoading, setIsLoading })}</AppContext.Provider>;
}

export const useAppState = () => React.useContext(AppContext);
