import React, { PropsWithChildren } from 'react';
import { twMerge } from 'tailwind-merge';
type PageProps = {
    className?: string;
};

function Page({ className, children }: PageProps & PropsWithChildren) {
    return <div className={
        twMerge("flex flex-col grow max-w-screen sm:px-5 pt-2 lg:px-16 pb-20", className) }>
        { children }</div>;
}

export default Page;
