import React, { PropsWithChildren } from 'react';
import { twMerge } from 'tailwind-merge';

type HeaderProps = {
    SearchComponent: JSX.Element
} & PropsWithChildren;
function Header({ SearchComponent, children }: HeaderProps) {
    return (
        <div>
            <div className={twMerge('lg:justify-end flex flex-row w-full py-3 lg:px-12')}>
                { SearchComponent }
            </div>
            {children}
        </div>
    );
}

export default Header;
