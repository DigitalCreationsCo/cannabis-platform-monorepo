import { Center, Footer, Header, LoadingDots, Page } from '@cd/shared-ui';
import { TopBar } from 'components';
import { ChangeEventHandler, PropsWithChildren, ReactEventHandler } from 'react';
import { useSessionContext } from 'supertokens-auth-react/recipe/session';
import AdminDashboardNavigation from './AdminDashBoardNavigation';
import SearchBar from './AppSearch';
import SideNavContainer from './SideNavContainer';

interface LayoutProps extends PropsWithChildren {
    onSearchChange?: ChangeEventHandler<HTMLInputElement> & ReactEventHandler<Element>;
    placeholder?: string;
}

export default function Layout({ onSearchChange, placeholder, children }: LayoutProps) {
    const session = useSessionContext();
    const main = 'bg-inverse-soft';
    const topbar = ['flex flex-row h-[66px] pr-4 lg:px-8 lg:pr-16 bg-inverse space-x-2 items-center shadow'];
    if (session.loading === true)
        return (
            <div className={main}>
                <TopBar />
                {session.loading === true && (
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
                )}
                <Footer />
            </div>
        );

    return (
        <div className={main}>
            <TopBar />
            {session.doesSessionExist ? (
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
