import React, { PropsWithChildren, useState } from 'react';
// import { layoutConstant } from 'utils/constants';
import { twMerge } from 'tailwind-merge';

interface SideNavContainerProps extends PropsWithChildren {
    SideNavComponent: React.ElementType;
    fixedComponentId: string;
}
function SideNavContainer({ SideNavComponent, fixedComponentId, children }: SideNavContainerProps) {

    const drawerId = 'sidebar-drawer'
    
    const [ isFixed, setIsFixed ] = useState<boolean>(false);
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
        container: [ 'drawer drawer-mobile', 'h-fit',
            // 'border-2 flex'
        ],
        sideNavDrawer: [
            'drawer-side', 
            isFixed && 'fixed',
        ],
        sideNavComponentContainer: [
            "z-10 bg-light h-fit shadow drop-shadow",
            'md:min-w-[188px] mt-4'
        ],
        pageContentShifted: [
            'drawer-content',
            isFixed && 'pl-[188px]', 'w-full'
        ],
    };
    return (
        <div id={ fixedComponentId } className={ twMerge(classes.container) }>
            <input id={ drawerId } type="checkbox" className="drawer-toggle" />
            <div className={ twMerge(classes.sideNavDrawer) }>
                <label htmlFor={ drawerId }className="drawer-overlay"></label>
                <div className={ twMerge(classes.sideNavComponentContainer) }>
                    <SideNavComponent />
                </div>
            </div>
            
            <div className={ twMerge(classes.pageContentShifted) }>
                <label htmlFor={ drawerId } 
                    className="btn btn-square btn-ghost lg:hidden">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="inline-block w-6 h-6 stroke-current"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"></path></svg>
                </label>
                { children }
            </div>
        </div>
    );
}

export default SideNavContainer;
