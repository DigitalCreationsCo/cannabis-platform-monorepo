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
        container: ['flex'],
        sideNavContainer: [
            'min-w-[200px]',
            'z-10',
            'pt-20',
            'top-0',
            'bottom-0',
            isFixed && 'fixed',
            'hidden',
            'md:block',
        ],
        pageContentShifted: [isFixed && 'pl-[200px]', 'w-full'],
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
