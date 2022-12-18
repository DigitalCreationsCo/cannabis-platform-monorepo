import React, { PropsWithChildren } from 'react';

type PageProps = PropsWithChildren;

function Page({ children }: PageProps) {
    return <div className="min-w-full max-w-screen p-5 pt-8 lg:px-16 pb-20 min-h-[400px]">{children}</div>;
}

export default Page;
