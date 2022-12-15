import { PropsWithChildren, useState } from 'react';
import { Footer, Header, SideNavContainer } from '@cd/shared-ui';
import SearchBar from "./AppSearch"
import TopBar from './TopBar';
import AdminDashboardNavigation from './AdminDashBoardNavigation';

interface LayoutProps extends PropsWithChildren {}

function Layout({ children }: LayoutProps) {

    const [ session, setSession ] = useState(false)
    const toggleSession = () => {
        setSession(prev => !prev)
    }

    const SessionControl = ({ children }: PropsWithChildren) => {
    return (
        <>
        { session ? <>{children}</> : "Please login to view this page." }
        </>
    )
    }
    
    return (
        <>
            <TopBar session={ session } totalItems={ 4 } auth={ toggleSession } />
            <Header><SearchBar /></Header>
            <SessionControl>
                <SideNavContainer SideNavComponent={AdminDashboardNavigation}>
                    { children }
                </SideNavContainer>
            </SessionControl>
            <Footer />
        </>
    );
}

export default Layout;
