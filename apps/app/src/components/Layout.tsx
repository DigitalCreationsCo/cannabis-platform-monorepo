import { Center, Footer, Header, LoadingDots, Page } from '@cd/shared-ui';
import { SideNavContainer, TopBar } from 'components';
import { ChangeEventHandler, PropsWithChildren, ReactEventHandler } from 'react';
import SessionReact, { useSessionContext } from 'supertokens-auth-react/recipe/session';
import AdminDashboardNavigation from './AdminDashBoardNavigation';
import SearchBar from './AppSearch';

interface LayoutProps extends PropsWithChildren {
    onSearchChange?: ChangeEventHandler<HTMLInputElement> & ReactEventHandler<Element>;
    placeholder?: string;
}

export default function Layout({ onSearchChange, placeholder, children }: LayoutProps) {
    const session = useSessionContext();
    const main = 'bg-inverse-soft';
    if (session.loading === true)
        return (
            <div className={main}>
                <TopBar />
                <SideNavContainer SideNavComponent={AdminDashboardNavigation} fixedComponentId={'dashboard-links'}>
                    <Header
                        SearchComponent={<SearchBar placeholder={placeholder} onChange={onSearchChange} />}
                    ></Header>
                    <Page>
                        <Center>
                            <LoadingDots />
                        </Center>
                    </Page>
                </SideNavContainer>
                <Footer />
            </div>
        );

    return (
        <div className={main}>
            <TopBar />
            {SessionReact.doesSessionExist() ? (
                <SideNavContainer
                    SideNavComponent={AdminDashboardNavigation}
                    fixedComponentId={'dashboard-links-container'}
                    drawerComponentId={'dashboard-links-drawer'}
                >
                    <Header
                        SearchComponent={<SearchBar placeholder={placeholder} onChange={onSearchChange} />}
                        drawerComponentId={'dashboard-links-drawer'}
                    ></Header>
                    {children}
                </SideNavContainer>
            ) : (
                <>{children}</>
            )}
            <Footer />
        </div>
    );
}
