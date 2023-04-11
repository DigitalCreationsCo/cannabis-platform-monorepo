import { UserWithDetails } from "@cd/data-access";
import { AppState } from "../types";
export declare const signinUserAsync: any;
export type UserStateProps = {
    token: string | null;
    user: UserWithDetails;
    isSignedIn: boolean;
    isLoading: boolean;
    isSuccess: boolean;
    isError: boolean;
    errorMessage: string;
};
export declare const userSlice: any;
export declare const userActions: any;
export declare const userReducer: any;
export declare const selectUserState: (state: AppState) => UserStateProps;
