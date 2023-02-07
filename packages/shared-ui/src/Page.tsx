import { PropsWithChildren } from 'react';
import { twMerge } from 'tailwind-merge';
type PageProps = {
    className?: string;
};

function Page({ className, children }: PageProps & PropsWithChildren) {
    return (
        <div
            className={twMerge('min-h-[440px] h-fit flex flex-col grow', 'w-full', 'pb-24 sm:px-5 lg:px-16', className)}
        >
            {children}
        </div>
    );
}

export default Page;
