import { PropsWithChildren } from 'react';
import { Footer, Header, TopBar } from 'shared-ui';

interface LayoutProps extends PropsWithChildren {}

function Layout({ children }: LayoutProps) {
    return (
        <>
            <TopBar />
            <Header />
            {children}
            <Footer />
        </>
    );
}

export default Layout;
