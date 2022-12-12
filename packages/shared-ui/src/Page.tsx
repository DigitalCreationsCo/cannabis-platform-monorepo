import { PropsWithChildren } from 'react';

type PageProps = PropsWithChildren;

function Page({ children }: PageProps) {
    return <div className="bg-green-50 max-w-screen border border-white p-5 m-auto md:p-20">{children}</div>;
}

export default Page;
