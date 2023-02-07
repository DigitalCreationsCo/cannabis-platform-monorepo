import React, { PropsWithChildren, useState } from 'react';
// import { layoutConstant } from 'utils/constants';
import { twMerge } from 'tailwind-merge';

interface SideNavContainerProps extends PropsWithChildren {
    SideNavComponent: React.ElementType;
    fixedComponentId: string;
    drawerComponentId?: string;
}
function SideNavContainer({ SideNavComponent, fixedComponentId, drawerComponentId, children }: SideNavContainerProps) {
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

    const classes = {
        container: ['drawer drawer-mobile', 'h-fit'],
        sideNavDrawer: ['drawer-side', isFixed && 'fixed'],
        sideNavComponentContainer: ['bg-light h-fit shadow drop-shadow', 'lg:w-[188px] lg:mt-4'],
        pageContentShifted: [
            'drawer-content',
            // isFixed && 'pl-[188px]',
            'w-full',
        ],
    };
    return (
        <div id={fixedComponentId} className={twMerge(classes.container)}>
            <input id={drawerComponentId} type="checkbox" className="drawer-toggle" />
            <div className={twMerge(classes.pageContentShifted)}>{children}</div>

            <div className={twMerge(classes.sideNavDrawer)}>
                <label htmlFor={drawerComponentId} className="drawer-overlay lg:hidden"></label>
                <div className={twMerge(classes.sideNavComponentContainer)}>
                    <SideNavComponent />
                </div>
            </div>
        </div>
    );
}

export default SideNavContainer;
