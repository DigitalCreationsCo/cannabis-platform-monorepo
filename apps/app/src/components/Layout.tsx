import { PropsWithChildren } from 'react';
import { Footer, Header, SideNavContainer } from '@cd/shared-ui';
import SearchBar from "./AppSearch"
import TopBar from './TopBar';
import AdminDashboardNavigation from './AdminDashBoardNavigation';

interface LayoutProps extends PropsWithChildren {}

function Layout({ children }: LayoutProps) {
    return (
        <>
            <TopBar />
            <Header><SearchBar /></Header>
            <SideNavContainer SideNavComponent={AdminDashboardNavigation}>
                { children }
            </SideNavContainer>
            <Footer />
        </>
    );
}

export default Layout;
