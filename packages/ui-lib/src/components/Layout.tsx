import {
	type ChangeEventHandler,
	type PropsWithChildren,
	type ReactEventHandler,
} from 'react';
import { twMerge } from 'tailwind-merge';
import AnimationWrapper from './AnimationWrapper';
import Footer from './Footer';
import Header from './Header';
import SideNavContainer from './SideNavContainer';

interface LayoutContextProps {
	onSearchChange?: ChangeEventHandler<HTMLInputElement> &
		ReactEventHandler<Element>;
	placeholder?: string;
	showSearch?: boolean;
	showHeaderDrawer?: boolean;
	showSideNav?: boolean;
	showTopBar?: boolean;
	showHeader?: boolean;
	showFooter?: boolean;
	showSideNavOnDesktop?: boolean;
	TopBarComponent?: React.ElementType;
}

interface LayoutProps extends LayoutContextProps, PropsWithChildren {
	SideNavComponent: React.ElementType;
	signOut?: () => void;
	isSession: boolean;
	isModalVisible?: boolean;
	className?: string | string[];
}

// topbar goes out as a unique child component with props
// header goes in here as generic component with props
function Layout({
	showSideNav = true,
	showSideNavOnDesktop = true,
	showHeader = true,
	showHeaderDrawer = true,
	showSearch = true,
	showTopBar = true,
	showFooter = true,
	SideNavComponent,
	TopBarComponent,
	signOut,
	onSearchChange,
	placeholder,
	isSession,
	children,
	isModalVisible,
	className,
}: LayoutProps & PropsWithChildren) {
	const styles = {
		main: 'bg-inherit flex-1',
		isModalOverlay: isModalVisible && 'w-full fixed bg-inherit',
	};

	const navLinkContainerId = 'dashboard-links-container';
	const drawerComponentId = 'dashboard-links-drawer';

	return (
		<div
			className={twMerge(
				'flex flex-col min-h-screen',
				styles.isModalOverlay,
				className,
			)}
		>
			<div className={twMerge(styles.main)}>
				{showTopBar && TopBarComponent && (
					<TopBarComponent signOut={signOut} doesSessionExist={isSession} />
				)}
				{showHeader &&
					((
						<Header
							showSearch={showSearch}
							showDrawer={showHeaderDrawer}
							placeholder={placeholder}
							onSearchChange={onSearchChange}
							drawerComponentId={drawerComponentId}
						/>
					) || <></>)}
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
			<AnimationWrapper>{showFooter && <Footer />}</AnimationWrapper>
		</div>
	);
}

export { Layout };
export type { LayoutContextProps };
