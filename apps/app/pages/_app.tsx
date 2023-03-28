import { ExtendedPageComponent } from '@cd/shared-lib';
import { Layout } from '@cd/shared-ui';
import { AppProps } from 'next/app';
import Head from 'next/head';
import { useEffect } from 'react';
import { Toaster } from 'react-hot-toast';
import SuperTokensReact, { SuperTokensWrapper } from 'supertokens-auth-react';
import Session, { signOut } from 'supertokens-auth-react/recipe/session';
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
                    // isSession={isSession.current}
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
