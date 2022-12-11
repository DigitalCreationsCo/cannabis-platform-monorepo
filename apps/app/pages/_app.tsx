import "shared-ui/dist/style.css"
import "../styles/index.css"
import '../styles/globals.css';
<<<<<<< Updated upstream
import type { AppProps } from 'next/app';

export default function App({ Component, pageProps }: AppProps) {
        return <Component { ...pageProps } />;
=======

import { Layout } from 'components';
import type { AppProps } from 'next/app';

export default function App({ Component, pageProps }: AppProps) {
    const getLayout = Component.getLayout || ((page) => <Layout>{page}</Layout>);

    return getLayout(<Component {...pageProps} />);
>>>>>>> Stashed changes
}
