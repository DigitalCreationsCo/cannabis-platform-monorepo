import '@cd/shared-config/index.css';
import { Center, LoadingDots, Padding } from '@cd/shared-ui';
import '@cd/shared-ui/dist/style.css';
import { Layout } from 'components';
import { NextPage } from 'next';
import { AppProps } from 'next/app';
import { Dispatch, SetStateAction } from 'react';
import { Toaster } from 'react-hot-toast';
import SupertokensReact, { SuperTokensWrapper } from 'supertokens-auth-react';
import { frontendConfig } from '../config/frontendConfig';
import AppStateProvider from '../src/context/AppProvider';
import ModalProvider from '../src/context/ModalProvider';
import StepFormValuesProvider from '../src/context/StepFormProvider';

export type ExtendedPageComponent<P = Record<string, unknown>, IP = P> = NextPage<P, IP> & {
    getLayout?: (page: JSX.Element) => JSX.Element;
    isLoading: boolean;
    setIsLoading: Dispatch<SetStateAction<boolean>>;
};

type CustomAppProps = AppProps & {
    Component: ExtendedPageComponent;
};

if (typeof window !== "undefined") {
    SupertokensReact.init(frontendConfig());
}

export default function App({ Component, pageProps }: CustomAppProps): JSX.Element {
    const getLayout = Component.getLayout || ((page) => <Layout>{page}</Layout>);
    return (
        <SuperTokensWrapper>
        <ModalProvider>
            <Toaster position="top-right" />
            <StepFormValuesProvider>
                <AppStateProvider>
                    {({ isLoading, setIsLoading }) => {
                        // Router.events.on('routeChangeStart', () => setIsLoading(true));
                        // Router.events.on('routeChangeComplete', () => setIsLoading(false));
                        // Router.events.on('routeChangeError', () => setIsLoading(false));

                        return getLayout(
                            isLoading ? 
                                    <Center>
                                        <Padding>
                                            <LoadingDots />
                                        </Padding>
                                    </Center>
                            : <Component {...pageProps} />);
                    }}
                </AppStateProvider>
            </StepFormValuesProvider>
        </ModalProvider>
        </SuperTokensWrapper>
    );
}