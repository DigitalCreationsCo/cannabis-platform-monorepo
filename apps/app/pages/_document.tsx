import Document, { Head, Html, Main, NextScript } from 'next/document';
import { Layout } from '../src/components';

export default class MainDocument extends Document {
    static async getInitialProps(ctx) {
        const initialProps = await Document.getInitialProps(ctx);
        return {
            ...initialProps,
            getLayout: (ctx) => <Layout>{ctx}</Layout>,
        };
    }

    render() {
        return (
            <Html data-theme="cannabis">
                <Head />
                <body>
                    <Main />
                    <NextScript />
                </body>
            </Html>
        );
    }
}
