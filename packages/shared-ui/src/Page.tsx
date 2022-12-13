import { PropsWithChildren } from 'react';

type PageProps = PropsWithChildren;

function Page({ children }: PageProps) {
    return <div className="bg-green-50 max-w-screen p-5 m-auto md:px-20 pb-20 min-h-[400px]">{children}</div>;
}

export default Page;
