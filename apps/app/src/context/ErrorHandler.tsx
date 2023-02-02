import { useRouter } from 'next/router';
import {
    createContext,
    Dispatch,
    PropsWithChildren,
    SetStateAction,
    useContext,
    useEffect,
    useMemo,
    useState
} from 'react';

// A context will be the way that we allow components lower down
// the tree to trigger the display of an error page
const ErrorStatusContext = createContext<{ setErrorStatusCode: Dispatch<SetStateAction<number>> } | undefined>(
    undefined
);

// The top level component that will wrap our app's core features
export default function ErrorHandler({ children }: PropsWithChildren) {
    const router = useRouter();
    const [errorStatusCode, setErrorStatusCode] = useState();

    // Make sure to "remove" this status code whenever the user
    // navigates to a new URL. If we didn't do that, then the user
    // would be "trapped" into error pages forever
    useEffect(() => {
        // Listen for changes to the current location.
        // cleanup the listener on unmount
        return () => {
            router.events.off('routeChangeStart', () => setErrorStatusCode(undefined));
            //   router.events.off('routeChangeComplete', () => setErrorStatusCode(undefined))
            //   router.events.off('routeChangeError', () => setErrorStatusCode(undefined))
        };
    }, []);

    // This is what the component will render. If it has an
    // errorStatusCode that matches an API error, it will only render
    // an error page. If there is no error status, then it will render
    // the children as normal
    const renderContent = () => {
        if (errorStatusCode === 404) {
            //   return <Page404 />
            return <div>Error</div>;
        }

        // ... more HTTP codes handled here

        return <>{children}</>;
    };

    // We wrap it in a useMemo for performance reasons. More here:
    // https://kentcdodds.com/blog/how-to-optimize-your-context-value/
    const contextPayload = useMemo(() => ({ setErrorStatusCode }), [setErrorStatusCode]);

    // We expose the context's value down to our components, while
    // also making sure to render the proper content to the screen
    return <ErrorStatusContext.Provider value={contextPayload}>{renderContent()}</ErrorStatusContext.Provider>;
}

// A custom hook to quickly read the context's value. It's
// only here to allow quick imports
export const useErrorStatus = () => useContext(ErrorStatusContext);
