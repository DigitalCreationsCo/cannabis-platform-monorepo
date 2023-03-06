export type ExtendedPageComponent<P = Record<string, unknown>, IP = P> = NextPage<P, IP> & {
    getLayout?: (page: JSX.Element) => JSX.Element;
    isLoading: boolean;
    setIsLoading: Dispatch<SetStateAction<boolean>>;
};