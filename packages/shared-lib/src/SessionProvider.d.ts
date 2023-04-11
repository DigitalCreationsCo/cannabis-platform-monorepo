/// <reference types="react" />
export declare const SessionContext: import("react").Context<{
    signIn: typeof import("supertokens-auth-react/lib/build/recipe/emailpassword").default.signIn;
    signUp: typeof import("supertokens-auth-react/lib/build/recipe/emailpassword").default.signUp;
    signOut: typeof import("supertokens-auth-react/lib/build/recipe/session").default.signOut;
}>;
declare const useSession: () => {
    signIn: typeof import("supertokens-auth-react/lib/build/recipe/emailpassword").default.signIn;
    signUp: typeof import("supertokens-auth-react/lib/build/recipe/emailpassword").default.signUp;
    signOut: typeof import("supertokens-auth-react/lib/build/recipe/session").default.signOut;
};
declare function SessionWrapper({ stInstance, children }: {
    stInstance: any;
    children: any;
}): JSX.Element;
export { useSession, SessionWrapper };
