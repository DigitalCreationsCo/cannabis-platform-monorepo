import { jsx as _jsx } from "react/jsx-runtime";
import React from 'react';
const AppContext = React.createContext(null);
function AppStateProvider({ children }) {
    const [isLoading, setIsLoading] = React.useState(false);
    const context = React.useMemo(() => ({ isLoading, setIsLoading }), [isLoading, setIsLoading]);
    return _jsx(AppContext.Provider, { value: context, children: children({ isLoading, setIsLoading }) });
}
const useAppState = () => React.useContext(AppContext);
export { AppStateProvider, useAppState };
//# sourceMappingURL=AppProvider.js.map