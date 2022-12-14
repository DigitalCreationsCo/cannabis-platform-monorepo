import { PropsWithChildren } from 'react';
import { Footer, Header, TopBar } from '@cd/shared-ui';
import SearchBar from "./AppSearch"

interface LayoutProps extends PropsWithChildren {}

function Layout({ children }: LayoutProps) {
    return (
        <>
            <TopBar />
            <Header><SearchBar /></Header>
            {children}
            <Footer />
        </>
    );
}

export default Layout;
