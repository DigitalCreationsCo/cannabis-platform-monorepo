import React from 'react';

const AppContext = React.createContext(null);

export default function AppStateProvider({
    children,
}: {
    children: ({
        isLoading,
        setIsLoading,
    }: {
        isLoading: boolean;
        setIsLoading: React.Dispatch<React.SetStateAction<boolean>>;
    }) => JSX.Element;
}) {
    const [isLoading, setIsLoading] = React.useState(false);

    const context = React.useMemo(() => ({ isLoading, setIsLoading }), [isLoading, setIsLoading]);
    return <AppContext.Provider value={context}>{children({ isLoading, setIsLoading })}</AppContext.Provider>;
}

export const useAppState = () => React.useContext(AppContext);
