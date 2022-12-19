import { PropsWithChildren, ReactEventHandler, useState } from 'react';
import { Footer, Header, SideNavContainer } from '@cd/shared-ui';
import SearchBar from "./AppSearch"
import TopBar from './TopBar';
import AdminDashboardNavigation from './AdminDashBoardNavigation';

interface LayoutProps extends PropsWithChildren {
    onSearchChange?: ReactEventHandler;
    placeholder?: string;
}

function Layout({ onSearchChange, placeholder, children }: LayoutProps) {

    const [ session, setSession ] = useState(false)
    const toggleSession = () => {
        setSession(prev => !prev)
    }
    
    return (
        <>
            <TopBar session={ session } totalItems={ 4 } auth={ toggleSession } />
            <SideNavContainer SideNavComponent={ AdminDashboardNavigation } fixedComponentId={ 'admin-dashboard' }>
                <Header><SearchBar placeholder={ placeholder }  onChange={ onSearchChange } /></Header>
                { children }
            </SideNavContainer>
            <Footer />
        </>
    );
}

export default Layout;
