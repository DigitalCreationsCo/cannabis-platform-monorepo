import { ChangeEventHandler, Dispatch, ReactEventHandler, SetStateAction } from "react";

export type ExtendedPageComponent = {
    getLayoutContext?: () => LayoutContext;
    isLoading: boolean;
    setIsLoading: Dispatch<SetStateAction<boolean>>;
};

export type LayoutContext = {
    SideNavComponent?: React.ElementType;
    TopBarComponent?: React.ElementType;
    signedOut?: () => void;
    setModal?: Dispatch<SetStateAction<boolean>>;
    onSearchChange?: ChangeEventHandler<HTMLInputElement> & ReactEventHandler<Element>;
    placeholder?: string;
    doesSessionExist?: boolean;
    // page: JSX.Element;
}