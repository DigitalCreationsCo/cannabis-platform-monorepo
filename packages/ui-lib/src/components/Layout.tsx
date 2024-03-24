import {
	useEffect,
	type ChangeEventHandler,
	type PropsWithChildren,
	type ReactEventHandler,
} from 'react';
import { twMerge } from 'tailwind-merge';
import AnimationWrapper from './AnimationWrapper';
import { Button } from './button';
import Footer from './Footer';
import Header from './Header';
import { type SearchBarProps } from './SearchField';
import SideNavContainer from './SideNavContainer';

interface LayoutContextProps {
	onSearchChange?: ChangeEventHandler<HTMLInputElement> &
		ReactEventHandler<Element>;
	showSearch?: boolean;
	showHeaderDrawer?: boolean;
	showNavigationBar?: boolean;
	showSideNav?: boolean;
	showTopBar?: boolean;
	showHeader?: boolean;
	showFooter?: boolean;
	showLocation?: boolean;
	showSideNavOnDesktop?: boolean;
	TopBarComponent?: React.ElementType | null;
	SearchComponent?: React.ElementType<SearchBarProps> | null;
	searchPlaceholder?: string;
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
	showLocation = true,
	SideNavComponent,
	TopBarComponent = null,
	SearchComponent,
	signOut,
	onSearchChange,
	searchPlaceholder,
	isSession,
	children,
	isModalVisible,
	className,
}: LayoutProps & PropsWithChildren) {
	const styles = {
		main: 'bg-inherit flex-1',
		isModalOverlay:
			isModalVisible && 'w-full relative bg-inherit overscroll-none h-full',
	};

	useEffect(() => {
		const lockScroll = (e: Event) => {
			if (isModalVisible) {
				// e.preventDefault();
				e.stopPropagation();
				e.stopImmediatePropagation();
				return false;
			}
		};
		document.addEventListener('wheel', lockScroll, { passive: false });
		return () => document.removeEventListener('wheel', lockScroll, false);
	}, [isModalVisible]);

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
				{(showTopBar && TopBarComponent && (
					<TopBarComponent
						showSearch={showSearch}
						signOut={signOut}
						doesSessionExist={isSession}
						showLocation={showLocation}
						SearchComponent={
							(SearchComponent && (
								<SearchComponent
									placeholder={searchPlaceholder}
									onChange={onSearchChange}
								/>
							)) ||
							null
						}
					/>
				)) ||
					null}

				{(showHeader && (
					<Header
						showHeaderDrawer={showHeaderDrawer}
						drawerComponentId={drawerComponentId}
					></Header>
				)) ||
					null}

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
