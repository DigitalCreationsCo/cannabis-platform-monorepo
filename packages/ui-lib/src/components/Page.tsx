import { PropsWithChildren } from 'react';
import { twMerge } from 'tailwind-merge';
type PageProps = {
    className?: string;
};

function Page({ className, children }: PageProps & PropsWithChildren) {
    const styles = {
        page: ['bg-inverse-soft', 'flex flex-col grow', 'min-w-screen', 'pb-24', 'lg:px-16']
    };
    return <div className={twMerge([styles.page, className])}>{children}</div>;
}

export default Page;
