import { PropsWithChildren } from 'react';
import { twMerge } from 'tailwind-merge';
type PageProps = {
    className?: string;
};

function Page({ className, children }: PageProps & PropsWithChildren) {
    return (
        <div
            className={twMerge('min-h-[700px] h-fit flex flex-col grow max-w-screen sm:px-5 lg:px-16 pb-20', className)}
        >
            {children}
        </div>
    );
}

export default Page;
