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
    return (
        <>
            <TopBar
                // session={ session } 
                // auth={ toggleSession }
                totalItems={ 4 } 
            />
            <SideNavContainer SideNavComponent={ AdminDashboardNavigation } fixedComponentId={ 'admin-dashboard' }>
                <Header><SearchBar placeholder={ placeholder }  onChange={ onSearchChange } /></Header>
                { children }
            </SideNavContainer>
            <Footer />
        </>
    );
}

export default Layout;
