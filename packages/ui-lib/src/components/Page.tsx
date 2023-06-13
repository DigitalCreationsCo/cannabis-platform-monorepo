import { PropsWithChildren } from 'react';
import { twMerge } from 'tailwind-merge';
type PageProps = {
    gradient?: 'pink' | 'green';
    className?: string | string[];
};

function Page ({ gradient, children, className = '' }: PropsWithChildren<PageProps>) {
    
    type Styles = (string | string[])[];
    const styles:Styles = Object.values({
        page: ['bg-inverse-soft', 'flex flex-col grow', 'min-w-screen', 'md:pt-8 pb-24', 'lg:px-16'],
        gradient: [gradient && 'anim8-' + gradient + '-gradient' || ''],
        className
    });

    return <div className={twMerge(styles)}>{children}</div>;
}

export default Page;
