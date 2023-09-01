/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useState, type PropsWithChildren } from 'react';
// import { layoutConstant } from 'utils/constants';
// import { useModal } from '@cd/shared-lib';
import { twMerge } from 'tailwind-merge';

export interface SideNavContainerProps extends PropsWithChildren {
	SideNavComponent: React.ElementType;
	fixedComponentId: string;
	drawerComponentId?: string;
	showSideNav?: boolean;
	showSideNavOnDesktop?: boolean;
}

function SideNavContainer({
	showSideNavOnDesktop,
	showSideNav,
	SideNavComponent,
	fixedComponentId,
	drawerComponentId,
	children,
}: SideNavContainerProps) {
	const [isFixed] = useState<boolean>(false);

	// dont mess with these styles unless youre prepared for pain
	const classes = {
		container: ['drawer drawer-mobile', 'grow h-full'],
		pageContentShifted: ['drawer-content', 'w-full flex'],
		sideNavDrawer: [
			isFixed && 'fixed',
			!showSideNavOnDesktop && 'lg:!hidden',
			'drawer-side',
			'h-full',
		],
		drawerOverlay: ['drawer-overlay h-full lg:hidden'],

		sideNavComponentContainer: [
			!showSideNav && 'hidden',
			'bg-inverse-soft ',
			'lg:w-[188px] h-fit',
			'pt-4 lg:ml-2 py-4',
		],
	};
	return (
		<div id={fixedComponentId} className={twMerge(classes.container)}>
			<input id={drawerComponentId} type="checkbox" className="drawer-toggle" />

			<div className={twMerge(classes.pageContentShifted)}>{children}</div>

			<div className={twMerge(classes.sideNavDrawer)}>
				<label
					htmlFor={drawerComponentId}
					className={twMerge(classes.drawerOverlay)}
				></label>

				<div className={twMerge(classes.sideNavComponentContainer)}>
					<SideNavComponent />
				</div>
			</div>
		</div>
	);
}

export default SideNavContainer;
