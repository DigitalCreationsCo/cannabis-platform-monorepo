import React, { PropsWithChildren } from 'react';

type PageProps = PropsWithChildren;

function Page({ children }: PageProps) {
    return <div className="flex min-w-full max-w-screen p-5 md:px-20 pb-20 min-h-[400px]">{children}</div>;
}

export default Page;
