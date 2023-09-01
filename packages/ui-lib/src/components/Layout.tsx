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
	showSideNav?: boolean;
	showTopBar?: boolean;
	showHeader?: boolean;
	TopBarComponent?: React.ElementType;
}

interface LayoutProps extends LayoutContextProps, PropsWithChildren {
	showSideNavOnDesktop?: boolean;
	showSideNav?: boolean;
	showHeader?: boolean;
	showTopBar?: boolean;
	SideNavComponent: React.ElementType;
	signOut: () => void;
	onSearchChange?: ChangeEventHandler<HTMLInputElement> &
		ReactEventHandler<Element>;
	placeholder?: string;
	isSession: boolean;
	isModalVisible?: boolean;
	className?: string | string[];
}

// topbar goes out as a unique child component with props
// header goes in here as generic component with props
function Layout({
	showSideNav = true,
	showHeader = true,
	showTopBar = true,
	showSideNavOnDesktop = true,
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
		// main: 'bg-inverse-soft flex flex-col grow border',
		main: 'bg-inverse-soft flex-1',
		isModalOverlay: isModalVisible && 'w-full fixed',
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
			<div className={styles.main}>
				{showTopBar && TopBarComponent && (
					<TopBarComponent signOut={signOut} doesSessionExist={isSession} />
				)}
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
			<AnimationWrapper>
				<Footer />
			</AnimationWrapper>
		</div>
	);
}

export { Layout };
export type { LayoutContextProps };
