import { ChangeEventHandler, Dispatch, PropsWithChildren, ReactEventHandler, SetStateAction } from 'react';
import Footer from './Footer';
import Header from './Header';
import SideNavContainer from './SideNavContainer';

// import AdminDashboardNavigation from './AdminDashBoardNavigation';
interface LayoutProps extends PropsWithChildren {
    SideNavComponent: () => JSX.Element;
    TopBarComponent: React.ElementType;
    signedOut: () => void;
    setModal: Dispatch<SetStateAction<boolean>>;
    onSearchChange?: ChangeEventHandler<HTMLInputElement> & ReactEventHandler<Element>;
    placeholder?: string;
    doesSessionExist: boolean;
}

// topbar goes out as a unique child component with props
// header goes in here as generic component with props
export default function Layout({
    SideNavComponent,
    TopBarComponent,
    signedOut,
    setModal,
    onSearchChange,
    placeholder,
    doesSessionExist,
    children
}: LayoutProps) {
    const styles = { main: 'bg-inverse-soft min-h-[800px]' };

    const navLinkContainerId = 'dashboard-links-container';
    const drawerComponentId = 'dashboard-links-drawer';
    return (
        <div className="h-screen flex flex-col">
            {doesSessionExist ? (
                <div className={styles.main}>
                    <TopBarComponent signedOut={signedOut} doesSessionExist={doesSessionExist} />
                    <Header
                        placeholder={placeholder}
                        onSearchChange={onSearchChange}
                        drawerComponentId={drawerComponentId}
                    />
                    <SideNavContainer
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
