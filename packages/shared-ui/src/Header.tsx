import React, { PropsWithChildren } from 'react';

type HeaderProps = PropsWithChildren;
function Header({ children }: HeaderProps) {
    return <div className="flex flex-row w-full py-3 lg:px-12">{children}</div>;
}

export default Header;
