import React, { PropsWithChildren } from 'react';
import { twMerge } from 'tailwind-merge';

type HeaderProps = {
    SearchComponent: JSX.Element;
    drawerComponentId?: string;
} & PropsWithChildren;
function Header({ SearchComponent, drawerComponentId, children }: HeaderProps) {
    const headerContainerStyle = ['flex flex-row items-center py-3 lg:px-12 lg:justify-end']
    const headerStyle = ['lg:justify-end flex flex-row w-full md:max-w-fit mx-4 md:mx-0 shadow-md md:shadow-none']
    const drawerButtonStyle = ["btn btn-ghost rounded-none bg-light lg:hidden"]
    return (
        <div className={ twMerge(headerContainerStyle) }>
            <div className={ twMerge(headerStyle) }>
                <label htmlFor={ drawerComponentId } 
                className={ twMerge(drawerButtonStyle) }>
                {/* // add this svg to shared-ui lib */}
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="inline-block w-6 h-6 stroke-current"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"></path></svg>
                </label>
                { SearchComponent }
            </div>
            {children}
        </div>
    );
}

export default Header;
