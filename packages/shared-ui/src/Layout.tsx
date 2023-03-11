import { LayoutProps } from '@cd/shared-lib';
import { PropsWithChildren } from 'react';
import Footer from './Footer';
import Header from './Header';
import SideNavContainer from './SideNavContainer';

// topbar goes out as a unique child component with props
// header goes in here as generic component with props
export default function Layout({
    showSideNav,
    SideNavComponent,
    TopBarComponent,
    signedOut,
    setModal,
    onSearchChange,
    placeholder,
    doesSessionExist,
    children
}: LayoutProps & PropsWithChildren) {
    const styles = { main: 'bg-inverse-soft' };

    const navLinkContainerId = 'dashboard-links-container';
    const drawerComponentId = 'dashboard-links-drawer';
    return (
        <div className="flex flex-col">
            {doesSessionExist ? (
                <div className={styles.main}>
                    <TopBarComponent signedOut={signedOut} doesSessionExist={doesSessionExist} />
                    <Header
                        placeholder={placeholder}
                        onSearchChange={onSearchChange}
                        drawerComponentId={drawerComponentId}
                    />
                    <SideNavContainer
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
                    <TopBarComponent doesSessionExist={doesSessionExist} setLoginModal={setModal} />
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
