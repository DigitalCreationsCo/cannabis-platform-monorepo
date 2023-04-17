import { Layout, LayoutContextProps } from "@cd/ui-lib";
import { AppProps } from 'next/app';
import Head from 'next/head';
import { Dispatch, SetStateAction, useEffect } from 'react';
import { Toaster } from 'react-hot-toast';
import SuperTokensReact, { SuperTokensWrapper } from 'supertokens-auth-react';
import Session, { SessionContextType, signOut } from 'supertokens-auth-react/recipe/session';
import { frontendConfig } from '../config/frontendConfig';
import { AdminDashboardNavigation, TopBar } from '../src/components';
import StepFormValuesProvider from '../src/context/StepFormProvider';
import '../styles/globals.css';

type CustomAppProps = AppProps & {
    Component: ExtendedPageComponent;
};

export default function App({ Component, pageProps }: CustomAppProps) {
    if (typeof window !== 'undefined') {
        SuperTokensReact.init(frontendConfig());
    }

    // const isSession = useRef(false);
    // useEffect(() => {
    //     const checkSession = async () => {
    //         isSession.current = await doesSessionExist();
    //     };
    //     checkSession();
    // }, []);

    useEffect(() => {
        async function doRefresh() {
            if (pageProps.fromSupertokens === 'needs-refresh') {
                if (await Session.attemptRefreshingSession()) {
                    location.reload();
                } else {
                    // user has been logged out
                    window.location.href = '/';
                }
            }
        }
        doRefresh();
    }, [pageProps.fromSupertokens]);
    if (pageProps.fromSupertokens === 'needs-refresh') {
        return null;
    }

    const getLayoutContext = Component.getLayoutContext || (() => ({}));

    // Router.events.on('routeChangeStart', () => setIsLoading(true));
    // Router.events.on('routeChangeComplete', () => setIsLoading(false));
    // Router.events.on('routeChangeError', () => setIsLoading(false));

    return (
        <>
            <Head>
                <title>Gras Cannabis Marketplace</title>
                <meta name="Dispensary Experience App" content="Property of Gras Cannabis Co." />
            </Head>
            <SuperTokensWrapper>
                <Layout
                    SideNavComponent={AdminDashboardNavigation}
                    TopBarComponent={TopBar}
                    signedOut={signOut}
                    // FIX THIS
                    isSession={false}
                    {...getLayoutContext()}
                >
                    <Toaster position="top-center" />
                    <StepFormValuesProvider>
                        {/* <ModalProvider /> */}
                        <Component {...pageProps} />
                    </StepFormValuesProvider>
                </Layout>
            </SuperTokensWrapper>
        </>
    );
}


export type ExtendedPageComponent = {
    signIn: (input: {
        formFields: {
            id: string;
            value: string;
        }[];
        options?: unknown;
        userContext?: unknown;
    }) => Promise<
    | {
          status: "OK";
          user: { id: string; email: string; timeJoined: number };
          fetchResponse: Response;
      }
    | {
          status: "FIELD_ERROR";
          formFields: {
              id: string;
              error: string;
          }[];
          fetchResponse: Response;
      }
    | {
          status: "WRONG_CREDENTIALS_ERROR";
          
            fetchResponse: Response;
      }
>;
    signOut: () => Promise<void>;
    signUp: (input: {
        formFields: {
            id: string;
            value: string;
        }[];
        options?: unknown;
        userContext?: unknown;
    }) => Promise<
    | {
          status: "OK";
          user: { id: string; email: string; timeJoined: number };
          fetchResponse: Response;
      }
    | {
          status: "FIELD_ERROR";
          formFields: {
              id: string;
              error: string;
          }[];
          fetchResponse: Response;
      }
>;
    getLayoutContext?: () => LayoutContextProps;
    isLoading: boolean;
    setIsLoading: Dispatch<SetStateAction<boolean>>;
    session: SessionContextType;
    doesSessionExist: boolean;
};