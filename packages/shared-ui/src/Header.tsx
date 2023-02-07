import { PropsWithChildren } from 'react';
import { twMerge } from 'tailwind-merge';

type HeaderProps = {
    SearchComponent: JSX.Element;
    drawerComponentId?: string;
} & PropsWithChildren;
function Header({ SearchComponent, drawerComponentId, children }: HeaderProps) {
    const headerContainerStyle = [
        'flex flex-row grow',
        'lg:ml-[188px]',
        'py-6 sm:px-5 lg:px-16 xl:pl-0 xl:pr-16',
        'lg:justify-end lg:right-0',
    ];
    const headerStyle = [
        'flex flex-row grow',
        'w-full md:w-fit xl:w-fit',
        'lg:justify-end lg:h-fit',
        'shadow-md lg:shadow-none',
    ];
    const drawerButtonStyle = ['btn btn-ghost rounded-none bg-light lg:hidden'];
    return (
        <div className={twMerge(headerContainerStyle)}>
            <div className={twMerge(headerStyle)}>
                <label htmlFor={drawerComponentId} className={twMerge(drawerButtonStyle)}>
                    {/* // add this svg to shared-ui lib */}
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        className="inline-block w-6 h-6 stroke-current"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M4 6h16M4 12h16M4 18h16"
                        ></path>
                    </svg>
                </label>
                {SearchComponent}
            </div>
            {children}
        </div>
    );
}

export default Header;
