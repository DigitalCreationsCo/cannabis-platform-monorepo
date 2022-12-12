import { PropsWithChildren } from 'react';

type HeaderProps = PropsWithChildren;
function Header({ children }: HeaderProps) {
    return <div className="flex flex-row justify-center w-full py-3 lg:px-8">{children}</div>;
}

export default Header;
