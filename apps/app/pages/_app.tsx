import "@cd/shared-ui/dist/style.css"
import "@cd/shared-config/index.css"

import { Layout, SessionControl } from 'components';
import type { AppProps } from 'next/app';

export default function App({ Component, pageProps }: AppProps) {
    const getLayout = Component.getLayout || ((page) => <Layout>{page}</Layout>);

    return (
        <SessionControl>
            getLayout(<Component { ...pageProps } />)
        </SessionControl>
    );
}
