import React from 'react';
declare function AppStateProvider({ children }: {
    children: ({ isLoading, setIsLoading }: {
        isLoading: boolean;
        setIsLoading: React.Dispatch<React.SetStateAction<boolean>>;
    }) => JSX.Element;
}): JSX.Element;
declare const useAppState: () => any;
export { AppStateProvider, useAppState };
