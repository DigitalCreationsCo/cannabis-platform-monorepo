import { LayoutContextProps } from '@cd/shared-lib';
import { ChangeEventHandler, PropsWithChildren, ReactEventHandler } from 'react';
import Footer from './Footer';
import Header from './Header';
import SideNavContainer from './SideNavContainer';

interface LayoutProps extends LayoutContextProps, PropsWithChildren {
    showSideNavOnDesktop: boolean;
    showSideNav: boolean;
    showHeader: boolean;
    showTopBar: boolean;
    SideNavComponent: React.ElementType;
    TopBarComponent: React.ElementType;
    signedOut: () => void;
    onSearchChange?: ChangeEventHandler<HTMLInputElement> & ReactEventHandler<Element>;
    placeholder?: string;
    isSession: boolean;
}

// topbar goes out as a unique child component with props
// header goes in here as generic component with props
export default function Layout({
    showSideNav = true,
    showHeader = true,
    showTopBar = true,
    showSideNavOnDesktop,
    SideNavComponent,
    TopBarComponent,
    signedOut,
    onSearchChange,
    placeholder,
    isSession,
    children
}: LayoutProps & PropsWithChildren) {
    const styles = { main: 'bg-inverse-soft' };

    const navLinkContainerId = 'dashboard-links-container';
    const drawerComponentId = 'dashboard-links-drawer';
    return (
        <div className="flex flex-col">
            {isSession ? (
                <div className={styles.main}>
                    {showTopBar && <TopBarComponent signedOut={signedOut} doesSessionExist={isSession} />}
                    {showHeader && (
                        <Header
                            placeholder={placeholder}
                            onSearchChange={onSearchChange}
                            drawerComponentId={drawerComponentId}
                        />
                    )}
                    <SideNavContainer
                        showSideNavOnDesktop={showSideNavOnDesktop}
                        showSideNav={showSideNav}
                        SideNavComponent={SideNavComponent}
                        fixedComponentId={navLinkContainerId}
                        drawerComponentId={drawerComponentId}
                    >
                        {children}
                    </SideNavContainer>
                </div>
            ) : (
                <>
                    {showTopBar && <TopBarComponent doesSessionExist={isSession} />}
                    {showHeader && (
                        <Header
                            placeholder={placeholder}
                            onSearchChange={onSearchChange}
                            drawerComponentId={drawerComponentId}
                        />
                    )}
                    {children}
                </>
            )}
            <Footer />
        </div>
    );
}

// function LayoutContainer = () => {
//     const doesSessionExist = async () => await SessionReact.doesSessionExist();

//     const signedOut = async () => {
//         signOut();
//         windsow.location.href = '/';
//     };

//     if (session?.loading === true) return <></>;
//     const doesSessionExist = session?.doesSessionExist;
//     return (<Layout>{children}</Layout>)
// }
