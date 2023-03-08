import React, { PropsWithChildren, useState } from 'react';
// import { layoutConstant } from 'utils/constants';
// import { useModal } from '@cd/shared-lib';
import { twMerge } from 'tailwind-merge';

export interface SideNavContainerProps extends PropsWithChildren {
    SideNavComponent: React.ElementType;
    fixedComponentId: string;
    drawerComponentId?: string;
}
function SideNavContainer({ SideNavComponent, fixedComponentId, drawerComponentId, children }: SideNavContainerProps) {
    // const { modalOpen } = useModal();
    const [isFixed, setIsFixed] = useState<boolean>(false);
    // const scrollListener = useCallback(() => {
    //     const element: any = document.getElementById(navFixedComponentID);
    //     const top = element.getBoundingClientRect().top + layoutConstant.headerHeight;
    //     console.log('window.pageYOffset ', window.pageYOffset);
    //     console.log('top ', top);
    //     setSidenavFixed(window.pageYOffset > top);
    // }, []);

    // useEffect(() => {
    //     window.addEventListener('scroll', scrollListener);
    //     return () => window.removeEventListener('scroll', scrollListener);
    // }, []);

    // dont mess with these styles unless youre prepared for pain
    const classes = {
        container: ['drawer drawer-mobile', 'h-full'],
        pageContentShifted: [
            'drawer-content',
            // isFixed && 'pl-[188px]',
            'w-full'
        ],
        sideNavDrawer: ['drawer-side', isFixed && 'fixed', 'min-h-full'],
        drawerOverlay: ['drawer-overlay h-full lg:hidden'],
        sideNavComponentContainer: ['bg-light h-fit shadow drop-shadow', 'lg:w-[188px] lg:mt-4']
    };
    return (
        <div id={fixedComponentId} className={twMerge(classes.container)}>
            <input id={drawerComponentId} type="checkbox" className="drawer-toggle" />
            <div className={twMerge(classes.pageContentShifted)}>{children}</div>

            <div className={twMerge(classes.sideNavDrawer)}>
                <label htmlFor={drawerComponentId} className={twMerge(classes.drawerOverlay)}></label>
                <div className={twMerge(classes.sideNavComponentContainer)}>
                    <SideNavComponent />
                </div>
            </div>
        </div>
    );
}

export default SideNavContainer;
