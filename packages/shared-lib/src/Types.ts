import { Dispatch, SetStateAction } from "react";

export type ExtendedPageComponent = {
    getLayout?: (page: JSX.Element) => JSX.Element;
    isLoading: boolean;
    setIsLoading: Dispatch<SetStateAction<boolean>>;
};