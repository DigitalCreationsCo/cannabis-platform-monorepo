import React, { PropsWithChildren, useCallback, useEffect, useState } from 'react';
// import { layoutConstant } from 'utils/constants';
import cx from 'clsx';

interface SideNavContainerProps extends PropsWithChildren {
    SideNavComponent: React.ElementType;
    fixedComponentId: string;
}
function SideNavContainer({ SideNavComponent, fixedComponentId, children }: SideNavContainerProps) {
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
        container: ['relative', 'flex'],
        sideNavContainer: [
            // 'z-10',
            // 'top-0',
            // 'bottom-0',
            // `w-[200px]`,
            // `min-w-[200px]`,
            // { fixed: isFixed },
            // 'hidden',
            // 'lg:block',
        ],
        pageContentShifted: [{ 'lg:pl-[200px]': isFixed }, 'w-full'],
    };

    return (
        <div id={fixedComponentId} className={cx(classes.container)}>
            <div className={cx(classes.sideNavContainer)}>
                <SideNavComponent />
            </div>
            <div className={cx('relative', classes.pageContentShifted)}>{children}</div>
        </div>
    );
}

export default SideNavContainer;
